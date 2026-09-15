import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { Arrow } from "@/components/Arrow";
import { CoverSwitch } from "@/components/CoverSwitch";
import { Lightbox } from "@/components/Lightbox";
import { Media } from "@/components/Media";
import { hasPreview } from "@/lib/preview";
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

function delay(step: number) {
  return { animationDelay: `${step * 60}ms` };
}

/** Portrait hero when there is no dedicated poster (same 180×236 DSS frame). */
function PhoneShot({ media, priority = false }: { media: WorkMedia; priority?: boolean }) {
  return (
    <figure className="bg-black/[0.05] p-4 tablet:p-8">
      <Lightbox media={media}>
        <div className="mx-auto flex aspect-[250/300] w-full max-w-[250px] items-center justify-center">
          <div className="relative aspect-[180/236] w-[180px] overflow-hidden border border-black/[0.03] bg-white">
            <Media media={media} priority={priority} sizes="180px" className="object-cover object-top" />
          </div>
        </div>
      </Lightbox>
      <figcaption className="mt-2.5 text-[13px] tablet:text-[12px] text-black/40">{media.alt}</figcaption>
    </figure>
  );
}

function Shot({ media, priority = false }: { media: WorkMedia; priority?: boolean }) {
  return (
    <figure className="bg-black/[0.05] p-3 tablet:p-6">
      <Lightbox media={media}>
        <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border border-black/[0.03] bg-white">
          <Media
            media={media}
            priority={priority}
            sizes="(min-width: 1250px) 720px, (min-width: 850px) calc(100vw - 340px), 100vw"
            className="object-contain"
          />
        </div>
      </Lightbox>
      <figcaption className="mt-2.5 text-[13px] tablet:text-[12px] text-black/40">{media.alt}</figcaption>
    </figure>
  );
}

function Stills({ stills }: { stills: WorkMedia[] }) {
  return (
    <section className="mt-8 grid grid-cols-2 gap-2 tablet:gap-3">
      {stills.map((media) => (
        <figure key={media.src} className="bg-black/[0.05] p-2 tablet:p-3">
          <Lightbox media={media}>
            <div className="relative aspect-[16/10] overflow-hidden border border-black/[0.03] bg-white">
              <Media
                media={media}
                sizes="(min-width: 1250px) 360px, (min-width: 850px) 40vw, 50vw"
                className="object-contain"
              />
            </div>
          </Lightbox>
          {media.alt ? (
            <figcaption className="mt-2 text-[12px] tablet:text-[11px] text-black/40">{media.alt}</figcaption>
          ) : null}
        </figure>
      ))}
    </section>
  );
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) notFound();

  const preview = hasPreview(slug);

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

        <div className="mb-10">
          <ViewTransition name={`work-cover-${item.slug}`} share="morph" default="none">
            {item.mobile ? (
              <CoverSwitch
                cover={item.cover}
                mobile={item.mobile}
                previewSlug={preview ? item.slug : undefined}
              />
            ) : item.cover ? (
              <PhoneShot media={item.cover} priority />
            ) : (
              <div className="h-[300px] bg-black/[0.05]" />
            )}
          </ViewTransition>
        </div>

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

        {item.stills?.length ? <Stills stills={item.stills} /> : null}

        {item.gallery?.length ? (
          <section style={delay(5)} className="rise mt-8 space-y-6">
            {item.gallery.map((media) => (
              <Shot key={media.src} media={media} />
            ))}
          </section>
        ) : null}
      </article>
    </div>
  );
}
