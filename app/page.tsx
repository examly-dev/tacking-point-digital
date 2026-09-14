import { WorkGrid } from "@/components/WorkGrid";
import { intro } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* Phones have no sidebar, so the introduction leads the page. */}
      <section className="tablet:hidden px-5 pt-6 pb-2 text-[16px] leading-[1.55] tracking-[-0.01em] space-y-4">
        {intro.map((p, i) => (
          <p key={p} className="rise" style={{ animationDelay: `${i * 60}ms` }}>
            {p}
          </p>
        ))}
      </section>
      <WorkGrid />
    </>
  );
}
