import { NextResponse } from "next/server";
import { jsonError } from "@/lib/invoices/http";
import { deleteInvoice, getInvoice, updateInvoice } from "@/lib/invoices/store";
import { isInvoiceStatus, isPaymentTermId } from "@/lib/invoices/types";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const invoice = await getInvoice(id);
    if (!invoice) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    return NextResponse.json({ invoice });
  } catch (error) {
    return jsonError(error);
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = (await request.json()) as Record<string, unknown>;
    if (body.status !== undefined && typeof body.status === "string" && !isInvoiceStatus(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    if (
      body.paymentTermId !== undefined &&
      typeof body.paymentTermId === "string" &&
      !isPaymentTermId(body.paymentTermId)
    ) {
      return NextResponse.json({ error: "Invalid payment terms" }, { status: 400 });
    }
    const invoice = await updateInvoice(id, {
      invoiceNumber: typeof body.invoiceNumber === "string" ? body.invoiceNumber : undefined,
      client: body.client && typeof body.client === "object" ? (body.client as never) : undefined,
      clientId: body.clientId === null || typeof body.clientId === "string" ? body.clientId : undefined,
      issueDate: typeof body.issueDate === "string" ? body.issueDate : undefined,
      dueDate: typeof body.dueDate === "string" ? body.dueDate : undefined,
      dueDateManual: typeof body.dueDateManual === "boolean" ? body.dueDateManual : undefined,
      paymentTermId: typeof body.paymentTermId === "string" && isPaymentTermId(body.paymentTermId)
        ? body.paymentTermId
        : undefined,
      paymentTermsDays: typeof body.paymentTermsDays === "number" ? body.paymentTermsDays : undefined,
      reference: typeof body.reference === "string" ? body.reference : undefined,
      items: Array.isArray(body.items) ? (body.items as never) : undefined,
      notes: typeof body.notes === "string" ? body.notes : undefined,
      status: typeof body.status === "string" && isInvoiceStatus(body.status) ? body.status : undefined,
      saveClient: Boolean(body.saveClient),
    });
    return NextResponse.json({ invoice });
  } catch (error) {
    return jsonError(error);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    await deleteInvoice(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return jsonError(error);
  }
}
