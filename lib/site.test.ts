import { describe, expect, it } from "vitest";
import { analyticsNote, fixedPriceOffer, intro, site } from "./site";

describe("fixedPriceOffer", () => {
  it("is the existing fixed-price sentence, not a beat-the-quote lead", () => {
    expect(fixedPriceOffer).toBe(
      "You tell me what you need and I give you a fixed price for the build.",
    );
  });

  it("sits in the public intro so home and chrome show it without opening Pricing", () => {
    expect(intro.join(" ")).toContain(fixedPriceOffer);
    expect(intro.join(" ").toLowerCase()).not.toMatch(/beat the quote/);
  });
});

describe("analyticsNote", () => {
  it("names Plausible and that there are no cookies", () => {
    expect(analyticsNote).toContain("Plausible");
    expect(analyticsNote.toLowerCase()).toContain("no cookies");
  });
});

describe("site.url", () => {
  it("is the live hostname Plausible should track", () => {
    expect(new URL(site.url).hostname).toBe("tackingpointdigital.com.au");
  });
});
