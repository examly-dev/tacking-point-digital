"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { calculateInvoiceTotals } from "@/lib/invoices/totals";
import { formatAuDate } from "@/lib/invoices/dates";
import { invoicePdfFilename } from "@/lib/invoices/filename";
import { effectiveStatus, statusLabel } from "@/lib/invoices/items";
import { formatAud } from "@/lib/invoices/money";
import type { Invoice } from "@/lib/invoices/types";
import { InvoiceShell } from "./InvoiceShell";
import { ghostButton, solidButton } from "./fields";

function downloadName(invoice: Invoice) {
  return invoicePdfFilename(invoice.invoiceNumber, invoice.client.name, invoice.supplier.tradingName);
}

export function InvoiceListClient({ invoices: initial }: { invoices: Invoice[] }) {
  const router = useRouter();
  const [invoices, setInvoices] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function create() {
    setBusy("new");
    setError("");
    try {
      const res = await fetch("/api/invoices", { method: "POST" });
      const json = (await res.json()) as { invoice?: Invoice; error?: string };
      if (!res.ok || !json.invoice) throw new Error(json.error || "Could not create invoice");
      router.push(`/invoices/${json.invoice.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create invoice");
      setBusy(null);
    }
  }

  async function duplicate(id: string) {
    setBusy(id);
    setError("");
    try {
      const res = await fetch(`/api/invoices/${id}/duplicate`, { method: "POST" });
      const json = (await res.json()) as { invoice?: Invoice; error?: string };
      if (!res.ok || !json.invoice) throw new Error(json.error || "Could not duplicate");
      router.push(`/invoices/${json.invoice.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not duplicate");
      setBusy(null);
    }
  }

  async function download(invoice: Invoice) {
    setBusy(`pdf-${invoice.id}`);
    setError("");
    try {
      const res = await fetch(`/api/invoices/${invoice.id}/pdf`);
      if (!res.ok) throw new Error("Could not download PDF");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = downloadName(invoice);
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not download PDF");
    } finally {
      setBusy(null);
    }
  }

  async function setStatus(invoice: Invoice, status: Invoice["status"]) {
    setBusy(`${status}-${invoice.id}`);
    setError("");
    try {
      const res = await fetch(`/api/invoices/${invoice.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const json = (await res.json()) as { invoice?: Invoice; error?: string };
      if (!res.ok || !json.invoice) throw new Error(json.error || "Could not update");
      setInvoices((current) => current.map((row) => (row.id === json.invoice!.id ? json.invoice! : row)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update");
    } finally {
      setBusy(null);
    }
  }

  async function remove(invoice: Invoice) {
    if (!window.confirm(`Delete ${invoice.invoiceNumber}? This cannot be undone.`)) return;
    setBusy(`del-${invoice.id}`);
    setError("");
    try {
      const res = await fetch(`/api/invoices/${invoice.id}`, { method: "DELETE" });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(json.error || "Could not delete");
      }
      setInvoices((current) => current.filter((row) => row.id !== invoice.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete");
    } finally {
      setBusy(null);
    }
  }

  return (
    <InvoiceShell
      actions={
        <button type="button" className={solidButton} onClick={create} disabled={busy === "new"}>
          New invoice
        </button>
      }
    >
      <div className="px-5 py-8 tablet:px-8 desktop:px-10">
        {error ? <p className="mb-4 text-[14px] text-black/60">{error}</p> : null}
        {invoices.length === 0 ? (
          <p className="max-w-[28rem] text-[15px] leading-[1.6] tablet:text-[14px] desktop:text-[16px]">
            No invoices yet. Create one when you have work to bill — website work,
            apps, retainers, whatever you are charging for.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[44rem] border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b border-black/10 text-[12px] text-black/40">
                  <th className="py-2 pr-4 font-medium">Invoice</th>
                  <th className="py-2 pr-4 font-medium">Client</th>
                  <th className="py-2 pr-4 font-medium">Issued</th>
                  <th className="py-2 pr-4 font-medium">Due</th>
                  <th className="py-2 pr-4 text-right font-medium">Amount</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                  <th className="py-2 font-medium"> </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => {
                  const status = effectiveStatus(invoice);
                  const totals = calculateInvoiceTotals(invoice.items, invoice.supplier.gstRegistered);
                  return (
                    <tr key={invoice.id} className="border-b border-black/10">
                      <td className="py-3 pr-4">
                        <Link href={`/invoices/${invoice.id}`} className="hover:opacity-50">
                          {invoice.invoiceNumber}
                        </Link>
                      </td>
                      <td className="py-3 pr-4">{invoice.client.name || "—"}</td>
                      <td className="py-3 pr-4 tabular-nums">{formatAuDate(invoice.issueDate)}</td>
                      <td className="py-3 pr-4 tabular-nums">{formatAuDate(invoice.dueDate)}</td>
                      <td className="py-3 pr-4 text-right tabular-nums">{formatAud(totals.totalCents)}</td>
                      <td className="py-3 pr-4 text-black/55">{statusLabel(status)}</td>
                      <td className="py-3">
                        <div className="flex flex-wrap justify-end gap-3">
                          <button
                            type="button"
                            className={ghostButton}
                            disabled={busy !== null}
                            onClick={() => download(invoice)}
                          >
                            PDF
                          </button>
                          <button
                            type="button"
                            className={ghostButton}
                            disabled={busy !== null}
                            onClick={() => duplicate(invoice.id)}
                          >
                            Duplicate
                          </button>
                          {status === "draft" ? (
                            <button
                              type="button"
                              className={ghostButton}
                              disabled={busy !== null}
                              onClick={() => setStatus(invoice, "sent")}
                            >
                              Mark sent
                            </button>
                          ) : null}
                          {status === "sent" || status === "overdue" ? (
                            <button
                              type="button"
                              className={ghostButton}
                              disabled={busy !== null}
                              onClick={() => setStatus(invoice, "paid")}
                            >
                              Mark paid
                            </button>
                          ) : null}
                          {status !== "cancelled" && status !== "paid" ? (
                            <button
                              type="button"
                              className={ghostButton}
                              disabled={busy !== null}
                              onClick={() => setStatus(invoice, "cancelled")}
                            >
                              Cancel
                            </button>
                          ) : null}
                          <button
                            type="button"
                            className={ghostButton}
                            disabled={busy !== null}
                            onClick={() => remove(invoice)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </InvoiceShell>
  );
}
