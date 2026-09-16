import type { Metadata } from "next";
import Link from "next/link";
import { Lighthouse } from "@/components/Lighthouse";
import { TalkThrough } from "@/components/TalkThrough";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Bespoke websites, CMS and site builders, web and mobile apps, updates to existing sites, and automation. Fixed-price builds, honest pricing.",
};

const body = "text-[15px] tablet:text-[14px] desktop:text-[16px] leading-[1.6] desktop:leading-[1.4]";
const link =
  "underline decoration-black/20 underline-offset-[3px] hover:decoration-black transition-colors duration-200";

function Section({
  title,
  step,
  children,
}: {
  title: string;
  step: number;
  children: React.ReactNode;
}) {
  return (
    <section
      className="rise grid gap-3 border-t border-black/10 py-8 first:border-t-0 first:pt-0 tablet:grid-cols-[11rem_1fr] tablet:gap-10"
      style={{ animationDelay: `${step * 60}ms` }}
    >
      <h2 className={`${body} font-medium`}>{title}</h2>
      <div className={`${body} space-y-5 max-w-[34rem]`}>{children}</div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <div className="p-5 tablet:p-8 desktop:p-10">
      <article className="max-w-[52rem]">
        <Section title="Bespoke websites" step={0}>
          <p>
            Most of what I build is designed and coded for you. Careful type, a
            simple layout, quick to load, and comfortable on a phone, without
            extras you will not use.
          </p>
          <p>
            If you want to edit text and photos yourself, I add Sanity, a small
            editor in your browser, so you can do that without touching code.
          </p>
        </Section>

        <Section title="Platforms you can run yourself" step={1}>
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

        <Section title="Web and mobile apps" step={2}>
          <p>
            Alongside the websites, I build web apps: booking and admin tools,
            dashboards, internal systems, and my own products{" "}
            <Link href="/work/examly" className={link}>
              Examly
            </Link>{" "}
            and{" "}
            <Link href="/work/accordion" className={link}>
              Accordion
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

        <Section title="Existing sites" step={3}>
          <p>
            If you already have a site and just want updates or extra
            functionality, I do that at a reasonable hourly rate. All I need is
            the right access. I will not try to sell you a redesign.
          </p>
        </Section>

        <Section title="Automation" step={4}>
          <p>
            I can help with the repeating parts of a business: moving
            information between your existing tools, drafting from your own
            data, chasing things stuck in someone&apos;s inbox. I use n8n and
            language models where they actually fit, and I will be straight
            about what is possible and what is theatre. Better over a coffee
            than in a proposal.
          </p>
        </Section>

        <Section title="Pricing" step={5}>
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
          <p>
            Once live, changes are at a competitive hourly rate, the same as
            for a site you already have. Company email, Google Workspace,
            newsletters and the like: the platform at its normal price, usually
            not much, plus my time at that rate.
          </p>
          <p>
            I am not one to upsell. I take pride in the work and would rather
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
            <TalkThrough />
          </div>
        </div>
      </article>
    </div>
  );
}
