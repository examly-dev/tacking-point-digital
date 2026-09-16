/** Integer half-up division for non-negative amounts. */
export function divRound(numerator: number, denominator: number): number {
  if (!Number.isInteger(numerator) || !Number.isInteger(denominator)) {
    throw new RangeError("divRound requires integer cents arithmetic");
  }
  if (denominator <= 0) throw new RangeError("divRound denominator must be positive");
  if (numerator < 0) throw new RangeError("divRound does not accept negative amounts");
  return Math.trunc((numerator + Math.trunc(denominator / 2)) / denominator);
}

/** Quantity stored as a decimal; converted to hundredths before multiplying rates. */
export function quantityToHundredths(quantity: number): number {
  if (!Number.isFinite(quantity) || quantity < 0) {
    throw new RangeError("quantity must be a non-negative finite number");
  }
  return Math.round(quantity * 100);
}

export function calculateLineTotal(quantity: number, unitPriceCents: number): number {
  if (!Number.isInteger(unitPriceCents)) {
    throw new RangeError("unitPriceCents must be an integer");
  }
  if (unitPriceCents < 0) throw new RangeError("unitPriceCents must be non-negative");
  return divRound(quantityToHundredths(quantity) * unitPriceCents, 100);
}

export function dollarsToCents(dollars: number): number {
  if (!Number.isFinite(dollars) || dollars < 0) {
    throw new RangeError("dollars must be a non-negative finite number");
  }
  return Math.round(dollars * 100);
}

export function centsToDollars(cents: number): number {
  return cents / 100;
}

const AUD_FORMAT = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

export function formatAud(cents: number): string {
  return AUD_FORMAT.format(centsToDollars(cents));
}

export function parseAudToCents(input: string): number | null {
  const trimmed = input.trim().replace(/[$,\s]/g, "");
  if (!trimmed) return null;
  if (!/^\d+(\.\d{0,2})?$/.test(trimmed)) return null;
  const [whole, frac = ""] = trimmed.split(".");
  const cents = Number.parseInt(whole, 10) * 100 + Number.parseInt((frac + "00").slice(0, 2), 10);
  return Number.isFinite(cents) ? cents : null;
}
