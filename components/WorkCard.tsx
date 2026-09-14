import Link from "next/link";
import { ViewTransition } from "react";
import type { WorkItem } from "@/lib/work";
import { Arrow } from "./Arrow";
import { Media } from "./Media";

/**
 * Fluid on phones (one or two columns), fixed 250-wide from tablet up so the
 * grid matches the sidebar rhythm. The inner frame is 16:10 (220×138 in a
 * 250×188 tile), the same shape as the clips, so nothing is cropped.
 */
export function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  return (
    <Link
      href={`/work/${item.slug}`}
      className="group block w-full cursor-pointer rise tablet:w-[250px]"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <ViewTransition name={`work-cover-${item.slug}`} share="morph" default="none">
        <div className="mb-2.5 flex aspect-[4/3] w-full items-center justify-center bg-black/[0.05] transition-colors duration-300 ease-out group-hover:bg-black/[0.08] group-active:bg-black/[0.08] tablet:h-[188px] tablet:w-[250px]">
          <div className="relative aspect-[16/10] w-[88%] overflow-hidden border border-black/[0.03] bg-white transition-transform duration-500 [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.02] group-active:scale-[0.99] tablet:w-[220px]">
            {item.cover ? (
              <Media
                media={item.cover}
                sizes="(min-width: 850px) 220px, (min-width: 520px) 44vw, 88vw"
                play="hover"
                priority={index === 0}
              />
            ) : null}
          </div>
        </div>
      </ViewTransition>
      <div className="flex w-full items-center justify-between tablet:w-[250px]">
        <h3 className="text-[15px] font-medium text-black tablet:text-[14px]">{item.name}</h3>
        <span className="flex items-center gap-1 text-[15px] text-black/30 transition-colors duration-200 group-hover:text-black tablet:text-[14px]">
          View
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <Arrow />
          </span>
        </span>
      </div>
    </Link>
  );
}
