import { NextResponse } from "next/server";
import { invoicePdfFilename } from "@/lib/invoices/filename";
import { jsonError } from "@/lib/invoices/http";
import { renderInvoicePdf } from "@/lib/invoices/pdf/render";
import { getInvoice } from "@/lib/invoices/store";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const invoice = await getInvoice(id);
    if (!invoice) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    const buffer = await renderInvoicePdf(invoice);
    const filename = invoicePdfFilename(
      invoice.invoiceNumber,
      invoice.client.name,
      invoice.supplier.tradingName,
    );
    return new NextResponse(Uint8Array.from(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    return jsonError(error);
  }
}
