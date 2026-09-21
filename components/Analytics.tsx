import Script from "next/script";
import { site } from "@/lib/site";

const domain =
  process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? new URL(site.url).hostname;

/**
 * Cookie-free page views for the public site. Omit in development so localhost
 * does not hit Plausible. Create the site in Plausible for this domain or no
 * stats will appear.
 */
export function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;
  if (process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN === "") return null;

  return (
    <Script
      defer
      src="https://plausible.io/js/script.js"
      data-domain={domain}
      strategy="afterInteractive"
    />
  );
}
