import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { Arrow } from "@/components/Arrow";
import { Lightbox } from "@/components/Lightbox";
import { Media } from "@/components/Media";
import { getWork, work, type WorkMedia } from "@/lib/work";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return work.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) return {};
  return { title: item.name, description: item.summary };
}

const body = "text-[15px] tablet:text-[14px] desktop:text-[16px] leading-[1.6] desktop:leading-[1.4]";

/** Inline delay for the staggered `rise` animation. */
function delay(step: number) {
  return { animationDelay: `${step * 60}ms` };
}

function Shot({ media, priority = false }: { media: WorkMedia; priority?: boolean }) {
  return (
    <figure className="bg-black/[0.05] p-3 tablet:p-6">
      <Lightbox media={media}>
        <div className="relative aspect-[16/10] overflow-hidden border border-black/[0.03] bg-white">
          <Media
            media={media}
            priority={priority}
            sizes="(min-width: 1250px) 720px, (min-width: 850px) calc(100vw - 340px), 100vw"
          />
        </div>
      </Lightbox>
      <figcaption className="mt-2.5 text-[13px] tablet:text-[12px] text-black/40">{media.alt}</figcaption>
    </figure>
  );
}

/** A phone-sized clip, centred in the same grey figure as the desktop shots. */
function PhoneShot({ media }: { media: WorkMedia }) {
  return (
    <figure className="bg-black/[0.05] p-3 tablet:p-6">
      <div className="mx-auto w-[220px] tablet:w-[250px]">
        <Lightbox media={media}>
          <div className="relative aspect-[390/844] overflow-hidden border border-black/[0.03] bg-white">
            <Media media={media} sizes="250px" className="object-cover object-top" />
          </div>
        </Lightbox>
      </div>
      <figcaption className="mt-2.5 text-[13px] tablet:text-[12px] text-black/40">{media.alt}</figcaption>
    </figure>
  );
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) notFound();

  return (
    <div className="p-5 tablet:p-8 desktop:p-10">
      <article className="max-w-[46rem]">
        <Link
          href="/"
          style={delay(0)}
          className={`rise ${body} inline-flex min-h-11 tablet:min-h-0 items-center gap-1 text-black/30 hover:text-black active:text-black transition-colors duration-200 mb-4 tablet:mb-8 group`}
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-300 ease-out group-hover:-translate-x-0.5"
          >
            ←
          </span>{" "}
          Work
        </Link>

        <header className="mb-6">
          <div className="flex items-baseline justify-between gap-6">
            <h1
              style={delay(1)}
              className="rise text-[22px] tablet:text-[14px] desktop:text-[16px] font-medium tracking-[-0.02em] tablet:tracking-[-0.01em] leading-tight"
            >
              {item.name}
            </h1>
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={delay(1)}
                className={`rise ${body} inline-flex items-center gap-1 text-black/30 hover:text-black transition-colors duration-150 group`}
              >
                Visit site
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <Arrow />
                </span>
              </a>
            ) : null}
          </div>
          <p style={delay(1)} className={`rise ${body} text-black/30 mt-1`}>
            {item.kind}
          </p>
        </header>

        <p style={delay(2)} className={`rise ${body} mb-8`}>
          {item.summary}
        </p>

        <ViewTransition name={`work-cover-${item.slug}`} share="morph" default="none">
          {item.cover || item.mobile ? (
            <div className="mb-10 grid gap-6 tablet:grid-cols-[minmax(0,1fr)_auto] tablet:items-start">
              {item.cover ? (
                <Shot media={item.cover} priority />
              ) : (
                <div className="h-[300px] bg-black/[0.05]" />
              )}
              {item.mobile ? (
                <div style={delay(3)} className="rise">
                  <PhoneShot media={item.mobile} />
                </div>
              ) : null}
            </div>
          ) : (
            <div className="mb-10 h-[300px] bg-black/[0.05]" />
          )}
        </ViewTransition>

        <section style={delay(3)} className={`rise ${body} mb-10 space-y-5`}>
          {item.overview.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>

        {item.design?.length ? (
          <section style={delay(4)} className="rise mb-10">
            <h2 className={`${body} text-black/30 mb-3`}>Design</h2>
            <div className={`${body} space-y-5`}>
              {item.design.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        ) : null}

        {item.stack?.length ? (
          <p style={delay(4)} className={`rise ${body} text-black/30 mb-10`}>
            Built with {item.stack.join(", ")}.
          </p>
        ) : null}

        {item.gallery?.length ? (
          <section style={delay(5)} className="rise space-y-6">
            {item.gallery.map((media) => (
              <Shot key={media.src} media={media} />
            ))}
          </section>
        ) : null}
      </article>
    </div>
  );
}
