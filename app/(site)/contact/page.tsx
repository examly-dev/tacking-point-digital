import { ContactForm } from "@/components/ContactForm";
import { Lighthouse } from "@/components/Lighthouse";
import { pageMetadata } from "@/lib/metadata";
import { mailto, site, tel } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/contact/",
  title: "Contact",
  description: `Get in touch with Andy at ${site.name}, ${site.location}. Email, call, or send a message.`,
});

const body = "text-[15px] tablet:text-[14px] desktop:text-[16px] leading-[1.6] desktop:leading-[1.4]";

export default function ContactPage() {
  return (
    <div className="p-5 tablet:p-8 desktop:p-10">
      <article className="max-w-[34rem]">
        <h1 className="sr-only">Contact</h1>
        <div className={`${body} space-y-5`}>
          <p className="rise flex items-center gap-2 font-medium">
            <Lighthouse />
            {site.name}
          </p>
          <p className="rise" style={{ animationDelay: "60ms" }}>
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
          <p className="rise" style={{ animationDelay: "120ms" }}>
            Or leave a message here and I will get back to you. No pitch, no
            obligation; just a chat about what you need.
          </p>
        </div>

        <div
          className="rise mt-10 border-t border-black/10 pt-8"
          style={{ animationDelay: "180ms" }}
        >
          <ContactForm />
        </div>
      </article>
    </div>
  );
}
