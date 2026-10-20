"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TackingPoint } from "@/components/TackingPoint";
import { site } from "@/lib/site";
import { fieldInput, fieldLabel, solidButton } from "@/components/invoices/fields";

export function ClientLoginForm({
  nextPath,
  locked,
}: {
  nextPath: string;
  locked: boolean;
}) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    locked ? "Set CLIENT_PORTAL_KEY in .env before using the client portal." : "",
  );
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (locked) return;
    setPending(true);
    setError("");
    try {
      const res = await fetch("/api/clients/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(json.error || "That password is not right.");
      }
      const safe =
        nextPath.startsWith("/clients") || nextPath.startsWith("/leap-type")
          ? nextPath
          : "/clients";
      router.push(safe);
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
        <p className="tacking-point-logo flex items-center gap-2 text-[14px] desktop:text-[16px]">
          <TackingPoint />
          {site.name}
        </p>
        <p className="text-[15px] leading-[1.6]">Latest work. Private.</p>
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
