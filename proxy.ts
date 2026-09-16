import { NextResponse, type NextRequest } from "next/server";
import { INVOICE_SESSION_COOKIE, isInvoiceSessionValid } from "@/lib/invoices/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isInvoiceUi = pathname === "/invoices" || pathname.startsWith("/invoices/");
  const isInvoiceApi = pathname.startsWith("/api/invoices");
  if (!isInvoiceUi && !isInvoiceApi) return NextResponse.next();

  if (pathname === "/invoices/login" || pathname === "/api/invoices/session") {
    return NextResponse.next();
  }

  if (isInvoiceSessionValid(request.cookies.get(INVOICE_SESSION_COOKIE)?.value)) {
    return NextResponse.next();
  }

  if (isInvoiceApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = request.nextUrl.clone();
  url.pathname = "/invoices/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/invoices", "/invoices/:path*", "/api/invoices/:path*"],
};
