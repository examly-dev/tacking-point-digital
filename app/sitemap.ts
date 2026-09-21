import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/metadata";
import { work } from "@/lib/work";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about/", "/services/", "/contact/", ...work.map((item) => `/work/${item.slug}/`)];
  return paths.map((path) => ({
    url: canonicalUrl(path),
  }));
}
