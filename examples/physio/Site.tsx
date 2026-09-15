import Image from 'next/image';
import { Sora, Source_Sans_3 } from 'next/font/google';
import { asset } from '@/lib/asset';
import { InPageScroll, Reveal, ScrollSpy } from '@/examples/_shared/primitives';

/*
  RIDGEWAY PHYSIOTHERAPY
  Clinical, direct, no stock smiles. Fees and the next appointment on the front page.
  Bone white, ink, one dark medical green.
  Wordmark and nav: Sora — geometric, full-width, not Anybody condensed,
  not Archivo Black, not Hanken Grotesk, not Outfit.
*/

const display = Sora({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--rw-display',
  display: 'swap',
});
const sans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--rw-sans',
  display: 'swap',
});

const photo = (file: string) => asset(`/examples/physio/${file}`);
const mark = 'font-[family-name:var(--rw-display)] font-bold tracking-[-0.03em]';
const menu = 'font-[family-name:var(--rw-display)] font-medium tracking-[-0.01em]';

const GREEN = '#1A4D3E';
const label = 'text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0B0B0B]/55';
const rule = 'border-[#0B0B0B]/15';

const slots = [
  { day: 'Tomorrow', time: '08:15', who: 'Sam' },
  { day: 'Tomorrow', time: '11:45', who: 'Priya' },
  { day: 'Thursday', time: '07:30', who: 'Tom' },
];

const services = [
  { h: 'Musculoskeletal physio', p: 'Joints, muscles and tendons. Assessment, hands-on treatment and a plan you can follow at home.' },
  { h: 'Sports injuries', p: 'Sprains, strains and return-to-play. We work with weekend sport as well as club and school athletes.' },
  { h: 'Back and neck pain', p: 'Acute or long-standing. Hands-on work where it helps, then exercise so it stays better.' },
  { h: 'Post-surgical rehab', p: 'After knee, hip, shoulder or spinal surgery. We follow your surgeon’s protocol and keep them in the loop.' },
  { h: 'Dry needling', p: 'Used alongside manual therapy for tight muscle, not as a treatment on its own.' },
  { h: 'Exercise rehab and clinical Pilates', p: 'Supervised strength and mat work in the gym at the back. Small groups, or one-to-one if you need it.' },
];

const fees = [
  { item: 'Initial consultation', len: '45 min', price: 120 },
  { item: 'Standard follow-up', len: '30 min', price: 95 },
  { item: 'Extended follow-up', len: '45 min', price: 130 },
  { item: 'Clinical Pilates / exercise class', len: '60 min · small group', price: 35 },
];

const people = [
  {
    name: 'Sam Ridgeway',
    role: 'Principal physiotherapist',
    note: 'Musculoskeletal and spinal. Workers compensation and CTP claims.',
    photo: 'sam.jpg',
    pos: 'object-[72%_18%]',
  },
  {
    name: 'Priya Nair',
    role: 'Sports physiotherapist',
    note: 'Sports injuries, knees and shoulders, return to running.',
    photo: 'priya.jpg',
    pos: 'object-[38%_18%]',
  },
  {
    name: 'Tom Alder',
    role: 'Physiotherapist',
    note: 'Post-surgical rehab and clinical exercise classes.',
    photo: 'tom.jpg',
    pos: 'object-[50%_45%]',
  },
];

