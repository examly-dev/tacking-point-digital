import type { Metadata } from "next";
import Link from "next/link";
import { WorkGrid } from "@/components/WorkGrid";
import { asset } from "@/lib/asset";
import { description, intro, site } from "@/lib/site";
import { recentWork } from "@/lib/work";

export const metadata: Metadata = { description };

const body =
  "text-[15px] tablet:text-[14px] desktop:text-[16px] leading-[1.6] desktop:leading-[1.45] tracking-[-0.01em]";

const link =
  "underline decoration-rule underline-offset-[3px] hover:decoration-ink motion-safe:transition-colors motion-safe:duration-200";

export default function Home() {
  const lcp = recentWork[0]?.mobile;

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

      <div className="p-5 tablet:p-8 desktop:p-10">
        <article className="max-w-[34rem]">
          <h1 className="text-[32px] font-bold leading-[1.05] tracking-[-0.04em] tablet:text-[40px]">
            {site.name}
          </h1>
          <div className={`${body} mt-6 space-y-5`}>
            {intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="text-muted">
              <Link href="/about" className={link}>
                About
              </Link>
            </p>
          </div>
        </article>

        <section className="mt-14" aria-labelledby="recent-work">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2
              id="recent-work"
              className="text-[15px] font-bold tracking-[-0.02em] tablet:text-[14px] desktop:text-[16px]"
            >
              Work
            </h2>
            <Link
              href="/work"
              className={`${body} text-muted underline decoration-rule underline-offset-[3px] hover:decoration-ink hover:text-ink`}
            >
              All work
            </Link>
          </div>
          <WorkGrid items={recentWork} compact />
        </section>
      </div>
    </>
  );
}
