import type { PaymentTermId } from "./types";

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

export function parseIsoDate(isoDate: string): { year: number; month: number; day: number } {
  const match = ISO_DATE.exec(isoDate);
  if (!match) throw new RangeError(`Invalid ISO date: ${isoDate}`);
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const probe = new Date(year, month - 1, day);
  if (probe.getFullYear() !== year || probe.getMonth() !== month - 1 || probe.getDate() !== day) {
    throw new RangeError(`Invalid calendar date: ${isoDate}`);
  }
  return { year, month, day };
}

export function formatIsoDate(year: number, month: number, day: number): string {
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function addCalendarDays(isoDate: string, days: number): string {
  if (!Number.isInteger(days)) throw new RangeError("days must be an integer");
  const { year, month, day } = parseIsoDate(isoDate);
  const next = new Date(year, month - 1, day + days);
  return formatIsoDate(next.getFullYear(), next.getMonth() + 1, next.getDate());
}

export function formatAuDate(isoDate: string): string {
  const { year, month, day } = parseIsoDate(isoDate);
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

export function todayIsoInSydney(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Sydney",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function dueDateFromTerms(issueDate: string, termsDays: number): string {
  if (!Number.isInteger(termsDays) || termsDays < 0) {
    throw new RangeError("termsDays must be a non-negative integer");
  }
  return addCalendarDays(issueDate, termsDays);
}

export function paymentTermIdFromDays(days: number, dueDateManual: boolean): PaymentTermId {
  if (dueDateManual) return "custom";
  if (days === 0) return "receipt";
  if (days === 7 || days === 14 || days === 30) return String(days) as PaymentTermId;
  return "custom";
}

export function daysFromPaymentTermId(id: PaymentTermId): number | null {
  if (id === "custom") return null;
  if (id === "receipt") return 0;
  return Number(id);
}
