import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { CoverSwitch } from "@/components/CoverSwitch";
import { Lightbox } from "@/components/Lightbox";
import { Media } from "@/components/Media";
import { WorkPreview } from "@/components/SitePreview";
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

const body =
  "text-[15px] tablet:text-[14px] desktop:text-[16px] leading-[1.6] desktop:leading-[1.45] tracking-[-0.01em]";

function delay(step: number) {
  return { animationDelay: `${step * 60}ms` };
}

/** Portrait hero when there is no dedicated phone clip — same 390×844 well as CoverSwitch. */
function PhoneShot({ media, priority = false }: { media: WorkMedia; priority?: boolean }) {
  return (
    <figure className="bg-green p-4 tablet:p-8">
      <Lightbox media={media}>
        <div className="mx-auto w-full max-w-[300px]">
          <div className="relative aspect-[390/844] overflow-hidden border border-cream/10 bg-cream">
            <Media media={media} priority={priority} sizes="300px" className="object-contain" />
          </div>
        </div>
      </Lightbox>
      <figcaption className="mt-2.5 text-[13px] text-cream-muted tablet:text-[12px]">{media.alt}</figcaption>
    </figure>
  );
}

function Shot({ media, priority = false }: { media: WorkMedia; priority?: boolean }) {
  return (
    <figure className="bg-green p-3 tablet:p-6">
      <Lightbox media={media}>
        <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border border-cream/10 bg-cream">
          <Media
            media={media}
            priority={priority}
            sizes="(min-width: 1250px) 720px, (min-width: 850px) calc(100vw - 340px), 100vw"
            className="object-contain"
          />
        </div>
      </Lightbox>
      <figcaption className="mt-2.5 text-[13px] text-cream-muted tablet:text-[12px]">{media.alt}</figcaption>
    </figure>
  );
}

function Stills({ stills }: { stills: WorkMedia[] }) {
  return (
    <section className="mt-8 grid grid-cols-2 gap-2 tablet:gap-3">
      {stills.map((media) => (
        <figure key={media.src} className="bg-green p-2 tablet:p-3">
          <Lightbox media={media}>
            <div className="relative aspect-[16/10] overflow-hidden border border-cream/10 bg-cream">
              <Media
                media={media}
                sizes="(min-width: 1250px) 360px, (min-width: 850px) 40vw, 50vw"
                className="object-contain"
              />
            </div>
          </Lightbox>
          {media.alt ? (
            <figcaption className="mt-2 text-[12px] text-cream-muted tablet:text-[11px]">{media.alt}</figcaption>
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
          href="/work"
          style={delay(0)}
          className={`rise ${body} mb-4 inline-flex min-h-11 items-center gap-1 text-muted motion-safe:transition-colors motion-safe:duration-200 hover:text-ink active:text-ink tablet:mb-8 tablet:min-h-0`}
        >
          Work
        </Link>

        <WorkPreview slug={preview ? item.slug : undefined} name={item.name} kind={item.kind}>
          <p style={delay(2)} className={`rise ${body} mb-8`}>
            {item.summary}
          </p>

          <div className="mb-10">
            <ViewTransition name={`work-cover-${item.slug}`} share="morph" default="none">
              {item.mobile || item.mobileClip ? (
                <CoverSwitch
                  key={item.slug}
                  cover={item.cover}
                  mobile={item.mobileClip ?? item.mobile!}
                  mobileView={item.mobileView}
                />
              ) : item.cover ? (
                <PhoneShot media={item.cover} priority />
              ) : (
                <div className="h-[300px] bg-green" />
              )}
            </ViewTransition>
          </div>
        </WorkPreview>

        <section style={delay(3)} className={`rise ${body} mb-10 space-y-5`}>
          {item.overview.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>

        {item.design?.length ? (
          <section style={delay(4)} className="rise mb-10">
            <h2 className={`${body} mb-3 text-muted`}>Design</h2>
            <div className={`${body} space-y-5`}>
              {item.design.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        ) : null}

        {item.stack?.length ? (
          <p style={delay(4)} className={`rise ${body} mb-10 text-muted`}>
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
