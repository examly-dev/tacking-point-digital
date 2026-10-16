import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ContactIcons } from "@/components/ContactIcons";
import { mailto, site, tel } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Andy at ${site.name}, ${site.location}. Email, call, or send a message.`,
};

const body =
  "text-[15px] tablet:text-[14px] desktop:text-[16px] leading-[1.6] desktop:leading-[1.45] tracking-[-0.01em]";

const link =
  "underline decoration-rule underline-offset-[3px] hover:decoration-ink motion-safe:transition-colors motion-safe:duration-200";

export default function ContactPage() {
  return (
    <div className="p-5 tablet:p-8 desktop:p-10">
      <article className="max-w-[34rem]">
        <h1 className="text-[32px] font-bold leading-[1.05] tracking-[-0.04em] tablet:text-[40px]">
          Contact
        </h1>

        <div className={`${body} mt-6 space-y-5`}>
          <p>
            You can reach me at{" "}
            <a href={mailto} className={link}>
              {site.email}
            </a>{" "}
            or{" "}
            <a href={tel} className={link}>
              {site.phone}
            </a>
            .
          </p>
          <ContactIcons className="-ml-2" />
          <p className="text-muted">
            Or leave a message here and I will get back to you. No pitch, no
            obligation; just a chat about what you need.
          </p>
        </div>

        <div className="mt-10 border-t border-rule pt-8">
          <ContactForm />
        </div>
      </article>
    </div>
  );
}
