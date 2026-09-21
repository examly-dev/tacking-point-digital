import { work } from "@/lib/work";
import { WorkCard } from "./WorkCard";

export function WorkGrid() {
  return (
    <div className="p-5 tablet:p-8 desktop:p-10">
      <ul className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-7 p-0 tablet:grid-cols-[repeat(auto-fit,250px)] tablet:gap-x-8 tablet:gap-y-6">
        {work.map((item, i) => (
          <li key={item.slug}>
            <WorkCard item={item} index={i} />
          </li>
        ))}
      </ul>
    </div>
  );
}
