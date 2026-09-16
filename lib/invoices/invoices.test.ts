import { describe, expect, it } from "vitest";
import { formatAbn, stripAbn, validateAbn } from "./abn";
import { invoiceAccessMode, invoiceSessionMatches, passwordsMatch, signInvoiceSession } from "./auth";
import { addCalendarDays, dueDateFromTerms, formatAuDate } from "./dates";
import { duplicateInvoiceDraft } from "./duplicate";
import { invoicePdfFilename } from "./filename";
import { effectiveStatus, moveItem, newInvoiceItem } from "./items";
import { calculateLineTotal, dollarsToCents, formatAud, parseAudToCents } from "./money";
import { nextInvoiceNumber, parseInvoiceNumber } from "./numbering";
import { supplierIdentityLine } from "./business";
import { calculateGST, calculateInvoiceTotals, calculateSubtotal, invoiceDocumentHeading } from "./totals";
import { toInvoiceViewModel } from "./view-model";
import type { Invoice } from "./types";

const SAMPLE_ITEM = {
  id: "item_1",
  description: "Website development and implementation",
  quantity: 4,
  unit: "hours" as const,
  unitPriceCents: 7500,
};

function sampleInvoice(overrides: Partial<Invoice> = {}): Invoice {
  return {
    id: "inv_1",
    invoiceNumber: "INV-2026-001",
    client: { name: "Harbourline" },
    issueDate: "2026-09-16",
    dueDate: "2026-09-30",
    dueDateManual: false,
    paymentTermsDays: 14,
    paymentTermId: "14",
    items: [{ ...SAMPLE_ITEM }],
    status: "draft",
    notes: "Thank you for your business.",
    currency: "AUD",
    supplier: {
      tradingName: "Tacking Point Digital",
      legalName: "Andrew James Fong",
      abn: "77124933069",
      email: "andy@tackingpointdigital.com.au",
      phone: "0473 950 514",
      website: "",
      address: "Port Macquarie, NSW",
      gstRegistered: false,
      bank: { accountName: "", bsb: "", accountNumber: "" },
    },
    createdAt: "2026-09-16T00:00:00.000Z",
    updatedAt: "2026-09-16T00:00:00.000Z",
    ...overrides,
  };
}

describe("invoice money", () => {
  it("calculates 4 × $75.00 = $300.00 in integer cents", () => {
    expect(dollarsToCents(75)).toBe(7500);
    expect(calculateLineTotal(4, 7500)).toBe(30000);
    expect(formatAud(30000)).toBe("$300.00");
  });

  it("keeps half-hour quantities in cents", () => {
    expect(calculateLineTotal(1.5, 7500)).toBe(11250);
  });

  it("parses Australian dollar input", () => {
    expect(parseAudToCents("$75.00")).toBe(7500);
    expect(parseAudToCents("1,200.50")).toBe(120050);
    expect(parseAudToCents("nope")).toBeNull();
  });
});

describe("invoice totals and GST", () => {
  it("subtotals a website development line", () => {
    expect(calculateSubtotal([SAMPLE_ITEM])).toBe(30000);
  });

  it("omits GST when not registered", () => {
    const totals = calculateInvoiceTotals([SAMPLE_ITEM], false);
    expect(totals).toEqual({ subtotalCents: 30000, gstCents: 0, totalCents: 30000 });
    expect(invoiceDocumentHeading(false)).toBe("INVOICE");
    expect(calculateGST(30000, false)).toBe(0);
  });

  it("adds 10% GST when registered", () => {
    const totals = calculateInvoiceTotals([SAMPLE_ITEM], true);
    expect(totals).toEqual({ subtotalCents: 30000, gstCents: 3000, totalCents: 33000 });
    expect(invoiceDocumentHeading(true)).toBe("TAX INVOICE");
  });

  it("rounds GST to the nearest cent with integer math", () => {
    expect(calculateGST(1, true)).toBe(0);
    expect(calculateGST(5, true)).toBe(1);
    expect(calculateGST(15, true)).toBe(2);
  });
});

