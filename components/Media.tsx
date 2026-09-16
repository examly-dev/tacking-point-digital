"use client";

import { useEffect, useRef, useState } from "react";
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
 * Cards pass `object-cover object-top` (poster matches the frame). Landscape
 * gallery clips still use `object-contain`.
 *
 * Plain `img` (not next/image): GitHub Pages `basePath` is applied via `asset()`.
 *
 * Clips never all run at once: grid cards play on hover, project pages play
 * only the clip in view, and `prefers-reduced-motion` shows posters only.
 */
export function Media({
  media,
  priority = false,
  deferSrc = false,
  eager = false,
  play = "inview",
  className = "object-contain",
}: {
  media: WorkMedia;
  /** Unused; kept so call sites can still pass a sizes hint. */
  sizes?: string;
  priority?: boolean;
  /**
   * Do not put `src` in the HTML until this node intersects. `loading="lazy"`
   * still downloads a short homepage; Lighthouse then counts every card.
   */
  deferSrc?: boolean;
  /** Force `loading="eager"` without making this the LCP image. */
  eager?: boolean;
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

  const fit = `absolute inset-0 h-full w-full ${className}`;

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
        className={fit}
      />
    );
  }

  return (
    <Still
      src={asset(media.src)}
      alt={media.alt}
      className={fit}
      priority={priority}
      deferSrc={deferSrc}
      eager={eager}
    />
  );
}

function Still({
  src,
  alt,
  className,
  priority,
  deferSrc,
  eager,
}: {
  src: string;
  alt: string;
  className: string;
  priority: boolean;
  deferSrc: boolean;
  eager: boolean;
}) {
  const slot = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(!deferSrc);

  useEffect(() => {
    if (!deferSrc || ready) return;
    const node = slot.current;
    if (!node) return;

    // A late-painted same-size image becomes LCP. On phones wait for a gesture
    // (which finalises LCP). Tablet/desktop can fill in-view cards immediately.
    let allowed = window.matchMedia("(min-width: 850px)").matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!allowed || !entry.isIntersecting) return;
        setReady(true);
        io.disconnect();
      },
      { root: null, rootMargin: "0px", threshold: 0 },
    );
    io.observe(node);

    const arm = () => {
      allowed = true;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      if (rect.bottom > 0 && rect.top < vh) {
        setReady(true);
        io.disconnect();
      }
    };

    window.addEventListener("scroll", arm, { passive: true, once: true });
    window.addEventListener("pointerdown", arm, { passive: true, once: true });
    const host = node.closest("a");
    host?.addEventListener("focusin", arm, { once: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", arm);
      window.removeEventListener("pointerdown", arm);
      host?.removeEventListener("focusin", arm);
    };
  }, [deferSrc, ready]);

  if (!ready) {
    return <div ref={slot} className="absolute inset-0" aria-hidden="true" />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      decoding="async"
      loading={priority || eager ? "eager" : "lazy"}
      fetchPriority={priority || eager ? "high" : undefined}
      className={className}
    />
  );
}
