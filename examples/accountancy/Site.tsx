import Image from 'next/image';
import { Schibsted_Grotesk } from 'next/font/google';
import { Count, Reveal } from '@/examples/_shared/primitives';

/*
  ROWE ACCOUNTING — chartered accountants.
  Schibsted Grotesk — sharp 2026 sans, no dusty serif. Navy, published prices.
*/

const sans = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--mf-sans',
  display: 'swap',
});

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const NAVY = '#0B1526';
const TAN = '#B89B6A';
const label = 'text-[11px] font-semibold uppercase tracking-[0.14em]';
const h = 'font-[family-name:var(--mf-sans)] font-medium tracking-[-0.035em]';
const rule = 'border-[#0B1526]/15';

const clients = [
  { h: 'Trades and builders', p: 'Job costing, progress claims, and a BAS that does not arrive as a surprise.' },
  { h: 'Cafés, bars and food', p: 'Thin margins, rosters, tips and tills. We know what a good week looks like.' },
  { h: 'Health practitioners', p: 'Service entities, associates, and the payroll tax questions nobody warned you about.' },
  { h: 'Farms and land', p: 'Averaging, FMDs, succession. The long view, because that is how land works.' },
];

const services = [
  { h: 'Bookkeeping', p: 'Xero, reconciled weekly. You see the same numbers we do.' },
  { h: 'BAS and tax', p: 'Lodged on time, every time. We chase you before the ATO does.' },
  { h: 'Payroll and super', p: 'Awards, STP, super guarantee. Staff paid right, on the day.' },
  { h: 'Structure', p: 'Sole trader, company, trust. Set up for where you are going, not where you were.' },
  { h: 'Management reporting', p: 'A one-page monthly report you will actually read, and a call to go through it.' },
  { h: 'Selling or handing on', p: 'Valuation, due diligence, and the tax on the way out. Start two years early.' },
];

const plans = [
  {
    name: 'Sole trader',
    price: 220,
    lines: ['Quarterly BAS', 'Annual tax return', 'Xero subscription', 'Unlimited email questions', 'One review meeting a year'],
  },
  {
    name: 'Company',
    price: 480,
    lines: ['Everything in Sole trader', 'Monthly bookkeeping', 'Payroll to 10 staff', 'Company and director returns', 'Quarterly review meeting'],
    featured: true,
  },
  {
    name: 'Group',
    price: 950,
    lines: ['Everything in Company', 'Multiple entities and trusts', 'Monthly management report', 'Payroll to 40 staff', 'A named partner, on the phone'],
  },
];

const people = [
  { name: 'Helen Rowe', role: 'Principal, CA', id: '1551836022-d5d88e9218df' },
  { name: 'James Hale', role: 'Senior accountant', id: '1519085360753-af0119f7cbe7' },
  { name: 'Ruth Okafor', role: 'Senior accountant', id: '1531123897727-8f129e1688ce' },
  { name: 'Peter Lund', role: 'Bookkeeping lead', id: '1472099645785-5658abf4ff4e' },
];

const faq = [
  { q: 'Is it really fixed? What if I ring a lot?', a: 'Yes. Questions are included. If your business changes shape (new entity, doubling staff) we re-quote before anything changes.' },
  { q: 'Do I have to move to Xero?', a: 'For the monthly plans, yes. It is how we keep the price where it is. We do the migration and the training, and it is quicker than you fear.' },
  { q: 'What happens with my old accountant?', a: 'We write to them with your authority, collect the files, and pick up mid-year without redoing anything.' },
  { q: 'Can I come in?', a: 'Of course. We are upstairs from the bookshop. Most clients prefer a video call once they have met us, but the kettle is always on.' },
];

