'use client';

import { FormEvent, useMemo, useState } from 'react';

const field =
  'mt-1.5 w-full rounded-none border border-[#111]/15 bg-white px-3 py-2.5 text-[16px] outline-none focus:border-[#111]';

type Month = { name: string; year: number; days: number; startsOn: number };

const MONTHS: Month[] = [
  { name: 'October', year: 2026, days: 31, startsOn: 3 },
  { name: 'November', year: 2026, days: 30, startsOn: 6 },
];

/** 0 = Monday. After-school weekdays; Saturday mornings. Sunday closed. */
const OPEN: Record<number, string[]> = {
  0: ['16:00', '17:00', '18:00'],
  1: ['16:00', '17:00'],
  2: ['16:00', '17:00', '18:00'],
  3: ['16:00', '17:00'],
  4: ['16:00'],
  5: ['09:00', '10:00'],
};

/** A few days already taken, so the grid is not uniformly open. */
const TAKEN: Record<string, number[]> = {
  October: [2, 7, 14, 21],
  November: [4, 11, 18],
};

function weekday(month: Month, day: number) {
  return (month.startsOn + day - 1) % 7;
}

export function BookingForm() {
  const [mi, setMi] = useState(0);
  const month = MONTHS[mi];
  const [day, setDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const cells = useMemo(() => {
    const list: Array<number | null> = [
      ...Array(month.startsOn).fill(null),
      ...Array.from({ length: month.days }, (_, i) => i + 1),
    ];
    while (list.length % 7) list.push(null);
    return list;
  }, [month]);

  const taken = TAKEN[month.name] ?? [];
  const slots = day && !taken.includes(day) ? OPEN[weekday(month, day)] ?? [] : [];

  function pickDay(n: number) {
    setDay(n);
    setTime(null);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!day || !time) return;
    setSent(true);
  }

  if (sent) {
    return (
      <p className="max-w-[32rem] text-[17px] leading-[1.55] text-[#111111]/80">
        Thanks. I will write back today to confirm {day} {month.name} at {time}. If that slot has gone in the meantime I
        will offer the next one.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-10 md:grid-cols-[minmax(0,22rem)_minmax(0,20rem)] md:items-start">
      <div className="border border-[#111111]/20 bg-white p-4 md:p-5">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            className="h-10 px-2 text-[14px] disabled:opacity-30"
            disabled={mi === 0}
            onClick={() => {
              setMi(0);
              setDay(null);
              setTime(null);
            }}
            aria-label="Previous month"
          >
            ←
          </button>
          <p className="text-[16px] font-semibold tabular-nums">
            {month.name} {month.year}
          </p>
          <button
            type="button"
            className="h-10 px-2 text-[14px] disabled:opacity-30"
            disabled={mi === MONTHS.length - 1}
            onClick={() => {
              setMi(1);
              setDay(null);
              setTime(null);
            }}
            aria-label="Next month"
          >
            →
          </button>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-px text-center text-[11px] uppercase tracking-[0.08em] text-[#111111]/45">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
            <span key={d} className="py-1">
              {d}
            </span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-px bg-[#111111]/10" role="grid" aria-label={`${month.name} ${month.year}`}>
          {cells.map((n, i) => {
            if (!n) return <span key={`e-${i}`} className="bg-white py-2" />;
            const wd = weekday(month, n);
            const open = (OPEN[wd] ?? []).length > 0 && !taken.includes(n);
            const active = day === n;
            return (
              <button
                key={n}
                type="button"
                role="gridcell"
                aria-selected={active}
                disabled={!open}
                onClick={() => pickDay(n)}
                className={`h-11 bg-white text-[14px] tabular-nums ${
                  active
                    ? 'bg-[#111111] text-[#F5F5F3]'
                    : open
                      ? 'hover:bg-[#111111]/8'
                      : 'text-[#111111]/25'
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-[12px] leading-snug text-[#111111]/50">
          After school Monday to Friday, Saturday mornings. Grey days are full or closed. Pick a day, then a time.
        </p>
      </div>

      <div className="space-y-5">
        {day ? (
          <div>
            <p className="text-[13px] text-[#111111]/55">
              {day} {month.name}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {slots.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  className={`h-10 min-w-[4.75rem] px-3 text-[14px] tabular-nums ${
                    time === t ? 'bg-[#111111] text-[#F5F5F3]' : 'border border-[#111111]/25 hover:border-[#111111]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-[15px] text-[#111111]/55">Select a date on the calendar.</p>
        )}

        <label className="block">
          <span className="text-[13px] text-[#111111]/55">Your name</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="text-[13px] text-[#111111]/55">Email</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
        <label className="block">
          <span className="text-[13px] text-[#111111]/55">Student’s year</span>
          <select name="year" required defaultValue="" className={field}>
            <option value="" disabled>
              Select
            </option>
            {['7', '8', '9', '10', '11 Standard', '11 Advanced', '11 Extension 1', '12 Standard', '12 Advanced', '12 Extension 1'].map(
              (y) => (
                <option key={y} value={y}>
                  {y.startsWith('1') && y.length > 2 ? y : `Year ${y}`}
                </option>
              ),
            )}
          </select>
        </label>
        <label className="block">
          <span className="text-[13px] text-[#111111]/55">Anything I should know</span>
          <textarea name="note" rows={3} className={`${field} resize-none`} />
        </label>
        <input type="hidden" name="slot" value={day && time ? `${day} ${month.name} ${time}` : ''} />
        <button
          type="submit"
          disabled={!day || !time}
          className="inline-flex h-11 items-center bg-[#111111] px-5 text-[14px] text-[#F5F5F3] disabled:opacity-30"
        >
          Request this time
        </button>
      </div>
    </form>
  );
}
