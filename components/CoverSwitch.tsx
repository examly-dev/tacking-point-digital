"use client";

import { useCallback, useEffect, useState } from "react";
import { Lightbox } from "@/components/Lightbox";
import { Media } from "@/components/Media";
import { SitePreview, ViewSiteButton } from "@/components/SitePreview";
import { ViewSlider } from "@/components/ViewSlider";
import type { WorkMedia } from "@/lib/work";

/**
 * Work-page preview well. Independent of the Dead Simple Sites index cards.
 * Always opens on desktop. Mobile is a watchable 390×844 scrolling phone clip;
 * desktop is the landscape scroll clip, contain-fitted in a 16/10 frame.
 */
export function CoverSwitch({
  cover,
  mobile,
  previewSlug,
  mobileView = true,
}: {
  cover?: WorkMedia;
  mobile: WorkMedia;
  previewSlug?: string;
  mobileView?: boolean;
}) {
  const [view, setView] = useState<"desktop" | "mobile">("desktop");
  const [preview, setPreview] = useState(false);
  const openPreview = useCallback(() => setPreview(true), []);
  const closePreview = useCallback(() => setPreview(false), []);
  const allowMobile = Boolean(mobileView && cover);
  const media = allowMobile && view === "mobile" ? mobile : cover ?? mobile;

  useEffect(() => {
    setView("desktop");
  }, [cover?.src, mobile.src, previewSlug]);

  return (
    <>
      <figure className="bg-black/[0.05] p-4 tablet:p-8">
        {previewSlug || allowMobile ? (
          <div className="mb-3 flex items-center justify-between gap-4 tablet:mb-4">
            {previewSlug ? <ViewSiteButton onClick={openPreview} /> : <span />}
            {allowMobile ? <ViewSlider value={view} onChange={setView} /> : null}
          </div>
        ) : null}
        <Lightbox media={media}>
          {allowMobile && view === "mobile" ? (
            <div className="mx-auto w-full max-w-[300px]">
              <div className="relative aspect-[390/844] overflow-hidden border border-black/[0.03] bg-white">
                <Media media={mobile} sizes="300px" className="object-contain" priority />
              </div>
            </div>
          ) : cover ? (
            <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border border-black/[0.03] bg-white">
              <Media
                media={cover}
                priority
                sizes="(min-width: 1250px) 720px, (min-width: 850px) calc(100vw - 340px), 100vw"
                className="object-contain"
              />
            </div>
          ) : null}
        </Lightbox>
        <figcaption className="mt-2.5 text-[13px] tablet:text-[12px] text-black/40">{media.alt}</figcaption>
      </figure>
      {previewSlug ? <SitePreview slug={previewSlug} open={preview} onClose={closePreview} /> : null}
    </>
  );
}
