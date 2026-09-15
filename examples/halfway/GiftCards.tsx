'use client';

import { FormEvent, useState } from 'react';

const BROWN = '#2B1A12';
const OLIVE = '#5E6B3B';
const BLUSH = '#E9A7A0';
const AMOUNTS = [25, 50, 75, 100];

const field =
  'mt-1.5 w-full rounded-lg border border-black/15 bg-white px-3 py-2.5 text-[16px] outline-none focus:border-black';
const label = 'text-[11px] font-semibold uppercase tracking-[0.16em] text-black/50';

function SquareMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.2" fill="currentColor" />
    </svg>
  );
}

export function GiftCards() {
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState('');
  const [send, setSend] = useState<'email' | 'counter'>('email');
  const [done, setDone] = useState<string | null>(null);

  const value = custom ? Number(custom) : amount;
  const valid = Number.isFinite(value) && value >= 10 && value <= 250;

  function pickAmount(n: number) {
    setAmount(n);
    setCustom('');
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!valid) return;
    const data = new FormData(e.currentTarget);
    const to = send === 'email' ? String(data.get('to') || 'the recipient') : 'whoever picks it up';
    setDone(`$${value.toFixed(0)} e-gift for ${to}.`);
  }

  if (done) {
    return (
      <div className="rounded-3xl bg-white p-6 text-black md:p-8">
        <div className="flex items-center gap-2 text-[13px] font-semibold">
          <SquareMark className="h-5 w-5" />
          Square
        </div>
        <p className="mt-4 max-w-[32rem] text-[17px] leading-[1.5]">{done}</p>
        <p className="mt-3 max-w-[32rem] text-[14px] leading-[1.5] text-black/55">
          On a live till, Square would email the code or print a card at the counter. This page does not take payment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-stretch">
      <div
        className="relative flex min-h-[16rem] flex-col justify-between overflow-hidden rounded-3xl p-6 text-[#EFE4D2] md:min-h-[22rem] md:p-8"
        style={{ background: BROWN }}
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40" style={{ background: OLIVE }} />
        <div className="pointer-events-none absolute -bottom-16 left-10 h-36 w-36 rounded-full opacity-70" style={{ background: BLUSH }} />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EFE4D2]/55">Halfway House</p>
          <p className="mt-4 font-[family-name:var(--hw-display)] text-[clamp(28px,4vw,44px)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]">
            Gift card
          </p>
        </div>
        <div className="relative flex items-end justify-between gap-4">
          <p className="text-[13px] text-[#EFE4D2]/70">{send === 'email' ? 'Sent as an e-gift' : 'Picked up at the counter'}</p>
          <p className="font-[family-name:var(--hw-display)] text-[clamp(36px,5vw,56px)] font-extrabold tabular-nums leading-none tracking-[-0.04em]">
            ${valid ? value.toFixed(0) : '—'}
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="min-w-0 rounded-3xl bg-white p-5 text-black md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[15px] font-semibold">Buy a gift card</p>
          <p className="inline-flex items-center gap-1.5 text-[12px] text-black/50">
            <SquareMark className="h-3.5 w-3.5" />
            Powered by Square
          </p>
        </div>
        <p className="mt-1 text-[13px] leading-[1.45] text-black/55">
          Square Gift Cards, the same ones the till sells. E-gift by email, or we write one at the counter.
        </p>

        <p className={`${label} mt-6`}>Amount</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {AMOUNTS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => pickAmount(n)}
              className={`h-10 min-w-[4.25rem] rounded-lg px-3 text-[14px] tabular-nums ${
                !custom && amount === n ? 'bg-black text-white' : 'border border-black/15 hover:border-black'
              }`}
            >
              ${n}
            </button>
          ))}
          <label className="relative">
            <span className="sr-only">Custom amount</span>
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-black/40">$</span>
            <input
              inputMode="numeric"
              value={custom}
              onChange={(e) => setCustom(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="Other"
              className="h-10 w-[6.5rem] rounded-lg border border-black/15 bg-white pl-7 pr-3 text-[14px] outline-none focus:border-black"
            />
          </label>
        </div>
        <p className="mt-2 text-[12px] text-black/45">$10–$250. GST included.</p>

        <p className={`${label} mt-6`}>How it is sent</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {(
            [
              ['email', 'E-gift'],
              ['counter', 'Pickup'],
            ] as const
          ).map(([id, title]) => (
            <button
              key={id}
              type="button"
              onClick={() => setSend(id)}
              className={`rounded-lg border px-3 py-2.5 text-left text-[13px] leading-snug ${
                send === id ? 'border-black bg-black text-white' : 'border-black/15 hover:border-black'
              }`}
            >
              <span className="block font-semibold">{title}</span>
              <span className={send === id ? 'text-white/70' : 'text-black/50'}>
                {id === 'email' ? 'Square emails a code' : 'Printed when you visit'}
              </span>
            </button>
          ))}
        </div>

        {send === 'email' ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className={label}>To</span>
              <input name="to" type="email" required autoComplete="email" placeholder="name@email.com" className={field} />
            </label>
            <label className="block">
              <span className={label}>From</span>
              <input name="from" required autoComplete="name" className={field} />
            </label>
            <label className="block">
              <span className={label}>Message</span>
              <input name="message" maxLength={80} placeholder="Optional" className={field} />
            </label>
          </div>
        ) : (
          <label className="mt-5 block">
            <span className={label}>Your name</span>
            <input name="from" required autoComplete="name" className={field} />
          </label>
        )}

        <button
          type="submit"
          disabled={!valid}
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg bg-black text-[15px] font-semibold text-white disabled:opacity-35"
        >
          Pay with Square
        </button>
        <p className="mt-3 text-[12px] leading-snug text-black/45">
          Card, Apple Pay, Google Pay. Demonstration only — nothing is charged.
        </p>
      </form>
    </div>
  );
}
