import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  INVOICE_SESSION_COOKIE,
  invoiceAccessMode,
  passwordsMatch,
  signInvoiceSession,
} from "@/lib/invoices/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const mode = invoiceAccessMode();
  if (mode.type === "closed") {
    return NextResponse.json(
      { error: "Set INVOICE_ACCESS_KEY in .env to unlock invoices." },
      { status: 403 },
    );
  }
  if (mode.type === "open") {
    return NextResponse.json({ ok: true });
  }
  const body = (await request.json().catch(() => ({}))) as { password?: string };
  const password = typeof body.password === "string" ? body.password : "";
  if (!passwordsMatch(password, mode.key)) {
    return NextResponse.json({ error: "That password is not right." }, { status: 401 });
  }
  const store = await cookies();
  store.set(INVOICE_SESSION_COOKIE, signInvoiceSession(mode.key), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const store = await cookies();
  store.delete(INVOICE_SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
