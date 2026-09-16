import { NextResponse } from "next/server";
import { jsonError } from "@/lib/invoices/http";
import { listClients } from "@/lib/invoices/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const clients = await listClients();
    return NextResponse.json({ clients });
  } catch (error) {
    return jsonError(error);
  }
}
