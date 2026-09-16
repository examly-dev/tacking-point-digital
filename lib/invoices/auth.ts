import { createHmac, timingSafeEqual } from "node:crypto";

export const INVOICE_SESSION_COOKIE = "tpd_invoices";

export type InvoiceAccessMode =
  | { type: "open" }
  | { type: "password"; key: string }
  | { type: "closed" };

export function invoiceAccessMode(
  env: NodeJS.Dict<string | undefined> = process.env,
): InvoiceAccessMode {
  const key = env.INVOICE_ACCESS_KEY?.trim() ?? "";
  if (key) return { type: "password", key };
  if (env.NODE_ENV !== "production") return { type: "open" };
  return { type: "closed" };
}

export function signInvoiceSession(secret: string): string {
  return createHmac("sha256", secret).update("tpd-invoice-ok").digest("hex");
}

export function invoiceSessionMatches(cookieValue: string | undefined, secret: string): boolean {
  if (!cookieValue) return false;
  const expected = signInvoiceSession(secret);
  const actual = cookieValue.trim();
  if (actual.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function isInvoiceSessionValid(
  cookieValue: string | undefined,
  env: NodeJS.Dict<string | undefined> = process.env,
): boolean {
  const mode = invoiceAccessMode(env);
  if (mode.type === "open") return true;
  if (mode.type === "closed") return false;
  return invoiceSessionMatches(cookieValue, mode.key);
}

export function passwordsMatch(input: string, secret: string): boolean {
  const a = Buffer.from(input);
  const b = Buffer.from(secret);
  if (a.length !== b.length) {
    timingSafeEqual(a, a);
    return false;
  }
  return timingSafeEqual(a, b);
}
