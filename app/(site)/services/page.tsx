import type { Metadata } from "next";
import { ServiceAccordion, type Service } from "@/components/ServiceAccordion";
import {
  AppsIcon,
  AutomationIcon,
  PricingIcon,
  SelfManagedIcon,
  UpdatesIcon,
  WebsiteIcon,
} from "@/components/ServiceIcons";
import { TackingPoint } from "@/components/TackingPoint";
import { TalkThrough } from "@/components/TalkThrough";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom websites, sites you can run yourself, updates to existing sites, web and phone apps, and automation. Fixed-price builds and fair hourly rates.",
};

const body = "text-[15px] tablet:text-[14px] desktop:text-[16px] leading-[1.6] desktop:leading-[1.4]";

const services: Service[] = [
  {
    id: "custom",
    title: "Custom websites",
    summary: "Designed and built for your business.",
    icon: <WebsiteIcon />,
    body: [
      "A site designed from scratch around your business. Quick to load, clean to look at, and properly at home on a phone. Only what you will actually use.",
      "If you would like to change the text and photos yourself, I will set that up so you can, with no code involved.",
    ],
  },
  {
    id: "self-managed",
    title: "Sites you can run yourself",
    summary: "Set up on a website builder you can manage.",
    icon: <SelfManagedIcon />,
    body: [
      "If you would rather look after the site yourself, I will set it up on a well-known website builder that suits you, from a simple site to an online shop.",
      "It is usually cheaper to build, though the builder charges its own monthly fee. I will show you around, and I am on hand afterwards if you need me.",
    ],
  },
  {
    id: "updates",
    title: "Updates and fixes",
    summary: "Changes to the site you already have.",
    icon: <UpdatesIcon />,
    body: [
      "Already have a site? I will make changes, fix what is broken and add what is missing, at a fair hourly rate. All I need is access.",
      "I will not try to sell you a redesign.",
    ],
  },
  {
    id: "apps",
    title: "Web and phone apps",
    summary: "Booking, dashboards, portals and tools.",
    icon: <AppsIcon />,
    body: [
      "For when nothing off the shelf quite fits: booking systems, dashboards, client portals and internal tools, built around how you work.",
      "Phone apps too, though we would talk first about whether you need one. Often a web app does the job.",
    ],
  },
  {
    id: "automation",
    title: "Automation",
    summary: "Less time on repetitive admin.",
    icon: <AutomationIcon />,
    body: [
      "Getting the tools you already use to talk to each other, so details stop being typed in twice and things stop getting stuck in inboxes.",
      "I will be straight about what is worth automating and what is not. Better over a coffee than in a proposal.",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="p-5 tablet:p-8 desktop:p-10">
      <article className="max-w-[44rem]">
        <ServiceAccordion services={services} />

        {/* Same row as the accordion, always open: the price promise should not hide. */}
        <section
          className="rise border-y border-black/10"
          style={{ animationDelay: "320ms" }}
          aria-labelledby="pricing"
        >
          <div className="flex items-center gap-4 py-5 tablet:gap-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/[0.05] text-black/70">
              <PricingIcon />
            </span>
            <span className="min-w-0 flex-1">
              <h2 id="pricing" className={`${body} font-medium text-black`}>
                Pricing
              </h2>
              <span className={`${body} block text-black/40`}>
                Fixed, fair, and usually under your current quote.
              </span>
            </span>
          </div>
          <div className={`${body} max-w-[34rem] space-y-4 pb-6 pl-14 tablet:pl-[3.75rem]`}>
            <p>
              A fixed price for the build, agreed before I start. I will
              usually beat the quote you already have.
            </p>
            <p>
              Your domain and hosting are in your name with an Australian
              host, at their normal price. I do not mark them up. After launch,
              changes are at a fair hourly rate.
            </p>
            <p>
              I would rather you had what you need than what pads out an
              invoice.
            </p>
          </div>
        </section>

        <div
          className={`rise ${body} max-w-[34rem] space-y-5 pt-8 pl-14 tablet:pl-[3.75rem]`}
          style={{ animationDelay: "380ms" }}
        >
          <p className="flex items-center gap-2 font-medium">
            <TackingPoint />
            {site.name}
          </p>
          <TalkThrough />
        </div>
      </article>
    </div>
  );
}
