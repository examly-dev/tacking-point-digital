import type { Metadata } from "next";
import { TalkThrough } from "@/components/TalkThrough";
import { Lighthouse } from "@/components/Lighthouse";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Andy at ${site.name}, ${site.location}. Email, call, or send a message.`,
};

const body = "text-[15px] tablet:text-[14px] desktop:text-[16px] leading-[1.6] desktop:leading-[1.4]";

export default function ContactPage() {
  return (
    <div className="p-5 tablet:p-8 desktop:p-10">
      <article className="max-w-[34rem]">
        <div className={`${body} space-y-5`}>
          <p className="rise flex items-center gap-2 font-medium">
            <Lighthouse />
            {site.name}
          </p>
          <div className="rise" style={{ animationDelay: "60ms" }}>
            <TalkThrough />
          </div>
        </div>
      </article>
    </div>
  );
}
