'use client';

import { FormEvent, useState } from 'react';

const INK = '#111111';
const PAPER = '#F2EFE8';
const field =
  'mt-1.5 w-full border border-white/20 bg-white/5 px-3 py-2.5 text-[16px] text-[#F2EFE8] outline-none placeholder:text-[#F2EFE8]/35 focus:border-white';
const label = 'text-[11px] font-medium uppercase tracking-[0.18em] text-[#F2EFE8]/45';

const LOAVES = ['Country loaf', 'Seeded rye', 'Sesame', 'Wholemeal tin', 'Fruit loaf'];
const DAYS = ['Wednesday', 'Saturday'] as const;

type Pay = 'card' | 'apple' | 'payto';

function StripeMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#635BFF" />
      <path
        d="M12.6 9.4c0-.7.6-1 1.6-1 1.4 0 3.2.5 4.6 1.3V6.4C17.4 5.7 15.7 5.4 14 5.4c-2.9 0-4.8 1.5-4.8 4 0 3.9 5.4 3.3 5.4 5 0 .8-.7 1.1-1.8 1.1-1.6 0-3.6-.6-5.2-1.6v3.4c1.7.8 3.6 1.2 5.2 1.2 3 0 5-1.5 5-4.1.1-4.2-5.4-3.5-5.4-5z"
        fill="#fff"
      />
    </svg>
  );
}

export function Subscribe() {
  const [plan, setPlan] = useState<'weekly' | 'fortnightly'>('weekly');
  const [day, setDay] = useState<(typeof DAYS)[number]>('Wednesday');
  const [loaf, setLoaf] = useState(LOAVES[0]);
  const [pay, setPay] = useState<Pay>('payto');
  const [done, setDone] = useState<string | null>(null);

  const total = 22;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get('name') ?? '').trim() || 'you';
    const method = pay === 'apple' ? 'Apple Pay' : pay === 'payto' ? 'PayTo' : 'card';
    setDone(
      `${plan === 'weekly' ? 'Weekly' : 'Fortnightly'} bag for ${name}: ${loaf}, ${day} pickup. ${method}. $${total} per ${plan === 'weekly' ? 'week' : 'fortnight'}.`,
    );
  }

  if (done) {
    return (
      <div className="border border-white/15 bg-white/5 p-6 md:p-8">
        <p className="inline-flex items-center gap-2 text-[13px] font-medium text-[#F2EFE8]">
          <StripeMark />
          Stripe Billing
        </p>
        <p className="mt-4 max-w-[36rem] text-[17px] leading-[1.45]">{done}</p>
        <p className="mt-3 max-w-[36rem] text-[14px] leading-[1.5] text-[#F2EFE8]/55">
          On a live site Stripe would start a recurring Billing subscription and take PayTo or a card. This page does not take payment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <div className="min-w-0 space-y-8">
        <div>
          <p className={label}>How often</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(
              [
                ['weekly', 'Weekly', '$22 · two loaves'],
                ['fortnightly', 'Fortnightly', '$22 · same bag, every other week'],
              ] as const
            ).map(([id, title, note]) => (
              <button
                key={id}
                type="button"
                onClick={() => setPlan(id)}
                className={`rounded-none border px-4 py-3 text-left ${
                  plan === id ? 'border-[#F2EFE8] bg-[#F2EFE8] text-[#111]' : 'border-white/20 hover:border-white'
                }`}
              >
                <span className="block font-[family-name:var(--pr-display)] text-[20px] uppercase leading-none tracking-[-0.04em]">
                  {title}
                </span>
                <span className={`mt-2 block text-[13px] ${plan === id ? 'text-[#111]/55' : 'text-[#F2EFE8]/55'}`}>{note}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={label}>Day</span>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value as (typeof DAYS)[number])}
              className={`${field} mt-1.5 appearance-none`}
              style={{ backgroundColor: 'transparent', color: PAPER }}
            >
              {DAYS.map((d) => (
                <option key={d} value={d} style={{ color: INK }}>
                  {d}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={label}>First loaf</span>
            <select
              value={loaf}
              onChange={(e) => setLoaf(e.target.value)}
              className={`${field} mt-1.5 appearance-none`}
              style={{ backgroundColor: 'transparent', color: PAPER }}
            >
              {LOAVES.map((n) => (
                <option key={n} value={n} style={{ color: INK }}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="text-[13px] leading-snug text-[#F2EFE8]/50">
          Second loaf is baker’s choice unless you name it by Tuesday 5pm. Skip a week from the Stripe customer portal.
        </p>
      </div>

      <div className="min-w-0 border border-white/15 p-5 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[15px] font-medium">Start a subscription</p>
          <p className="inline-flex items-center gap-1.5 text-[12px] text-[#F2EFE8]/50">
            <StripeMark className="h-3.5 w-3.5" />
            Powered by Stripe
          </p>
        </div>
        <p className="mt-1 text-[13px] leading-[1.45] text-[#F2EFE8]/55">
          Stripe Billing on a custom Next.js checkout. PayTo, cards and Apple Pay.
        </p>

        <label className="mt-5 block">
          <span className={label}>Your name</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="mt-4 block">
          <span className={label}>Email</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
        <label className="mt-4 block">
          <span className={label}>Mobile</span>
          <input name="phone" type="tel" required autoComplete="tel" className={field} />
        </label>

        <p className={`${label} mt-6`}>Pay with</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {(
            [
              ['payto', 'PayTo'],
              ['card', 'Card'],
              ['apple', 'Apple Pay'],
            ] as const
          ).map(([id, title]) => (
            <button
              key={id}
              type="button"
              onClick={() => setPay(id)}
              className={`h-11 border text-[13px] font-medium ${
                pay === id ? 'border-[#F2EFE8] bg-[#F2EFE8] text-[#111]' : 'border-white/20 hover:border-white'
              }`}
            >
              {title}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[12px] leading-snug text-[#F2EFE8]/45">
          {pay === 'payto'
            ? 'PayTo through Stripe. Usual method for an Australian weekly debit.'
            : pay === 'apple'
              ? 'Apple Pay via Stripe Payment Element.'
              : 'Visa, Mastercard, eftpos. Stripe handles the card.'}
        </p>

        <button
          type="submit"
          className="mt-6 inline-flex h-12 w-full items-center justify-center text-[15px] font-medium"
          style={{ background: PAPER, color: INK }}
        >
          Subscribe · ${total} {plan === 'weekly' ? '/ week' : '/ fortnight'}
        </button>
        <p className="mt-3 text-[12px] leading-snug text-[#F2EFE8]/45">
          Demonstration only — nothing is charged. No lock-in; cancel from the Stripe portal.
        </p>
      </div>
    </form>
  );
}
