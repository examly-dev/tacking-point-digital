import Image from 'next/image';
import { Big_Shoulders, Instrument_Sans } from 'next/font/google';
import { Reveal, ScrollSpy } from '@/examples/_shared/primitives';

/*
  PARKSIDE GYM — a coached strength and conditioning gym.
  Black, bone, one signal orange. A wordmark set full-bleed across the hero,
  a straight orange ticker, a real weekly timetable and weekly-billed memberships.
*/

const display = Big_Shoulders({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--bl-display',
  display: 'swap',
});
const sans = Instrument_Sans({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--bl-sans',
  display: 'swap',
});

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const BLACK = '#0B0B0C';
const BONE = '#EDE9E1';
const ORANGE = '#FF5A1F';
const disp = 'font-[family-name:var(--bl-display)] font-extrabold uppercase leading-[0.85] tracking-[-0.01em]';
const label = 'text-[11px] font-semibold uppercase tracking-[0.2em]';
const rule = 'border-[#EDE9E1]/15';

const programmes = [
  {
    n: '01',
    h: 'Strength',
    p: 'Barbell fundamentals, coached in groups of eight. Squat, press, pull, hinge. Programmed in twelve-week blocks so you can see the numbers move.',
    img: '1541534741688-6078c6bfb5c5',
    alt: 'Back squat under coaching',
  },
  {
    n: '02',
    h: 'Conditioning',
    p: 'Forty-five minutes of hard, sensible work. Rowers, sleds, kettlebells, running. Scaled to whoever walks in, no leaderboard.',
    img: '1517836357463-d25dfeac3438',
    alt: 'Barbell on the platform',
  },
  {
    n: '03',
    h: 'Lifting club',
    p: 'Olympic weightlifting on Tuesday and Thursday nights and Saturday mornings. Technique first. Competition optional, encouraged.',
    img: '1526506118085-60ce8714f8c5',
    alt: 'Setting up a deadlift',
  },
];

const timetable = {
  times: ['5:30', '6:30', '9:30', '12:15', '17:30', '18:30'],
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  grid: [
    ['Strength', 'Conditioning', 'Strength', 'Conditioning', 'Strength', 'Lifting club'],
    ['Conditioning', 'Strength', 'Conditioning', 'Strength', 'Conditioning', 'Open gym'],
    ['Foundations', 'Open gym', 'Foundations', 'Open gym', 'Foundations', 'Conditioning'],
    ['Open gym', 'Open gym', 'Open gym', 'Open gym', 'Open gym', '—'],
    ['Strength', 'Conditioning', 'Strength', 'Conditioning', 'Strength', '—'],
    ['Conditioning', 'Lifting club', 'Conditioning', 'Lifting club', 'Open gym', '—'],
  ],
};

const plans = [
  { h: 'Casual', price: '$25', per: 'per visit', p: 'Any class or open gym. Book the night before; first visit is on us.', items: ['No membership', 'Pay as you go', 'Book online'] },
  { h: 'Unlimited', price: '$59', per: 'per week', p: 'Every class, open gym whenever we are open, and a coach who knows your name.', items: ['Direct debit, weekly', 'No lock-in, 14 days notice', 'Pause up to 4 weeks a year', 'Programme reviews each block'], featured: true },
  { h: 'Foundations', price: '$299', per: 'six weeks', p: 'Where everyone starts. Six weeks of small-group coaching on the lifts before you join the main classes.', items: ['3 sessions a week', 'Groups of six', 'Movement screen included', 'Rolls into Unlimited'] },
];

const coaches = [
  { name: 'Dee Okafor', role: 'Head coach', cred: 'ASCA Level 2 · Cert IV · 12 years', img: '1548690312-e3b507d8c110' },
  { name: 'Josh Mahoney', role: 'Strength and lifting club', cred: 'AWF Level 2 · Former state lifter', img: '1581009146145-b5ef050c2e1e' },
  { name: 'Ren Takahashi', role: 'Conditioning, Foundations', cred: 'Cert IV · Exercise Science (B.)', img: '1492562080023-ab3db95bfbce' },
];

