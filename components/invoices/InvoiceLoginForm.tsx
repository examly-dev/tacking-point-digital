"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lighthouse } from "@/components/Lighthouse";
import { site } from "@/lib/site";
import { fieldInput, fieldLabel, solidButton } from "./fields";

export function InvoiceLoginForm({
  nextPath,
  locked,
}: {
  nextPath: string;
  locked: boolean;
}) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    locked ? "Set INVOICE_ACCESS_KEY in .env before using invoices in production." : "",
  );
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (locked) return;
    setPending(true);
    setError("");
    try {
      const res = await fetch("/api/invoices/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(json.error || "That password is not right.");
      }
      router.push(nextPath.startsWith("/invoices") ? nextPath : "/invoices");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center px-5 py-16">
      <form onSubmit={submit} className="w-full max-w-[22rem] space-y-6">
        <p className="flex items-center gap-2 text-[14px] desktop:text-[16px]">
          <Lighthouse />
          {site.name}
        </p>
        <p className="text-[15px] leading-[1.6]">Invoices. Private.</p>
        {locked ? (
          <p className="text-[14px] text-black/55">{error}</p>
        ) : (
          <>
            <div>
              <label htmlFor="password" className={fieldLabel}>
                Access key
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className={fieldInput}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {error ? <p className="text-[14px] text-black/55">{error}</p> : null}
            <button type="submit" className={solidButton} disabled={pending}>
              Continue
            </button>
          </>
        )}
      </form>
    </div>
  );
}
