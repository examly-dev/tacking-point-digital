import { Archivo, Archivo_Black } from 'next/font/google';
import { asset } from '@/lib/asset';
import { Clock, InPageScroll, Reveal, ScrollSpy } from '@/examples/_shared/primitives';
import { Subscribe } from '@/examples/bakery/Subscribe';

/*
  BAKEHOUSE
  Edgy: Archivo Black wordmark, cream paper, photo-led.
  Menu + weekly loaf subscription. Wordmark sized to the container so it never clips.
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
const black = 'font-[family-name:var(--pr-display)] tracking-[-0.05em]';
const photo = (file: string) => asset(`/examples/bakery/${file}`);

const loaves = [
  { name: 'Country loaf', note: 'White, a little wholemeal. 36 hour ferment.', price: '11', days: 'Wed–Sat' },
  { name: 'Seeded rye', note: 'Dark rye, sunflower, linseed.', price: '13', days: 'Thu–Sat' },
  { name: 'Sesame', note: 'Country dough rolled through toasted sesame.', price: '12', days: 'Wed–Sat' },
  { name: 'Baguette', note: 'Twice a day. Fine for the table.', price: '6', days: 'Wed–Sat' },
  { name: 'Focaccia', note: 'Olive oil, rosemary, flaky salt.', price: '7', days: 'Fri–Sat' },
  { name: 'Olive and rosemary', note: 'Kalamata, lemon zest.', price: '13', days: 'Sat' },
  { name: 'Wholemeal tin', note: 'The sandwich loaf.', price: '9', days: 'Wed–Sat' },
  { name: 'Fruit loaf', note: 'Sultana, peel, a little rye.', price: '14', days: 'Sat' },
  { name: 'Miche', note: '2kg. Order by Thursday 5pm.', price: '26', days: 'Sat' },
];

const viennoiserie = [
  { name: 'Butter croissant', note: 'Laminated overnight.', price: '6', days: 'Wed–Sat' },
  { name: 'Almond croissant', note: 'Day-old croissant, frangipane, toasted flaked almond.', price: '8', days: 'Fri–Sat' },
  { name: 'Pain au chocolat', note: 'Two bars. Same dough as the croissant.', price: '7', days: 'Wed–Sat' },
  { name: 'Morning bun', note: 'Orange, cinnamon, sugar. Saturday only.', price: '7', days: 'Sat' },
];

const sandwiches = [
  { name: 'Ham, butter, cornichon', note: 'On baguette. From 11.', price: '14', days: 'Wed–Sat' },
  { name: 'Egg and herb', note: 'Soft egg, chives, on wholemeal tin.', price: '13', days: 'Wed–Sat' },
  { name: 'Roast tomato, ricotta', note: 'On focaccia. Friday and Saturday.', price: '14', days: 'Fri–Sat' },
];

const specials = [
  { name: 'Rye with fennel', note: 'A Thursday loaf. Caraway if we have it.', days: 'Thu' },
  { name: 'Potato and rosemary focaccia', note: 'One tray. Out around nine.', days: 'Fri' },
];

function MenuBlock({
  heading,
  items,
}: {
  heading: string;
  items: { name: string; note: string; price: string; days: string }[];
}) {
  return (
    <div className="min-w-0">
      <h3 className={`${label} text-[#111]`}>{heading}</h3>
      <ul className="mt-4">
        {items.map((b, i) => (
          <Reveal key={b.name} as="li" delay={i * 16} y={8} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-0.5 border-b border-black/10 py-3.5 md:grid-cols-[minmax(0,1fr)_6.5rem_2.75rem]">
            <div className="min-w-0">
              <p className="text-[17px] font-medium leading-tight md:text-[19px]">{b.name}</p>
              <p className="mt-1 text-[13px] leading-snug text-[#111]/50">{b.note}</p>
              <p className={`${label} mt-1 md:hidden`}>{b.days}</p>
            </div>
            <span className={`${label} hidden self-center md:block`}>{b.days}</span>
            <span className="tabular-nums text-[15px] md:text-[16px]">{b.price}</span>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

export default function ProofRoomPage() {
  return (
    <>
      <InPageScroll />
      <div
        data-example=""
        className={`${display.variable} ${sans.variable} font-[family-name:var(--pr-sans)] min-h-screen overflow-x-hidden antialiased`}
        style={{ background: PAPER, color: INK }}
      >
        <header className="custom-header flex items-center justify-between gap-3 border-b border-black/10 px-5 py-3 md:px-8">
          <a href="#top" className="min-w-0 shrink-0 overflow-visible" aria-label="Bakehouse">
            <span className={`${black} block uppercase leading-[0.85] whitespace-nowrap text-[length:clamp(1.35rem,5.6vw,1.85rem)]`}>
              Bakehouse
            </span>
          </a>
          <p className={`${label} hidden md:block`}>
            Open · <Clock /> · until sold out
          </p>
          <nav className={`${label} hidden gap-5 text-[#111] md:flex`}>
            <a href="#menu">Menu</a>
            <a href="#weekly">Weekly</a>
            <a href="#visit">Visit</a>
          </nav>
        </header>

        <section id="top" className="@container px-5 pt-8 md:px-8 md:pt-10" style={{ containerType: 'inline-size' }}>
          <div className="flex items-start justify-between gap-4">
            <p className={label}>Wed – Sat · From 07:00</p>
            <p className="shrink-0 font-[family-name:var(--pr-sans)] text-[16px] italic md:text-[22px]">Bread, mostly.</p>
          </div>

          <h1
            className={`${black} mt-8 w-full uppercase leading-[0.78] whitespace-nowrap text-[length:clamp(2.15rem,13.9cqw,12.75rem)]`}
          >
            Bakehouse
          </h1>
        </section>

        <figure className="mt-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo('loaves.jpg')}
            alt="Seeded loaves stacked with a wheat stalk"
            className="aspect-[5/4] w-full object-cover md:aspect-[2.2/1]"
          />
        </figure>

        <section className="px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] md:items-end">
            <Reveal>
              <p className={`${black} text-[clamp(28px,6.4vw,48px)] leading-[0.95] tracking-[-0.03em]`}>
                Flour, water, salt and <span className="italic font-[family-name:var(--pr-sans)] font-normal tracking-normal">time.</span>
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p className="max-w-[36rem] text-[17px] leading-[1.45] md:text-[19px]">
                Mixed the day before. Out of the oven in the morning. Loaves first, then pastry, then the sandwiches from eleven. When a tray is gone, it is gone.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-3 md:mt-16 md:grid-cols-2">
            <figure className="min-w-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo('shop.jpg')} alt="The counter, lamps, and the morning bake" className="aspect-[4/5] w-full object-cover md:aspect-[5/4]" />
            </figure>
            <figure className="min-w-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo('dough.jpg')} alt="Hands working dough on the bench" className="aspect-[4/5] w-full object-cover md:aspect-[5/4]" />
            </figure>
          </div>
        </section>

        <section id="menu" className="border-t border-black/10 px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-12 md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] md:gap-16">
            <Reveal>
              <h2 className={`${black} text-[clamp(32px,8vw,56px)] leading-[0.9] tracking-[-0.03em]`}>
                What’s on.
              </h2>
              <p className="mt-4 max-w-[16rem] text-[15px] leading-snug text-[#111]/55">
                Until it’s gone. Miche by Thursday 5pm.
              </p>
            </Reveal>
            <div className="min-w-0 space-y-12">
              <MenuBlock heading="Loaves" items={loaves} />
              <MenuBlock heading="Viennoiserie" items={viennoiserie} />
              <MenuBlock heading="Sandwiches" items={sandwiches} />
              <div className="min-w-0">
                <h3 className={`${label} text-[#111]`}>This week</h3>
                <ul className="mt-4">
                  {specials.map((s, i) => (
                    <Reveal key={s.name} as="li" delay={i * 16} y={8} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-black/10 py-3.5">
                      <div className="min-w-0">
                        <p className="text-[17px] font-medium leading-tight md:text-[19px]">{s.name}</p>
                        <p className="mt-1 text-[13px] leading-snug text-[#111]/50">{s.note}</p>
                      </div>
                      <span className={label}>{s.days}</span>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo('croissants.jpg')}
            alt="Butter croissants, sugar still in the air"
            className="aspect-[4/5] w-full object-cover md:aspect-[21/9]"
          />
        </figure>

        <section id="weekly" className="px-5 py-16 text-[#F2EFE8] md:px-8 md:py-24" style={{ background: INK }}>
          <Reveal>
            <h2 className={`${black} max-w-[12ch] uppercase leading-[0.86] text-[clamp(36px,10vw,72px)]`}>
              The weekly loaf.
            </h2>
          </Reveal>
          <Reveal delay={60}>
            <p className="mt-6 max-w-[34rem] text-[17px] leading-[1.45] text-[#F2EFE8]/70 md:text-[19px]">
              A recurring bag of bread. Two loaves, weekly or fortnightly. You
              pick them up from the shop.
            </p>
          </Reveal>

          <div className="mt-12 md:mt-16">
            <Subscribe />
          </div>
        </section>

        <div className="grid md:grid-cols-2">
          <figure className="min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo('loaf.jpg')} alt="A flour-dusted country loaf" className="aspect-[4/3] w-full object-cover md:aspect-[5/4]" />
          </figure>
          <figure className="min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo('crumb.jpg')} alt="Sliced wholemeal tin on the board" className="aspect-[4/3] w-full object-cover md:aspect-[5/4]" />
          </figure>
        </div>

        <section className="px-5 py-16 md:px-8 md:py-20">
          <Reveal>
            <h2 className={`${black} text-[clamp(36px,8vw,72px)] uppercase leading-[0.9]`}>Hours</h2>
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

        <footer id="visit" className="custom-footer px-5 pb-28 pt-8 md:px-8 md:pb-16 md:pt-8">
          <Reveal>
            <p className={`${black} max-w-[12ch] uppercase leading-[0.85] text-[clamp(40px,10vw,96px)]`}>See you at seven.</p>
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
              <p className="mt-3">Bakehouse 2026</p>
            </div>
          </div>
        </footer>

        <nav aria-label="Sections" className="pointer-events-none fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-4 md:hidden">
          <ScrollSpy
            items={[
              { href: '#menu', label: 'Menu' },
              { href: '#weekly', label: 'Weekly' },
              { href: '#visit', label: 'Visit' },
            ]}
            className="pointer-events-auto flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full bg-black p-1.5 text-white"
            linkClass="shrink-0 rounded-full px-3.5 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em]"
            activeClass="bg-[#F2EFE8] text-black"
            inactiveClass="text-white/70"
          />
        </nav>
      </div>
    </>
  );
}