function Wordmark({ className = '' }: { className?: string }) {
  // SVG text stretched to the container width so the word fills the hero at any size.
  return (
    <svg viewBox="0 0 1000 200" className={`block w-full ${className}`} aria-hidden="true" preserveAspectRatio="none">
      <text
        x="0"
        y="195"
        textLength="1000"
        lengthAdjust="spacingAndGlyphs"
        fontFamily="var(--bl-display)"
        fontWeight="800"
        fontSize="250"
        fill="currentColor"
      >
        PARKSIDE
      </text>
    </svg>
  );
}

export default function BallastPage() {
  return (
    <>

      <div
        data-example=""
        className={`${display.variable} ${sans.variable} font-[family-name:var(--bl-sans)] min-h-screen antialiased selection:bg-[#FF5A1F] selection:text-black`}
        style={{ background: BLACK, color: BONE }}
      >
        {/* Header */}
        <header className={`custom-header fixed inset-x-0 top-0 z-50 border-b ${rule} backdrop-blur-md`} style={{ background: 'rgba(11,11,12,0.8)' }}>
          <div className="flex h-16 items-center justify-between px-5 md:px-8">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-full" style={{ background: ORANGE }} aria-hidden="true" />
              <span className={`${disp} text-[26px] tracking-[0.02em]`}>Parkside</span>
            </a>
            <ScrollSpy
              items={[
                { href: '#train', label: 'Train' },
                { href: '#timetable', label: 'Timetable' },
                { href: '#recovery', label: 'Recovery' },
                { href: '#membership', label: 'Membership' },
                { href: '#coaches', label: 'Coaches' },
              ]}
              className={`${label} hidden gap-8 md:flex`}
              linkClass="transition-colors duration-200"
              activeClass="text-[#FF5A1F]"
              inactiveClass="text-[#EDE9E1]/60 hover:text-[#EDE9E1]"
            />
            <a
              href="#membership"
              className="inline-flex h-10 items-center rounded-full px-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-black transition-colors hover:bg-[#EDE9E1]"
              style={{ background: ORANGE }}
            >
              Free first session
            </a>
          </div>
        </header>

        {/* Hero */}
        <section id="top" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-6 pt-24 md:px-8">
          <div className="grid grid-cols-12 items-start gap-x-4 gap-y-8">
            <Reveal className="col-span-12 md:col-span-4">
              <p className={`${label} text-[#EDE9E1]/55`}>Strength and conditioning club</p>
              <p className="mt-4 max-w-[22rem] text-[17px] leading-[1.45] md:text-[19px]">
                Coached barbell and conditioning classes for people who want to get strong and keep it that way. Groups of
                eight. Nobody yells.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#membership" className="inline-flex h-12 items-center rounded-full px-6 text-[14px] font-semibold text-black transition-colors hover:bg-[#EDE9E1]" style={{ background: ORANGE }}>
                  Book a free session
                </a>
                <a href="#timetable" className={`inline-flex h-12 items-center rounded-full border ${rule} px-6 text-[14px] font-semibold transition-colors hover:border-[#EDE9E1]`}>
                  Timetable
                </a>
              </div>
            </Reveal>

            <Reveal delay={120} className="relative col-span-12 aspect-[4/5] overflow-hidden md:col-span-4 md:col-start-6 md:aspect-[3/4] lg:col-span-3 lg:col-start-7">
              <Image
                src={img('1550345332-09e3ac987658', 1400)}
                alt="A member mid-lift on the platform"
                fill
                priority
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 42vw, 100vw"
                className="object-cover grayscale contrast-[1.1]"
              />
            </Reveal>

            <Reveal delay={200} className="col-span-12 grid grid-cols-2 gap-x-4 gap-y-6 self-end md:col-span-2 md:col-start-11 md:grid-cols-1">
              {[
                ['Open', '5am – 9pm'],
                ['Classes', '31 a week'],
                ['Members', '184, capped at 220'],
                ['Since', '2019'],
              ].map(([k, v]) => (
                <div key={k} className={`border-t ${rule} pt-3`}>
                  <p className={`${label} text-[#EDE9E1]/45`}>{k}</p>
                  <p className="mt-1 text-[15px]">{v}</p>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal delay={80} className="mt-10 md:mt-12">
            <Wordmark className="h-[clamp(56px,12vw,172px)]" />
          </Reveal>
        </section>

        {/* Programmes */}
        <section id="train" className="px-5 py-20 md:px-8 md:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className={`${disp} text-[clamp(56px,10vw,160px)]`}>Train</h2>
            <p className="max-w-[26rem] text-[16px] leading-[1.5] text-[#EDE9E1]/70">
              Three programmes, one floor. Everyone starts in Foundations, then picks what they want more of.
            </p>
          </Reveal>
          <div className={`mt-12 grid grid-cols-1 gap-px bg-[#EDE9E1]/15 md:grid-cols-3`}>
            {programmes.map((p, i) => (
              <Reveal key={p.h} delay={i * 80} className="group flex flex-col">
                <div className="flex h-full flex-col" style={{ background: BLACK }}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={img(p.img, 1200)} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover grayscale transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h3 className={`${disp} text-[clamp(40px,4vw,64px)]`}>{p.h}</h3>
                    <p className="mt-4 text-[15px] leading-[1.55] text-[#EDE9E1]/70">{p.p}</p>
                    <a href="#timetable" className={`${label} mt-auto inline-flex pt-8 text-[#EDE9E1]/60 transition-colors group-hover:text-[#FF5A1F]`}>
                      See times →
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Timetable */}
        <section id="timetable" className={`border-t ${rule} px-5 py-20 md:px-8 md:py-28`}>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className={`${disp} text-[clamp(56px,10vw,160px)]`}>Timetable</h2>
            <p className="max-w-[26rem] text-[16px] leading-[1.5] text-[#EDE9E1]/70">
              Book in the app up to a week ahead. Open gym is coached too; someone is always on the floor.
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-left text-[14px]">
              <thead>
                <tr className={`${label} border-b ${rule} text-[#EDE9E1]/45`}>
                  <th className="py-3 pr-4 font-semibold"> </th>
                  {timetable.days.map((d) => (
                    <th key={d} className="py-3 pr-4 font-semibold">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timetable.times.map((t, r) => (
                  <tr key={t} className={`border-b ${rule}`}>
                    <th className={`${disp} py-4 pr-4 text-[22px] font-extrabold tabular-nums`} style={{ color: ORANGE }}>
                      {t}
                    </th>
                    {timetable.grid[r].map((c, ci) => (
                      <td key={ci} className={`py-4 pr-4 ${c === 'Open gym' || c === '—' ? 'text-[#EDE9E1]/40' : ''}`}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 text-[13px] text-[#EDE9E1]/45">Sunday closed. Public holidays: 8am class only. Times are the same every week.</p>
          </Reveal>
        </section>


        {/* Recovery: bookable sauna, ice bath and massage slots. */}
        <section id="recovery" className={`border-t ${rule} px-5 py-20 md:px-8 md:py-28`}>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className={`${disp} text-[clamp(56px,10vw,160px)]`}>Recovery</h2>
            <p className="max-w-[26rem] text-[16px] leading-[1.5] text-[#EDE9E1]/70">
              Sauna, ice bath and a massage room, booked in the same app as your classes. Members pay less; anyone can book.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-12 gap-4">
            <div className="col-span-12 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
              {[
                { h: 'Sauna', d: '45 min · up to 6 people · 85°C', m: '$15', c: '$25', on: true },
                { h: 'Ice bath', d: '20 min · 4°C · towel and tea after', m: '$10', c: '$18', on: false },
                { h: 'Sports massage', d: '30 or 60 min · with Ren', m: '$70', c: '$90', on: false },
              ].map((r) => (
                <Reveal key={r.h} delay={60}>
                  <button
                    type="button"
                    aria-pressed={r.on}
                    className={`flex w-full items-start justify-between gap-4 border p-5 text-left transition-colors ${
                      r.on ? 'border-[#FF5A1F] bg-[#FF5A1F]/8' : `${rule} hover:border-[#EDE9E1]/50`
                    }`}
                  >
                    <span>
                      <span className={`${disp} block text-[30px]`}>{r.h}</span>
                      <span className="mt-1 block text-[13px] text-[#EDE9E1]/60">{r.d}</span>
                    </span>
                    <span className="shrink-0 text-right text-[13px] leading-[1.5]">
                      <span className="block">
                        <span className={`${disp} text-[22px]`} style={{ color: ORANGE }}>{r.m}</span> <span className="text-[#EDE9E1]/60">members</span>
                      </span>
                      <span className="block text-[#EDE9E1]/60">{r.c} casual</span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>

            <Reveal delay={140} className="col-span-12 lg:col-span-7">
              <div className={`border ${rule} p-5 md:p-6`} style={{ background: '#141416' }}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className={`${disp} text-[30px]`}>Sauna · Tuesday 16</p>
                  <div className="flex gap-1">
                    {['Mon 15', 'Tue 16', 'Wed 17', 'Thu 18', 'Fri 19'].map((d, i) => (
                      <button
                        key={d}
                        type="button"
                        aria-pressed={i === 1}
                        className={`px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                          i === 1 ? 'bg-[#EDE9E1] text-black' : 'text-[#EDE9E1]/60 hover:text-[#EDE9E1]'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    ['06:15', 2, false],
                    ['07:00', 0, false],
                    ['07:45', 4, false],
                    ['12:15', 6, false],
                    ['16:30', 1, false],
                    ['17:15', 3, true],
                    ['18:00', 0, false],
                    ['18:45', 5, false],
                  ].map(([t, left, on]) => {
                    const full = left === 0;
                    return (
                      <button
                        key={t as string}
                        type="button"
                        disabled={full}
                        aria-pressed={on as boolean}
                        className={`flex items-baseline justify-between border px-3 py-3 text-left transition-colors ${
                          on
                            ? 'border-[#FF5A1F] bg-[#FF5A1F] text-black'
                            : full
                              ? 'cursor-not-allowed border-[#EDE9E1]/10 text-[#EDE9E1]/30'
                              : `${rule} hover:border-[#EDE9E1]/60`
                        }`}
                      >
                        <span className={`${disp} text-[22px] tabular-nums`}>{t as string}</span>
                        <span className={`text-[12px] ${on ? 'text-black/70' : full ? '' : 'text-[#EDE9E1]/55'}`}>
                          {full ? 'Full' : `${left} left`}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className={`mt-6 flex flex-col gap-3 border-t ${rule} pt-5 sm:flex-row sm:items-center sm:justify-between`}>
                  <p className="text-[14px]">
                    <span className="font-semibold">Sauna, Tue 16, 17:15</span>
                    <span className="text-[#EDE9E1]/60"> · 45 min · $15 on your membership</span>
                  </p>
                  <a
                    href="#"
                    className="inline-flex h-11 items-center justify-center rounded-full px-5 text-[14px] font-semibold text-black transition-colors hover:bg-[#EDE9E1]"
                    style={{ background: ORANGE }}
                  >
                    Book this slot
                  </a>
                </div>
                <p className="mt-4 text-[12px] text-[#EDE9E1]/45">
                  Cancel free up to two hours before. No-shows are charged the casual rate. Bookings open seven days ahead.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Membership */}
        <section id="membership" className={`border-t ${rule} px-5 py-20 md:px-8 md:py-28`}>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className={`${disp} text-[clamp(56px,10vw,160px)]`}>Membership</h2>
            <p className="max-w-[26rem] text-[16px] leading-[1.5] text-[#EDE9E1]/70">
              Billed weekly by direct debit. No joining fee, no lock-in contract, and you can pause it when life happens.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {plans.map((pl, i) => (
              <Reveal key={pl.h} delay={i * 80} className="flex">
                <div
                  className={`flex w-full flex-col p-7 ${pl.featured ? 'text-black' : `border ${rule}`}`}
                  style={pl.featured ? { background: BONE } : undefined}
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className={`${disp} text-[36px]`}>{pl.h}</h3>
                    {pl.featured ? <span className={`${label}`} style={{ color: ORANGE }}>Most members</span> : null}
                  </div>
                  <p className="mt-6">
                    <span className={`${disp} text-[72px]`}>{pl.price}</span>
                    <span className={`ml-2 text-[14px] ${pl.featured ? 'text-black/60' : 'text-[#EDE9E1]/60'}`}>{pl.per}</span>
                  </p>
                  <p className={`mt-4 text-[15px] leading-[1.5] ${pl.featured ? 'text-black/75' : 'text-[#EDE9E1]/70'}`}>{pl.p}</p>
                  <ul className={`mt-6 space-y-2 border-t pt-5 text-[14px] ${pl.featured ? 'border-black/15' : rule}`}>
                    {pl.items.map((it) => (
                      <li key={it} className="flex gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: ORANGE }} />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#"
                    className={`mt-8 inline-flex h-12 items-center justify-center rounded-full text-[14px] font-semibold transition-colors ${
                      pl.featured ? 'bg-black text-[#EDE9E1] hover:bg-[#FF5A1F] hover:text-black' : `border ${rule} hover:border-[#EDE9E1]`
                    }`}
                  >
                    {pl.featured ? 'Start with a free session' : 'Choose'}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Coaches */}
        <section id="coaches" className={`border-t ${rule} px-5 py-20 md:px-8 md:py-28`}>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className={`${disp} text-[clamp(56px,10vw,160px)]`}>Coaches</h2>
            <p className="max-w-[26rem] text-[16px] leading-[1.5] text-[#EDE9E1]/70">
              Three coaches, all full-time, all on the floor. You will get to know them by the end of your first week.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {coaches.map((c, i) => (
              <Reveal key={c.name} delay={i * 80} className="group">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image src={img(c.img, 900)} alt={`${c.name}, ${c.role}`} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
                </div>
                <h3 className={`${disp} mt-5 text-[32px]`}>{c.name}</h3>
                <p className="mt-1 text-[15px]">{c.role}</p>
                <p className="mt-1 text-[13px] text-[#EDE9E1]/50">{c.cred}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className={`custom-footer border-t ${rule}`}>
          <Reveal className="px-5 pt-20 md:px-8 md:pt-28">
            <a href="#" className="group block">
              <p className={`${disp} text-[clamp(48px,11vw,190px)] transition-colors duration-300 group-hover:text-[#FF5A1F]`}>
                Come in and
                <br />
                have a look.
              </p>
              <p className="mt-6 max-w-[30rem] text-[17px] text-[#EDE9E1]/70">
                First session is free, no card needed. Turn up ten minutes before any class and ask for whoever is on the floor.
              </p>
            </a>
          </Reveal>
          <div className={`mt-16 grid grid-cols-2 gap-x-4 gap-y-8 border-t ${rule} px-5 py-10 md:mt-24 md:grid-cols-4 md:px-8`}>
            {[
              ['Hours', 'Mon – Fri 5am – 9pm\nSat 6am – 12pm'],
              ['Find us', 'Behind the timber yard\nPlenty of parking, bike rack out front'],
              ['Contact', '02 5550 4410\nhello@parksidegym.com.au'],
              ['Follow', 'Instagram\nProgramme notes, weekly'],
            ].map(([k, v]) => (
              <div key={k}>
                <p className={`${label} text-[#EDE9E1]/45`}>{k}</p>
                <p className="mt-3 whitespace-pre-line text-[15px] leading-[1.5]">{v}</p>
              </div>
            ))}
          </div>
          <div className={`${label} flex flex-col gap-2 px-5 pb-6 text-[#EDE9E1]/35 md:flex-row md:items-center md:justify-between md:px-8`}>
            <span>© Parkside Gym 2026</span>
            <span>Fitness Australia registered · All coaches first-aid current</span>
          </div>
        </footer>
      </div>
    </>
  );
}
