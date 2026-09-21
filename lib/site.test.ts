import { describe, expect, it } from "vitest";
import { fixedPriceOffer, intro } from "./site";

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
