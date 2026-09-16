"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { daysFromPaymentTermId, dueDateFromTerms } from "@/lib/invoices/dates";
import { invoicePdfFilename } from "@/lib/invoices/filename";
import { moveItem, newInvoiceItem, statusLabel } from "@/lib/invoices/items";
import { formatAud, parseAudToCents } from "@/lib/invoices/money";
import { calculateInvoiceTotals } from "@/lib/invoices/totals";
import type {
  Invoice,
  InvoiceClientRecord,
  InvoiceItem,
  InvoiceStatus,
  InvoiceUnit,
  PaymentTermId,
} from "@/lib/invoices/types";
import { PAYMENT_TERM_PRESETS } from "@/lib/invoices/types";
import { InvoiceDocumentPreview } from "./InvoiceDocumentPreview";
import { InvoiceShell } from "./InvoiceShell";
import { fieldInput, fieldLabel, fieldSelect, ghostButton, solidButton } from "./fields";

const UNIT_OPTIONS: { value: InvoiceUnit; label: string }[] = [
  { value: "hours", label: "Hours" },
  { value: "days", label: "Days" },
  { value: "items", label: "Items" },
  { value: "fixed", label: "Fixed fee" },
];

const STATUS_OPTIONS: { value: InvoiceStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "paid", label: "Paid" },
  { value: "cancelled", label: "Cancelled" },
];

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={fieldLabel}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function InvoiceEditorClient({
  invoice: initial,
  clients: initialClients,
}: {
  invoice: Invoice;
  clients: InvoiceClientRecord[];
}) {
  const router = useRouter();
  const [invoice, setInvoice] = useState(initial);
  const [clients] = useState(initialClients);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const totals = useMemo(
    () => calculateInvoiceTotals(invoice.items, invoice.supplier.gstRegistered),
    [invoice.items, invoice.supplier.gstRegistered],
  );

  function update(patch: Partial<Invoice>) {
    setInvoice((current) => ({ ...current, ...patch, updatedAt: new Date().toISOString() }));
  }

  function setItems(items: InvoiceItem[]) {
    update({ items });
  }

  function setTerm(id: PaymentTermId) {
    if (id === "custom") {
      update({ paymentTermId: "custom", dueDateManual: true });
      return;
    }
    const days = daysFromPaymentTermId(id) ?? 0;
    update({
      paymentTermId: id,
      paymentTermsDays: days,
      dueDateManual: false,
      dueDate: dueDateFromTerms(invoice.issueDate, days),
    });
  }

  function setIssueDate(issueDate: string) {
    if (invoice.paymentTermId === "custom") {
      update({ issueDate });
      return;
    }
    update({ issueDate, dueDate: dueDateFromTerms(issueDate, invoice.paymentTermsDays) });
  }

  async function save(extra?: { status?: InvoiceStatus }) {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(`/api/invoices/${invoice.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceNumber: invoice.invoiceNumber,
          client: invoice.client,
          clientId: invoice.clientId,
          issueDate: invoice.issueDate,
          dueDate: invoice.dueDate,
          dueDateManual: invoice.paymentTermId === "custom",
          paymentTermId: invoice.paymentTermId,
          paymentTermsDays: invoice.paymentTermsDays,
          reference: invoice.reference,
          items: invoice.items,
          notes: invoice.notes,
          status: extra?.status ?? (invoice.status === "overdue" ? "sent" : invoice.status),
          saveClient: Boolean(invoice.client.name.trim()),
        }),
      });
      const json = (await res.json()) as { invoice?: Invoice; error?: string };
      if (!res.ok || !json.invoice) throw new Error(json.error || "Could not save");
      setInvoice(json.invoice);
      setMessage("Saved");
      return true;
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Could not save");
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function download() {
    const ok = await save();
    if (!ok) return;
    const res = await fetch(`/api/invoices/${invoice.id}/pdf`);
    if (!res.ok) {
      setMessage("Could not download PDF");
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = invoicePdfFilename(
      invoice.invoiceNumber,
      invoice.client.name,
      invoice.supplier.tradingName,
    );
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copy(label: string, value: string) {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setMessage(`${label} copied`);
  }

  return (
    <InvoiceShell
      title={`${invoice.invoiceNumber} · ${statusLabel(invoice.status)}`}
      actions={
        <div className="flex flex-wrap items-center gap-4">
          {message ? <p className="text-[13px] text-black/40">{message}</p> : null}
          <button type="button" className={ghostButton} disabled={saving} onClick={() => save()}>
            Save draft
          </button>
          <button type="button" className={solidButton} disabled={saving} onClick={download}>
            Download PDF
          </button>
        </div>
      }
    >
      <div className="grid items-start gap-10 px-5 py-8 tablet:px-8 desktop:grid-cols-[minmax(18rem,24rem)_minmax(0,1fr)] desktop:px-10">
        <div className="space-y-10">
          <section className="space-y-4">
            <h2 className="text-[14px]">Client</h2>
            <Field label="Saved client" htmlFor="saved-client">
              <select
                id="saved-client"
                className={fieldSelect}
                value={invoice.clientId ?? ""}
                onChange={(event) => {
                  const id = event.target.value;
                  if (!id) {
                    update({ clientId: null });
                    return;
                  }
                  const saved = clients.find((row) => row.id === id);
                  if (!saved) return;
                  update({
                    clientId: saved.id,
                    client: {
                      name: saved.name,
                      contactName: saved.contactName,
                      email: saved.email,
                      abn: saved.abn,
                      address: saved.address,
                    },
                  });
                }}
              >
                <option value="">New client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Business / client name" htmlFor="client-name">
              <input
                id="client-name"
                className={fieldInput}
                value={invoice.client.name}
                onChange={(event) => update({ client: { ...invoice.client, name: event.target.value } })}
              />
            </Field>
            <Field label="Contact name" htmlFor="client-contact">
              <input
                id="client-contact"
                className={fieldInput}
                value={invoice.client.contactName ?? ""}
                onChange={(event) =>
                  update({ client: { ...invoice.client, contactName: event.target.value } })
                }
              />
            </Field>
            <Field label="Email" htmlFor="client-email">
              <input
                id="client-email"
                type="email"
                className={fieldInput}
                value={invoice.client.email ?? ""}
                onChange={(event) => update({ client: { ...invoice.client, email: event.target.value } })}
              />
            </Field>
            <Field label="ABN" htmlFor="client-abn">
              <input
                id="client-abn"
                className={fieldInput}
                value={invoice.client.abn ?? ""}
                onChange={(event) => update({ client: { ...invoice.client, abn: event.target.value } })}
              />
            </Field>
            <Field label="Address" htmlFor="client-address">
              <textarea
                id="client-address"
                rows={3}
                className={`${fieldInput} resize-y`}
                value={invoice.client.address ?? ""}
                onChange={(event) =>
                  update({ client: { ...invoice.client, address: event.target.value } })
                }
              />
            </Field>
          </section>

          <section className="space-y-4">
            <h2 className="text-[14px]">Invoice details</h2>
            <Field label="Invoice number" htmlFor="invoice-number">
              <input
                id="invoice-number"
                className={fieldInput}
                value={invoice.invoiceNumber}
                onChange={(event) => update({ invoiceNumber: event.target.value })}
              />
            </Field>
            <Field label="Issue date" htmlFor="issue-date">
              <input
                id="issue-date"
                type="date"
                className={fieldInput}
                value={invoice.issueDate}
                onChange={(event) => setIssueDate(event.target.value)}
              />
            </Field>
            <Field label="Payment terms" htmlFor="terms">
              <select
                id="terms"
                className={fieldSelect}
                value={invoice.paymentTermId}
                onChange={(event) => setTerm(event.target.value as PaymentTermId)}
              >
                {PAYMENT_TERM_PRESETS.map((term) => (
                  <option key={term.id} value={term.id}>
                    {term.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Due date" htmlFor="due-date">
              <input
                id="due-date"
                type="date"
                className={fieldInput}
                value={invoice.dueDate}
                onChange={(event) =>
                  update({
                    dueDate: event.target.value,
                    paymentTermId: "custom",
                    dueDateManual: true,
                  })
                }
              />
            </Field>
            <Field label="Project / reference" htmlFor="reference">
              <input
                id="reference"
                className={fieldInput}
                value={invoice.reference ?? ""}
                onChange={(event) => update({ reference: event.target.value })}
              />
            </Field>
            <Field label="Status" htmlFor="status">
              <select
                id="status"
                className={fieldSelect}
                value={invoice.status === "overdue" ? "sent" : invoice.status}
                onChange={(event) => update({ status: event.target.value as InvoiceStatus })}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>
          </section>

          <section className="space-y-4">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-[14px]">Line items</h2>
              <button
                type="button"
                className={ghostButton}
                onClick={() => setItems([...invoice.items, newInvoiceItem()])}
              >
                Add line
              </button>
            </div>
            <ul className="space-y-8">
              {invoice.items.map((item, index) => (
                <li key={item.id} className="space-y-3 border-t border-black/10 pt-4">
                  <Field label="Description" htmlFor={`desc-${item.id}`}>
                    <textarea
                      id={`desc-${item.id}`}
                      rows={2}
                      className={`${fieldInput} resize-y`}
                      value={item.description}
                      onChange={(event) =>
                        setItems(
                          invoice.items.map((row) =>
                            row.id === item.id ? { ...row, description: event.target.value } : row,
                          ),
                        )
                      }
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    {item.unit === "fixed" ? null : (
                      <Field label="Quantity" htmlFor={`qty-${item.id}`}>
                        <input
                          id={`qty-${item.id}`}
                          className={fieldInput}
                          inputMode="decimal"
                          value={item.quantity}
                          onChange={(event) => {
                            const quantity = Number(event.target.value);
                            if (!Number.isFinite(quantity) || quantity < 0) return;
                            setItems(
                              invoice.items.map((row) =>
                                row.id === item.id ? { ...row, quantity } : row,
                              ),
                            );
                          }}
                        />
                      </Field>
                    )}
                    <Field label="Unit" htmlFor={`unit-${item.id}`}>
                      <select
                        id={`unit-${item.id}`}
                        className={fieldSelect}
                        value={item.unit}
                        onChange={(event) =>
                          setItems(
                            invoice.items.map((row) =>
                              row.id === item.id
                                ? { ...row, unit: event.target.value as InvoiceUnit }
                                : row,
                            ),
                          )
                        }
                      >
                        {UNIT_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label={item.unit === "fixed" ? "Fee" : "Rate"} htmlFor={`rate-${item.id}`}>
                      <input
                        id={`rate-${item.id}`}
                        className={fieldInput}
                        inputMode="decimal"
                        defaultValue={formatAud(item.unitPriceCents).replace("$", "")}
                        onBlur={(event) => {
                          const cents = parseAudToCents(event.target.value);
                          if (cents === null) return;
                          setItems(
                            invoice.items.map((row) =>
                              row.id === item.id ? { ...row, unitPriceCents: cents } : row,
                            ),
                          );
                        }}
                      />
                    </Field>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-black/40">
                    <p className="tabular-nums text-black">
                      {formatAud(
                        item.unit === "fixed"
                          ? item.unitPriceCents
                          : calculateInvoiceTotals([item], false).totalCents,
                      )}
                    </p>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className={ghostButton}
                        disabled={index === 0}
                        onClick={() => setItems(moveItem(invoice.items, index, index - 1))}
                      >
                        Up
                      </button>
                      <button
                        type="button"
                        className={ghostButton}
                        disabled={index === invoice.items.length - 1}
                        onClick={() => setItems(moveItem(invoice.items, index, index + 1))}
                      >
                        Down
                      </button>
                      <button
                        type="button"
                        className={ghostButton}
                        onClick={() =>
                          setItems([...invoice.items, { ...item, id: crypto.randomUUID() }])
                        }
                      >
                        Duplicate
                      </button>
                      <button
                        type="button"
                        className={ghostButton}
                        disabled={invoice.items.length === 1}
                        onClick={() => setItems(invoice.items.filter((row) => row.id !== item.id))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-right text-[14px] tabular-nums">{formatAud(totals.totalCents)} AUD</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-[14px]">Notes</h2>
            <textarea
              className={`${fieldInput} resize-y`}
              rows={4}
              value={invoice.notes ?? ""}
              onChange={(event) => update({ notes: event.target.value })}
            />
          </section>

          <section className="space-y-3">
            <h2 className="text-[14px]">Payment</h2>
            <p className="text-[13px] leading-[1.5] text-black/55">
              Bank details come from{" "}
              <button type="button" className="underline" onClick={() => router.push("/invoices/settings")}>
                business settings
              </button>
              . Drafts pick up the latest details when you save.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                className={ghostButton}
                onClick={() => copy("Invoice number", invoice.invoiceNumber)}
              >
                Copy number
              </button>
              <button
                type="button"
                className={ghostButton}
                onClick={() => copy("Total", formatAud(totals.totalCents))}
              >
                Copy total
              </button>
              {invoice.supplier.bank.bsb ? (
                <button
                  type="button"
                  className={ghostButton}
                  onClick={() =>
                    copy(
                      "Bank details",
                      [
                        invoice.supplier.bank.accountName,
                        `BSB ${invoice.supplier.bank.bsb}`,
                        invoice.supplier.bank.accountNumber,
                      ]
                        .filter(Boolean)
                        .join("\n"),
                    )
                  }
                >
                  Copy bank details
                </button>
              ) : null}
            </div>
          </section>
        </div>

        <div className="desktop:sticky desktop:top-6">
          <div className="border border-black/10 bg-black/[0.03] p-4">
            <InvoiceDocumentPreview invoice={invoice} />
          </div>
        </div>
      </div>
    </InvoiceShell>
  );
}
