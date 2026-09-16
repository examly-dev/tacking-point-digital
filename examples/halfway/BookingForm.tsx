'use client';

import { FormEvent, useMemo, useState } from 'react';

const BROWN = '#2B1A12';
const OLIVE = '#5E6B3B';

const field =
  'mt-1.5 w-full rounded-xl border border-[#2B1A12]/20 bg-white px-3 py-2.5 text-[16px] outline-none focus:border-[#2B1A12]';
const label = 'text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2B1A12]/55';

const SEATS = ['Window', 'Inside', 'Footpath'] as const;
const SLOTS = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00'];
/** A few busy sittings so the board is not uniformly open. */
const TAKEN: Record<string, string[]> = {
  '2026-09-16': ['08:00', '08:30', '09:00'],
  '2026-09-18': ['07:30', '12:00', '12:30'],
  '2026-09-19': ['09:00', '09:30', '10:00', '10:30'],
  '2026-09-22': ['08:00', '08:30'],
  '2026-09-26': ['12:00', '12:30', '13:00'],
};

type Day = { iso: string; label: string; dow: string };

function openDays(from: Date, count: number): Day[] {
  const days: Day[] = [];
  const cursor = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  while (days.length < count) {
    if (cursor.getDay() !== 0) {
      days.push({
        iso: `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(cursor.getDate()).padStart(2, '0')}`,
        label: String(cursor.getDate()),
        dow: cursor.toLocaleDateString('en-AU', { weekday: 'short' }),
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

export function BookingForm() {
  const days = useMemo(() => openDays(new Date(), 12), []);
  const [date, setDate] = useState<string | null>(days[1]?.iso ?? days[0]?.iso ?? null);
  const [time, setTime] = useState<string | null>(null);
  const [party, setParty] = useState(2);
  const [seat, setSeat] = useState<(typeof SEATS)[number]>('Window');
  const [sent, setSent] = useState<string | null>(null);

  const taken = date ? TAKEN[date] ?? [] : [];
  const monthLabel = date
    ? new Date(`${date}T12:00:00`).toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' })
    : '';

  function pickDate(iso: string) {
    setDate(iso);
    setTime(null);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!date || !time) return;
    const name = String(new FormData(e.currentTarget).get('name') ?? '').trim() || 'you';
    const ref = `HW-${date.slice(5).replace('-', '')}${time.replace(':', '')}`;
    setSent(
      `${party} ${party === 1 ? 'person' : 'people'}, ${seat.toLowerCase()}, ${monthLabel} at ${time}. Held under ${name}. ${ref}.`,
    );
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-[#2B1A12]/15 bg-white p-6 md:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5E6B3B]">Table held</p>
        <p className="mt-3 max-w-[34rem] text-[17px] leading-[1.5]">{sent}</p>
        <p className="mt-4 max-w-[34rem] text-[14px] leading-[1.5] text-[#2B1A12]/60">
          We keep it fifteen minutes after the time. Give the name at the door. If you are late we give the table away.
          Now Book It would also text a reminder.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div className="min-w-0 rounded-3xl border border-[#2B1A12]/15 bg-white p-5 md:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[15px] font-semibold">Hold a table</p>
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#2B1A12]/50">Powered by Now Book It</p>
        </div>
        <p className={label}>Date</p>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {days.map((d) => {
            const active = date === d.iso;
            return (
              <button
                key={d.iso}
                type="button"
                onClick={() => pickDate(d.iso)}
                className={`flex h-[4.5rem] w-[3.35rem] shrink-0 flex-col items-center justify-center rounded-2xl border text-center ${
                  active ? 'border-transparent text-[#EFE4D2]' : 'border-[#2B1A12]/15 hover:border-[#2B1A12]'
                }`}
                style={active ? { background: BROWN } : undefined}
              >
                <span className={`text-[10px] font-semibold uppercase tracking-[0.12em] ${active ? 'text-[#EFE4D2]/70' : 'text-[#2B1A12]/45'}`}>
                  {d.dow}
                </span>
                <span className="mt-0.5 text-[18px] font-semibold tabular-nums">{d.label}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-[13px] text-[#2B1A12]/55">Monday to Saturday. Last sitting 13:00 so you are out by two.</p>

        <p className={`${label} mt-8`}>Time</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {SLOTS.map((t) => {
            const busy = taken.includes(t);
            const active = time === t;
            return (
              <button
                key={t}
                type="button"
                disabled={busy}
                onClick={() => setTime(t)}
                className={`h-10 min-w-[4.5rem] rounded-full px-3 text-[14px] tabular-nums ${
                  active
                    ? 'text-[#EFE4D2]'
                    : busy
                      ? 'cursor-not-allowed bg-[#2B1A12]/6 text-[#2B1A12]/30 line-through'
                      : 'border border-[#2B1A12]/20 hover:border-[#2B1A12]'
                }`}
                style={active ? { background: OLIVE } : undefined}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-w-0 space-y-5 rounded-3xl border border-[#2B1A12]/15 bg-white p-5 md:p-6">
        <div>
          <p className={label}>Party</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setParty(n)}
                className={`grid h-10 w-10 place-items-center rounded-full text-[14px] tabular-nums ${
                  party === n ? 'text-[#EFE4D2]' : 'border border-[#2B1A12]/20 hover:border-[#2B1A12]'
                }`}
                style={party === n ? { background: BROWN } : undefined}
              >
                {n}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[13px] text-[#2B1A12]/55">
            {party >= 7 ? 'Seven or eight is the long table by the window. We will text to confirm.' : 'Two is a small table. Four is a window if one is free.'}
          </p>
        </div>

        <div>
          <p className={label}>Where</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SEATS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSeat(s)}
                className={`h-10 rounded-full px-4 text-[14px] ${
                  seat === s ? 'text-[#EFE4D2]' : 'border border-[#2B1A12]/20 hover:border-[#2B1A12]'
                }`}
                style={seat === s ? { background: OLIVE } : undefined}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className={label}>Your name</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className={label}>Mobile</span>
          <input name="phone" type="tel" required autoComplete="tel" className={field} />
        </label>
        <label className="block">
          <span className={label}>Anything we should know</span>
          <textarea name="note" rows={2} className={`${field} resize-none`} placeholder="Pram, dog on the footpath, high chair" />
        </label>
        <button
          type="submit"
          disabled={!date || !time}
          className="inline-flex h-12 w-full items-center justify-center rounded-full text-[15px] font-semibold text-[#EFE4D2] disabled:opacity-35"
          style={{ background: BROWN }}
        >
          Hold this table
        </button>
        <p className="text-[12px] leading-snug text-[#2B1A12]/50">No deposit. If you cannot come, a text is enough.</p>
      </div>
    </form>
  );
}
