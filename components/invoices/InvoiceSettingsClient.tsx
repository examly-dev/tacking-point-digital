"use client";

import { useState } from "react";
import { formatAbn } from "@/lib/invoices/abn";
import type { InvoiceBusinessProfile } from "@/lib/invoices/types";
import { InvoiceShell } from "./InvoiceShell";
import { fieldInput, fieldLabel, ghostButton, solidButton } from "./fields";

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={fieldLabel}>
        {label}
      </label>
      {children}
      {hint ? <p className="mt-1 text-[12px] text-black/35">{hint}</p> : null}
    </div>
  );
}

export function InvoiceSettingsClient({ business: initial }: { business: InvoiceBusinessProfile }) {
  const [business, setBusiness] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function update(patch: Partial<InvoiceBusinessProfile>) {
    setBusiness((current) => ({
      ...current,
      ...patch,
      bank: { ...current.bank, ...(patch.bank ?? {}) },
    }));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/invoices/business", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(business),
      });
      const json = (await res.json()) as { business?: InvoiceBusinessProfile; error?: string };
      if (!res.ok || !json.business) throw new Error(json.error || "Could not save");
      setBusiness(json.business);
      setMessage("Saved");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <InvoiceShell
      title="Business details"
      actions={
        <div className="flex items-center gap-4">
          {message ? <p className="text-[13px] text-black/40">{message}</p> : null}
          <button type="button" className={solidButton} disabled={saving} onClick={save}>
            Save
          </button>
        </div>
      }
    >
      <div className="mx-auto max-w-[34rem] space-y-10 px-5 py-8 tablet:px-8">
        <p className="text-[15px] leading-[1.6] tablet:text-[14px] desktop:text-[16px]">
          Invoices show Tacking Point Digital as the brand, then Andrew James
          Fong trading as Tacking Point Digital, then the ABN. The ASIC name
          is not a separate company — the ABN sits on you as a sole trader.
        </p>

        <section className="space-y-4">
          <h2 className="text-[14px]">Supplier</h2>
          <Field label="Trading name" htmlFor="trading">
            <input
              id="trading"
              className={fieldInput}
              value={business.tradingName}
              onChange={(event) => update({ tradingName: event.target.value })}
            />
          </Field>
          <Field
            label="Legal name"
            htmlFor="legal"
            hint="Printed as “Andrew James Fong trading as Tacking Point Digital”."
          >
            <input
              id="legal"
              className={fieldInput}
              value={business.legalName}
              onChange={(event) => update({ legalName: event.target.value })}
            />
          </Field>
          <Field
            label="ABN"
            htmlFor="abn"
            hint={business.abn ? `Shown as ${formatAbn(business.abn)}` : undefined}
          >
            <input
              id="abn"
              className={fieldInput}
              value={business.abn}
              onChange={(event) => update({ abn: event.target.value })}
            />
          </Field>
          <Field label="Email" htmlFor="email">
            <input
              id="email"
              type="email"
              className={fieldInput}
              value={business.email}
              onChange={(event) => update({ email: event.target.value })}
            />
          </Field>
          <Field label="Phone" htmlFor="phone">
            <input
              id="phone"
              className={fieldInput}
              value={business.phone}
              onChange={(event) => update({ phone: event.target.value })}
            />
          </Field>
          <Field label="Website" htmlFor="website">
            <input
              id="website"
              className={fieldInput}
              value={business.website}
              onChange={(event) => update({ website: event.target.value })}
            />
          </Field>
          <Field label="Address" htmlFor="address" hint="Street address is optional; Port Macquarie, NSW is enough until you have one.">
            <textarea
              id="address"
              rows={3}
              className={`${fieldInput} resize-y`}
              value={business.address}
              onChange={(event) => update({ address: event.target.value })}
            />
          </Field>
          <label className="flex items-center gap-2 text-[14px]">
            <input
              type="checkbox"
              checked={business.gstRegistered}
              onChange={(event) => update({ gstRegistered: event.target.checked })}
            />
            GST registered (documents become tax invoices and add 10%)
          </label>
          <Field label="Default payment terms (days)" htmlFor="terms">
            <input
              id="terms"
              className={fieldInput}
              inputMode="numeric"
              value={business.paymentTermsDays}
              onChange={(event) => {
                const days = Number(event.target.value);
                if (!Number.isInteger(days) || days < 0) return;
                update({ paymentTermsDays: days });
              }}
            />
          </Field>
        </section>

        <section className="space-y-4">
          <h2 className="text-[14px]">Bank</h2>
          <Field label="Account name" htmlFor="account-name">
            <input
              id="account-name"
              className={fieldInput}
              value={business.bank.accountName}
              onChange={(event) => update({ bank: { ...business.bank, accountName: event.target.value } })}
            />
          </Field>
          <Field label="BSB" htmlFor="bsb">
            <input
              id="bsb"
              className={fieldInput}
              value={business.bank.bsb}
              onChange={(event) => update({ bank: { ...business.bank, bsb: event.target.value } })}
            />
          </Field>
          <Field label="Account number" htmlFor="account-number">
            <input
              id="account-number"
              className={fieldInput}
              value={business.bank.accountNumber}
              onChange={(event) =>
                update({ bank: { ...business.bank, accountNumber: event.target.value } })
              }
            />
          </Field>
        </section>

        <button type="button" className={ghostButton} disabled={saving} onClick={save}>
          Save business details
        </button>
      </div>
    </InvoiceShell>
  );
}
