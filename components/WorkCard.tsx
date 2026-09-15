import Link from "next/link";
import { ViewTransition } from "react";
import type { WorkItem } from "@/lib/work";
import { Arrow } from "./Arrow";
import { Media } from "./Media";

/**
 * Dead Simple Sites–style portrait card: grey mat, even inset, phone-shaped
 * screenshot (390×844) with object-contain so nothing is cropped. Prefers the
 * mobile capture; falls back to the desktop cover (letterboxed, still whole).
 */
export function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  const preview = item.mobile ?? item.cover;

  return (
    <Link
      href={`/work/${item.slug}`}
      className="group block w-full cursor-pointer rise tablet:w-[220px]"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <ViewTransition name={`work-cover-${item.slug}`} share="morph" default="none">
        <div className="mb-2.5 bg-black/[0.05] p-3.5 transition-colors duration-300 ease-out group-hover:bg-black/[0.08] group-active:bg-black/[0.08] tablet:p-4 tablet:w-[220px]">
          <div className="relative aspect-[390/844] w-full overflow-hidden border border-black/[0.03] bg-white transition-transform duration-500 [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.015] group-active:scale-[0.99]">
            {preview ? (
              <Media
                media={preview}
                sizes="(min-width: 850px) 188px, (min-width: 520px) 44vw, 44vw"
                play="hover"
                priority={index === 0}
              />
            ) : null}
          </div>
        </div>
      </ViewTransition>
      <div className="flex w-full items-center justify-between tablet:w-[220px]">
        <h3 className="text-[15px] font-medium text-black tablet:text-[14px]">{item.name}</h3>
        <span className="flex items-center gap-1 text-[15px] text-black/30 transition-colors duration-200 group-hover:text-black tablet:text-[14px]">
          Visit
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <Arrow />
          </span>
        </span>
      </div>
    </Link>
  );
}
