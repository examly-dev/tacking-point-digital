import type { Metadata } from "next";
import Link from "next/link";
import { TalkThrough } from "@/components/TalkThrough";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Bespoke websites, CMS and site builders, updates to existing sites, web and mobile apps, and automation. Fixed-price builds, honest pricing.",
};

const body =
  "text-[15px] tablet:text-[14px] desktop:text-[16px] leading-[1.6] desktop:leading-[1.45] tracking-[-0.01em]";

const link =
  "underline decoration-rule underline-offset-[3px] hover:decoration-ink motion-safe:transition-colors motion-safe:duration-200";

function Section({
  id,
  title,
  step,
  children,
}: {
  id: string;
  title: string;
  step: number;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="rise grid gap-3 border-t border-rule py-8 first:border-t-0 first:pt-0 tablet:grid-cols-[11rem_1fr] tablet:gap-10"
      style={{ animationDelay: `${step * 60}ms` }}
    >
      <h2 className={`${body} font-bold tracking-[-0.02em]`}>{title}</h2>
      <div className={`${body} max-w-[34rem] space-y-5`}>{children}</div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <div className="p-5 tablet:p-8 desktop:p-10">
      <article className="max-w-[52rem]">
        <h1 className="mb-10 text-[32px] font-bold leading-[1.05] tracking-[-0.04em] tablet:text-[40px]">
          Services
        </h1>

        <Section id="bespoke" title="Bespoke websites" step={1}>
          <p>
            Most of what I build is bespoke: designed and coded for you. Good
            typography, a simple layout, fast, works properly on a phone. I
            keep it to what you will actually use.
          </p>
          <p>
            If you want to edit text and photos yourself, I add Sanity, a small
            editor in your browser, so you can do that without touching code.
          </p>
        </Section>

        <Section id="platforms" title="Platforms you can run yourself" step={2}>
          <p>
            If you would rather look after the site yourself, I will put it on a
            platform you can run. There is a reason WordPress, Squarespace,
            Framer, Webflow and Shopify are still so popular: they work well as
            CMSs, and I respect that. WordPress for a lot of everyday sites.
            Framer or Webflow when the design needs more control. Squarespace
            for something simple. Shopify if you are selling. Or whatever you
            already prefer. I set it up cleanly, make sure it works on a phone,
            and show you around. Usually cheaper than a custom build, though
            the platform charges its own monthly fee.
          </p>
          <p>
            After that, help is optional: some people never need me again,
            others like me on hand for the odd change.
          </p>
        </Section>

        <Section id="existing" title="Existing sites" step={3}>
          <p>
            If you already have a site and just want updates or extra
            functionality, I do that at a reasonable hourly rate. All I need is
            the right access. I will not try to sell you a redesign.
          </p>
        </Section>

        <Section id="apps" title="Web and mobile apps" step={4}>
          <p>
            Alongside the websites, I build web apps: booking and admin tools,
            dashboards, internal systems, and my own product{" "}
            <Link href="/work/examly" className={link}>
              Examly
            </Link>
            . Full-stack builds, interface, server and database designed
            together, usually on Next.js, TypeScript and PostgreSQL. If nothing
            off the shelf quite fits what you need, that is a conversation I
            would enjoy.
          </p>
          <p>
            I also build native iPhone and Android apps with React Native and
            Expo, sharing code with the website. That is a bigger undertaking,
            with app store reviews and updates to keep on top of, so we would
            first talk through whether you really need one. Often a web app
            does the job.
          </p>
        </Section>

        <Section id="automation" title="Automation" step={5}>
          <p>
            I can help with the repeating parts of a business: moving
            information between your existing tools, drafting from your own
            data, chasing things stuck in someone&apos;s inbox. I use n8n and
            language models where they actually fit, and I will be straight
            about what is possible and what is theatre. Better over a coffee
            than in a proposal.
          </p>
        </Section>

        <Section id="pricing" title="Pricing" step={6}>
          <p>
            Always reasonable, and I will usually beat the quote you already
            have. You tell me what you need and I give you a fixed price for
            the build.
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
            , an Australian-owned host: a .com.au in your name at their normal
            price. I do not mark up the basics.
          </p>
          <p>Once live, changes are at a competitive hourly rate.</p>
          <p>
            I can set up company email, Google Workspace, newsletters and the
            like. You pay the platform at its normal rate, plus the time it
            takes me to set it up.
          </p>
          <p>
            I am not one to upsell. I take pride in the work and would rather
            you had what you need than what pads out an invoice.
          </p>
        </Section>

        <div
          className="rise border-t border-rule pt-8"
          style={{ animationDelay: "420ms" }}
        >
          <div className={`${body} max-w-[34rem]`}>
            <TalkThrough />
          </div>
        </div>
      </article>
    </div>
  );
}
