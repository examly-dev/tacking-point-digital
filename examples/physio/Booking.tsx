'use client';

import { useState } from 'react';
import { GREEN, label, rule } from '@/examples/physio/data';

const TYPES = [
  { t: 'New patient', d: '45 min · $120' },
  { t: 'Follow-up', d: '30 min · $95' },
  { t: 'Telehealth follow-up', d: '20 min · $60' },
  { t: 'Clinical Pilates', d: '60 min · $35' },
] as const;

const PRACTITIONERS = ['Any', 'Sam Ridgeway', 'Priya Nair', 'Tom Alder'] as const;

const WEEK = [
  ['Tue', '16', ['08:15', '11:45', '15:30']],
  ['Wed', '17', ['07:30', '13:00']],
  ['Thu', '18', ['07:30', '10:15', '16:45']],
  ['Fri', '19', ['09:00']],
  ['Sat', '20', []],
] as const;

export function BookingWidget({
  appointment = 'New patient',
  practitioner = 'Any',
}: {
  appointment?: string;
  practitioner?: string;
}) {
  const [type, setType] = useState(TYPES.some((x) => x.t === appointment) ? appointment : 'New patient');
  const [who, setWho] = useState(
    PRACTITIONERS.includes(practitioner as (typeof PRACTITIONERS)[number]) ? practitioner : 'Any',
  );

  return (
    <div className="rounded-2xl border border-[#0B0B0B]/12 bg-white shadow-[0_24px_60px_-40px_rgba(0,0,0,0.35)]">
      <div className={`flex items-center justify-between border-b ${rule} px-5 py-3.5`}>
        <p className="text-[15px] font-medium">Book an appointment</p>
        <p className="flex items-center gap-1.5 text-[12px] text-[#0B0B0B]/55">
          Powered by
          <span className="inline-flex items-center gap-1 font-semibold text-[#0B0B0B]">
            <span className="h-3.5 w-3.5 rounded-full" style={{ background: '#1AC6A4' }} aria-hidden="true" />
            HotDoc
          </span>
        </p>
      </div>

      <div className="p-5">
        <p className={label}>Appointment type</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {TYPES.map((item) => {
            const on = item.t === type;
            return (
              <button
                key={item.t}
                type="button"
                aria-pressed={on}
                onClick={() => setType(item.t)}
                className={`rounded-lg border px-3.5 py-2 text-left text-[14px] transition-colors ${
                  on ? 'border-[#1A4D3E] bg-[#1A4D3E]/5' : 'border-[#0B0B0B]/15 hover:border-[#0B0B0B]/40'
                }`}
              >
                <span className="block font-medium">{item.t}</span>
                <span className="block text-[12px] text-[#0B0B0B]/55">{item.d}</span>
              </button>
            );
          })}
        </div>

        <p className={`${label} mt-6`}>Practitioner</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRACTITIONERS.map((n) => {
            const on = n === who;
            return (
              <button
                key={n}
                type="button"
                aria-pressed={on}
                onClick={() => setWho(n)}
                className={`rounded-full border px-3.5 py-1.5 text-[14px] transition-colors ${
                  on ? 'border-[#0B0B0B] bg-[#0B0B0B] text-white' : 'border-[#0B0B0B]/15 hover:border-[#0B0B0B]/40'
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className={label}>This week</p>
          <p className="text-[12px] text-[#0B0B0B]/55">Times shown in your local time</p>
        </div>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {WEEK.map(([d, n, times]) => (
            <div key={d}>
              <p className="text-center text-[12px] text-[#0B0B0B]/55">
                {d} <span className="tabular-nums text-[#0B0B0B]">{n}</span>
              </p>
              <div className="mt-2 space-y-1.5">
                {times.length ? (
                  times.map((t, i) => (
                    <button
                      key={t}
                      type="button"
                      className={`block w-full rounded-md border py-1.5 text-center text-[13px] tabular-nums transition-colors ${
                        d === 'Tue' && i === 0
                          ? 'border-[#1A4D3E] bg-[#1A4D3E] text-white'
                          : 'border-[#0B0B0B]/15 hover:border-[#1A4D3E] hover:text-[#1A4D3E]'
                      }`}
                    >
                      {t}
                    </button>
                  ))
                ) : (
                  <p className="py-1.5 text-center text-[12px] text-[#0B0B0B]/35">Closed</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`flex flex-col gap-3 border-t ${rule} px-5 py-4 sm:flex-row sm:items-center sm:justify-between`}>
        <p className="text-[14px]">
          <span className="font-medium">Tue 16 · 08:15</span>
          <span className="text-[#0B0B0B]/55">
            {' '}
            · {type}, with {who === 'Any' ? 'Sam' : who.split(' ')[0]}
          </span>
        </p>
        <a
          href="#"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-[15px] font-medium text-white transition-colors hover:bg-[#0B0B0B]"
          style={{ background: GREEN }}
        >
          Continue on HotDoc <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
