import { NextResponse } from "next/server";
import { jsonError } from "@/lib/invoices/http";
import { getBusiness, saveBusiness } from "@/lib/invoices/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const business = await getBusiness();
    return NextResponse.json({ business });
  } catch (error) {
    return jsonError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const bank = body.bank && typeof body.bank === "object" ? (body.bank as Record<string, unknown>) : undefined;
    const business = await saveBusiness({
      tradingName: typeof body.tradingName === "string" ? body.tradingName : undefined,
      legalName: typeof body.legalName === "string" ? body.legalName : undefined,
      abn: typeof body.abn === "string" ? body.abn : undefined,
      email: typeof body.email === "string" ? body.email : undefined,
      phone: typeof body.phone === "string" ? body.phone : undefined,
      website: typeof body.website === "string" ? body.website : undefined,
      address: typeof body.address === "string" ? body.address : undefined,
      gstRegistered: typeof body.gstRegistered === "boolean" ? body.gstRegistered : undefined,
      paymentTermsDays: typeof body.paymentTermsDays === "number" ? body.paymentTermsDays : undefined,
      bank: bank
        ? {
            accountName: typeof bank.accountName === "string" ? bank.accountName : "",
            bsb: typeof bank.bsb === "string" ? bank.bsb : "",
            accountNumber: typeof bank.accountNumber === "string" ? bank.accountNumber : "",
          }
        : undefined,
    });
    return NextResponse.json({ business });
  } catch (error) {
    return jsonError(error);
  }
}
