import { describe, expect, it } from "vitest";
import { renderInvoicePdf } from "./render";
import type { Invoice } from "../types";

const invoice: Invoice = {
  id: "inv_pdf",
  invoiceNumber: "INV-2026-001",
  client: { name: "Harbourline" },
  issueDate: "2026-09-16",
  dueDate: "2026-09-30",
  dueDateManual: false,
  paymentTermsDays: 14,
  paymentTermId: "14",
  items: [
    {
      id: "item_1",
      description: "Website development and implementation",
      quantity: 4,
      unit: "hours",
      unitPriceCents: 7500,
    },
  ],
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
    bank: { accountName: "Andrew James Fong", bsb: "000-000", accountNumber: "12345678" },
  },
  createdAt: "2026-09-16T00:00:00.000Z",
  updatedAt: "2026-09-16T00:00:00.000Z",
};

describe("invoice PDF", () => {
  it("renders a PDF buffer", async () => {
    const buffer = await renderInvoicePdf(invoice);
    expect(buffer.subarray(0, 5).toString()).toBe("%PDF-");
    expect(buffer.length).toBeGreaterThan(500);
  });
});
