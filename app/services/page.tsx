import type { Metadata } from "next";
import Link from "next/link";
import { Lighthouse } from "@/components/Lighthouse";
import { mailto, site, tel } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Bespoke websites, CMS and site builders, web and mobile apps, and updates to existing sites. Fixed-price builds, honest pricing.",
};

const body = "text-[15px] tablet:text-[14px] desktop:text-[16px] leading-[1.6] desktop:leading-[1.4]";
const link =
  "underline decoration-black/20 underline-offset-[3px] hover:decoration-black transition-colors duration-200";

function Section({
  n,
  title,
  step,
  children,
}: {
  n: string;
  title: string;
  step: number;
  children: React.ReactNode;
}) {
  return (
    <section
      className="rise grid gap-3 border-t border-black/10 py-8 first:border-t-0 first:pt-0 tablet:grid-cols-[11rem_1fr] tablet:gap-10"
      style={{ animationDelay: `${step * 60}ms` }}
    >
      <h2 className={`${body} font-medium`}>
        <span className="mr-3 tabular-nums text-black/30">{n}</span>
        {title}
      </h2>
      <div className={`${body} space-y-5 max-w-[34rem]`}>{children}</div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <div className="p-5 tablet:p-8 desktop:p-10">
      <article className="max-w-[52rem]">
        <Section n="01" title="Bespoke websites" step={0}>
          <p>
            Most of what I build is bespoke: designed and coded for you rather
            than adapted from a template. Good typography, a simple and elegant
            layout, fast to load, works properly on a phone, and nothing bolted
            on that you will never use.
          </p>
          <p>
            Under the hood that usually means Next.js and TypeScript, with
            Tailwind for the styling. It is the same stack I use for my own
            apps, and it keeps the site quick without much fuss.
          </p>
          <p>
            If you would like to change text and photos yourself, I add Sanity,
            a small content editor that lives in your browser, so those are
            yours to update without touching code.
          </p>
        </Section>

        <Section n="02" title="Platforms you can run yourself" step={1}>
          <p>
            If you would rather look after the site yourself, I will put it on
            a CMS you can actually use. WordPress is still a solid option.
            Framer and Webflow are better when the design needs more control.
            Squarespace if you want something simple. Shopify if you are
            selling. If you already have a preference, we can use that. I set
            it up properly, keep it uncluttered, make sure it works on a phone,
            and show you around. These
            usually come in cheaper than a bespoke build, depending on what you
            need, though the platform will charge its own monthly fee.
          </p>
          <p>
            After that, how much help you want is up to you. Some people never
            need me again. Others like me on hand for the odd change. Both are
            fine.
          </p>
        </Section>

        <Section n="03" title="Web and mobile apps" step={2}>
          <p>
            Beyond brochure sites I build web apps: booking and admin tools,
            dashboards, internal systems, and my own products{" "}
            <Link href="/work/examly" className={link}>
              Examly
            </Link>{" "}
            and{" "}
            <Link href="/work/accordion" className={link}>
              Accordion
            </Link>
            . These are full-stack builds: the interface, the server and the
            database, designed together and hosted as one piece. My usual stack
            is Next.js and TypeScript with a PostgreSQL database behind it,
            which is what Examly and Accordion run on. If you have an idea for a
            tool your business needs and nothing off the shelf quite fits, that
            is a conversation I would enjoy.
          </p>
          <p>
            I also build native apps for iPhone and Android, usually with React
            Native and Expo so the app and the website can share code. These
            are a bigger undertaking than a website, with app store reviews and
            updates to keep on top of, so we would talk through whether an app
            is really what you need first. Often a well-built web app does the
            job.
          </p>
        </Section>

        <Section n="04" title="Existing sites" step={3}>
          <p>
            Already have a site? I am happy to make updates, fix what is broken
            or give it a general tidy-up, as long as you can give me the right
            access.
          </p>
        </Section>

        <Section n="05" title="Pricing" step={4}>
          <p>
            Always reasonable, and I will usually beat the quote you already
            have. You tell me what you need, I give you a fixed price for the
            build, and that is what you pay.
          </p>
          <p>
            Hosting and your domain go through{" "}
            <a
              href="https://ventraip.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              VentraIP
            </a>
            , an Australian-owned host. You get a .com.au, the standard for an
            Australian business, and both are set up in your name at their
            normal price. I do not mark up the basics.
          </p>
          <p>
            Once the site is live, changes are billed at a competitive hourly
            rate.
          </p>
          <p>
            I am not one to upsell. I take pride in the work, and I would rather
            you had what you need than what pads out an invoice.
          </p>
        </Section>

        <div
          className="rise grid gap-3 border-t border-black/10 pt-8 tablet:grid-cols-[11rem_1fr] tablet:gap-10"
          style={{ animationDelay: "300ms" }}
        >
          <div aria-hidden className="hidden tablet:block" />
          <div className={`${body} max-w-[34rem] space-y-5`}>
            <p className="flex items-center gap-2 font-medium">
              <Lighthouse />
              {site.name}
            </p>
            <p>
              <a
                href={tel}
                className="hover:opacity-50 transition-opacity duration-200"
              >
                {site.phone}
              </a>
              <br />
              <a
                href={mailto}
                className="hover:opacity-50 transition-opacity duration-200"
              >
                {site.email}
              </a>
            </p>
            <p>
              Or{" "}
              <Link href="/contact" className={link}>
                send a message
              </Link>{" "}
              if you would like to talk something through.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