export default function RidgewayPage() {
  return (
    <>
      <InPageScroll />
      <div
        data-example=""
        className={`${display.variable} ${sans.variable} font-[family-name:var(--rw-sans)] min-h-screen bg-[#FAFAF8] text-[#0B0B0B] antialiased selection:bg-[#1A4D3E] selection:text-white`}
      >
        {/* Header: Sora wordmark and nav. Hash links kept for in-page scroll. */}
        <header className={`custom-header fixed inset-x-0 top-0 z-50 border-b ${rule} bg-[#FAFAF8]/90 backdrop-blur-md`}>
          <div className="flex min-h-[4.5rem] flex-wrap items-center justify-between gap-x-3 gap-y-2 px-5 py-2 md:flex-nowrap md:px-8">
            <a href="#top" className="min-w-0 shrink-0">
              <span className={`${mark} block text-[18px] leading-none sm:text-[20px] md:text-[22px]`}>
                Ridgeway <span className="font-normal text-[#0B0B0B]/55">Physio</span>
              </span>
            </a>

            <ScrollSpy
              items={[
                { href: '#services', label: 'Services' },
                { href: '#book', label: 'Book' },
                { href: '#fees', label: 'Fees' },
                { href: '#people', label: 'People' },
                { href: '#visit', label: 'Visit' },
              ]}
              className="hidden h-11 min-w-0 flex-1 items-stretch justify-center md:flex"
              linkClass={`${menu} relative flex items-center whitespace-nowrap px-2.5 text-[13px] transition-colors duration-200 after:absolute after:inset-x-2 after:bottom-0 after:h-[2px] after:origin-left after:bg-[#1A4D3E] after:transition-transform after:duration-300 after:content-[''] lg:px-3.5 lg:text-[14px]`}
              activeClass="text-[#0B0B0B] after:scale-x-100"
              inactiveClass="text-[#0B0B0B]/55 hover:text-[#0B0B0B] after:scale-x-0"
            />

            <a
              href="#book"
              className={`${menu} group inline-flex h-10 shrink-0 items-center gap-2 rounded-md px-4 text-[13px] text-white transition-colors duration-200 hover:bg-[#0B0B0B] lg:h-11 lg:px-5 lg:text-[14px]`}
              style={{ background: GREEN }}
            >
              Book
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </header>

        {/* Hero */}
        <section id="top" className="flex min-h-[100svh] flex-col justify-between px-5 pb-8 pt-28 md:px-8">
          <div className="grid grid-cols-12 gap-x-4 gap-y-12">
            <div className="col-span-12 md:col-span-8">
              <Reveal delay={80}>
                <h1 className="text-[clamp(40px,7vw,88px)] font-medium leading-[0.95] tracking-[-0.04em]">
                  Physiotherapy
                  <br />
                  for everyday injuries.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-8 max-w-[32rem] text-[17px] leading-[1.45] md:text-[19px]">
                  Musculoskeletal physio, sports injuries, post-op rehab and exercise classes. Hands-on treatment, a clear plan,
                  and online booking through HotDoc.
                </p>
              </Reveal>
            </div>

            <Reveal delay={200} className="col-span-12 md:col-span-4 md:self-end" as="div">
              <div className={`border-t ${rule} pt-4`}>
                <p className={label}>Next available</p>
                <p className="mt-3 text-[clamp(34px,4vw,56px)] font-medium leading-none tracking-[-0.04em]">
                  Tomorrow <span className="tabular-nums" style={{ color: GREEN }}>08:15</span>
                </p>
                <ul className={`mt-6 divide-y ${rule} border-y ${rule}`}>
                  {slots.map((s) => (
                    <li key={s.day + s.time}>
                      <a href="#book" className="group flex items-baseline justify-between py-3 text-[15px]">
                        <span>
                          {s.day} <span className="tabular-nums">{s.time}</span>
                          <span className="ml-2 text-[#0B0B0B]/45">with {s.who}</span>
                        </span>
                        <span className="translate-x-0 transition-transform group-hover:translate-x-1" aria-hidden="true">
                          →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a href="#book" className="mt-4 inline-block text-[14px] underline decoration-[#0B0B0B]/30 underline-offset-4 hover:decoration-[#1A4D3E]">
                  All times, online
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={260} className={`mt-16 grid grid-cols-1 gap-3 border-t ${rule} pt-4 md:grid-cols-3`}>
            {['HICAPS on the spot', 'Workers comp · CTP · NDIS · DVA', 'Medicare care plans (EPC / CDM)'].map((t) => (
              <p key={t} className={label}>
                {t}
              </p>
            ))}
          </Reveal>
        </section>

        {/* Photograph */}
        <Reveal as="figure" className="relative aspect-[3/2] w-full overflow-hidden md:aspect-[21/9]">
          <Image
            src={photo('rehab.jpg')}
            alt="Supervised rehab on the reformers"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_40%] grayscale contrast-[1.1]"
          />
        </Reveal>


        {/* Online booking: a HotDoc widget embedded on the page. */}
        <section id="book" className={`border-t ${rule} px-5 py-20 md:px-8 md:py-28`}>
          <div className="grid grid-cols-12 gap-x-4 gap-y-10">
            <Reveal className="col-span-12 md:col-span-4">
              <p className={label}>Book online</p>
              <h2 className="mt-4 text-[clamp(32px,4vw,56px)] font-medium leading-[0.95] tracking-[-0.04em]">
                Pick a time.
                <br />
                No phone call.
              </h2>
              <p className="mt-6 max-w-[22rem] text-[16px] leading-[1.5]">
                Bookings run through HotDoc, the same system most GPs use. You will get a text reminder the day before and can
                move or cancel online up to four hours out.
              </p>
              <ul className="mt-6 space-y-2 text-[14px] text-[#0B0B0B]/60">
                <li>No account needed for your first booking</li>
                <li>Workers compensation, CTP, NDIS, DVA and Medicare care plans accepted</li>
                <li>HICAPS claiming on the spot for private health</li>
              </ul>
            </Reveal>

            <Reveal delay={100} className="col-span-12 md:col-span-7 md:col-start-6">
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
                    {[
                      ['New patient', '45 min · $120', true],
                      ['Follow-up', '30 min · $95', false],
                      ['Telehealth follow-up', '20 min · $60', false],
                    ].map(([t, d, on]) => (
                      <button
                        key={t as string}
                        type="button"
                        aria-pressed={on as boolean}
                        className={`rounded-lg border px-3.5 py-2 text-left text-[14px] transition-colors ${
                          on ? 'border-[#1A4D3E] bg-[#1A4D3E]/5' : 'border-[#0B0B0B]/15 hover:border-[#0B0B0B]/40'
                        }`}
                      >
                        <span className="block font-medium">{t}</span>
                        <span className="block text-[12px] text-[#0B0B0B]/55">{d}</span>
                      </button>
                    ))}
                  </div>

                  <p className={`${label} mt-6`}>Practitioner</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      ['Any', true],
                      ['Sam Whitaker', false],
                      ['Priya Nair', false],
                      ['Tom Reilly', false],
                    ].map(([n, on]) => (
                      <button
                        key={n as string}
                        type="button"
                        aria-pressed={on as boolean}
                        className={`rounded-full border px-3.5 py-1.5 text-[14px] transition-colors ${
                          on ? 'border-[#0B0B0B] bg-[#0B0B0B] text-white' : 'border-[#0B0B0B]/15 hover:border-[#0B0B0B]/40'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <p className={label}>This week</p>
                    <p className="text-[12px] text-[#0B0B0B]/55">Times shown in your local time</p>
                  </div>
                  <div className="mt-3 grid grid-cols-5 gap-2">
                    {[
                      ['Tue', '16', ['08:15', '11:45', '15:30']],
                      ['Wed', '17', ['07:30', '13:00']],
                      ['Thu', '18', ['07:30', '10:15', '16:45']],
                      ['Fri', '19', ['09:00']],
                      ['Sat', '20', []],
                    ].map(([d, n, times]) => (
                      <div key={d as string}>
                        <p className="text-center text-[12px] text-[#0B0B0B]/55">
                          {d as string} <span className="tabular-nums text-[#0B0B0B]">{n as string}</span>
                        </p>
                        <div className="mt-2 space-y-1.5">
                          {(times as string[]).length ? (
                            (times as string[]).map((t, i) => (
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
                    <span className="text-[#0B0B0B]/55"> · New patient, 45 min, with Sam</span>
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
            </Reveal>
          </div>
        </section>

        {/* The first 45 minutes */}
        <section id="services" className={`border-t ${rule} px-5 py-20 md:px-8 md:py-28`}>
          <div className="grid grid-cols-12 gap-4">
            <Reveal className="col-span-12 md:col-span-3">
              <p className={label}>What we treat</p>
            </Reveal>
            <Reveal delay={60} className="col-span-12 md:col-span-8 md:col-start-5">
              <p className="text-[clamp(26px,3.6vw,44px)] font-medium leading-[1.08] tracking-[-0.03em]">
                The usual things a physio clinic sees: backs, necks, sport, surgery rehab, and a gym for the exercises afterwards.
              </p>
            </Reveal>
          </div>
          <ul className={`mt-16 grid gap-8 border-t ${rule} pt-10 md:grid-cols-2`}>
            {services.map((s, i) => (
              <Reveal key={s.h} as="li" delay={i * 40} y={14} className="md:pr-8">
                <h3 className="text-[22px] font-medium tracking-[-0.02em]">{s.h}</h3>
                <p className="mt-3 text-[15px] leading-[1.5] text-[#0B0B0B]/70 md:text-[16px]">{s.p}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Fees */}
        <section id="fees" className={`border-t ${rule} px-5 py-20 md:px-8 md:py-28`}>
          <div className="grid grid-cols-12 gap-4">
            <Reveal className="col-span-12 md:col-span-3">
              <p className={label}>Fees</p>
              <p className="mt-6 max-w-[16rem] text-[15px] leading-[1.5] text-[#0B0B0B]/70">
                Published fees. HICAPS on the spot. We accept workers compensation, CTP, NDIS, DVA and Medicare care plans
                (EPC / CDM).
              </p>
            </Reveal>
            <div className="col-span-12 md:col-span-8 md:col-start-5">
              <ul className={`border-t ${rule}`}>
                {fees.map((f, i) => (
                  <Reveal key={f.item} as="li" delay={i * 50} y={12} className={`grid grid-cols-12 items-baseline gap-4 border-b ${rule} py-6`}>
                    <span className="col-span-8 text-[clamp(20px,2.2vw,30px)] font-medium leading-none tracking-[-0.03em] md:col-span-6">{f.item}</span>
                    <span className="col-span-4 hidden text-[12px] text-[#0B0B0B]/55 md:col-span-3 md:block">{f.len}</span>
                    <span className="col-span-4 text-right text-[clamp(28px,3.4vw,48px)] font-medium leading-none tracking-[-0.04em] tabular-nums md:col-span-3">
                      <span className="align-top text-[0.5em] font-normal text-[#0B0B0B]/55">$</span>
                      {f.price}
                    </span>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={200}>
                <p className="mt-6 text-[13px] leading-[1.5] text-[#0B0B0B]/55">
                  No gap for DVA and icare claims. Missed appointments without 24 hours’ notice are charged at half rate, and
                  we will remind you the day before.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* People */}
        <section id="people" className={`border-t ${rule} px-5 py-20 md:px-8 md:py-28`}>
          <Reveal>
            <p className={label}>Who you will see</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-12 gap-x-4 gap-y-14">
            {people.map((p, i) => (
              <Reveal key={p.name} as="figure" delay={i * 80} className={`col-span-12 md:col-span-4 ${i === 1 ? 'md:mt-24' : ''} ${i === 2 ? 'md:mt-12' : ''}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-[#0B0B0B]/5">
                  <Image
                    src={photo(p.photo)}
                    alt={`${p.name}, ${p.role}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className={`object-cover grayscale contrast-[1.1] transition-[filter] duration-700 hover:grayscale-0 ${p.pos}`}
                  />
                </div>
                <figcaption className="mt-4">
                  <p className="text-[19px] font-medium tracking-[-0.02em]">{p.name}</p>
                  <p className={`${label} mt-1`}>{p.role}</p>
                  <p className="mt-3 max-w-[22rem] text-[15px] leading-[1.5] text-[#0B0B0B]/70">{p.note}</p>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Visit */}
        <section id="visit" className={`border-t ${rule} px-5 py-20 md:px-8 md:py-28`}>
          <div className="grid grid-cols-12 gap-x-4 gap-y-10">
            <Reveal className="col-span-12 md:col-span-3">
              <p className={label}>Visit</p>
            </Reveal>
            <Reveal delay={60} className="col-span-12 md:col-span-4 md:col-start-5">
              <p className={label}>Where</p>
              <p className="mt-3 text-[19px] leading-[1.35] tracking-[-0.01em]">
                Ground floor, street entry
                <br />
                Next to the pharmacy
              </p>
              <p className="mt-3 text-[12px] text-[#0B0B0B]/55">Step-free · Parking behind · Bus stop outside</p>
              <p className="mt-6 text-[15px] leading-[1.5] text-[#0B0B0B]/70">
                Come in as you are. There is a change room, and you do not need to bring anything except the shoes you
                usually wear.
              </p>
            </Reveal>
            <Reveal delay={120} className="col-span-12 md:col-span-4">
              <p className={label}>When</p>
              <dl className="mt-3 text-[19px] leading-[1.35] tracking-[-0.01em]">
                {[
                  ['Mon – Thu', '07:00 – 18:30'],
                  ['Fri', '07:00 – 16:00'],
                  ['Sat', '08:00 – 12:00'],
                  ['Sun', 'Closed'],
                ].map(([d, t]) => (
                  <div key={d} className={`flex justify-between border-b ${rule} py-2 md:max-w-[20rem]`}>
                    <dt>{d}</dt>
                    <dd className="tabular-nums">{t}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="custom-footer border-t border-[#0B0B0B]">
          <Reveal className="px-5 py-16 md:px-8 md:py-24">
            <a href="#book" className="group block">
              <p className="text-[clamp(44px,9vw,150px)] font-medium leading-[0.9] tracking-[-0.045em] transition-colors duration-300 group-hover:text-[#1A4D3E]">
                Book an
                <br />
                appointment <span className="inline-block transition-transform duration-300 group-hover:translate-x-3">→</span>
              </p>
            </a>
          </Reveal>
          <div className={`flex flex-col gap-2 border-t ${rule} px-5 py-5 text-[11px] uppercase tracking-[0.18em] text-[#0B0B0B]/45 md:flex-row md:items-center md:justify-between md:px-8`}>
            <span>© Ridgeway Physiotherapy 2026</span>
            <span>AHPRA registered · 02 5550 2110 · hello@ridgewayphysio.com.au</span>
          </div>
        </footer>
      </div>
    </>
  );
}
