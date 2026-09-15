import { IBM_Plex_Mono, IBM_Plex_Sans, Oswald } from 'next/font/google';
import { asset } from '@/lib/asset';
import { Reveal } from '@/examples/_shared/primitives';

/*
  HARBOURLINE ENVIRONMENTAL
  Industrial environmental engineering. Oswald + IBM Plex. Local photos.
  Header in document flow so it never covers the hero.
*/

const display = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--hl-display',
  display: 'swap',
});
const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--hl-sans',
  display: 'swap',
});
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--hl-mono',
  display: 'swap',
});

const ASPHALT = '#161818';
const CONCRETE = '#CFC8B8';
const STEEL = '#2A3030';
const AMBER = '#D4A017';
const disp = 'font-[family-name:var(--hl-display)] font-semibold uppercase tracking-[0.04em]';
const kicker = 'font-[family-name:var(--hl-mono)] text-[11px] uppercase tracking-[0.18em]';
const photo = (file: string) => asset(`/examples/harbourline/${file}`);

const capabilities = [
  {
    h: 'Waste strategy',
    p: 'Ten-year strategies, FOGO business cases, options reports and funding submissions. Written for the people who have to take them to a council meeting.',
    img: 'recycling.jpg',
    alt: 'Baled recyclables in a materials recovery facility',
  },
  {
    h: 'Infrastructure',
    p: 'Transfer stations, landfill closure and capping, organics processing, and how a site actually runs once the ribbon is cut.',
    img: 'plant.jpg',
    alt: 'Industrial plant under a pale sky',
  },
  {
    h: 'Kerbside and contracts',
    p: 'Collection specifications, tender evaluation, mobilisation. We price what the market actually bid last time, not a tidy spreadsheet.',
    img: 'freight.jpg',
    alt: 'Heavy vehicles at a freight yard',
  },
  {
    h: 'Approvals',
    p: 'Licensing, impact assessment, management plans, monitoring and reporting a regulator can read without a covering letter.',
    img: 'earthworks.jpg',
    alt: 'Earthworks on a large site',
  },
];

const projects = [
  {
    y: '2026',
    title: 'Regional transfer station',
    who: 'A shire of 20,000',
    status: 'In progress',
    img: 'pipes.jpg',
    alt: 'Pipework and steel on an industrial site',
  },
  {
    y: '2025',
    title: 'Landfill closure and capping',
    who: 'A shire of 13,000',
    status: 'Approved',
    img: 'earthworks.jpg',
    alt: 'Capping and earthworks',
  },
  {
    y: '2024',
    title: 'FOGO processing options',
    who: 'A shire of 31,000',
    status: 'Complete',
    img: 'organics.jpg',
    alt: 'Organics and farmland at the edge of town',
  },
  {
    y: '2024',
    title: 'Kerbside collection contract',
    who: 'A city of 78,000',
    status: 'Awarded',
    img: 'freight.jpg',
    alt: 'Collection fleet yard',
  },
];

