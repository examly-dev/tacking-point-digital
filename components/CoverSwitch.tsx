"use client";

import { useCallback, useState } from "react";
import { Lightbox } from "@/components/Lightbox";
import { Media } from "@/components/Media";
import { SitePreview, ViewSiteButton } from "@/components/SitePreview";
import type { WorkMedia } from "@/lib/work";

const label = "text-[13px] tablet:text-[12px] transition-colors duration-200";

/**
 * Quiet two-position slider: Desktop ← thumb → Mobile.
 * Black thumb on a hairline track, matching the rest of the site.
 */
function ViewSlider({
  value,
  onChange,
}: {
  value: "desktop" | "mobile";
  onChange: (next: "desktop" | "mobile") => void;
}) {
  const mobile = value === "mobile";

  return (
    <div className="flex items-center gap-2.5" role="group" aria-label="Preview size">
      <button
        type="button"
        className={`${label} ${mobile ? "text-black/30 hover:text-black" : "text-black"}`}
        onClick={() => onChange("desktop")}
      >
        Desktop
      </button>
      <button
        type="button"
        role="switch"
        aria-checked={mobile}
        aria-label={mobile ? "Mobile view. Switch to desktop." : "Desktop view. Switch to mobile."}
        onClick={() => onChange(mobile ? "desktop" : "mobile")}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "Home") {
            e.preventDefault();
            onChange("desktop");
          }
          if (e.key === "ArrowRight" || e.key === "End") {
            e.preventDefault();
            onChange("mobile");
          }
        }}
        className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center tablet:h-[18px] tablet:w-[32px]"
      >
        <span className="relative block h-[18px] w-[32px] rounded-full bg-black/[0.08]">
          <span
            aria-hidden
            className="absolute top-[2px] left-[2px] h-[14px] w-[14px] rounded-full bg-black transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"
            style={{ transform: mobile ? "translateX(14px)" : "translateX(0)" }}
          />
        </span>
      </button>
      <button
        type="button"
        className={`${label} ${mobile ? "text-black" : "text-black/30 hover:text-black"}`}
        onClick={() => onChange("mobile")}
      >
        Mobile
      </button>
    </div>
  );
}

/**
 * Desktop or mobile clip in one 16/10 grey figure, so switching does not
 * change the height of the page. Optional View site sits with the slider.
 */
export function CoverSwitch({
  cover,
  mobile,
  previewSlug,
}: {
  cover?: WorkMedia;
  mobile: WorkMedia;
  previewSlug?: string;
}) {
  const [view, setView] = useState<"desktop" | "mobile">(cover ? "desktop" : "mobile");
  const [preview, setPreview] = useState(false);
  const openPreview = useCallback(() => setPreview(true), []);
  const closePreview = useCallback(() => setPreview(false), []);
  const media = view === "mobile" ? mobile : cover ?? mobile;

  return (
    <>
      <figure className="bg-black/[0.05] p-3 tablet:p-6">
        <div className="mb-2.5 flex items-center justify-between gap-4">
          {previewSlug ? <ViewSiteButton onClick={openPreview} /> : <span />}
          {cover ? <ViewSlider value={view} onChange={setView} /> : null}
        </div>
        <Lightbox media={media}>
          <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border border-black/[0.03] bg-white">
            {view === "mobile" ? (
              <div className="relative aspect-[390/844] h-full max-h-full">
                <Media media={mobile} sizes="250px" className="object-cover object-top" />
              </div>
            ) : cover ? (
              <Media
                media={cover}
                priority
                sizes="(min-width: 1250px) 720px, (min-width: 850px) calc(100vw - 340px), 100vw"
              />
            ) : null}
          </div>
        </Lightbox>
        <figcaption className="mt-2.5 text-[13px] tablet:text-[12px] text-black/40">{media.alt}</figcaption>
      </figure>
      {previewSlug ? <SitePreview slug={previewSlug} open={preview} onClose={closePreview} /> : null}
    </>
  );
}
