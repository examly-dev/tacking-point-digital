import type { WorkItem } from "@/lib/work";
import { work as catalog } from "@/lib/work";
import { WorkCard } from "./WorkCard";

export function WorkGrid({
  items = catalog,
}: {
  items?: WorkItem[];
  /** Kept for call-site parity with the Leap.Type theme; cards share one layout. */
  compact?: boolean;
}) {
  return (
    <div className="grid min-w-0 grid-cols-2 gap-x-4 gap-y-8 tablet:grid-cols-[repeat(auto-fit,250px)] tablet:gap-x-8 tablet:gap-y-6">
      {items.map((item, i) => (
        <WorkCard key={item.slug} item={item} index={i} />
      ))}
    </div>
  );
}
