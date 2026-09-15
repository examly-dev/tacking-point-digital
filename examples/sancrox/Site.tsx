import { Barlow, Barlow_Condensed } from 'next/font/google';
import { asset } from '@/lib/asset';
import { Count, InPageScroll, Reveal, ScrollSpy, type SpyItem } from '@/examples/_shared/primitives';

/*
  SANCROX CIVIL — Port Macquarie civil engineers.
  Barlow / Barlow Condensed. Steel navy and ochre. Roads, drainage, subdivisions.
  Conventional infrastructure site — not Harbourline (forest green, marinas).
*/

const sans = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--sx-sans',
  display: 'swap',
});
const condensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--sx-cond',
  display: 'swap',
});

const photo = (file: string) => asset(`/examples/sancrox/${file}`);

const INK = '#1B2838';
const PAPER = '#F3F0E8';
const OCHRE = '#C9892E';
const DARK = '#141C26';
const mute = 'text-[#1B2838]/55';
const label = 'text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1B2838]/45';
const cond = 'font-[family-name:var(--sx-cond)] font-semibold tracking-[0.02em]';
const section = 'scroll-mt-[var(--in-page-scroll-margin,5.5rem)]';

const navItems: SpyItem[] = [
  { href: '#practice', label: 'Practice' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#people', label: 'People' },
];

const services = [
  {
    t: 'Roads and pavement',
    p: 'Alignment, pavement design and set-out drawings. Local roads, estate streets, and the civil that sits next to a state job.',
  },
  {
    t: 'Stormwater and flooding',
    p: 'Trunk drains, pits, overland flow, and MUSIC where council asks for it. Coastal catchments that fill in an afternoon.',
  },
  {
    t: 'Subdivisions',
    p: 'Estate civil: roads, drainage, earthworks volumes and the DA pack. Most of it is west of town and along the lakes.',
  },
  {
    t: 'Bridges and culverts',
    p: 'Small spans, box culverts and waterway crossings. Condition first, then design, then hold-points on site.',
  },
  {
    t: 'DA and CDC civil',
    p: 'Civil plans, SEE notes and the council RFIs. Written so the planner and the engineer are looking at the same job.',
  },
  {
    t: 'Construction-phase',
    p: 'RFIs, inspections and as-builts. The people who designed it stay on through practical completion.',
  },
];

const jobs = [
  {
    t: 'Estate roads, Thrumster',
    k: 'Subdivision · two stages',
    p: 'Pavement, drainage and a basin that had to fit a tight lot yield. Issued for construction in 2025.',
    photo: 'earthworks.jpg',
    alt: 'Earthworks and plant on a subdivision',
  },
  {
    t: 'Culverts, Maria River Road',
    k: 'Structures · local road',
    p: 'Three cells. Sized for the 1% AEP without lifting the road. Built in a short shutdown.',
    photo: 'highway.jpg',
    alt: 'A dual carriageway through a rock cutting in New South Wales',
  },
  {
    t: 'Pavement overlay, Oxley Highway',
    k: 'Pavement · rehabilitation',
    p: 'A failing section west of Wauchope. Overlay design and construction inspections for the contractor.',
    photo: 'pavement.jpg',
    alt: 'A paving crew laying asphalt',
  },
];

const steps = [
  { t: 'Site and brief', p: 'We walk the job, read the constraints, and say what will actually get through council.' },
  { t: 'Concept for DA or CDC', p: 'Enough civil to lodge: roads, levels, drainage and the notes the planner needs.' },
  { t: 'Detailed design', p: 'Issued-for-construction drawings a contractor can price and set out from.' },
  { t: 'Construction support', p: 'RFIs, hold-points and as-builts. Same engineers, not a new face at PC.' },
];

const towns = [
  { name: 'Taree', note: 'MidCoast' },
  { name: 'Port Macquarie', note: 'Office' },
  { name: 'Kempsey', note: 'Macleay' },
  { name: 'Nambucca Heads', note: 'Nambucca' },
  { name: 'Coffs Harbour', note: 'Coffs' },
];

const people = [
  {
    name: 'Mark Pell',
    role: 'Principal, CPEng NER',
    p: 'Civil and structural. Twenty-two years in regional NSW, fourteen of them from this office.',
    photo: 'mark.jpg',
    alt: 'Mark Pell, principal',
  },
  {
    name: 'James Okeke',
    role: 'Senior engineer — stormwater',
    p: 'Flooding, MUSIC and the coastal catchments that keep putting water in the lots.',
    photo: 'james.jpg',
    alt: 'James Okeke, senior engineer',
  },
  {
    name: 'Amara Nkosi',
    role: 'Project engineer',
    p: 'Roads, subdivisions and the inspections. Most weeks she is on a site between Taree and Coffs.',
    photo: 'field.jpg',
    alt: 'Amara Nkosi reviewing a map on site',
  },
];

export default function SancroxPage() {
  return (
    <>
      <InPageScroll />

      <div
        data-example=""
        className={`${sans.variable} ${condensed.variable} font-[family-name:var(--sx-sans)] min-h-screen antialiased`}
        style={{ background: PAPER, color: INK }}
      >
        <header className="custom-header sticky top-0 z-50 border-b border-[#1B2838]/10 bg-[#F3F0E8]">
          <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 py-3.5 md:px-8">
            <a href="#top" className="min-w-0">
              <p className={`${cond} text-[22px] leading-none md:text-[24px]`}>Sancrox Civil</p>
              <p className={`${label} mt-1 hidden sm:block`}>Civil engineers · Port Macquarie</p>
            </a>
            <div className="flex items-center gap-3 md:gap-8">
              <ScrollSpy
                items={navItems}
                className="hidden items-center gap-6 lg:flex"
                linkClass="text-[14px] font-medium transition-colors"
                activeClass="text-[#1B2838]"
                inactiveClass="text-[#1B2838]/50 hover:text-[#1B2838]"
              />
              <a
                href="#contact"
                className="inline-flex h-10 items-center px-4 text-[13px] font-semibold text-white md:h-11 md:px-5 md:text-[14px]"
                style={{ background: OCHRE }}
              >
                Start a job
              </a>
            </div>
          </div>
          <nav className="mx-auto flex max-w-[1180px] flex-wrap gap-x-5 gap-y-1 px-5 pb-3 text-[13px] font-medium text-[#1B2838]/55 lg:hidden md:px-8">
            {navItems.map((it) => (
              <a key={it.href} href={it.href} className="hover:text-[#1B2838]">
                {it.label}
              </a>
            ))}
          </nav>
        </header>

        <section id="top" className={`${section} relative min-h-[min(88svh,820px)] overflow-hidden text-white`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo('hero.jpg')}
            alt="Pacific Highway tunnel in New South Wales, looking out to daylight"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141C26]/88 via-[#141C26]/55 to-[#141C26]/20" />
          <div className="relative mx-auto flex min-h-[min(88svh,820px)] max-w-[1180px] flex-col justify-end px-5 pb-12 pt-28 md:px-8 md:pb-16 md:pt-32">
            <Reveal>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/65">
                Port Macquarie · Mid North Coast · NSW
              </p>
              <h1 className={`${cond} mt-4 max-w-[16ch] text-[clamp(36px,6.4vw,76px)] leading-[0.95]`}>
                Roads, drainage and structures for the Mid North Coast.
              </h1>
              <p className="mt-5 max-w-[36rem] text-[17px] leading-[1.5] text-white/80 md:text-[18px]">
                We design the civil work that gets a DA through and a job built, and we stay on through construction.
              </p>
              <a
                href="#services"
                className="mt-8 inline-flex h-12 items-center px-6 text-[15px] font-semibold text-[#141C26]"
                style={{ background: OCHRE }}
              >
                What we do
              </a>
            </Reveal>
          </div>
        </section>

        <section className="border-b border-[#1B2838]/10 bg-white">
          <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-8 px-5 py-10 md:grid-cols-4 md:px-8 md:py-12">
            {[
              { n: 2003, s: '', l: 'Established' },
              { n: 14, s: '', l: 'Engineers and drafters' },
              { n: 22, s: '', l: 'Years in regional NSW' },
              { n: 5, s: '', l: 'LGAs we work in most weeks' },
            ].map((st) => (
              <div key={st.l}>
                <p className={`${cond} text-[36px] leading-none md:text-[42px]`}>
                  <Count to={st.n} suffix={st.s} />
                </p>
                <p className={`${label} mt-2`}>{st.l}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="practice" className={`${section} border-b border-[#1B2838]/10`}>
          <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:gap-16 md:px-8 md:py-24">
            <Reveal>
              <p className={label}>The practice</p>
              <h2 className={`${cond} mt-3 max-w-[16ch] text-[clamp(28px,4vw,44px)] leading-[1.05]`}>
                A Port Macquarie office, jobs across NSW.
              </h2>
              <p className="mt-5 max-w-[36rem] text-[16px] leading-[1.55] md:text-[17px]">
                Most of the work sits between Taree and Coffs Harbour: estate roads, stormwater, culverts, pavement, and
                the inspections that follow. We take jobs further into NSW when a client we already know asks.
              </p>
              <p className={`mt-4 max-w-[36rem] text-[16px] leading-[1.55] ${mute}`}>
                Councils, land developers, builders and private owners. We do not put other people’s marks on the site.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div className="relative aspect-[4/3] overflow-hidden bg-[#1B2838]/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo('drawings.jpg')}
                  alt="Engineers at a table of drawings, with a hard hat and calculator"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="services" className={`${section} border-b border-[#1B2838]/10 bg-white`}>
          <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-16 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-20 md:px-8 md:py-24">
            <div className="md:sticky md:top-28 md:self-start">
              <Reveal>
                <p className={label}>Services</p>
                <h2 className={`${cond} mt-3 max-w-[12ch] text-[clamp(28px,4vw,44px)] leading-[1.05]`}>What we do</h2>
                <p className={`mt-4 max-w-[22rem] text-[16px] leading-[1.5] ${mute}`}>
                  The list a small-to-mid NSW civil consultancy actually keeps: design, approvals, and construction-phase.
                </p>
              </Reveal>
            </div>
            <ul>
              {services.map((s, i) => (
                <Reveal key={s.t} as="li" delay={i * 40} className="border-t border-[#1B2838]/10 py-7 first:border-t-0 first:pt-0">
                  <h3 className="text-[20px] font-semibold tracking-[-0.02em] md:text-[22px]">{s.t}</h3>
                  <p className={`mt-2 max-w-[40rem] text-[15px] leading-[1.5] md:text-[16px] ${mute}`}>{s.p}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section id="work" className={`${section} border-b border-[#1B2838]/10`}>
          <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
            <Reveal>
              <p className={label}>Work</p>
              <h2 className={`${cond} mt-3 max-w-[18ch] text-[clamp(28px,4vw,44px)] leading-[1.05]`}>
                Recent jobs on the coast
              </h2>
              <p className={`mt-4 max-w-[36rem] text-[16px] leading-[1.5] ${mute}`}>
                A few from the last couple of years. Estate civil, a waterway crossing, and a pavement overlay.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {jobs.map((job, i) => (
                <Reveal key={job.t} delay={i * 70} as="figure">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#1B2838]/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo(job.photo)} alt={job.alt} className="h-full w-full object-cover" />
                  </div>
                  <p className={`${label} mt-4`}>{job.k}</p>
                  <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.02em]">{job.t}</h3>
                  <p className={`mt-2 text-[15px] leading-[1.5] ${mute}`}>{job.p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="text-white" style={{ background: DARK }}>
          <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-16 md:grid-cols-2 md:items-center md:gap-16 md:px-8 md:py-24">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">On site</p>
              <h2 className={`${cond} mt-3 max-w-[14ch] text-[clamp(28px,4vw,44px)] leading-[1.05]`}>
                The same people through construction
              </h2>
              <p className="mt-5 max-w-[32rem] text-[16px] leading-[1.55] text-white/70">
                Drawings get read in the rain. We write them that way, then we turn up for the hold-points.
              </p>
              <ol className="mt-8 space-y-5">
                {steps.map((st) => (
                  <li key={st.t} className="border-t border-white/10 pt-5">
                    <p className="text-[17px] font-semibold">{st.t}</p>
                    <p className="mt-1 text-[14px] leading-[1.5] text-white/55">{st.p}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={80}>
              <div className="relative aspect-[4/5] overflow-hidden bg-white/5 sm:aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo('site.jpg')}
                  alt="An engineer walking a new concrete slab with drawings in hand"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className={`${section} border-b border-[#1B2838]/10 bg-white`}>
          <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-16 md:grid-cols-2 md:items-center md:gap-20 md:px-8 md:py-24">
            <Reveal>
              <p className={label}>Where we work</p>
              <h2 className={`${cond} mt-3 max-w-[16ch] text-[clamp(28px,4vw,44px)] leading-[1.05]`}>
                Mid North Coast, and further when asked
              </h2>
              <p className={`mt-4 max-w-[32rem] text-[16px] leading-[1.55] ${mute}`}>
                Office in Port Macquarie. Most weeks we are in Port Macquarie-Hastings, Kempsey, Nambucca, Coffs Harbour
                or MidCoast. Not a map of somewhere else.
              </p>
              <ul className="mt-8 space-y-0">
                {towns.map((t) => (
                  <li
                    key={t.name}
                    className="flex items-baseline justify-between gap-4 border-t border-[#1B2838]/10 py-3.5"
                  >
                    <span className="text-[17px] font-medium">{t.name}</span>
                    <span className={label}>{t.note}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80} className="flex justify-center md:justify-end">
              <svg
                viewBox="0 0 220 420"
                className="h-[min(420px,70vw)] w-auto"
                role="img"
                aria-label="Schematic of the Mid North Coast, with the office at Port Macquarie"
              >
                <path
                  d="M118 18 C128 52 142 78 148 118 C154 158 168 188 162 228 C154 272 138 308 132 348 C128 378 142 402 150 412"
                  fill="none"
                  stroke={INK}
                  strokeOpacity="0.22"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M118 18 C128 52 142 78 148 118 C154 158 168 188 162 228 C154 272 138 308 132 348 C128 378 142 402 150 412"
                  fill="none"
                  stroke={INK}
                  strokeWidth="2.2"
                />
                {[
                  { y: 70, r: 4 },
                  { y: 168, r: 7 },
                  { y: 236, r: 4 },
                  { y: 292, r: 4 },
                  { y: 348, r: 4 },
                ].map((d) => (
                  <circle key={d.y} cx="148" cy={d.y} r={d.r} fill={d.r > 5 ? OCHRE : INK} />
                ))}
                <text x="168" y="74" fontSize="11" fill={INK} opacity="0.55">
                  Taree
                </text>
                <text x="168" y="164" fontSize="13" fontWeight="600" fill={INK}>
                  Port Macquarie
                </text>
                <text x="168" y="180" fontSize="10" fill={INK} opacity="0.45">
                  Office
                </text>
                <text x="168" y="240" fontSize="11" fill={INK} opacity="0.55">
                  Kempsey
                </text>
                <text x="168" y="296" fontSize="11" fill={INK} opacity="0.55">
                  Nambucca
                </text>
                <text x="168" y="352" fontSize="11" fill={INK} opacity="0.55">
                  Coffs Harbour
                </text>
              </svg>
            </Reveal>
          </div>
        </section>

        <section id="people" className={`${section} border-b border-[#1B2838]/10`}>
          <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
            <Reveal>
              <p className={label}>People</p>
              <h2 className={`${cond} mt-3 max-w-[16ch] text-[clamp(28px,4vw,44px)] leading-[1.05]`}>
                Who you deal with
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-10 sm:grid-cols-3">
              {people.map((pe, i) => (
                <Reveal key={pe.name} delay={i * 60}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#1B2838]/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo(pe.photo)}
                      alt={pe.alt}
                      className={`h-full w-full object-cover ${pe.photo === 'field.jpg' ? 'object-[30%_20%]' : 'object-top'}`}
                    />
                  </div>
                  <p className="mt-4 text-[18px] font-semibold tracking-[-0.02em]">{pe.name}</p>
                  <p className={`${label} mt-1`}>{pe.role}</p>
                  <p className={`mt-3 text-[15px] leading-[1.5] ${mute}`}>{pe.p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <footer id="contact" className={`custom-footer ${section} text-white`} style={{ background: DARK }}>
          <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-16 md:grid-cols-2 md:gap-20 md:px-8 md:py-20">
            <div>
              <p className={`${cond} text-[28px] md:text-[32px]`}>Sancrox Civil</p>
              <p className="mt-4 max-w-[28rem] text-[16px] leading-[1.55] text-white/70">
                Civil engineers. Roads, drainage, subdivisions and structures. Port Macquarie, working across NSW.
              </p>
              <dl className="mt-8 space-y-4 text-[15px] leading-[1.5]">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">Office</dt>
                  <dd className="mt-1 text-white/85">
                    Level 1, 18 William Street
                    <br />
                    Port Macquarie NSW 2444
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">Hours</dt>
                  <dd className="mt-1 text-white/85">Monday–Friday, 8:00 am – 5:00 pm</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">Contact</dt>
                  <dd className="mt-1 text-white/85">
                    02 6584 2190
                    <br />
                    office@sancroxcivil.com.au
                  </dd>
                </div>
              </dl>
              <nav className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-white/60">
                {navItems.map((it) => (
                  <a key={it.href} href={it.href} className="hover:text-white">
                    {it.label}
                  </a>
                ))}
              </nav>
            </div>
            <form className="border border-white/10 bg-white/[0.03] p-6 md:p-8" action="#contact" method="get">
              <p className="text-[18px] font-semibold">Send a brief</p>
              <p className="mt-2 text-[14px] leading-[1.5] text-white/55">
                A location, a council if you have one, and what you need designed. We will say if it is a fit.
              </p>
              <label className="mt-6 block text-[12px] font-semibold uppercase tracking-[0.12em] text-white/45">
                Name
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  className="mt-2 block h-11 w-full border border-white/15 bg-transparent px-3 text-[15px] font-normal tracking-normal text-white outline-none focus:border-[#C9892E]"
                />
              </label>
              <label className="mt-4 block text-[12px] font-semibold uppercase tracking-[0.12em] text-white/45">
                Email
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="mt-2 block h-11 w-full border border-white/15 bg-transparent px-3 text-[15px] font-normal tracking-normal text-white outline-none focus:border-[#C9892E]"
                />
              </label>
              <label className="mt-4 block text-[12px] font-semibold uppercase tracking-[0.12em] text-white/45">
                The job
                <textarea
                  name="job"
                  rows={4}
                  className="mt-2 block w-full border border-white/15 bg-transparent px-3 py-2.5 text-[15px] font-normal tracking-normal text-white outline-none focus:border-[#C9892E]"
                />
              </label>
              <button
                type="submit"
                className="mt-6 inline-flex h-12 items-center px-6 text-[15px] font-semibold text-[#141C26]"
                style={{ background: OCHRE }}
              >
                Send
              </button>
            </form>
          </div>
          <p className="mx-auto max-w-[1180px] border-t border-white/10 px-5 py-6 text-[12px] text-white/40 md:px-8">
            © 2026 Sancrox Civil Pty Ltd. Example site — not a real practice.
          </p>
        </footer>
      </div>
    </>
  );
}
