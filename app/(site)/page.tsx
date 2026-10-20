import { WorkSection } from "@/components/WorkGrid";
import { asset } from "@/lib/asset";
import { intro } from "@/lib/site";
import { clientWork, exampleSites } from "@/lib/work";

export default function Home() {
  const first = [...clientWork, ...exampleSites].find((item) => item.mobile);
  const lcp = first?.mobile;

  return (
    <>
      {lcp?.type === "image" ? (
        <link
          rel="preload"
          as="image"
          href={asset(lcp.src)}
          type="image/webp"
          fetchPriority="high"
        />
      ) : null}
      {/* Phones have no sidebar, so the introduction leads the page. */}
      <div className="tablet:hidden px-5 pt-6 pb-2 text-[16px] leading-[1.55] tracking-[-0.01em] space-y-4">
        {intro.map((p, i) => (
          <p key={p} className="rise" style={{ animationDelay: `${i * 60}ms` }}>
            {p}
          </p>
        ))}
      </div>
      <div className="space-y-12 p-5 tablet:space-y-14 tablet:p-8 desktop:p-10">
        <WorkSection
          id="recent-work"
          title="Recent work"
          items={clientWork}
          prioritySlug={first?.slug}
        />
        <WorkSection
          id="example-sites"
          title="Example sites"
          note="Sites I design to show what a small business website can be."
          items={exampleSites}
          offset={clientWork.length}
          prioritySlug={first?.slug}
        />
      </div>
    </>
  );
}
