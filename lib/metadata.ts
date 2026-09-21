import type { Metadata } from "next";
import { site, tel } from "./site";

export const defaultDescription =
  "Websites and web apps for businesses and professionals. Andy, web developer, Port Macquarie.";

/** Public URL for a site path. Trailing slashes match the GitHub Pages export. */
export function canonicalUrl(path = "/"): string {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalised, `${site.url}/`).toString();
}

export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title?: string;
  description: string;
}): Metadata {
  const canonical = canonicalUrl(path);
  const displayTitle = title ? `${title} — ${site.name}` : site.name;
  return {
    title: title ?? { absolute: site.name },
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_AU",
      siteName: site.name,
      title: displayTitle,
      description,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description,
    },
  };
}

export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: tel.replace(/^tel:/, ""),
    description: defaultDescription,
    image: `${site.url}/opengraph-image.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Port Macquarie",
      addressRegion: "NSW",
      addressCountry: "AU",
    },
    areaServed: ["Port Macquarie", "Mid North Coast", "New South Wales"],
    founder: {
      "@type": "Person",
      name: "Andy",
    },
  };
}
