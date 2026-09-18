"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ViewSlider } from "@/components/ViewSlider";
import { asset } from "@/lib/asset";

const quiet =
  "text-[13px] tablet:text-[12px] text-black/30 hover:text-black transition-colors duration-200";

const previewLink =
  "inline-flex min-h-11 tablet:min-h-0 items-center gap-1.5 text-[15px] tablet:text-[14px] desktop:text-[16px] text-black/60 hover:text-black underline decoration-black/20 underline-offset-[3px] hover:decoration-black transition-colors duration-200";

/** Browser-window mark: this opens a full working preview, not an external URL. */
function PreviewWindow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="36"
        y="48"
        width="184"
        height="160"
        rx="20"
        stroke="currentColor"
        strokeWidth="20"
        strokeLinejoin="round"
      />
      <line
        x1="36"
        y1="96"
        x2="220"
        y2="96"
        stroke="currentColor"
        strokeWidth="20"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Opens the example site in a contained viewer on this page.
 * Iframe points at a same-origin /preview/[slug] route so GitHub Pages works
 * (no localhost). Examly never gets this.
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
      aria-label="Full site preview"
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
          title="Full site preview"
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

export function PreviewFullSiteButton({
  onClick,
  className = "",
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button type="button" onClick={onClick} className={`${previewLink} ${className}`.trim()}>
      <PreviewWindow />
      Preview full site
    </button>
  );
}

const body =
  "text-[15px] tablet:text-[14px] desktop:text-[16px] leading-[1.6] desktop:leading-[1.4]";

/**
 * Work-page title row plus the full-site preview overlay.
 * Example sites get a clear preview control; live products do not.
 */
export function WorkPreview({
  slug,
  name,
  kind,
  children,
}: {
  slug?: string;
  name: string;
  kind: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const openPreview = useCallback(() => setOpen(true), []);
  const closePreview = useCallback(() => setOpen(false), []);

  return (
    <>
      <header className="mb-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h1 className="rise text-[22px] tablet:text-[14px] desktop:text-[16px] font-medium tracking-[-0.02em] tablet:tracking-[-0.01em] leading-tight">
            {name}
          </h1>
          {slug ? <PreviewFullSiteButton onClick={openPreview} className="rise" /> : null}
        </div>
        <p className={`rise ${body} text-black/30 mt-1`}>{kind}</p>
      </header>
      {children}
      {slug ? <SitePreview slug={slug} open={open} onClose={closePreview} /> : null}
    </>
  );
}
