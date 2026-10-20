import { NextResponse, type NextRequest } from "next/server";
import { CLIENT_SESSION_COOKIE, isClientSessionValid } from "@/lib/clients/auth";
import { INVOICE_SESSION_COOKIE, isInvoiceSessionValid } from "@/lib/invoices/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isInvoiceUi = pathname === "/invoices" || pathname.startsWith("/invoices/");
  const isInvoiceApi = pathname.startsWith("/api/invoices");
  const isClientUi = pathname === "/clients" || pathname.startsWith("/clients/");
  const isClientApi = pathname.startsWith("/api/clients");
  const isClientPreview = pathname === "/leap-type" || pathname.startsWith("/leap-type/");

  if (isInvoiceUi || isInvoiceApi) {
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

  if (isClientUi || isClientApi || isClientPreview) {
    if (pathname === "/clients/login" || pathname === "/api/clients/session") {
      return NextResponse.next();
    }
    if (isClientSessionValid(request.cookies.get(CLIENT_SESSION_COOKIE)?.value)) {
      return NextResponse.next();
    }
    if (isClientApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = request.nextUrl.clone();
    url.pathname = "/clients/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/invoices",
    "/invoices/:path*",
    "/api/invoices/:path*",
    "/clients",
    "/clients/:path*",
    "/api/clients/:path*",
    "/leap-type",
    "/leap-type/:path*",
  ],
};