export default function HarbourlinePage() {
  return (
      <div
        data-example=""
        className={`${display.variable} ${sans.variable} ${mono.variable} font-[family-name:var(--hl-sans)] min-h-screen antialiased`}
        style={{ background: CONCRETE, color: ASPHALT }}
      >
        <header className="custom-header" style={{ background: ASPHALT }}>
          <div className="flex items-center justify-between gap-4 border-b-4 px-5 py-3 md:px-8" style={{ borderColor: AMBER }}>
            <a href="#top" className="min-w-0 text-white">
              <span className={`${disp} block text-[20px] leading-none md:text-[24px]`}>Harbourline</span>
              <span className={`${kicker} mt-1 block text-white/50`}>Environmental engineering</span>
            </a>
            <nav className={`${kicker} flex items-center gap-5 text-white md:gap-8`}>
              <a href="#work" className="hidden hover:text-[#D4A017] sm:inline">
                Capabilities
              </a>
              <a href="#projects" className="hidden hover:text-[#D4A017] sm:inline">
                Projects
              </a>
              <a href="#contact" className="inline-flex h-10 items-center px-4 text-[#161818]" style={{ background: AMBER }}>
                Contact
              </a>
            </nav>
          </div>
        </header>

        <section id="top" className="relative min-h-[70svh] overflow-hidden md:min-h-[78svh]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo('hero.jpg')}
            alt="Civil works on a large environmental infrastructure site"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
          <div className="relative flex min-h-[70svh] flex-col justify-end px-5 pb-10 pt-24 md:min-h-[78svh] md:px-8 md:pb-16">
            <Reveal>
              <p className={`${kicker} text-[#D4A017]`}>Waste · Infrastructure · Approvals · Est. 1996</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className={`${disp} mt-4 max-w-[18ch] text-[clamp(40px,8vw,92px)] leading-[0.9] text-white`}>
                Engineering for the sites that have to keep running.
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 max-w-[36rem] text-[16px] leading-[1.5] text-white/80 md:text-[18px]">
                Landfill, FOGO, kerbside contracts and the plant around them. Reports written for operators and
                councils, not for a brochure.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="grid grid-cols-2 border-y-4 md:grid-cols-4" style={{ borderColor: AMBER, background: STEEL, color: CONCRETE }}>
          {[
            ['1996', 'Independent'],
            ['40+', 'Council clients'],
            ['12', 'Landfills closed'],
            ['NSW / QLD', 'Where we work'],
          ].map(([n, l]) => (
            <div key={l} className="border-white/10 px-5 py-6 md:border-r md:px-8 md:py-8 last:border-r-0">
              <p className={`${disp} text-[28px] leading-none md:text-[36px]`}>{n}</p>
              <p className={`${kicker} mt-2 text-white/50`}>{l}</p>
            </div>
          ))}
        </section>

        <section id="work" className="px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <p className={`${kicker} text-[#161818]/50`}>Capabilities</p>
            <h2 className={`${disp} mt-3 text-[clamp(32px,5vw,56px)] leading-none`}>What we are hired for</h2>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {capabilities.map((c, i) => (
              <Reveal key={c.h} delay={i * 60}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo(c.img)} alt={c.alt} className="h-full w-full object-cover" />
                </div>
                <h3 className={`${disp} mt-4 text-[26px] leading-none md:text-[30px]`}>{c.h}</h3>
                <p className="mt-3 max-w-[36rem] text-[15px] leading-[1.55] text-[#161818]/75">{c.p}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2" style={{ background: ASPHALT, color: CONCRETE }}>
          <div className="relative min-h-[240px] md:min-h-[420px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo('wetland.jpg')} alt="Rehabilitated ground at the edge of a wetland" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center px-5 py-12 md:px-10 md:py-16">
            <p className={`${kicker} text-[#D4A017]`}>Aftercare</p>
            <h2 className={`${disp} mt-3 text-[clamp(28px,4vw,48px)] leading-[0.95]`}>
              Closure is not the end of the job.
            </h2>
            <p className="mt-5 max-w-[34rem] text-[16px] leading-[1.55] text-[#CFC8B8]/80">
              Capping, leachate, gas and the monitoring that follows. We stay on the licence conditions until the
              regulator is satisfied, which is usually longer than anyone hoped.
            </p>
          </div>
        </section>

        <section id="projects" className="px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <p className={`${kicker} text-[#161818]/50`}>Selected work</p>
            <h2 className={`${disp} mt-3 text-[clamp(32px,5vw,56px)] leading-none`}>Recent jobs</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 50}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo(p.img)} alt={p.alt} className="h-full w-full object-cover" />
                </div>
                <p className={`${kicker} mt-3 text-[#161818]/45`}>
                  {p.y} · {p.status}
                </p>
                <h3 className={`${disp} mt-1 text-[22px] leading-tight md:text-[26px]`}>{p.title}</h3>
                <p className="mt-1 text-[14px] text-[#161818]/60">{p.who}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <footer id="contact" className="custom-footer" style={{ background: ASPHALT, color: CONCRETE }}>
          <div className="px-5 py-16 md:px-8 md:py-20">
            <p className={`${kicker} text-[#D4A017]`}>Contact</p>
            <p className={`${disp} mt-4 max-w-[16ch] text-[clamp(32px,5vw,56px)] leading-[0.95]`}>
              Send the licence and the site plan.
            </p>
            <div className="mt-12 grid gap-10 sm:grid-cols-3">
              <div>
                <p className={`${kicker} text-[#D4A017]`}>Office</p>
                <p className="mt-2 text-[16px] leading-snug">
                  Monday–Friday 8:00–17:00
                  <br />
                  Site visits by arrangement
                </p>
              </div>
              <div>
                <p className={`${kicker} text-[#D4A017]`}>Direct</p>
                <p className="mt-2 text-[16px] leading-snug">
                  <a href="tel:+61255506620" className="hover:text-[#D4A017]">
                    02 5550 6620
                  </a>
                  <br />
                  <a href="mailto:office@harbourline.com.au" className="hover:text-[#D4A017]">
                    office@harbourline.com.au
                  </a>
                </p>
              </div>
              <div>
                <p className={`${kicker} text-[#D4A017]`}>Practice</p>
                <p className="mt-2 text-[16px] leading-snug text-[#CFC8B8]/80">
                  Independent since 1996. Capability statement on request.
                </p>
              </div>
            </div>
          </div>
          <div className={`${kicker} flex flex-col gap-2 border-t border-white/10 px-5 py-4 text-white/35 md:flex-row md:justify-between md:px-8`}>
            <span>© Harbourline Environmental Pty Ltd 2026</span>
            <span>We acknowledge the Traditional Custodians of the lands on which we work.</span>
          </div>
        </footer>
      </div>
  );
}
