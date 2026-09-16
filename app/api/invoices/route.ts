import { NextResponse } from "next/server";
import { createInvoice, listInvoices } from "@/lib/invoices/store";
import { jsonError } from "@/lib/invoices/http";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const invoices = await listInvoices();
    return NextResponse.json({ invoices });
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST() {
  try {
    const invoice = await createInvoice();
    return NextResponse.json({ invoice }, { status: 201 });
  } catch (error) {
    return jsonError(error);
  }
}
