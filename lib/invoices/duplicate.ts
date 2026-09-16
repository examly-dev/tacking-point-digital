import { todayIsoInSydney, dueDateFromTerms, paymentTermIdFromDays } from "./dates";
import type { Invoice } from "./types";

export function duplicateInvoiceDraft(
  source: Invoice,
  nextInvoiceNumber: string,
  today = todayIsoInSydney(),
): Omit<Invoice, "id" | "createdAt" | "updatedAt"> {
  const dueDate = source.dueDateManual
    ? source.dueDate
    : dueDateFromTerms(today, source.paymentTermsDays);
  return {
    invoiceNumber: nextInvoiceNumber,
    client: { ...source.client },
    clientId: source.clientId ?? null,
    issueDate: today,
    dueDate,
    dueDateManual: source.dueDateManual,
    paymentTermsDays: source.paymentTermsDays,
    paymentTermId: paymentTermIdFromDays(source.paymentTermsDays, source.dueDateManual),
    reference: source.reference,
    items: source.items.map((item) => ({
      ...item,
      id: crypto.randomUUID(),
    })),
    status: "draft",
    notes: source.notes,
    currency: "AUD",
    supplier: {
      ...source.supplier,
      bank: { ...source.supplier.bank },
    },
  };
}
