import type { ReactNode } from 'react';
import Image from 'next/image';
import { Bricolage_Grotesque, DM_Mono, DM_Sans } from 'next/font/google';
import { InPageScroll, Reveal } from '@/examples/_shared/primitives';

/*
  IRONBARK — a tiny house in the bush, booked direct.
  One flat system: paper, ink and a single ember accent. No radius, no shadows,
  hairline rules, numbered sections, mono labels and tabular figures. Photos are
  monochrome and colour up on hover; the accent is the only colour on the page.
  Full-bleed hero, a strict photo grid, a sticky booking card, live availability.
*/

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--ib-display',
  display: 'swap',
});
const sans = DM_Sans({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--ib-sans',
  display: 'swap',
});
const monoFont = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--ib-mono',
  display: 'swap',
});

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const PAPER = '#F3F0E8';
const INK = '#121410';
const ACCENT = '#E1481A';
const h = 'font-[family-name:var(--ib-display)] font-semibold tracking-[-0.04em]';
const label = 'font-[family-name:var(--ib-mono)] text-[11px] uppercase tracking-[0.12em]';
const rule = 'border-[#121410]/15';
const hair = 'bg-[#121410]/15';
const cell = 'bg-[#F3F0E8]';
const muted = 'text-[#121410]/55';
const photo = 'object-cover grayscale contrast-[1.05] transition-[filter] duration-500 hover:grayscale-0';

const photos = [
  { id: '1710743387063-f8f67e2abf81', alt: 'The hut at dusk, lights on, ironbarks behind' },
  { id: '1623015522585-ddc7e066a821', alt: 'The tiny cabin in the trees' },
  { id: '1607582544956-a874e6740135', alt: 'The ladder up to the sleeping loft' },
  { id: '1728977521247-9aa4851f45e7', alt: 'The track in through the trees' },
  { id: '1668015642451-a3bb11afb441', alt: 'The deck of the hut among the trees' },
];

const nav = [
  ['#photos', 'Photos'],
  ['#stay', 'The hut'],
  ['#availability', 'Availability'],
  ['#reviews', 'Reviews'],
  ['#where', 'Where'],
] as const;

const highlights = [
  { h: 'Off-grid, properly', p: 'Solar, rainwater and a composting loo. Everything works; nothing hums.' },
  { h: 'A bath under the trees', p: 'Wood-fired, on the deck, big enough for two. Light it at five, get in at seven.' },
  { h: 'No signal, by design', p: 'One bar if you climb the ridge. Downloads before you leave; a paper map in the drawer.' },
  { h: 'Self check-in', p: 'Gate code and hut code sent the morning you arrive. Come when you like after 2pm.' },
];

const amenities = [
  'Queen bed in the loft',
  'Linen and towels',
  'Wood-fired outdoor bath',
  'Rain shower, hot',
  'Full kitchen, gas hob',
  'Pour-over coffee and a hand grinder',
  'Wood heater and a stacked woodpile',
  'Firepit and camp chairs',
  'Solar power, 240V outlets',
  'Rainwater, filtered',
  'Composting toilet',
  'Walks from the door, 2 to 9 km',
];

const reviews = [
  { name: 'Hannah', when: 'Aug 2026', stars: 5, text: 'We did nothing for three days and it was the best thing we have done all year. The bath is the whole point. Go in winter.' },
  { name: 'Marcus', when: 'Jul 2026', stars: 5, text: 'Exactly as photographed, which is rare. The hut is small but it never felt it. Watch for the wallabies at the gate around dusk.' },
  { name: 'Priya & Tom', when: 'May 2026', stars: 5, text: 'Mia’s notes are perfect: where the good firewood is, how long the bath takes, which walk to do first. We did not touch our phones.' },
  { name: 'Eleanor', when: 'Apr 2026', stars: 4, text: 'Beautiful, quiet, well thought out. The last stretch of track is gravel and steep in a couple of spots; fine in a hatchback, just slow down.' },
];

const ratings = [
  ['Cleanliness', 5.0],
  ['Accuracy', 4.9],
  ['Check-in', 5.0],
  ['Communication', 5.0],
  ['Value', 4.8],
] as const;

