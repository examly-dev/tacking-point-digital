"use client";

import type { Invoice } from "@/lib/invoices/types";
import { toInvoiceViewModel } from "@/lib/invoices/view-model";

export function InvoiceDocumentPreview({ invoice }: { invoice: Invoice }) {
  const model = toInvoiceViewModel(invoice);
  return (
    <article
      className="box-border aspect-[210/297] w-full bg-white px-[8%] py-[8%] text-black"
      aria-label={`${model.heading} preview`}
    >
      <header className="mb-8 flex items-start justify-between gap-8">
        <div className="max-w-[16rem]">
          <p className="mb-2.5 text-[15px] tracking-[-0.01em]">{model.tradingName}</p>
          {model.legalName ? <p className="text-[11px] leading-[1.45] text-black/55">{model.legalName}</p> : null}
          {model.abnLabel ? <p className="text-[11px] leading-[1.45] text-black/55">{model.abnLabel}</p> : null}
          {model.address ? <p className="text-[11px] leading-[1.45] text-black/55">{model.address}</p> : null}
          {model.email ? <p className="text-[11px] leading-[1.45] text-black/55">{model.email}</p> : null}
          {model.phone ? <p className="text-[11px] leading-[1.45] text-black/55">{model.phone}</p> : null}
          {model.website ? <p className="text-[11px] leading-[1.45] text-black/55">{model.website}</p> : null}
        </div>
        <div className="text-right">
          <p className="mb-2.5 text-[12px] tracking-[0.14em]">{model.heading}</p>
          <p className="mb-0.5 text-[12px]">{model.invoiceNumber}</p>
          <p className="text-[11px] leading-[1.45] text-black/55">{model.issueDateLabel}</p>
          <p className="text-[11px] leading-[1.45] text-black/55">Due {model.dueDateLabel}</p>
          {model.reference ? (
            <p className="text-[11px] leading-[1.45] text-black/55">{model.reference}</p>
          ) : null}
        </div>
      </header>

      <div>
        <p className="mb-1.5 text-[10px] tracking-[0.12em] text-black/40">Bill to</p>
        <p className="text-[14px]">{model.clientName}</p>
        {model.clientContactName ? (
          <p className="text-[11px] leading-[1.45] text-black/55">{model.clientContactName}</p>
        ) : null}
        {model.clientAbnLabel ? (
          <p className="text-[11px] leading-[1.45] text-black/55">{model.clientAbnLabel}</p>
        ) : null}
        {model.clientAddress ? (
          <p className="whitespace-pre-line text-[11px] leading-[1.45] text-black/55">
            {model.clientAddress}
          </p>
        ) : null}
        {model.clientEmail ? (
          <p className="text-[11px] leading-[1.45] text-black/55">{model.clientEmail}</p>
        ) : null}
      </div>

      <table className="mt-8 w-full border-collapse text-[11px]">
        <thead>
          <tr className="border-b border-black/10 text-left text-[10px] tracking-[0.08em] text-black/40">
            <th className="pb-1.5 font-medium">Description</th>
            <th className="w-[14%] pb-1.5 text-right font-medium">Qty</th>
            <th className="w-[19%] pb-1.5 text-right font-medium">Rate</th>
            <th className="w-[19%] pb-1.5 text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {model.lines.map((line) => (
            <tr key={line.id} className="border-b border-black/10 align-top">
              <td className="py-2 pr-3 leading-[1.4]">{line.description}</td>
              <td className="py-2 text-right tabular-nums">{line.quantityLabel}</td>
              <td className="py-2 text-right tabular-nums">{line.rateLabel}</td>
              <td className="py-2 text-right tabular-nums">{line.amountLabel}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ml-auto mt-5 w-[13rem] text-[11px] tabular-nums">
        {model.gstRegistered ? (
          <>
            <div className="flex justify-between py-0.5 text-black/55">
              <span>Subtotal</span>
              <span>{model.subtotalLabel}</span>
            </div>
            <div className="flex justify-between py-0.5 text-black/55">
              <span>GST (10%)</span>
              <span>{model.gstLabel}</span>
            </div>
          </>
        ) : null}
        <div className="mt-1.5 flex justify-between border-t border-black pt-2 text-[12px]">
          <span>Total</span>
          <span>{model.totalWithCurrency}</span>
        </div>
        {model.gstRegistered ? null : (
          <p className="mt-1 text-right text-[10px] text-black/40">GST not applicable</p>
        )}
      </div>

      <footer className="mt-10 border-t border-black/10 pt-4">
        <p className="mb-3 text-[10px] tracking-[0.12em] text-black/40">Payment details</p>
        <div className="grid grid-cols-3 gap-4 text-[11px]">
          <div>
            <p className="mb-1 text-[10px] tracking-[0.08em] text-black/40">Account name</p>
            <p>{model.bankAccountName || "—"}</p>
          </div>
          <div>
            <p className="mb-1 text-[10px] tracking-[0.08em] text-black/40">BSB</p>
            <p className="tabular-nums">{model.bankBsb || "—"}</p>
          </div>
          <div>
            <p className="mb-1 text-[10px] tracking-[0.08em] text-black/40">Account number</p>
            <p className="tabular-nums">{model.bankAccountNumber || "—"}</p>
          </div>
        </div>
        <p className="mt-5 text-[11px] text-black/55">{model.notes}</p>
      </footer>
    </article>
  );
}
