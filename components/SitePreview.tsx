"use client";

import { useEffect, useState } from "react";
import { ViewSlider } from "@/components/ViewSlider";
import { asset } from "@/lib/asset";

const quiet =
  "text-[13px] tablet:text-[12px] text-black/30 hover:text-black transition-colors duration-200";

/**
 * Quiet control that opens the example site in a contained viewer on this page.
 * Iframe points at a same-origin /preview/[slug] route so GitHub Pages works
 * (no localhost). Examly and Accordion never get this.
 * Always opens on desktop; the slider narrows the frame to a 390px phone.
 */
export function SitePreview({ slug, open, onClose }: { slug: string; open: boolean; onClose: () => void }) {
  const [view, setView] = useState<"desktop" | "mobile">("desktop");

  useEffect(() => {
    if (!open) return;
    setView("desktop");
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const mobile = view === "mobile";

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-white"
      role="dialog"
      aria-modal="true"
      aria-label="Site preview"
    >
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-black/10 px-5 py-3 tablet:px-8">
        <button type="button" onClick={onClose} className={quiet}>
          Close
        </button>
        <ViewSlider value={view} onChange={setView} />
      </div>
      <div className={`min-h-0 flex-1 ${mobile ? "flex justify-center bg-black/[0.05] p-4 tablet:p-8" : ""}`}>
        <iframe
          src={asset(`/preview/${slug}/`)}
          title="Example site"
          className={
            mobile
              ? "h-full w-full max-w-[390px] border border-black/10 bg-white"
              : "h-full w-full border-0 bg-white"
          }
        />
      </div>
    </div>
  );
}

export function ViewSiteButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={quiet}>
      View site
    </button>
  );
}
