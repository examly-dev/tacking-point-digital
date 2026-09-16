export const INVOICE_STATUSES = ["draft", "sent", "paid", "overdue", "cancelled"] as const;
export type InvoiceStatus = (typeof INVOICE_STATUSES)[number];

export const INVOICE_UNITS = ["hours", "days", "items", "fixed"] as const;
export type InvoiceUnit = (typeof INVOICE_UNITS)[number];

export const INVOICE_CURRENCY = "AUD" as const;
export type InvoiceCurrency = typeof INVOICE_CURRENCY;

export const PAYMENT_TERM_PRESETS = [
  { id: "receipt", label: "Due on receipt", days: 0 },
  { id: "7", label: "7 days", days: 7 },
  { id: "14", label: "14 days", days: 14 },
  { id: "30", label: "30 days", days: 30 },
  { id: "custom", label: "Custom", days: null },
] as const;

export type PaymentTermId = (typeof PAYMENT_TERM_PRESETS)[number]["id"];

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unit: InvoiceUnit;
  unitPriceCents: number;
}

export interface InvoiceClient {
  name: string;
  contactName?: string;
  email?: string;
  abn?: string;
  address?: string;
}

export interface InvoiceBankDetails {
  accountName: string;
  bsb: string;
  accountNumber: string;
}

export interface InvoiceSupplier {
  tradingName: string;
  legalName: string;
  abn: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  gstRegistered: boolean;
  bank: InvoiceBankDetails;
}

export interface InvoiceBusinessProfile extends InvoiceSupplier {
  paymentTermsDays: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  client: InvoiceClient;
  clientId?: string | null;
  issueDate: string;
  dueDate: string;
  dueDateManual: boolean;
  paymentTermsDays: number;
  paymentTermId: PaymentTermId;
  reference?: string;
  items: InvoiceItem[];
  status: InvoiceStatus;
  notes?: string;
  currency: InvoiceCurrency;
  supplier: InvoiceSupplier;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceTotals {
  subtotalCents: number;
  gstCents: number;
  totalCents: number;
}

export interface InvoiceClientRecord extends InvoiceClient {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export function isInvoiceStatus(value: string): value is InvoiceStatus {
  return (INVOICE_STATUSES as readonly string[]).includes(value);
}

export function isInvoiceUnit(value: string): value is InvoiceUnit {
  return (INVOICE_UNITS as readonly string[]).includes(value);
}

export function isPaymentTermId(value: string): value is PaymentTermId {
  return PAYMENT_TERM_PRESETS.some((term) => term.id === value);
}