const steps = [
  ['Book direct', 'Same calendar as Airbnb and Booking.com, without their service fee. Ironbark keeps the full nightly rate.'],
  ['Pay securely', 'Half at booking, the balance seven days out, through Little Hotelier Payments. Free cancellation up to 14 days before.'],
  ['Get the details by text', 'Gate code, directions and the track map arrive the day before. Check-in is self-serve from 2pm.'],
];

const know = [
  { h: 'House rules', items: ['Check-in after 2pm', 'Checkout by 11am', '2 guests maximum', 'No parties, no drones', 'Fires only in the pit and the bath'] },
  { h: 'Safety', items: ['Off-grid: no mains power or town water', 'Steep ladder to the loft', 'Total fire ban days: no bath, no firepit', 'Snakes exist; wear shoes on the track', 'Nearest hospital 40 minutes'] },
  { h: 'Cancellation', items: ['Full refund up to 14 days before', '50% refund up to 7 days before', 'Weather is not a reason; rain is the best time', 'Move your dates once, free, within 12 months'] },
];

/** One month of availability. Days in `booked` are taken; `stay` is the selected example. */
const month = {
  name: 'October',
  startsOn: 3, // Thursday, 0 = Sunday
  days: 31,
  booked: new Set([2, 3, 4, 9, 10, 11, 17, 18, 24, 25, 26, 30, 31]),
  stay: [12, 13, 14],
};

function Star({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.9l-5.3 2.8 1.1-5.9L3.5 9.7l5.9-.8z" fill="currentColor" />
    </svg>
  );
}

function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Shield({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`h-3 w-3 ${i <= n ? 'text-[#121410]' : 'text-[#121410]/20'}`} />
      ))}
    </span>
  );
}

/** Numbered section rule: hairline on top, mono index and title, optional aside on the right. */
function Head({ title, aside }: { title: string; aside?: ReactNode }) {
  return (
    <div className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t ${rule} pt-3`}>
      <p className={label}>{title}</p>
      {aside}
    </div>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="group inline-flex items-center gap-2 text-[14px] font-medium underline decoration-[#121410]/30 underline-offset-[5px] transition-colors hover:decoration-[#121410]">
      {children}
      <Arrow className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  );
}

/** Little Hotelier (SiteMinder) is the booking engine and channel manager small Australian stays run on. */
function LittleHotelier({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap font-semibold text-[#121410] ${className}`}>
      <span className="grid h-3.5 w-3.5 place-items-center rounded-[3px] text-[8px] font-bold text-white" style={{ background: '#0F5C6E' }} aria-hidden="true">
        LH
      </span>
      Little Hotelier
    </span>
  );
}

