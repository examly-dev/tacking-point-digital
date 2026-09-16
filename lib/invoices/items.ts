import type { Invoice, InvoiceItem, InvoiceStatus } from "./types";
import { todayIsoInSydney } from "./dates";

export function newInvoiceItem(partial?: Partial<InvoiceItem>): InvoiceItem {
  return {
    id: crypto.randomUUID(),
    description: "",
    quantity: 1,
    unit: "hours",
    unitPriceCents: 0,
    ...partial,
  };
}

export function unitLabel(unit: InvoiceItem["unit"], quantity: number): string {
  if (unit === "fixed") return "";
  if (unit === "hours") return quantity === 1 ? "hr" : "hrs";
  if (unit === "days") return quantity === 1 ? "day" : "days";
  return quantity === 1 ? "item" : "items";
}

export function formatQuantity(item: InvoiceItem): string {
  if (item.unit === "fixed") return "—";
  const qty = Number.isInteger(item.quantity) ? String(item.quantity) : String(item.quantity);
  const label = unitLabel(item.unit, item.quantity);
  return label ? `${qty} ${label}` : qty;
}

export function effectiveStatus(
  invoice: Pick<Invoice, "status" | "dueDate">,
  today = todayIsoInSydney(),
): InvoiceStatus {
  if (invoice.status === "sent" && invoice.dueDate < today) return "overdue";
  return invoice.status;
}

export function statusLabel(status: InvoiceStatus): string {
  switch (status) {
    case "draft":
      return "Draft";
    case "sent":
      return "Sent";
    case "paid":
      return "Paid";
    case "overdue":
      return "Overdue";
    case "cancelled":
      return "Cancelled";
  }
}

export function moveItem<T>(items: readonly T[], from: number, to: number): T[] {
  if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) {
    return [...items];
  }
  const next = [...items];
  const [removed] = next.splice(from, 1);
  next.splice(to, 0, removed);
  return next;
}
