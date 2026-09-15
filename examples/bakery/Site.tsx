import { Archivo, Archivo_Black } from 'next/font/google';
import { asset } from '@/lib/asset';
import { Clock, Reveal, ScrollSpy } from '@/examples/_shared/primitives';

/*
  THE BAKEHOUSE
  Restored edgy look: huge Archivo Black wordmark, cream paper,
  photo-led, "Bread, mostly." Small THE kicker so BAKEHOUSE fits.
*/

const display = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--pr-display',
  display: 'swap',
});
const sans = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--pr-sans',
  display: 'swap',
});

const PAPER = '#F2EFE8';
const INK = '#111111';
const label = 'text-[11px] font-medium uppercase tracking-[0.18em] text-[#111]/45';
const black = 'font-[family-name:var(--pr-display)] tracking-[-0.04em]';

const bread = [
  { name: 'Country loaf', note: 'White, a little wholemeal. 36 hour ferment.', price: '11', days: 'Wed–Sat' },
  { name: 'Seeded rye', note: 'Dark rye, sunflower, linseed.', price: '13', days: 'Thu–Sat' },
  { name: 'Sesame', note: 'Country dough rolled through toasted sesame.', price: '12', days: 'Wed–Sat' },
  { name: 'Baguette', note: 'Twice a day. Fine for the table.', price: '6', days: 'Wed–Sat' },
  { name: 'Focaccia', note: 'Olive oil, rosemary, flaky salt.', price: '7', days: 'Fri–Sat' },
  { name: 'Olive and rosemary', note: 'Kalamata, lemon zest.', price: '13', days: 'Sat' },
  { name: 'Wholemeal tin', note: 'The sandwich loaf.', price: '9', days: 'Wed–Sat' },
  { name: 'Fruit loaf', note: 'Sultana, peel, a little rye.', price: '14', days: 'Sat' },
  { name: 'Miche', note: '2kg. Order by Thursday.', price: '26', days: 'Sat' },
];

