import Image from 'next/image';
import { Figtree, Syne } from 'next/font/google';
import { asset } from '@/lib/asset';
import { Clock, Reveal, ScrollSpy } from '@/examples/_shared/primitives';

/*
  HALFWAY — a neighbourhood coffee shop, open early.
  Espresso brown, oat cream, olive and one blush accent. A chunky wide wordmark,
  a menu you can actually read, this month's beans and the room itself.
*/

const display = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--hw-display',
  display: 'swap',
});
const sans = Figtree({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--hw-sans',
  display: 'swap',
});

const photo = (file: string) => asset(`/examples/halfway/${file}`);

const BROWN = '#2B1A12';
const OAT = '#EFE4D2';
const OLIVE = '#5E6B3B';
const BLUSH = '#E9A7A0';
const disp = 'font-[family-name:var(--hw-display)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em]';
const label = 'text-[11px] font-semibold uppercase tracking-[0.18em]';
const sentence = 'font-[family-name:var(--hw-display)] font-extrabold leading-[1.0] tracking-[-0.03em]';

const menu = [
  {
    h: 'Coffee',
    note: 'House blend or the single origin, your call. Oat, soy, almond +$0.80. Extra shot +$0.70.',
    items: [
      ['Espresso', '4.20'],
      ['Long black', '4.50'],
      ['Flat white', '5.00'],
      ['Latte / cappuccino', '5.00'],
      ['Piccolo', '4.50'],
      ['Batch brew', '4.50'],
      ['Filter, single origin', '6.50'],
      ['Iced long black', '5.50'],
    ],
  },
  {
    h: 'Not coffee',
    note: 'Loose-leaf teas from a small blender. Chai is brewed on the stove, not from a syrup.',
    items: [
      ['Stovetop chai', '5.50'],
      ['Hot chocolate', '5.50'],
      ['Matcha latte', '6.00'],
      ['Tea, pot for one', '5.00'],
      ['Sparkling water', '4.00'],
      ['Kids’ babyccino', '1.50'],
    ],
  },
  {
    h: 'To eat',
    note: 'Baked before we open. Toasties from 7. When it is gone, it is gone.',
    items: [
      ['Ham, cheese and pickle toastie', '12.00'],
      ['Mushroom and thyme toastie', '12.00'],
      ['Banana bread, butter', '6.50'],
      ['Almond croissant', '7.50'],
      ['Seasonal fruit danish', '7.00'],
      ['Anzac biscuit', '4.00'],
    ],
  },
];

const beans = [
  { origin: 'Ethiopia', region: 'Yirgacheffe · washed', notes: 'Bergamot, peach, black tea', use: 'Filter and long black', price: '$18 / 250g' },
  { origin: 'Colombia', region: 'Huila · washed', notes: 'Milk chocolate, red apple', use: 'Our milk coffee', price: '$17 / 250g' },
  { origin: 'House blend', region: 'Brazil and Colombia', notes: 'Cocoa, hazelnut, brown sugar', use: 'Everything, all day', price: '$16 / 250g' },
];

type Product = {
  name: string;
  variant: string;
  price: string;
  tag: 'Brewers' | 'Filters' | 'Kettles & grinders' | 'Beans' | 'Subscribe' | 'Merch';
  photo: string;
  added?: boolean;
};

const products: Product[] = [
  { name: 'Hario V60 Dripper 02', variant: 'Ceramic, white', price: '49.00', tag: 'Brewers', photo: 'dripper.jpg' },
  { name: 'Hario V60 Paper Filters 02', variant: '100 pack, tabbed', price: '12.00', tag: 'Filters', photo: 'filters.jpg', added: true },
  { name: 'AeroPress Original', variant: 'With 350 micro-filters', price: '69.00', tag: 'Brewers', photo: 'espresso.jpg' },
  { name: 'Chemex Classic', variant: '6 cup, wood collar', price: '95.00', tag: 'Brewers', photo: 'chemex.jpg' },
  { name: 'Kalita Wave 185 Filters', variant: '100 pack', price: '18.00', tag: 'Filters', photo: 'cups.jpg' },
  { name: 'Fellow Stagg EKG', variant: 'Electric pour-over kettle, matte black', price: '259.00', tag: 'Kettles & grinders', photo: 'kettle.jpg' },
  { name: 'Timemore Chestnut C3', variant: 'Hand grinder, black', price: '119.00', tag: 'Kettles & grinders', photo: 'portafilter.jpg' },
  { name: 'Ethiopia Yirgacheffe', variant: '250g whole bean, this month', price: '18.00', tag: 'Beans', photo: 'bag-eth.jpg', added: true },
  { name: 'House blend', variant: '1kg whole bean', price: '52.00', tag: 'Beans', photo: 'bag-house.jpg' },
  { name: 'Colombia Huila', variant: '250g whole bean', price: '17.00', tag: 'Beans', photo: 'bag-col.jpg' },
  { name: 'Weekly house blend', variant: '250g, posted every Tuesday', price: '16.00', tag: 'Subscribe', photo: 'beans-pile.jpg' },
  { name: 'Halfway mug', variant: '12oz stoneware', price: '28.00', tag: 'Merch', photo: 'mug.jpg' },
];

function BagIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 8h12l-1 12H7z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export default function HalfwayPage() {
  return (
    <>
      <div
        data-example=""
        className={`${display.variable} ${sans.variable} font-[family-name:var(--hw-sans)] min-h-screen antialiased selection:bg-[#5E6B3B] selection:text-[#EFE4D2]`}
        style={{ background: OAT, color: BROWN }}
      >
        {/* Header */}
        <header className="custom-header sticky top-0 z-50 border-b border-[#2B1A12]/15 backdrop-blur-md" style={{ background: 'rgba(239,228,210,0.9)' }}>
          <div className="flex h-16 items-center justify-between px-5 md:px-8">
            <a href="#top" className={`${disp} text-[26px] tracking-[-0.04em] md:text-[28px]`}>
              Halfway House
            </a>
            <ScrollSpy
              items={[
                { href: '#menu', label: 'Menu' },
                { href: '#beans', label: 'Beans' },
                { href: '#shop', label: 'Shop' },
                { href: '#room', label: 'The room' },
                { href: '#hours', label: 'Hours' },
              ]}
              className={`${label} hidden gap-8 md:flex`}
              linkClass="transition-colors duration-200"
              activeClass="text-[#5E6B3B] underline decoration-2 underline-offset-[6px]"
              inactiveClass="text-[#2B1A12]/60 hover:text-[#2B1A12]"
            />
            <div className="flex items-center gap-2">
              <a href="#shop" className="inline-flex h-10 items-center gap-2 rounded-full border border-[#2B1A12]/20 px-3.5 text-[13px] font-semibold transition-colors hover:border-[#2B1A12]">
                <BagIcon className="h-4 w-4" />
                Cart
                <span className="grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] text-[#EFE4D2]" style={{ background: BROWN }}>
                  2
                </span>
              </a>
              <a
                href="#"
                className="hidden h-10 items-center rounded-full px-4 text-[13px] font-semibold text-[#EFE4D2] transition-colors hover:bg-[#2B1A12] sm:inline-flex"
                style={{ background: OLIVE }}
              >
                Order ahead
              </a>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section id="top" className="grid min-h-[calc(100svh-4rem)] grid-cols-12 gap-x-4">
          <div className="col-span-12 flex flex-col justify-between px-5 pb-8 pt-10 md:col-span-6 md:px-8 md:pb-10 md:pt-16">
            <Reveal>
              <p className={`${label} flex flex-wrap items-center gap-x-3 gap-y-1 text-[#2B1A12]/60`}>
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: OLIVE }} />
                  Today
                </span>
                <span>·</span>
                <span className="tabular-nums">
                  <Clock />
                </span>
                <span>·</span>
                <span>Open 6 – 2</span>
              </p>
            </Reveal>
            <div>
              <Reveal delay={80}>
                <h1 className={`${disp} text-[clamp(46px,5.6vw,96px)]`}>
                  Good coffee,
                  <br />
                  early<span style={{ color: OLIVE }}>.</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-8 max-w-[26rem] text-[17px] leading-[1.5] md:text-[19px]">
                  A small coffee shop with a big machine, a few tables, and baking that comes out of the oven at half past
                  five. Open six till two, Monday to Saturday.
                </p>
              </Reveal>
              <Reveal delay={220} className="mt-8 flex flex-wrap gap-3">
                <a href="#menu" className="inline-flex h-12 items-center rounded-full px-6 text-[15px] font-semibold text-[#EFE4D2] transition-colors hover:bg-[#5E6B3B]" style={{ background: BROWN }}>
                  See the menu
                </a>
                <a href="#beans" className="inline-flex h-12 items-center rounded-full border border-[#2B1A12]/25 px-6 text-[15px] font-semibold transition-colors hover:border-[#2B1A12]">
                  This month’s beans
                </a>
              </Reveal>
            </div>
            <Reveal delay={280}>
              <p className="text-[14px] text-[#2B1A12]/60">Sixth coffee free. We stamp a card; there is no app.</p>
            </Reveal>
          </div>

          <Reveal delay={120} className="relative col-span-12 min-h-[60vw] md:col-span-6 md:min-h-0">
            <Image
              src={photo('flatwhite.jpg')}
              alt="A flat white on the counter in morning light"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <span className={`${disp} absolute bottom-5 left-5 rounded-full px-4 py-2 text-[13px] tracking-[0.02em] text-[#2B1A12]`} style={{ background: BLUSH }}>
              Batch brew is on
            </span>
          </Reveal>
        </section>

        {/* Menu */}
        <section id="menu" className="px-5 py-20 md:px-8 md:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className={`${disp} text-[clamp(48px,8vw,120px)]`}>Menu</h2>
            <p className="max-w-[24rem] text-[15px] leading-[1.5] text-[#2B1A12]/65">
              Prices include GST. Card or cash, no surcharge. Takeaway cups are compostable; bring your own and it is 50c off.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-3">
            {menu.map((m, i) => (
              <Reveal key={m.h} delay={i * 80}>
                <h3 className={`${disp} border-b-2 border-[#2B1A12] pb-3 text-[24px]`}>{m.h}</h3>
                <p className="mt-3 text-[13px] leading-[1.5] text-[#2B1A12]/60">{m.note}</p>
                <ul className="mt-5">
                  {m.items.map(([n, p]) => (
                    <li key={n} className="flex items-baseline justify-between gap-3 border-b border-[#2B1A12]/12 py-2.5 text-[15px]">
                      <span>{n}</span>
                      <span className="tabular-nums text-[#2B1A12]/70">{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Beans */}
        <section id="beans" className="text-[#EFE4D2]" style={{ background: OLIVE }}>
          <div className="grid grid-cols-12 gap-x-4 gap-y-12 px-5 py-20 md:px-8 md:py-28">
            <Reveal className="col-span-12 md:col-span-5">
              <p className={`${label} text-[#EFE4D2]/60`}>On the grinders this month</p>
              <h2 className={`${disp} mt-4 text-[clamp(44px,6.5vw,100px)]`}>Beans</h2>
              <p className="mt-6 max-w-[24rem] text-[16px] leading-[1.5] text-[#EFE4D2]/80">
                Roasted an hour up the road and delivered every Tuesday. We change the single origin monthly and keep the
                house blend the same, because people notice.
              </p>
              <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-3xl">
                <Image src={photo('portafilter.jpg')} alt="Dosing a portafilter" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              {beans.map((b, i) => (
                <Reveal key={b.origin} delay={i * 80} className="border-t border-[#EFE4D2]/25 py-7 first:border-t-0 first:pt-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className={`${disp} text-[clamp(28px,3vw,44px)]`}>{b.origin}</h3>
                    <span className={`${label} text-[#EFE4D2]/70`}>{b.price}</span>
                  </div>
                  <p className="mt-1 text-[14px] text-[#EFE4D2]/70">{b.region}</p>
                  <dl className="mt-4 grid grid-cols-2 gap-4 text-[14px]">
                    <div>
                      <dt className={`${label} text-[#EFE4D2]/55`}>Tastes like</dt>
                      <dd className="mt-1">{b.notes}</dd>
                    </div>
                    <div>
                      <dt className={`${label} text-[#EFE4D2]/55`}>We use it for</dt>
                      <dd className="mt-1">{b.use}</dd>
                    </div>
                  </dl>
                </Reveal>
              ))}
              <Reveal delay={260}>
                <a href="#" className="mt-4 inline-flex h-12 items-center rounded-full px-6 text-[15px] font-semibold text-[#2B1A12] transition-colors hover:bg-[#EFE4D2]" style={{ background: BLUSH }}>
                  Bags at the counter, or subscribe
                </a>
              </Reveal>
            </div>
          </div>
        </section>


        {/* Shop: Shopify storefront in the same clothes. Brewing gear and bags of beans. */}
        <section id="shop" className="px-5 py-20 md:px-8 md:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className={`${disp} text-[clamp(48px,8vw,120px)]`}>Shop</h2>
              <p className="mt-4 max-w-[26rem] text-[15px] leading-[1.5] text-[#2B1A12]/65">
                The gear we brew on, and the beans to go with it. Free pickup at the counter, or flat $9.95 shipping anywhere in
                Australia.
              </p>
            </div>
            <p className="flex items-center gap-2 text-[13px] text-[#2B1A12]/60">
              <BagIcon className="h-4 w-4" />
              Powered by Shopify · Shop Pay, Apple Pay, Afterpay
            </p>
          </Reveal>

          <Reveal delay={60} className="mt-10 flex flex-wrap gap-2">
            {['All', 'Brewers', 'Filters', 'Kettles & grinders', 'Beans', 'Subscribe', 'Merch'].map((f, i) => (
              <button
                key={f}
                type="button"
                aria-pressed={i === 0}
                className={`rounded-full border px-4 py-1.5 text-[13px] font-semibold transition-colors ${
                  i === 0 ? 'border-[#2B1A12] bg-[#2B1A12] text-[#EFE4D2]' : 'border-[#2B1A12]/20 hover:border-[#2B1A12]'
                }`}
              >
                {f}
              </button>
            ))}
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-5">
            {products.map((pr, i) => (
              <Reveal key={pr.name} delay={(i % 4) * 50} y={14} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#2B1A12]/5">
                  <Image src={photo(pr.photo)} alt={pr.name} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  <span className={`${label} absolute left-3 top-3 rounded-full bg-[#EFE4D2]/90 px-2.5 py-1 text-[10px] text-[#2B1A12]`}>{pr.tag}</span>
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[15px] font-semibold leading-tight">{pr.name}</p>
                    <p className="mt-0.5 text-[13px] text-[#2B1A12]/60">{pr.variant}</p>
                  </div>
                  <p className="shrink-0 text-[15px] tabular-nums">${pr.price}</p>
                </div>
                <button
                  type="button"
                  className={`mt-3 inline-flex h-10 w-full items-center justify-center rounded-full border text-[13px] font-semibold transition-colors ${
                    pr.added ? 'border-[#5E6B3B] bg-[#5E6B3B] text-[#EFE4D2]' : 'border-[#2B1A12]/20 hover:border-[#2B1A12] hover:bg-[#2B1A12] hover:text-[#EFE4D2]'
                  }`}
                >
                  {pr.added ? 'Added · view cart' : 'Add to cart'}
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80} className="mt-12 text-[#EFE4D2]">
            <div className="flex w-full flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between md:p-6" style={{ background: BROWN }}>
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full" style={{ background: OLIVE }}>
                  <BagIcon className="h-5 w-5" />
                </span>
                <p className="text-[15px]">
                  <span className="font-semibold">2 items · $30.00</span>
                  <span className="text-[#EFE4D2]/60"> · V60 filters, Ethiopia 250g · pickup is free</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href="#" className="inline-flex h-11 items-center rounded-full border border-[#EFE4D2]/30 px-5 text-[14px] font-semibold transition-colors hover:border-[#EFE4D2]">
                  View cart
                </a>
                <a href="#" className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-semibold text-white transition-[filter] hover:brightness-110" style={{ background: '#5A31F4' }}>
                  Buy with <span className="font-extrabold tracking-[-0.02em]">shop</span><span className="-ml-1 font-extrabold tracking-[-0.02em]">Pay</span>
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* The room */}
        <section id="room" className="px-5 py-20 md:px-8 md:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className={`${disp} text-[clamp(48px,8vw,120px)]`}>The room</h2>
            <p className="max-w-[24rem] text-[15px] leading-[1.5] text-[#2B1A12]/65">
              Twenty-four seats inside, twelve on the footpath. Dogs on the footpath, laptops until eleven, prams anywhere they fit.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-6 gap-3 md:gap-4">
            <Reveal className="relative col-span-6 aspect-[16/10] overflow-hidden rounded-3xl md:col-span-4">
              <Image src={photo('cafe-room.jpg')} alt="The room, tables by the window" fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" />
            </Reveal>
            <Reveal delay={80} className="col-span-3 flex md:col-span-2">
              <div className="flex w-full flex-col justify-between rounded-3xl p-6 text-[#EFE4D2]" style={{ background: BROWN }}>
                <p className={`${sentence} text-[clamp(22px,2.2vw,30px)]`}>Book the room after two.</p>
                <p className="mt-6 text-[14px] leading-[1.5] text-[#EFE4D2]/70">
                  Book club, birthday, a launch. Thirty people standing, coffee and cake sorted. From $350.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120} className="relative col-span-3 aspect-square overflow-hidden rounded-3xl md:col-span-2">
              <Image src={photo('pour-over.jpg')} alt="The morning’s baking in the cabinet" fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
            </Reveal>
            <Reveal delay={160} className="relative col-span-3 aspect-square overflow-hidden rounded-3xl md:col-span-2">
              <Image src={photo('cups.jpg')} alt="Two flat whites going out" fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
            </Reveal>
            <Reveal delay={200} className="relative col-span-6 aspect-[16/10] overflow-hidden rounded-3xl md:col-span-2 md:aspect-square">
              <Image src={photo('milk.jpg')} alt="Pouring milk" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </Reveal>
          </div>
        </section>

        {/* Footer / hours */}
        <footer id="hours" className="custom-footer text-[#EFE4D2]" style={{ background: BROWN }}>
          <div className="grid grid-cols-12 gap-x-4 gap-y-12 px-5 py-20 md:px-8 md:py-28">
            <Reveal className="col-span-12 md:col-span-6">
              <p className={`${disp} text-[clamp(36px,8vw,120px)] leading-[0.9]`}>Halfway House</p>
              <p className="mt-6 max-w-[24rem] text-[16px] leading-[1.5] text-[#EFE4D2]/70">
                Halfway House between the station and the beach. Look for the olive awning and the queue that moves quickly.
              </p>
            </Reveal>
            <div className="col-span-12 grid grid-cols-2 gap-x-4 gap-y-10 md:col-span-5 md:col-start-8">
              <Reveal delay={60}>
                <p className={`${label} text-[#EFE4D2]/50`}>Hours</p>
                <dl className="mt-3 space-y-1.5 text-[15px]">
                  <div className="flex justify-between gap-4">
                    <dt>Mon – Fri</dt>
                    <dd className="tabular-nums">6:00 – 14:00</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Saturday</dt>
                    <dd className="tabular-nums">6:30 – 14:00</dd>
                  </div>
                  <div className="flex justify-between gap-4 text-[#EFE4D2]/50">
                    <dt>Sunday</dt>
                    <dd>Closed</dd>
                  </div>
                </dl>
              </Reveal>
              <Reveal delay={120}>
                <p className={`${label} text-[#EFE4D2]/50`}>Say hello</p>
                <p className="mt-3 space-y-1.5 text-[15px] leading-[1.6]">
                  <a href="tel:+61255508830" className="block hover:opacity-70">02 5550 8830</a>
                  <a href="mailto:hello@halfway.coffee" className="block hover:opacity-70">hello@halfway.coffee</a>
                  <a href="#" className="block hover:opacity-70">Instagram</a>
                </p>
              </Reveal>
              <Reveal delay={180} className="col-span-2">
                <p className={`${label} text-[#EFE4D2]/50`}>Wholesale</p>
                <p className="mt-3 max-w-[22rem] text-[15px] leading-[1.5] text-[#EFE4D2]/80">
                  We supply a handful of offices and one very good bookshop. Beans, training, machine service. Ask at the counter.
                </p>
              </Reveal>
            </div>
          </div>
          <div className={`${label} flex flex-col gap-2 border-t border-[#EFE4D2]/15 px-5 py-5 text-[#EFE4D2]/40 md:flex-row md:items-center md:justify-between md:px-8`}>
            <span>© Halfway House 2026</span>
            <span>ABN 51 824 753 556 · Shop powered by Shopify · Sixth coffee free</span>
          </div>
        </footer>
      </div>
    </>
  );
}
