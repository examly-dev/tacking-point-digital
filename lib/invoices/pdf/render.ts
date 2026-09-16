import { renderToBuffer } from "@react-pdf/renderer";
import { createElement } from "react";
import type { Invoice } from "../types";
import { toInvoiceViewModel } from "../view-model";
import { InvoicePdfDocument } from "./InvoicePdfDocument";

export async function renderInvoicePdf(invoice: Invoice): Promise<Buffer> {
  const model = toInvoiceViewModel(invoice);
  const buffer = await renderToBuffer(
    createElement(InvoicePdfDocument, { model }) as Parameters<typeof renderToBuffer>[0],
  );
  return Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
}
