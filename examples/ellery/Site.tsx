import Image from 'next/image';
import { Newsreader, Public_Sans } from 'next/font/google';
import { asset } from '@/lib/asset';
import { InPageScroll, Reveal, ScrollSpy } from '@/examples/_shared/primitives';

/*
  ELLERY LAWYERS
  Indicative small-firm one-pager, Newcastle / Hamilton NSW.
  Cream paper, Newsreader display, Public Sans UI.
  Few nav items, one building photograph, maize accent — not forest green,
  not Archivo Black, not Sora, not Outfit.
*/

const display = Newsreader({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  variable: '--el-display',
  display: 'swap',
});
const sans = Public_Sans({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--el-sans',
  display: 'swap',
});

const PAPER = '#F5F0E6';
const INK = '#1C1915';
const MAIZE = '#E4D36A';
const FOOTER = '#161412';
const photo = (file: string) => asset(`/examples/ellery/${file}`);
const serif = 'font-[family-name:var(--el-display)]';
const label = 'text-[11px] font-medium uppercase tracking-[0.18em] text-[#1C1915]/45';
const section = 'scroll-mt-[var(--in-page-scroll-margin,5rem)]';

const nav = [
  { href: '#about' as const, label: 'About' },
  { href: '#practice' as const, label: 'Practice' },
  { href: '#people' as const, label: 'People' },
  { href: '#notes' as const, label: 'Notes' },
];

const practice = [
  {
    h: 'Property',
    p: 'Buying and selling houses and units, off-the-plan, and leases. Newcastle, Lake Macquarie and the Lower Hunter.',
    icon: 'building',
  },
  {
    h: 'Estates',
    p: 'Wills, enduring powers of attorney, probate and family provision. Supreme Court of NSW when a grant is required.',
    icon: 'papers',
  },
  {
    h: 'Family',
    p: 'Separation, parenting and property. Federal Circuit and Family Court if it does not settle.',
    icon: 'house',
  },
];

const people = [
  {
    name: 'Helen Ellery',
    role: 'Principal · NSW',
    note: 'Admitted in New South Wales. Opened the practice in 1998. Still takes files herself.',
    photo: 'helen.jpg',
    pos: 'object-[50%_18%]',
  },
  {
    name: 'Amir Rahman',
    role: 'Solicitor · property',
    note: 'Contracts for sale, off-the-plan and leases. Settlements around Newcastle and Lake Macquarie.',
    photo: 'amir.jpg',
    pos: 'object-[50%_12%]',
  },
  {
    name: 'Claire Nash',
    role: 'Solicitor · family',
    note: 'Parenting and property after separation. Plain advice, then the paperwork.',
    photo: 'claire.jpg',
    pos: 'object-[50%_22%]',
  },
  {
    name: 'Tom Brier',
    role: 'Solicitor · estates',
    note: 'Wills, probate and family provision. Works the estates list with Helen.',
    photo: 'tom.jpg',
    pos: 'object-[50%_18%]',
  },
];

const notes = [
  {
    q: 'They set out the cooling-off dates, then they just did the purchase. A house in Charlestown. Nothing extra on the bill.',
    who: 'Clare P.',
    role: 'Charlestown',
  },
  {
    q: 'I needed a will and an enduring power of attorney. They explained the difference, then sent the drafts.',
    who: 'Mark T.',
    role: 'Warners Bay',
  },
];

const faq = [
  {
    q: 'How do you charge?',
    a: 'A costs agreement and a written estimate before we start. Time in six-minute units, billed monthly, unless the job is a fixed piece of work — a standard conveyance, a simple will. You will not find a surprise on the invoice.',
  },
  {
    q: 'Who works on my file?',
    a: 'The solicitor you instruct. Another solicitor may draft; the same person still signs the letters and takes your call.',
  },
  {
    q: 'Do you go to court?',
    a: 'Family matters go to the Federal Circuit and Family Court if they do not settle. Probate and family provision are Supreme Court of NSW. We brief a barrister when a hearing needs one, and stay on the file.',
  },
];

