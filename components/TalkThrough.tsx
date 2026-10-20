import Link from "next/link";
import { mailto, site, tel } from "@/lib/site";

const link =
  "underline decoration-black/20 underline-offset-[3px] hover:decoration-black transition-colors duration-200";

/** Closing line: email, call, or go to the contact form on the Contact page. */
export function TalkThrough() {
  return (
    <p>
      Or, if you&apos;d rather talk something through,{" "}
      <a href={mailto} className={link}>
        email me
      </a>{" "}
      or call{" "}
      <a href={tel} className="hover:opacity-50 transition-opacity duration-200">
        {site.phone}
      </a>
      . Or{" "}
      <Link href="/contact" className={link}>
        use my contact form
      </Link>
      .
    </p>
  );
}
