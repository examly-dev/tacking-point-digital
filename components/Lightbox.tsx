"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { asset } from "@/lib/asset";
import type { WorkMedia } from "@/lib/work";

/**
 * Wraps a framed shot so it can be opened at full size. Inline clips are 1×
 * (cheap to decode while the page animates); the viewer swaps in the 2× file
 * (2880×1800 desktop, 780×1688 phone) and links to it for anyone who wants
 * every pixel.
 */
export function Lightbox({ media, children }: { media: WorkMedia; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View full size: ${media.alt}`}
        className="group/zoom relative block w-full cursor-zoom-in text-left"
      >
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2.5 right-2.5 rounded-sm bg-white/90 px-2 py-1 text-[11px] text-black/60 opacity-0 shadow-[0_1px_2px_rgba(0,0,0,0.08)] backdrop-blur transition-opacity duration-200 group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100"
        >
          Full size
        </span>
      </button>

      {open
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={media.alt}
              className="lightbox fixed inset-0 z-[100] flex flex-col bg-white/95 backdrop-blur-md"
              onClick={() => setOpen(false)}
            >
              <div className="flex h-12 shrink-0 items-center justify-between px-4 text-[13px] text-black/50 tablet:px-6">
                <a
                  href={asset(media.type === "video" ? media.hd ?? media.src : media.src)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex h-10 items-center hover:text-black"
                >
                  Open file ↗
                </a>
                <button type="button" onClick={() => setOpen(false)} className="-mr-2 flex h-10 items-center px-2 hover:text-black">
                  Close
                </button>
              </div>
              <div className="flex min-h-0 flex-1 items-center justify-center p-3 pb-6 tablet:p-6 tablet:pt-2">
                {media.type === "video" ? (
                  <video
                    src={asset(media.hd ?? media.src)}
                    poster={asset(media.poster)}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label={media.alt}
                    onClick={(e) => e.stopPropagation()}
                    className="max-h-full max-w-full border border-black/[0.06] bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]"
                  />
                ) : (
                  // Plain img on purpose: show the file at its native resolution, not a resized copy.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={asset(media.src)}
                    alt={media.alt}
                    onClick={(e) => e.stopPropagation()}
                    className="max-h-full max-w-full border border-black/[0.06] bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]"
                  />
                )}
              </div>
              <p className="shrink-0 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-center text-[13px] text-black/40 tablet:px-6">
                {media.alt}
              </p>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