function Seal({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="97" fill={PAPER} />
      <circle cx="100" cy="100" r="96" fill="none" stroke={INK} strokeWidth="1.1" />
      <circle cx="100" cy="100" r="78" fill="none" stroke={INK} strokeWidth="0.5" opacity="0.45" />
      <defs>
        <path id="el-ring" d="M100,100 m0,-66 a66,66 0 1,1 0,132 a66,66 0 1,1 0,-132" />
      </defs>
      <text fill={INK} fontSize="11" letterSpacing="5.2" fontWeight="500">
        <textPath href="#el-ring">ELLERY LAWYERS · NEWCASTLE ·</textPath>
      </text>
      <text
        x="100"
        y="118"
        textAnchor="middle"
        fill={INK}
        fontSize="56"
        fontFamily="var(--el-display), Georgia, serif"
      >
        E
      </text>
    </svg>
  );
}

function Icon({ name }: { name: string }) {
  const common = {
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
      {name === 'building' ? (
        <g {...common}>
          <path d="M6 28V10l10-6 10 6v18" />
          <path d="M13 28v-8h6v8" />
          <path d="M12 14h2M18 14h2M12 19h2M18 19h2" />
        </g>
      ) : name === 'papers' ? (
        <g {...common}>
          <path d="M9 7h11l5 5v13H9z" />
          <path d="M20 7v5h5" />
          <path d="M13 16h8M13 20h6" />
        </g>
      ) : (
        <g {...common}>
          <path d="M5 28V14L16 6l11 8v14" />
          <path d="M13 28v-8h6v8" />
        </g>
      )}
    </svg>
  );
}

