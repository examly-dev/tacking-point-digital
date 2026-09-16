import Link from "next/link";
import { ViewTransition } from "react";
import type { WorkItem } from "@/lib/work";
import { Arrow } from "./Arrow";
import { Media } from "./Media";

/**
 * Dead Simple Sites gallery card: 250×300 grey mat, 180×236 inner screenshot
 * (`aspect-[180/236]`). Poster is shot at that ratio and fills with cover/top —
 * never contained into a mismatched hole.
 */
export function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  const preview = item.mobile ?? item.cover;

  return (
    <Link
      href={`/work/${item.slug}`}
      className={`group block w-full cursor-pointer tablet:w-[250px]${index < 2 ? "" : " rise"}`}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <ViewTransition name={`work-cover-${item.slug}`} share="morph" default="none">
        <div className="mb-2.5 flex aspect-[250/300] w-full items-center justify-center bg-black/[0.05] transition-colors duration-300 ease-out group-hover:bg-black/[0.08] group-active:bg-black/[0.08] tablet:h-[300px] tablet:w-[250px] tablet:aspect-auto">
          <div className="relative aspect-[180/236] w-[72%] overflow-hidden transition-transform duration-500 [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.015] group-active:scale-[0.99] tablet:h-[236px] tablet:w-[180px]">
            {preview ? (
              <Media
                media={preview}
                sizes="(min-width: 850px) 180px, (min-width: 520px) 44vw, 44vw"
                play="hover"
                priority={index === 0}
                eager={index < 4}
                deferSrc={index >= 4}
                className="object-cover object-top"
              />
            ) : null}
          </div>
        </div>
      </ViewTransition>
      <div className="flex w-full items-center justify-between tablet:w-[250px]">
        <h2 className="text-[15px] font-medium text-black tablet:text-[14px]">{item.name}</h2>
        <span
          aria-hidden="true"
          className="flex items-center gap-1 text-[15px] text-black/60 transition-colors duration-200 group-hover:text-black tablet:text-[14px]"
        >
          Visit
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <Arrow />
          </span>
        </span>
      </div>
    </Link>
  );
}
