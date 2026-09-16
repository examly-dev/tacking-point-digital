import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { work } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about/", "/services/", "/contact/", ...work.map((item) => `/work/${item.slug}/`)];
  return paths.map((path) => ({
    url: new URL(path, `${site.url}/`).toString(),
    lastModified: new Date(),
  }));
}