export default function ProofRoomPage() {
  return (
    <>
      <div
        data-example=""
        className={`${display.variable} ${sans.variable} font-[family-name:var(--pr-sans)] min-h-screen antialiased`}
        style={{ background: PAPER, color: INK }}
      >
        <header className="custom-header flex items-center justify-between gap-4 border-b border-black/10 px-5 py-3 md:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="The Bakehouse">
            <span className="grid h-8 w-8 place-items-center bg-black text-[13px] font-semibold text-[#F2EFE8]">B</span>
            <span className="hidden text-[12px] font-semibold uppercase tracking-[0.16em] md:inline">The Bakehouse</span>
          </a>
          <p className={`${label} hidden md:block`}>
            Open · <Clock /> · until sold out
          </p>
          <nav className={`${label} flex gap-5 text-[#111]`}>
            <a href="#bread">Bread</a>
            <a href="#the-day">The day</a>
            <a href="#visit">Visit</a>
          </nav>
        </header>

        <section id="top" className="px-5 pt-8 md:px-8 md:pt-10">
          <div className="flex items-start justify-between gap-6">
            <p className={label}>
              Wed – Sat · From 07:00
            </p>
            <p className="font-[family-name:var(--pr-sans)] text-[18px] italic md:text-[22px]">Bread, mostly.</p>
          </div>

          <h1 className={`${black} mt-10 leading-[0.78]`}>
            <span className="block font-[family-name:var(--pr-sans)] text-[11px] font-medium uppercase tracking-[0.42em] text-[#111]/40 md:text-[12px]">The</span>
            <span className="mt-2 block uppercase text-[clamp(64px,16vw,210px)]">Bakehouse</span>
          </h1>
        </section>

        <figure className="mt-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/examples/bakery/loaves.jpg")}
            alt="Seeded loaves stacked with a wheat stalk"
            className="aspect-[21/9] w-full object-cover md:aspect-[2.4/1]"
          />
        </figure>

        <section id="the-day" className="px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:items-end">
            <Reveal>
              <p className={`${black} text-[clamp(28px,4vw,48px)] leading-[0.95] tracking-[-0.03em]`}>
                Flour, water, salt and <span className="italic font-[family-name:var(--pr-sans)] font-normal tracking-normal">time.</span>
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p className="max-w-[34rem] text-[17px] leading-[1.45] md:text-[19px]">
                We don’t do a long menu. Mixed the day before, out of the oven in the morning, until it’s gone.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="bread" className="border-t border-black/10 px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-10 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
            <Reveal>
              <h2 className={`${black} text-[clamp(32px,5vw,56px)] leading-[0.9] tracking-[-0.03em]`}>
                What’s on.
              </h2>
              <p className="mt-4 max-w-[16rem] text-[15px] leading-snug text-[#111]/55">Until it’s gone. Miche by Thursday 5pm.</p>
            </Reveal>
            <ul>
              {bread.map((b, i) => (
                <Reveal key={b.name} as="li" delay={i * 20} y={8} className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-black/10 py-4 md:grid-cols-[minmax(0,1fr)_7rem_3rem]">
                  <div>
                    <p className="text-[18px] font-medium leading-tight md:text-[20px]">{b.name}</p>
                    <p className="mt-1 text-[13px] text-[#111]/50">{b.note}</p>
                  </div>
                  <span className={`${label} hidden md:block`}>{b.days}</span>
                  <span className="tabular-nums">{b.price}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-5 py-16 text-[#F2EFE8] md:px-8 md:py-20" style={{ background: INK }}>
          <Reveal>
            <h2 className={`${black} text-[clamp(36px,6vw,72px)] uppercase leading-[0.9]`}>Hours</h2>
          </Reveal>
          <dl className="mt-10 max-w-[22rem] space-y-3 text-[17px]">
            <div className="flex justify-between gap-6">
              <dt>Wed – Fri</dt>
              <dd className="tabular-nums">07:00 – sold out</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt>Sat</dt>
              <dd className="tabular-nums">07:00 – sold out</dd>
            </div>
            <div className="flex justify-between gap-6 opacity-45">
              <dt>Sun – Tue</dt>
              <dd>Closed</dd>
            </div>
          </dl>
        </section>

        <footer id="visit" className="custom-footer px-5 pb-16 pt-16 md:px-8">
          <Reveal>
            <p className={`${black} max-w-[12ch] uppercase text-[clamp(40px,8vw,96px)] leading-[0.85]`}>See you at seven.</p>
          </Reveal>
          <div className="mt-12 grid gap-10 text-[15px] leading-snug md:grid-cols-3">
            <div>
              <p className={label}>Where</p>
              <p className="mt-3">The shopfront with the flour-dusted door. Come early for the rye.</p>
            </div>
            <div>
              <p className={label}>Contact</p>
              <p className="mt-3">
                <a href="mailto:hello@thebakehouse.com.au" className="hover:opacity-50">hello@thebakehouse.com.au</a>
                <br />
                <a href="tel:+61255501414" className="hover:opacity-50">02 5550 1414</a>
              </p>
            </div>
            <div>
              <p className={label}>©</p>
              <p className="mt-3">The Bakehouse 2026</p>
            </div>
          </div>
        </footer>

        <nav aria-label="Sections" className="pointer-events-none fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-5 md:hidden">
          <ScrollSpy
            items={[
              { href: '#bread', label: 'Bread' },
              { href: '#the-day', label: 'The day' },
              { href: '#visit', label: 'Visit' },
            ]}
            className="pointer-events-auto flex items-center gap-1 rounded-full bg-black p-1.5 text-white"
            linkClass="rounded-full px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em]"
            activeClass="bg-[#F2EFE8] text-black"
            inactiveClass="text-white/70"
          />
        </nav>
      </div>
    </>
  );
}