function Calendar() {
  const cells: Array<number | null> = [...Array<null>(month.startsOn).fill(null), ...Array.from({ length: month.days }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  const first = month.stay[0];
  const last = month.stay[month.stay.length - 1];
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className={`${h} text-[26px] leading-none`}>{month.name} 2026</p>
        <p className={`${label} ${muted}`}>Min. two nights</p>
      </div>
      <p className={`mt-3 flex items-start gap-2 text-[13px] leading-[1.5] ${muted}`}>
        <span className="mt-[6px] block h-1.5 w-1.5 shrink-0" style={{ background: ACCENT }} aria-hidden="true" />
        <span>
          Live availability, synced with Airbnb and Booking.com via <LittleHotelier />. Updated 2 min ago.
        </span>
      </p>
      <div className={`mt-5 grid grid-cols-7 text-center ${label} ${muted}`}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <span key={d} className="py-2">
            {d}
          </span>
        ))}
      </div>
      <div className={`grid grid-cols-7 gap-px border ${rule} ${hair}`}>
        {cells.map((d, i) => {
          if (!d) return <span key={`e${i}`} className={`aspect-square ${cell}`} />;
          const booked = month.booked.has(d);
          const inStay = d >= first && d <= last;
          return (
            <span
              key={d}
              className={`flex aspect-square items-center justify-center text-[14px] tabular-nums transition-colors ${
                inStay ? 'font-medium text-[#F3F0E8]' : booked ? `${cell} text-[#121410]/30 line-through` : `${cell} hover:bg-[#121410]/6`
              }`}
              style={inStay ? { background: ACCENT } : undefined}
              aria-current={inStay ? 'date' : undefined}
            >
              {d}
            </span>
          );
        })}
      </div>
      <div className={`mt-4 flex flex-wrap gap-x-6 gap-y-2 ${label} ${muted}`}>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5" style={{ background: ACCENT }} aria-hidden="true" /> Your stay
        </span>
        <span className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 border ${rule}`} aria-hidden="true" /> Available
        </span>
        <span className="flex items-center gap-2">
          <span className="line-through">14</span> Booked, here or on another site
        </span>
      </div>
    </div>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div className={`${cell} px-3.5 py-3`}>
      <p className={`${label} ${muted}`}>{k}</p>
      <p className="mt-1 text-[15px] tabular-nums">{v}</p>
    </div>
  );
}

function BookingCard() {
  return (
    <div className={`border ${rule} p-6`}>
      <div className="flex items-baseline justify-between">
        <p className="flex items-baseline gap-2">
          <span className={`${h} text-[36px] leading-none tabular-nums`}>$320</span>
          <span className={`${label} ${muted}`}>per night</span>
        </p>
        <p className="flex items-center gap-1.5 text-[14px] tabular-nums">
          <Star className="h-3 w-3" /> 4.98 <span className={muted}>· 212</span>
        </p>
      </div>

      <div className={`mt-6 grid grid-cols-2 gap-px border ${rule} ${hair}`}>
        <Field k="Check-in" v="12 Oct" />
        <Field k="Checkout" v="15 Oct" />
        <div className={`col-span-2 ${cell}`}>
          <Field k="Guests" v="2 guests" />
        </div>
      </div>

      <a
        href="#availability"
        className="mt-3 flex h-12 items-center justify-between px-4 text-[15px] font-semibold text-[#F3F0E8] transition-[filter] hover:brightness-95"
        style={{ background: ACCENT }}
      >
        Reserve
        <Arrow className="h-4 w-4" />
      </a>
      <p className={`mt-3 text-[13px] ${muted}`}>Pay half now, the rest a week before you arrive.</p>

      <dl className={`mt-6 divide-y ${rule} border-t ${rule} text-[14px] tabular-nums`}>
        <div className="flex justify-between py-2.5">
          <dt>$320 × 3 nights</dt>
          <dd>$960</dd>
        </div>
        <div className="flex justify-between py-2.5">
          <dt>Cleaning and firewood</dt>
          <dd>$85</dd>
        </div>
        <div className="flex justify-between py-2.5">
          <dt>Booking direct</dt>
          <dd style={{ color: ACCENT }}>– $0 fees</dd>
        </div>
        <div className="flex items-baseline justify-between py-3">
          <dt className="font-semibold">Total</dt>
          <dd className={`${h} text-[22px] leading-none`}>$1,045</dd>
        </div>
      </dl>

      <div className={`flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t ${rule} pt-4 text-[12px] ${muted}`}>
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <Shield className="h-3.5 w-3.5" />
          Secure booking by <LittleHotelier />
        </span>
        <span className="flex gap-1">
          {['Visa', 'MC', 'Apple Pay'].map((c) => (
            <span key={c} className={`whitespace-nowrap border ${rule} px-1.5 py-0.5 ${label} text-[9px] text-[#121410]/70`}>
              {c}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

export default function IronbarkPage() {
  return (
    <>
      <InPageScroll />

      <div
        data-example=""
        id="top"
        className={`${display.variable} ${sans.variable} ${monoFont.variable} font-[family-name:var(--ib-sans)] min-h-screen pb-24 antialiased selection:bg-[#E1481A] selection:text-[#F3F0E8] lg:pb-0`}
        style={{ color: INK, background: PAPER }}
      >
        {/* Header: name, five anchors, one Book action. Solid paper, hairline underneath. */}
        <header className={`custom-header sticky top-0 z-50 border-b ${rule}`} style={{ background: PAPER }}>
          <div className="mx-auto flex h-14 max-w-[84rem] items-center justify-between gap-6 px-5 md:px-8">
            <a href="#top" className={`${h} text-[20px] leading-none`}>
              Ironbark
            </a>
            <nav className={`hidden items-center gap-7 ${label} md:flex`}>
              {nav.map(([href, t]) => (
                <a key={href} href={href} className={`${muted} transition-colors hover:text-[#121410]`}>
                  {t}
                </a>
              ))}
            </nav>
            <a href="#availability" className="inline-flex h-9 items-center gap-3 px-4 text-[13px] font-semibold text-[#F3F0E8] transition-[filter] hover:brightness-90" style={{ background: INK }}>
              Book
              <span className="hidden tabular-nums opacity-60 sm:inline">$320 / night</span>
            </a>
          </div>
        </header>

        {/* Hero: full-bleed monochrome photo under a flat ink tint, the title set over it. */}
        <section className="relative h-[calc(100svh-3.5rem)] min-h-[560px] max-h-[900px] w-full">
          <Image src={img(photos[0].id, 2200)} alt={photos[0].alt} fill priority sizes="100vw" className="object-cover grayscale contrast-[1.05]" />
          <div className="absolute inset-0" style={{ background: 'rgba(18,20,16,0.42)' }} aria-hidden="true" />
          <div className="absolute inset-0 mx-auto flex max-w-[84rem] flex-col justify-between px-5 pt-5 pb-24 text-[#F3F0E8] md:px-8 md:pt-7 lg:pb-7">
            <Reveal className={`flex items-baseline justify-between ${label}`} y={0}>
              <span>Tiny house · Sleeps 2 · Off-grid</span>
              <span className="hidden sm:inline">Direct bookings · No platform fees</span>
            </Reveal>
            <Reveal delay={80} y={16} className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h1 className={`${h} max-w-[13ch] text-[clamp(44px,7.4vw,112px)] leading-[0.92]`}>
                A tiny house on forty acres of <span style={{ color: ACCENT }}>ironbark.</span>
              </h1>
              <div className={`flex shrink-0 flex-wrap gap-x-6 gap-y-2 border-t border-[#F3F0E8]/30 pt-4 md:flex-col md:items-end md:gap-y-3 md:border-t-0 md:pt-0 md:text-right ${label}`}>
                <span className="flex items-center gap-1.5 tabular-nums">
                  <Star className="h-3 w-3" /> 4.98 · 212 reviews
                </span>
                <span className="tabular-nums">$320 per night</span>
                <span>Ninety minutes from the city</span>
              </div>
            </Reveal>
          </div>
        </section>

        <main className="mx-auto max-w-[84rem] px-5 pb-16 md:px-8 md:pb-20">
          {/* Photos. */}
          <section id="photos" className="pt-16 md:pt-20">
            <Reveal>
              <Head title="Photos" aside={<TextLink href="#">All 31 photos</TextLink>} />
              <div className={`mt-6 grid grid-cols-2 gap-px border ${rule} ${hair} md:grid-cols-4`}>
                {photos.slice(1).map((p) => (
                  <figure key={p.id} className={cell}>
                    <div className="relative aspect-[4/5]">
                      <Image src={img(p.id, 900)} alt={p.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className={photo} />
                    </div>
                    <figcaption className={`px-3 py-3 ${label} ${muted} normal-case tracking-normal`}>
                      {p.alt}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
          </section>

          {/* Body + booking card */}
          <div className="mt-16 grid grid-cols-12 gap-x-8 md:mt-20">
            <div className="col-span-12 space-y-16 lg:col-span-7 md:space-y-20">
              {/* 02 The hut: host, highlights, description */}
              <section id="stay">
                <Reveal>
                  <Head title="The hut" aside={<span className={`${label} ${muted}`}>32 m² · Loft · Deck</span>} />
                  <div className="mt-6 flex items-start justify-between gap-6">
                    <div>
                      <p className={`${h} text-[clamp(28px,3vw,40px)] leading-none`}>Hosted by Mia</p>
                      <p className={`mt-3 text-[14px] ${muted}`}>Superhost · 6 years hosting · Lives on the property, out of sight</p>
                    </div>
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden md:h-20 md:w-20">
                      <Image src={img('1517841905240-472988babdf9', 300)} alt="Mia, the host" fill sizes="80px" className={photo} />
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={60} className={`mt-10 grid grid-cols-1 gap-px border ${rule} ${hair} sm:grid-cols-2`}>
                  {highlights.map((it) => (
                    <div key={it.h} className={`${cell} p-5`}>
                      <p className={`${h} text-[20px] leading-tight`}>{it.h}</p>
                      <p className={`mt-2 text-[14px] leading-[1.55] ${muted}`}>{it.p}</p>
                    </div>
                  ))}
                </Reveal>

                <Reveal delay={60} className="mt-10">
                  <p className={`${h} text-[clamp(24px,2.4vw,32px)] leading-[1.15]`}>
                    Thirty-two square metres, a loft you climb a ladder to, and a bath you light a fire under. The nearest
                    neighbour is a kilometre of bush away.
                  </p>
                  <div className={`mt-6 max-w-[38rem] space-y-4 text-[16px] leading-[1.6] ${muted}`}>
                    <p>
                      We built the hut in 2020 with a local carpenter and a lot of recycled ironbark. It faces east, so the sun comes
                      into the loft first thing and the deck is in shade by the time you want a drink on it.
                    </p>
                    <p>
                      Inside there is everything you need and nothing else: a proper kitchen, a wood heater, a long table, one very
                      good chair. Outside there is the bath, the firepit, and forty acres you are welcome to wander. Wallabies at dusk,
                      lyrebirds if you are quiet.
                    </p>
                  </div>
                </Reveal>
              </section>

              {/* 03 What's here */}
              <Reveal as="section">
                <Head title="What’s here" aside={<TextLink href="#">Show all 28 amenities</TextLink>} />
                <ul className="mt-4 grid grid-cols-1 gap-x-10 text-[15px] sm:grid-cols-2">
                  {amenities.map((a) => (
                    <li key={a} className={`border-b ${rule} py-3`}>
                      {a}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* 04 Availability */}
              <Reveal id="availability" as="section">
                <Head title="Availability" aside={<span className={`${label} ${muted} tabular-nums`}>12 – 15 Oct · 3 nights</span>} />
                <p className={`mt-6 text-[14px] ${muted}`}>Check-in from 2pm, checkout by 11am.</p>
                <div className="mt-8 max-w-[26rem]">
                  <Calendar />
                </div>

                <div className={`mt-12 grid grid-cols-1 gap-px border ${rule} ${hair} sm:grid-cols-3`}>
                  {steps.map(([t, d]) => (
                    <div key={t} className={`${cell} p-5`}>
                      <p className={`${h} text-[20px] leading-tight`}>{t}</p>
                      <p className={`mt-2 text-[14px] leading-[1.55] ${muted}`}>{d}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <aside className="col-span-12 lg:col-span-4 lg:col-start-9">
              <div id="book" className="hidden lg:sticky lg:top-[5.5rem] lg:block">
                <Reveal delay={120}>
                  <BookingCard />
                </Reveal>
              </div>
            </aside>
          </div>

          {/* 05 Reviews */}
          <section id="reviews" className="mt-16 md:mt-20">
            <Reveal>
              <Head title="Reviews" aside={<span className={`${label} ${muted} tabular-nums`}>212 reviews · 96% five stars</span>} />
            </Reveal>
            <div className="mt-6 grid grid-cols-12 gap-x-8 gap-y-10">
              <Reveal delay={40} className="col-span-12 lg:col-span-5">
                <p className={`${h} flex items-start gap-3 text-[clamp(72px,10vw,150px)] leading-[0.9] tabular-nums`}>
                  4.98
                  <Star className="mt-[0.12em] h-[0.26em] w-[0.26em]" />
                </p>
                <dl className={`mt-8 max-w-[26rem] divide-y ${rule} border-t ${rule} text-[14px]`}>
                  {ratings.map(([k, v]) => (
                    <div key={k} className="flex items-center gap-5 py-2.5">
                      <dt className="w-32 shrink-0">{k}</dt>
                      <dd className="flex flex-1 items-center gap-4">
                        <span className="h-[2px] flex-1 bg-[#121410]/12">
                          <span className="block h-[2px]" style={{ width: `${(v / 5) * 100}%`, background: INK }} />
                        </span>
                        <span className="w-7 text-right tabular-nums">{v.toFixed(1)}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
              <Reveal delay={100} className={`col-span-12 grid grid-cols-1 gap-px border ${rule} ${hair} sm:grid-cols-2 lg:col-span-7`}>
                {reviews.map((r) => (
                  <blockquote key={r.name} className={`${cell} flex flex-col p-5`}>
                    <div className={`flex items-baseline justify-between ${label}`}>
                      <span>{r.name}</span>
                      <span className={muted}>{r.when}</span>
                    </div>
                    <p className="mt-6 text-[15px] leading-[1.55]">{r.text}</p>
                    <div className="mt-auto pt-5">
                      <Stars n={r.stars} />
                    </div>
                  </blockquote>
                ))}
              </Reveal>
            </div>
          </section>

          {/* 06 Where: approximate only, no place names, no pin. */}
          <section id="where" className="mt-16 md:mt-20">
            <Reveal>
              <Head title="Where you’ll be" aside={<span className={`${label} ${muted}`}>Approximate · Exact location after booking</span>} />
            </Reveal>
            <div className="mt-6 grid grid-cols-12 gap-x-8 gap-y-8">
              <Reveal delay={40} className="col-span-12 md:col-span-5">
                <p className={`${h} text-[clamp(24px,2.4vw,32px)] leading-[1.15]`}>Ninety minutes from the city, the last twenty on a gravel track through state forest.</p>
                <p className={`mt-5 max-w-[34rem] text-[15px] leading-[1.6] ${muted}`}>
                  Exact directions come with your booking; the general store with the good pies is fifteen minutes back down the hill.
                </p>
                <ul className={`mt-6 divide-y ${rule} border-y ${rule} text-[15px]`}>
                  {['2WD is fine, just take the track slowly', 'Bring supplies in; the nearest shop closes at 5', 'Dogs by arrangement, on a lead near the wallabies'].map((t) => (
                    <li key={t} className="py-3">
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={100} as="figure" className="col-span-12 md:col-span-7">
                <div className={`relative aspect-[4/3] overflow-hidden border ${rule} md:aspect-[16/10]`}>
                  <Image src={img(photos[3].id, 1600)} alt="The gravel track through the bush" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover grayscale contrast-[1.05]" />
                  <span className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center border-[1.5px] md:h-36 md:w-36" style={{ borderColor: ACCENT }} aria-hidden="true">
                    <span className="h-3 w-3" style={{ background: ACCENT }} />
                  </span>
                </div>
                <figcaption className={`mt-3 flex justify-between gap-6 ${label} ${muted}`}>
                  <span>Somewhere in this square</span>
                  <span className="hidden sm:inline">State forest · Gravel track</span>
                </figcaption>
              </Reveal>
            </div>
          </section>

          {/* 07 Things to know */}
          <section className="mt-16 md:mt-20">
            <Reveal>
              <Head title="Things to know" />
            </Reveal>
            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
              {know.map((col, i) => (
                <Reveal key={col.h} delay={i * 60} y={12}>
                  <p className={`${h} text-[20px] leading-tight`}>{col.h}</p>
                  <ul className={`mt-4 divide-y ${rule} border-y ${rule} text-[14px] leading-[1.5]`}>
                    {col.items.map((it) => (
                      <li key={it} className="py-2.5">
                        {it}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className={`custom-footer border-t ${rule}`}>
          <div className={`mx-auto flex max-w-[84rem] flex-col gap-3 px-5 py-6 ${label} md:flex-row md:items-center md:justify-between md:px-8`}>
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className={`${h} text-[16px] normal-case tracking-[-0.04em]`}>Ironbark</span>
              <span className={muted}>Bookings and payments by Little Hotelier · No platform fees</span>
            </p>
            <p className={`flex flex-wrap gap-x-5 gap-y-1 ${muted}`}>
              <a href="mailto:stay@ironbark.example" className="normal-case tracking-normal transition-colors hover:text-[#121410]">
                stay@ironbark.example
              </a>
              <a href="#" className="transition-colors hover:text-[#121410]">
                Instagram
              </a>
              <a href="#" className="transition-colors hover:text-[#121410]">
                Gift a stay
              </a>
              <span>© 2026</span>
            </p>
          </div>
        </footer>

        {/* Phone: price and Reserve pinned to the bottom. */}
        <div className={`fixed inset-x-0 bottom-0 z-50 border-t ${rule} px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 lg:hidden`} style={{ background: PAPER }}>
          <div className="flex items-center justify-between gap-4">
            <div className="tabular-nums">
              <p className="text-[15px]">
                <span className="font-semibold">$320</span> <span className={muted}>per night</span>
              </p>
              <p className={`mt-0.5 ${label} ${muted}`}>12 – 15 Oct · 3 nights</p>
            </div>
            <a href="#availability" className="inline-flex h-12 items-center gap-3 px-5 text-[15px] font-semibold text-[#F3F0E8]" style={{ background: ACCENT }}>
              Reserve <Arrow className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
