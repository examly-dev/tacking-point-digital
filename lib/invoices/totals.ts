import { calculateLineTotal, divRound } from "./money";
import type { InvoiceItem, InvoiceTotals } from "./types";

export function calculateSubtotal(items: readonly InvoiceItem[]): number {
  let sum = 0;
  for (const item of items) {
    sum +=
      item.unit === "fixed"
        ? item.unitPriceCents
        : calculateLineTotal(item.quantity, item.unitPriceCents);
  }
  return sum;
}

export function calculateGST(subtotalCents: number, gstRegistered: boolean): number {
  if (!Number.isInteger(subtotalCents) || subtotalCents < 0) {
    throw new RangeError("subtotalCents must be a non-negative integer");
  }
  if (!gstRegistered) return 0;
  return divRound(subtotalCents, 10);
}

export function calculateInvoiceTotal(subtotalCents: number, gstCents: number): number {
  if (!Number.isInteger(subtotalCents) || !Number.isInteger(gstCents)) {
    throw new RangeError("totals must be integer cents");
  }
  if (subtotalCents < 0 || gstCents < 0) {
    throw new RangeError("totals must be non-negative");
  }
  return subtotalCents + gstCents;
}

export function calculateInvoiceTotals(
  items: readonly InvoiceItem[],
  gstRegistered: boolean,
): InvoiceTotals {
  const subtotalCents = calculateSubtotal(items);
  const gstCents = calculateGST(subtotalCents, gstRegistered);
  return {
    subtotalCents,
    gstCents,
    totalCents: calculateInvoiceTotal(subtotalCents, gstCents),
  };
}

export function invoiceDocumentHeading(gstRegistered: boolean): "TAX INVOICE" | "INVOICE" {
  return gstRegistered ? "TAX INVOICE" : "INVOICE";
}