export default function ElleryPage() {
  return (
    <>
      <InPageScroll />
      <div
        data-example=""
        className={`${display.variable} ${sans.variable} font-[family-name:var(--el-sans)] min-h-screen overflow-x-hidden antialiased`}
        style={{ background: PAPER, color: INK }}
      >
        <header className="custom-header sticky top-0 z-50 border-b border-[#1C1915]/10 bg-[#F5F0E6]/92 backdrop-blur-md">
          <div className="relative flex min-h-[4.25rem] items-center justify-between gap-3 px-5 md:min-h-[4.75rem] md:px-8">
            <ScrollSpy
              items={nav}
              className="hidden min-w-0 items-center gap-6 md:flex"
              linkClass="text-[13px] text-[#1C1915]/55 transition-colors hover:text-[#1C1915]"
              activeClass="text-[#1C1915]"
              inactiveClass=""
            />
            <a
              href="#top"
              className={`${serif} text-[22px] leading-none tracking-[-0.03em] md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:text-[26px]`}
            >
              Ellery
            </a>
            <a
              href="#contact"
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-[#1C1915] pl-4 pr-1.5 text-[13px] font-medium text-[#F5F0E6] transition-opacity hover:opacity-85 md:h-11 md:pl-5"
            >
              Contact us
              <span
                className="grid h-7 w-7 place-items-center rounded-full text-[15px] leading-none text-[#1C1915] md:h-8 md:w-8"
                style={{ background: MAIZE }}
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          </div>
        </header>

        <section id="top" className={`${section} px-5 pt-10 md:px-8 md:pt-16`}>
          <Reveal>
            <h1 className={`${serif} mx-auto max-w-[18ch] text-center text-[clamp(2.4rem,7.2vw,6.4rem)] leading-[0.96] tracking-[-0.03em]`}>
              Property, wills and family law. Newcastle.
            </h1>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-[58rem] items-center gap-10 md:mt-16 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
            <Reveal delay={80} className="flex justify-center md:justify-start">
              <Seal className="h-[9.5rem] w-[9.5rem] md:h-[11rem] md:w-[11rem]" />
            </Reveal>
            <Reveal delay={140}>
              <p className="max-w-[32rem] text-[17px] leading-[1.5] text-[#1C1915]/80 md:text-[19px]">
                Conveyancing, wills and estates, and family law. A Hamilton office, files from Newcastle, Lake Macquarie and
                the Lower Hunter. Helen opened the practice in 1998.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="relative mt-12 md:mt-16">
          <figure className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[2.05/1]">
            <Image
              src={photo('columns.jpg')}
              alt="Stone columns on a civic building"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[50%_72%] md:object-[50%_80%]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1C1915]/25 to-transparent" />
          </figure>
          <Reveal className="relative z-10 mx-5 -mt-24 max-w-[20rem] p-6 md:absolute md:bottom-10 md:left-10 md:mx-0 md:mt-0 md:max-w-[22rem] md:p-8">
            <div className="absolute inset-0" style={{ background: MAIZE }} />
            <p className={`relative ${serif} text-[22px] leading-[1.25] tracking-[-0.02em] md:text-[26px]`}>
              Most files are a purchase, a will or a separation.
            </p>
          </Reveal>
        </section>

        <section id="about" className={`${section} px-5 py-20 md:px-8 md:py-28`}>
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-3">
              <p className={label}>About</p>
            </Reveal>
            <Reveal delay={60} className="md:col-span-8 md:col-start-5">
              <p className={`${serif} max-w-[22ch] text-[clamp(1.85rem,4vw,3.25rem)] leading-[1.08] tracking-[-0.03em]`}>
                A small practice in Hamilton. Direct answers.
              </p>
              <p className="mt-8 max-w-[36rem] text-[17px] leading-[1.5] text-[#1C1915]/75 md:text-[18px]">
                Most of the work is on the phone and in writing. We meet when it helps. Four solicitors, admitted in NSW. We
                do not take on more than we can hold.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="practice" className={`${section} border-t border-[#1C1915]/10 px-5 py-20 md:px-8 md:py-28`}>
          <Reveal>
            <p className={label}>Practice</p>
          </Reveal>
          <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-3 md:gap-12">
            {practice.map((s, i) => (
              <Reveal key={s.h} delay={i * 80}>
                <div className="text-[#1C1915]/70">
                  <Icon name={s.icon} />
                </div>
                <h2 className={`${serif} mt-5 text-[clamp(1.75rem,3vw,2.35rem)] leading-none tracking-[-0.03em]`}>{s.h}</h2>
                <p className="mt-4 max-w-[22rem] text-[15px] leading-[1.5] text-[#1C1915]/70 md:text-[16px]">{s.p}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="people" className={`${section} border-t border-[#1C1915]/10 px-5 py-20 md:px-8 md:py-28`}>
          <Reveal>
            <p className={label}>People</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {people.map((p, i) => (
              <Reveal key={p.name} as="figure" delay={i * 70} className="min-w-0">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#1C1915]/5">
                  <Image
                    src={photo(p.photo)}
                    alt={`${p.name}, ${p.role}`}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                    className={`object-cover ${p.pos}`}
                  />
                </div>
                <figcaption className="mt-4">
                  <p className={`${serif} text-[22px] leading-tight tracking-[-0.02em]`}>{p.name}</p>
                  <p className={`${label} mt-1.5`}>{p.role}</p>
                  <p className="mt-3 text-[14px] leading-[1.45] text-[#1C1915]/65">{p.note}</p>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="notes" className={`${section} border-t border-[#1C1915]/10 px-5 py-20 md:px-8 md:py-28`}>
          <Reveal>
            <p className={label}>From clients</p>
          </Reveal>
          <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-2 md:gap-12">
            {notes.map((n, i) => (
              <Reveal key={n.who} delay={i * 90} className="min-w-0 border-t border-[#1C1915]/15 pt-8">
                <blockquote className={`${serif} text-[clamp(1.35rem,2.4vw,1.85rem)] leading-[1.3] tracking-[-0.02em]`}>
                  “{n.q}”
                </blockquote>
                <p className="mt-6 text-[14px]">
                  {n.who}
                  <span className="text-[#1C1915]/45"> · {n.role}</span>
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className={`${section} border-t border-[#1C1915]/10 px-5 py-20 md:px-8 md:py-28`}>
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <p className={label}>Contact us</p>
              <h2 className={`${serif} mt-5 max-w-[12ch] text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.05] tracking-[-0.03em]`}>
                A short note is enough.
              </h2>
              <p className="mt-6 max-w-[28rem] text-[16px] leading-[1.5] text-[#1C1915]/70">
                Say what the matter is and who you have already spoken to. Helen, Amir or Claire will reply. Weekdays, by
                appointment.
              </p>
              <p className="mt-8 text-[16px] leading-[1.6]">
                <a href="mailto:hello@ellery.example" className="underline decoration-[#1C1915]/25 underline-offset-4 hover:decoration-[#1C1915]">
                  hello@ellery.example
                </a>
                <br />
                <span className="tabular-nums">(02) 4926 1840</span>
              </p>
              <p className="mt-6 text-[14px] leading-[1.5] text-[#1C1915]/55">
                Level 1, 41 Hudson Street
                <br />
                Hamilton NSW 2303
                <br />
                By appointment
              </p>
            </Reveal>
            <div className="md:col-span-6 md:col-start-7">
              {faq.map((item, i) => (
                <Reveal key={item.q} delay={i * 60} className="border-t border-[#1C1915]/10 py-5 last:border-b">
                  <p className="text-[16px] font-medium tracking-[-0.01em]">{item.q}</p>
                  <p className="mt-2 text-[15px] leading-[1.5] text-[#1C1915]/65">{item.a}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <footer className="custom-footer pb-28 text-[#F5F0E6] md:pb-0" style={{ background: FOOTER }}>
          <div className="grid gap-10 px-5 py-14 md:grid-cols-12 md:px-8 md:py-16">
            <div className="md:col-span-5">
              <p className={`${serif} text-[32px] leading-none tracking-[-0.03em]`}>Ellery</p>
              <p className="mt-4 max-w-[18rem] text-[14px] leading-[1.5] text-white/55">
                Property, wills and family law. Hamilton, Newcastle.
              </p>
            </div>
            <div className="md:col-span-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/40">On this page</p>
              <p className="mt-4 space-y-2 text-[14px] text-white/75">
                {nav.map((n) => (
                  <a key={n.href} href={n.href} className="block hover:text-white">
                    {n.label}
                  </a>
                ))}
              </p>
            </div>
            <div className="min-w-0 md:col-span-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/40">Contact</p>
              <p className="mt-4 text-[14px] leading-[1.6] text-white/75">
                hello@ellery.example
                <br />
                (02) 4926 1840
                <br />
                Level 1, 41 Hudson Street
                <br />
                Hamilton NSW 2303
              </p>
            </div>
          </div>
          <p className="flex flex-col gap-1 border-t border-white/10 px-5 py-5 text-[12px] text-white/40 md:flex-row md:justify-between md:px-8">
            <span>© Ellery Lawyers Pty Ltd 2026</span>
            <span>ABN 84 102 773 019</span>
          </p>
        </footer>

        <nav
          aria-label="Sections"
          className="pointer-events-none fixed inset-x-0 bottom-[max(1.1rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-4 md:hidden"
        >
          <ScrollSpy
            items={nav}
            className="pointer-events-auto flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full bg-[#161412] p-1.5 text-[#F5F0E6]"
            linkClass="shrink-0 rounded-full px-3.5 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em]"
            activeClass="bg-[#F5F0E6] text-[#1C1915]"
            inactiveClass="text-white/70"
          />
        </nav>
      </div>
    </>
  );
}
