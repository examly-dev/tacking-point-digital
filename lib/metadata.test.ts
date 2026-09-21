import { describe, expect, it } from "vitest";
import { businessJsonLd, canonicalUrl, pageMetadata } from "./metadata";
import { site } from "./site";

describe("canonicalUrl", () => {
  it("resolves the homepage with a trailing slash", () => {
    expect(canonicalUrl("/")).toBe(`${site.url}/`);
  });

  it("keeps inner paths aligned with the static export", () => {
    expect(canonicalUrl("/about/")).toBe(`${site.url}/about/`);
    expect(canonicalUrl("/work/examly/")).toBe(`${site.url}/work/examly/`);
  });
});

describe("pageMetadata", () => {
  it("does not point every page at the homepage", () => {
    const about = pageMetadata({
      path: "/about/",
      title: "About",
      description: "Andy on the Mid North Coast.",
    });
    expect(about.alternates).toEqual({ canonical: `${site.url}/about/` });
    expect(about.openGraph?.title).toBe(`About — ${site.name}`);
    expect(about.openGraph?.url).toBe(`${site.url}/about/`);
    expect(about.twitter).toMatchObject({
      title: `About — ${site.name}`,
    });
    expect(about.title).toBe("About");
  });

  it("keeps the home document title as the business name", () => {
    const home = pageMetadata({
      path: "/",
      description: "Websites and web apps.",
    });
    expect(home.title).toEqual({ absolute: site.name });
    expect(home.alternates).toEqual({ canonical: `${site.url}/` });
    expect(home.openGraph?.url).toBe(`${site.url}/`);
  });
});

describe("businessJsonLd", () => {
  it("describes the live business with existing public details", () => {
    const data = businessJsonLd();
    expect(data["@type"]).toBe("ProfessionalService");
    expect(data.url).toBe(site.url);
    expect(data.email).toBe(site.email);
    expect(data.telephone).toBe("+61473950514");
    expect(data.address).toMatchObject({
      addressLocality: "Port Macquarie",
      addressRegion: "NSW",
    });
  });
});
