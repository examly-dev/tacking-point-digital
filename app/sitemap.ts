import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { pagedWork } from "@/lib/work";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about/", "/services/", "/contact/", ...pagedWork.map((item) => `/work/${item.slug}/`)];
  return paths.map((path) => ({
    url: new URL(path, `${site.url}/`).toString(),
    lastModified: new Date(),
  }));
}
