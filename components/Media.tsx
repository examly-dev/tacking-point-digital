"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";
import type { WorkMedia } from "@/lib/work";

export type PlayMode =
  /**
   * Show the poster; play only while the nearest link/[data-hover-play] ancestor
   * is hovered or focused. On touch screens this behaves like "inview".
   */
  | "hover"
  /** Play only while mostly on screen; pause when scrolled away. */
  | "inview";

/**
 * Fills its (positioned) parent with either a still or a silent looping clip.
 *
 * Clips never all run at once: grid cards play on hover, project pages play
 * only the clip in view, and `prefers-reduced-motion` shows posters only.
 */
export function Media({
  media,
  sizes,
  priority = false,
  play = "inview",
  className = "object-cover object-left-top",
}: {
  media: WorkMedia;
  sizes: string;
  priority?: boolean;
  play?: PlayMode;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Hold playback until the page's entrance animations have finished, so
    // decoding never competes with the morph and the rise-ins.
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = (after = 0) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        video.play().catch(() => {});
      }, after);
    };
    const stop = (reset = false) => {
      clearTimeout(timer);
      video.pause();
      if (reset) video.currentTime = 0;
    };

    // Touch screens have no hover: play whichever card is mostly on screen instead.
    const canHover = window.matchMedia("(hover: hover)").matches;

    if (play === "hover" && canHover) {
      const target = video.closest<HTMLElement>("[data-hover-play], a") ?? video;
      const onEnter = () => start(120);
      const onLeave = () => stop(true);
      target.addEventListener("pointerenter", onEnter);
      target.addEventListener("pointerleave", onLeave);
      target.addEventListener("focusin", onEnter);
      target.addEventListener("focusout", onLeave);
      return () => {
        clearTimeout(timer);
        target.removeEventListener("pointerenter", onEnter);
        target.removeEventListener("pointerleave", onLeave);
        target.removeEventListener("focusin", onEnter);
        target.removeEventListener("focusout", onLeave);
      };
    }

    const mounted = performance.now();
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return stop();
        const settled = Math.max(0, 900 - (performance.now() - mounted));
        start(settled);
      },
      { threshold: play === "hover" ? 0.7 : 0.5 },
    );
    io.observe(video);
    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, [play]);

  if (media.type === "video") {
    return (
      <video
        ref={ref}
        src={asset(media.src)}
        poster={asset(media.poster)}
        muted
        loop
        playsInline
        preload={play === "hover" ? "none" : priority ? "auto" : "metadata"}
        aria-label={media.alt}
        className={`absolute inset-0 h-full w-full ${className}`}
      />
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
