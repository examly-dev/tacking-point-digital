import type { Invoice, InvoiceItem } from "./types";
import { formatAbn } from "./abn";
import { supplierIdentityLine } from "./business";
import { formatAuDate } from "./dates";
import { calculateLineTotal, formatAud } from "./money";
import { formatQuantity } from "./items";
import { calculateInvoiceTotals, invoiceDocumentHeading } from "./totals";

export type InvoiceViewLine = {
  id: string;
  description: string;
  quantityLabel: string;
  rateLabel: string;
  amountLabel: string;
};

export type InvoiceViewModel = {
  heading: "TAX INVOICE" | "INVOICE";
  tradingName: string;
  legalName: string;
  abnLabel: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  invoiceNumber: string;
  issueDateLabel: string;
  dueDateLabel: string;
  reference?: string;
  clientName: string;
  clientContactName?: string;
  clientEmail?: string;
  clientAbnLabel?: string;
  clientAddress?: string;
  lines: InvoiceViewLine[];
  gstRegistered: boolean;
  subtotalLabel: string;
  gstLabel: string;
  totalLabel: string;
  totalWithCurrency: string;
  notes: string;
  bankAccountName: string;
  bankBsb: string;
  bankAccountNumber: string;
};

function maybeAbn(value?: string): string {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return "";
  return formatAbn(trimmed);
}

function lineAmountCents(item: InvoiceItem): number {
  return item.unit === "fixed"
    ? item.unitPriceCents
    : calculateLineTotal(item.quantity, item.unitPriceCents);
}

export function toInvoiceViewModel(invoice: Invoice): InvoiceViewModel {
  const totals = calculateInvoiceTotals(invoice.items, invoice.supplier.gstRegistered);
  const lines: InvoiceViewLine[] = invoice.items.map((item) => ({
    id: item.id,
    description: item.description.trim() || "—",
    quantityLabel: formatQuantity(item),
    rateLabel: formatAud(item.unitPriceCents),
    amountLabel: formatAud(lineAmountCents(item)),
  }));
  const abn = maybeAbn(invoice.supplier.abn);
  const clientAbn = maybeAbn(invoice.client.abn);
  return {
    heading: invoiceDocumentHeading(invoice.supplier.gstRegistered),
    tradingName: invoice.supplier.tradingName || "Tacking Point Digital",
    legalName: supplierIdentityLine(
      invoice.supplier.legalName,
      invoice.supplier.tradingName || "Tacking Point Digital",
    ),
    abnLabel: abn ? `ABN ${abn}` : "",
    email: invoice.supplier.email.trim(),
    phone: invoice.supplier.phone.trim(),
    website: invoice.supplier.website.trim(),
    address: invoice.supplier.address.trim(),
    invoiceNumber: invoice.invoiceNumber,
    issueDateLabel: formatAuDate(invoice.issueDate),
    dueDateLabel: formatAuDate(invoice.dueDate),
    reference: invoice.reference?.trim() || undefined,
    clientName: invoice.client.name.trim() || "Client",
    clientContactName: invoice.client.contactName?.trim() || undefined,
    clientEmail: invoice.client.email?.trim() || undefined,
    clientAbnLabel: clientAbn ? `ABN ${clientAbn}` : undefined,
    clientAddress: invoice.client.address?.trim() || undefined,
    lines,
    gstRegistered: invoice.supplier.gstRegistered,
    subtotalLabel: formatAud(totals.subtotalCents),
    gstLabel: formatAud(totals.gstCents),
    totalLabel: formatAud(totals.totalCents),
    totalWithCurrency: `${formatAud(totals.totalCents)} AUD`,
    notes: invoice.notes?.trim() || "Thank you for your business.",
    bankAccountName: invoice.supplier.bank.accountName.trim(),
    bankBsb: invoice.supplier.bank.bsb.trim(),
    bankAccountNumber: invoice.supplier.bank.accountNumber.trim(),
  };
}