describe("ABN", () => {
  it("validates the Tacking Point Digital ABN with the ABR modulus 89", () => {
    expect(stripAbn("77 124 933 069")).toBe("77124933069");
    expect(validateAbn("77 124 933 069")).toEqual({ ok: true, digits: "77124933069" });
    expect(formatAbn("77124933069")).toBe("77 124 933 069");
    expect(validateAbn("12345678901").ok).toBe(false);
  });
});

describe("dates", () => {
  it("formats Australian long dates and 14-day terms", () => {
    expect(formatAuDate("2026-09-16")).toBe("16 September 2026");
    expect(dueDateFromTerms("2026-09-16", 14)).toBe("2026-09-30");
    expect(dueDateFromTerms("2026-09-16", 0)).toBe("2026-09-16");
    expect(addCalendarDays("2026-12-20", 14)).toBe("2027-01-03");
  });
});

describe("invoice numbering", () => {
  it("allocates the next INV-YYYY-NNN for the year", () => {
    expect(nextInvoiceNumber([], 2026)).toBe("INV-2026-001");
    expect(nextInvoiceNumber(["INV-2026-001", "INV-2026-002"], 2026)).toBe("INV-2026-003");
    expect(nextInvoiceNumber(["INV-2025-099", "INV-2026-001"], 2026)).toBe("INV-2026-002");
    expect(parseInvoiceNumber("INV-2026-001")).toEqual({ year: 2026, sequence: 1 });
  });
});

describe("supplier identity", () => {
  it("states the sole trader trading as the ASIC business name", () => {
    expect(supplierIdentityLine("Andrew James Fong", "Tacking Point Digital")).toBe(
      "Andrew James Fong trading as Tacking Point Digital",
    );
    expect(toInvoiceViewModel(sampleInvoice()).legalName).toBe(
      "Andrew James Fong trading as Tacking Point Digital",
    );
  });
});

describe("filename", () => {
  it("builds a sanitised Tacking Point PDF name", () => {
    expect(invoicePdfFilename("INV-2026-001", "Harbourline")).toBe(
      "Tacking-Point-Digital-INV-2026-001-Harbourline.pdf",
    );
  });
});

describe("duplicate invoice", () => {
  it("assigns a new number and returns a draft without copying identity", () => {
    const copy = duplicateInvoiceDraft(sampleInvoice(), "INV-2026-002", "2026-09-20");
    expect(copy.invoiceNumber).toBe("INV-2026-002");
    expect(copy.status).toBe("draft");
    expect(copy.issueDate).toBe("2026-09-20");
    expect(copy.dueDate).toBe("2026-10-04");
    expect(copy.client.name).toBe("Harbourline");
    expect(copy.items[0]?.description).toBe("Website development and implementation");
    expect(copy.items[0]?.id).not.toBe(SAMPLE_ITEM.id);
  });
});

describe("line items helpers", () => {
  it("reorders items", () => {
    const a = newInvoiceItem({ description: "A" });
    const b = newInvoiceItem({ description: "B" });
    expect(moveItem([a, b], 1, 0).map((item) => item.description)).toEqual(["B", "A"]);
  });

  it("treats sent invoices past due as overdue", () => {
    expect(effectiveStatus({ status: "sent", dueDate: "2026-09-01" }, "2026-09-16")).toBe("overdue");
    expect(effectiveStatus({ status: "paid", dueDate: "2026-09-01" }, "2026-09-16")).toBe("paid");
  });
});

describe("invoice access", () => {
  it("is open in development when no key is set", () => {
    expect(invoiceAccessMode({ NODE_ENV: "development" })).toEqual({ type: "open" });
  });

  it("fails closed in production without a key", () => {
    expect(invoiceAccessMode({ NODE_ENV: "production" })).toEqual({ type: "closed" });
  });

  it("checks the password and signed cookie", () => {
    expect(passwordsMatch("secret", "secret")).toBe(true);
    expect(passwordsMatch("nope", "secret")).toBe(false);
    const token = signInvoiceSession("secret");
    expect(invoiceSessionMatches(token, "secret")).toBe(true);
    expect(invoiceSessionMatches("deadbeef", "secret")).toBe(false);
  });
});
