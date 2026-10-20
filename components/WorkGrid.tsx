import { work } from "@/lib/work";
import { WorkCard } from "./WorkCard";

export function WorkGrid() {
  return (
    <div className="p-5 tablet:p-8 desktop:p-10">
      <div className="grid grid-cols-2 gap-x-4 gap-y-7 tablet:grid-cols-[repeat(auto-fit,250px)] tablet:gap-x-8 tablet:gap-y-6">
        {work.map((item, i) => (
          <WorkCard key={item.slug} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}
