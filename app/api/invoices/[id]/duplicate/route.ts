import { NextResponse } from "next/server";
import { jsonError } from "@/lib/invoices/http";
import { duplicateInvoice } from "@/lib/invoices/store";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function POST(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const invoice = await duplicateInvoice(id);
    return NextResponse.json({ invoice }, { status: 201 });
  } catch (error) {
    return jsonError(error);
  }
}
