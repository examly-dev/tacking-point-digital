import Link from "next/link";
import { ViewTransition } from "react";
import type { WorkItem } from "@/lib/work";
import { Arrow } from "./Arrow";
import { Media } from "./Media";

/**
 * Dead Simple Sites gallery card: 250×300 green mat, 180×236 inner screenshot
 * (`aspect-[180/236]`). Poster is shot at that ratio and fills with cover/top —
 * never contained into a mismatched hole.
 */
export function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  const preview = item.mobile ?? item.cover;

  return (
    <Link
      href={`/work/${item.slug}`}
      prefetch={index === 0}
      className={`group block w-full min-w-0 cursor-pointer tablet:w-[250px]${index < 2 ? "" : " rise"}`}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <ViewTransition name={`work-cover-${item.slug}`} share="morph" default="none">
        <div className="mb-2.5 flex aspect-[250/300] w-full items-center justify-center bg-green p-3 motion-safe:transition-colors motion-safe:duration-300 motion-safe:ease-out group-hover:bg-[#1a2e25] tablet:h-[300px] tablet:w-[250px] tablet:aspect-auto tablet:p-4">
          <div className="relative aspect-[180/236] w-[72%] overflow-hidden motion-safe:transition-transform motion-safe:duration-500 motion-safe:[transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)] motion-safe:group-hover:scale-[1.015] motion-safe:group-active:scale-[0.99] tablet:h-[236px] tablet:w-[180px]">
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
        <div className="min-w-0">
          <h2 className="text-[15px] font-medium tracking-[-0.02em] text-ink tablet:text-[14px] desktop:text-[16px]">
            {item.name}
          </h2>
          <p className="text-[13px] text-muted tablet:text-[12px]">{item.kind}</p>
        </div>
        <span
          aria-hidden="true"
          className="ml-3 flex shrink-0 items-center gap-1 text-[15px] text-muted motion-safe:transition-colors motion-safe:duration-200 group-hover:text-ink tablet:text-[14px]"
        >
          {item.sample ? (
            "Sample"
          ) : (
            <>
              Visit
              <span className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <Arrow />
              </span>
            </>
          )}
        </span>
      </div>
    </Link>
  );
}