export default function MarlowFinchPage() {
  return (
    <>

      <div
        data-example=""
        className={`${sans.variable} font-[family-name:var(--mf-sans)] min-h-screen bg-white text-[#0B1526] antialiased selection:bg-[#0B1526] selection:text-white`}
      >
        {/* Masthead: serif wordmark, four links, one call to action. */}
        <header className={`custom-header sticky top-0 z-50 border-b border-[#0B1526] bg-white`}>
          <div className="flex h-[4.5rem] items-center justify-between gap-6 px-5 md:px-8">
            <a href="#top" className={`${h} text-[30px] leading-none md:text-[36px]`}>
              Rowe Accounting
            </a>
            <nav className="flex items-center gap-x-8 text-[15px]">
              {[
                ['#who', 'Who'],
                ['#services', 'Services'],
                ['#fees', 'Fees'],
                ['#faq', 'FAQ'],
              ].map(([href, l]) => (
                <a key={href} href={href} className="hidden hover:opacity-50 md:inline">
                  {l}
                </a>
              ))}
              <a
                href="#talk"
                className="inline-flex h-10 items-center whitespace-nowrap bg-[#0B1526] px-4 text-[14px] font-medium text-white transition-colors hover:bg-[#B58B4C]"
              >
                Book a call
              </a>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section id="top" className="flex min-h-[calc(100svh-4.5rem)] flex-col justify-between px-5 pb-8 pt-12 md:px-8 md:pt-16">
          <div>
            <Reveal>
              <p className={`${label} text-[#0B1526]/55`}>Fixed fees · A partner on the phone · No surprises</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className={`${h} mt-8 max-w-[15ch] text-[clamp(48px,7.6vw,128px)] leading-[0.95]`}>
                Accounting for people who would rather be running the business.
              </h1>
            </Reveal>
          </div>

          <div className={`mt-16 grid grid-cols-12 gap-x-4 gap-y-8 border-t ${rule} pt-6`}>
            <Reveal delay={160} className="col-span-12 md:col-span-5">
              <p className="max-w-[26rem] text-[17px] leading-[1.45] md:text-[19px]">
                Fixed monthly fees, published below. A partner who knows your name and your margins. Tax lodged on time
                without you chasing us.
              </p>
            </Reveal>
            <div className="col-span-12 grid grid-cols-3 gap-4 md:col-span-6 md:col-start-7">
              {[
                { n: 340, s: '', l: 'Businesses looked after' },
                { n: 100, s: '%', l: 'Lodged on time, three years running' },
                { n: 0, s: '', l: 'Surprise invoices, ever' },
              ].map((k, i) => (
                <Reveal key={k.l} delay={200 + i * 60}>
                  <p className={`${h} text-[clamp(36px,4.6vw,72px)] leading-none`}>
                    <Count to={k.n} suffix={k.s} />
                  </p>
                  <p className={`${label} mt-3 text-[#0B1526]/55`}>{k.l}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Who */}
        <section id="who" className={`border-t ${rule} px-5 py-20 md:px-8 md:py-28`}>
          <Reveal>
            <p className={`${label} text-[#0B1526]/55`}>Who we work with</p>
          </Reveal>
          <div className={`mt-10 grid grid-cols-1 gap-px bg-[#0B1526]/15 md:grid-cols-4`}>
            {clients.map((c, i) => (
              <Reveal key={c.h} delay={i * 60} className="flex flex-col justify-between bg-white p-6 md:min-h-[18rem] md:p-7">
                <h3 className={`${h} text-[clamp(28px,2.6vw,38px)] leading-[1.02]`}>{c.h}</h3>
                <p className="mt-8 text-[15px] leading-[1.5] text-[#0B1526]/70">{c.p}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Services */}
        <section id="services" className={`border-t ${rule} px-5 py-20 md:px-8 md:py-28`}>
          <div className="grid grid-cols-12 gap-4">
            <Reveal className="col-span-12 md:col-span-3">
              <p className={`${label} text-[#0B1526]/55`}>What we do</p>
            </Reveal>
            <Reveal delay={60} className="col-span-12 md:col-span-8 md:col-start-5">
              <p className={`${h} text-[clamp(30px,4vw,60px)] leading-[1.02]`}>
                Six things, done properly. If you need something else we will tell you who to ring.
              </p>
            </Reveal>
          </div>
          <ol className={`mt-16 border-t ${rule}`}>
            {services.map((s, i) => (
              <Reveal key={s.h} as="li" delay={i * 40} y={12} className={`group grid grid-cols-12 items-baseline gap-4 border-b ${rule} py-6 md:py-7`}>
                <h3 className={`${h} col-span-12 text-[clamp(28px,3.2vw,46px)] leading-none md:col-span-6`}>{s.h}</h3>
                <p className="col-span-12 text-[15px] leading-[1.5] text-[#0B1526]/70 md:col-span-5 md:col-start-8 md:text-[16px]">{s.p}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Fees */}
        <section id="fees" className={`border-t ${rule} px-5 py-20 md:px-8 md:py-28`}>
          <div className="grid grid-cols-12 gap-4">
            <Reveal className="col-span-12 md:col-span-3">
              <p className={`${label} text-[#0B1526]/55`}>Fees</p>
              <p className="mt-6 max-w-[16rem] text-[15px] leading-[1.5] text-[#0B1526]/70">
                Per month, including GST. Most clients land in the middle. We will tell you if you are paying for more than
                you need.
              </p>
            </Reveal>
            <div className="col-span-12 grid grid-cols-1 gap-px bg-[#0B1526]/15 md:col-span-9 md:col-start-4 md:grid-cols-3">
              {plans.map((p, i) => (
                <Reveal key={p.name} delay={i * 80} className="flex flex-col bg-white p-6 md:p-7">
                  <div className="flex items-baseline justify-between">
                    <h3 className={`${h} text-[28px] leading-none`}>{p.name}</h3>
                    {p.featured ? <span className={`${label}`} style={{ color: TAN }}>Most common</span> : null}
                  </div>
                  <p className={`${h} mt-10 text-[clamp(56px,6vw,96px)] leading-none tabular-nums`}>
                    <span className="align-top text-[0.4em] text-[#0B1526]/55">$</span>
                    {p.price}
                    <span className={`${label} ml-2 text-[#0B1526]/55`}>/ month</span>
                  </p>
                  <ul className={`mt-10 space-y-2 border-t ${rule} pt-5 text-[14px] leading-[1.5]`}>
                    {p.lines.map((l, j) => (
                      <li key={l} className="flex items-baseline gap-3">
                        <span className={`${label} text-[#0B1526]/45`}>·</span>
                        <span className="flex-1 border-b border-dotted border-[#0B1526]/25" aria-hidden="true" />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#talk" className="mt-10 inline-block self-start border-b border-[#0B1526] pb-0.5 text-[14px] hover:opacity-50">
                    Start with {p.name.toLowerCase()} →
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* People */}
        <section className={`border-t ${rule} px-5 py-20 md:px-8 md:py-28`}>
          <Reveal>
            <p className={`${label} text-[#0B1526]/55`}>Who you will deal with</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
            {people.map((p, i) => (
              <Reveal key={p.name} as="figure" delay={i * 70}>
                <div className="relative aspect-[4/5] overflow-hidden bg-[#0B1526]/5">
                  <Image
                    src={img(p.id, 900)}
                    alt={`${p.name}, ${p.role}`}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover grayscale contrast-[1.1] transition-[filter] duration-700 hover:grayscale-0"
                  />
                </div>
                <figcaption className="mt-4">
                  <p className={`${h} text-[22px] leading-none`}>{p.name}</p>
                  <p className={`${label} mt-2 text-[#0B1526]/55`}>{p.role}</p>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className={`border-t ${rule} px-5 py-20 md:px-8 md:py-28`}>
          <div className="grid grid-cols-12 gap-4">
            <Reveal className="col-span-12 md:col-span-3">
              <p className={`${label} text-[#0B1526]/55`}>Things people ask</p>
            </Reveal>
            <div className={`col-span-12 border-t ${rule} md:col-span-8 md:col-start-5`}>
              {faq.map((f, i) => (
                <Reveal key={f.q} delay={i * 40} y={10}>
                  <details className={`group border-b ${rule}`}>
                    <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                      <span className={`${h} text-[clamp(22px,2.4vw,32px)] leading-tight`}>{f.q}</span>
                      <span className="text-[24px] leading-none transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <p className="max-w-[40rem] pb-6 text-[15px] leading-[1.55] text-[#0B1526]/70 md:text-[16px]">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="talk" className="custom-footer text-white" style={{ background: NAVY }}>
          <div className="px-5 pt-20 md:px-8 md:pt-28">
            <Reveal>
              <p className={`${h} text-[clamp(52px,10vw,170px)] leading-[0.9]`}>
                Let’s talk <span style={{ color: TAN }}>numbers.</span>
              </p>
            </Reveal>
          </div>
          <div className="mt-16 grid grid-cols-12 gap-x-4 gap-y-10 border-t border-white/15 px-5 py-10 md:mt-24 md:px-8">
            <Reveal className="col-span-12 md:col-span-4">
              <p className={`${label} text-white/50`}>A first call is free</p>
              <p className="mt-3 text-[17px] leading-snug">
                Twenty minutes, no slides. Tell us what is annoying you about the numbers and we will tell you whether we can
                fix it.
              </p>
              <a href="#" className="mt-4 inline-block border-b border-white/40 pb-0.5 text-[14px] hover:border-white">
                Pick a time
              </a>
            </Reveal>
            <Reveal delay={60} className="col-span-12 md:col-span-3 md:col-start-6">
              <p className={`${label} text-white/50`}>Office</p>
              <p className="mt-3 text-[17px] leading-snug">
                Level 1, above the bookshop
                <br />
                Mon – Fri, 8:30 – 5:00
              </p>
              <p className="mt-3 text-[17px]"><a href="tel:+61255500480" className="hover:opacity-60">02 5550 0480</a></p>
            </Reveal>
            <Reveal delay={120} className="col-span-12 md:col-span-3 md:col-start-10">
              <p className={`${label} text-white/50`}>Write</p>
              <p className="mt-3 text-[17px] leading-snug">
                <a href="mailto:hello@roweaccounting.com.au" className="hover:opacity-60">hello@roweaccounting.com.au</a>
                <br />
                <a href="#" className="hover:opacity-60">LinkedIn</a>
              </p>
            </Reveal>
          </div>
          <div className={`${label} flex flex-col gap-2 px-5 pb-6 pt-2 text-white/40 md:flex-row md:items-center md:justify-between md:px-8`}>
            <span>© Rowe Accounting 2026</span>
            <span>Liability limited by a scheme approved under Professional Standards Legislation</span>
          </div>
        </footer>
      </div>
    </>
  );
}
