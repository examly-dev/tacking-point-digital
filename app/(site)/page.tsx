import { WorkGrid } from "@/components/WorkGrid";
import { asset } from "@/lib/asset";
import { intro } from "@/lib/site";
import { work } from "@/lib/work";

export default function Home() {
  const lcp = work[0]?.mobile;

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
      <WorkGrid />
    </>
  );
}
