import type { WorkItem } from "@/lib/work";
import { WorkCard } from "./WorkCard";

const text = "text-[15px] tablet:text-[14px] desktop:text-[16px] leading-[1.6] desktop:leading-[1.4]";

/** One titled grid of work cards. Renders nothing when the list is empty. */
export function WorkSection({
  id,
  title,
  note,
  items,
  offset = 0,
  prioritySlug,
}: {
  id: string;
  title: string;
  note?: string;
  items: WorkItem[];
  /** Cards before this section, so stagger and eager loading continue across sections. */
  offset?: number;
  /** The one card whose image is the page's LCP. */
  prioritySlug?: string;
}) {
  if (!items.length) return null;

  return (
    <section aria-labelledby={id}>
      <div className="mb-4 tablet:mb-5">
        <h2 id={id} className={`${text} text-black`}>
          {title}
        </h2>
        {note ? <p className={`${text} text-black/40`}>{note}</p> : null}
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-7 tablet:grid-cols-[repeat(auto-fit,250px)] tablet:gap-x-8 tablet:gap-y-6">
        {items.map((item, i) => (
          <WorkCard
            key={item.slug}
            item={item}
            index={offset + i}
            priority={item.slug === prioritySlug}
          />
        ))}
      </div>
    </section>
  );
}
