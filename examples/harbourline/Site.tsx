'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Outfit } from 'next/font/google';
import { InPageScroll } from '@/examples/_shared/primitives';

/*
  Forest green, Outfit, HL mark, split hero — original layout, not the industrial restyle.
  Copy is a fictional coastal/civil practice named Harbourline.
*/

const sans = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--hl-sans',
  display: 'swap',
});

const PRIMARY = '#15372B';
const ACCENT = '#2F9B6A';

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const services = [
  {
    title: 'Coastal & marine',
    desc: 'Wharves, ramps, pontoons and seawalls: condition, design, and the detailing that lasts in salt air.',
    items: ['Wharf and jetty design', 'Boat ramps and pontoons', 'Seawalls and revetments', 'Marine condition surveys'],
  },
  {
    title: 'Catchment & stormwater',
    desc: 'Upgrades to the pipes, pits and overland paths that fail first in a big wet.',
    items: ['Stormwater upgrades', 'Overland flow and flooding', 'Waterway crossings', 'Biofiltration and swales'],
  },
  {
    title: 'Civil infrastructure',
    desc: 'The work behind the foreshore: yards, pavements, retaining and access.',
    items: ['Car parks and hardstand', 'Depot and compound yards', 'Access roads and pavements', 'Retaining and earthworks'],
  },
  {
    title: 'Approvals & investigations',
    desc: 'The reports and field work that let a harbour job start on time.',
    items: ['Planning and environmental reports', 'Coastal hazard assessments', 'Geotech and hydrographic coordination', 'Construction environmental plans'],
  },
];

const projects = [
  {
    title: 'Seawall reconstruction',
    loc: 'Private marina, Barlows Inlet',
    tag: 'Coastal',
    id: '1475924156734-496f6cac6ec1',
  },
  {
    title: 'Boat harbour pontoons',
    loc: 'Regional port operator',
    tag: 'Marine',
    id: '1439066615861-d1af74d74000',
  },
  {
    title: 'Catchment drainage upgrade',
    loc: 'Inlet Water catchment',
    tag: 'Stormwater',
    id: '1504307651254-35680f356dfd',
  },
];

const how = [
  { t: 'Salt-air detailing', p: 'Connections, coatings and covers specified for a marine climate, not a brochure climate.' },
  { t: 'Issued for construction', p: 'Drawings a contractor can price and build from, with the hold-points written in.' },
  { t: 'Costed against a budget', p: 'Options ranked by what an owner can actually fund this financial year.' },
  { t: 'Signed off in time', p: 'Planning reports and construction environmental plans that match the drawings.' },
];

export default function HarbourlinePage() {
  const [scrolled, setScrolled] = useState(false);
  const [projectIndex, setProjectIndex] = useState(0);
  const projectRail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function onProjectScroll() {
    const rail = projectRail.current;
    if (!rail) return;
    const first = rail.querySelector('figure');
    if (!(first instanceof HTMLElement)) return;
    const styles = getComputedStyle(rail);
    const gap = parseFloat(styles.columnGap || styles.gap) || 16;
    const step = first.offsetWidth + gap;
    if (step <= 0) return;
    const i = Math.round(rail.scrollLeft / step);
    setProjectIndex(Math.max(0, Math.min(projects.length - 1, i)));
  }

  return (
    <div
      data-example=""
      className={`${sans.variable} min-h-screen antialiased`}
      style={{ fontFamily: 'var(--hl-sans), ui-sans-serif, system-ui', color: '#1E293B', background: '#fff' }}
    >
      <InPageScroll />
      <header
        className="custom-header fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-colors duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(248,250,252,0.92)',
          borderColor: scrolled ? 'rgba(0,0,0,0.06)' : 'transparent',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-3 px-5 md:h-20 md:px-12 lg:h-24">
          <a href="#top" className="flex min-w-0 items-center gap-2.5 md:gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center text-[13px] font-bold text-white md:h-10 md:w-10 md:text-[20px]" style={{ background: PRIMARY }}>
              HL
            </span>
            <span className="min-w-0 leading-none">
              <span className="block truncate text-[15px] font-bold tracking-tight md:text-[20px]" style={{ color: PRIMARY }}>
                HARBOURLINE
              </span>
              <span className="mt-0.5 hidden text-[11px] font-normal uppercase tracking-[0.18em] text-black/40 sm:block md:mt-1 md:text-[12px] md:tracking-[0.2em]">
                Environmental
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-[14px] font-medium md:flex lg:gap-10">
            <a href="#services" className="hover:opacity-60">Services</a>
            <a href="#projects" className="hover:opacity-60">Projects</a>
            <a href="#contact" className="hover:opacity-60">Contact</a>
          </nav>
          <a
            href="#contact"
            className="inline-flex h-9 shrink-0 items-center px-3.5 text-[13px] font-semibold text-white md:h-12 md:px-8 md:text-[15px]"
            style={{ background: PRIMARY }}
          >
            Contact
          </a>
        </div>
      </header>

      <section id="top" className="bg-slate-50 pb-10 pt-[calc(3.5rem+env(safe-area-inset-top))] md:pb-20 lg:pb-32 lg:pt-48">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-5 md:gap-16 md:px-12 lg:grid-cols-2 lg:gap-24">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 md:w-12" style={{ background: PRIMARY }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/40 md:text-[13px] md:font-bold md:tracking-widest">
                Est. 2011
              </span>
            </div>
            <h1 className="mt-3 max-w-[16ch] text-[clamp(32px,8.4vw,64px)] font-bold leading-[1.05] tracking-tight text-balance md:mt-6 md:leading-[1.1]" style={{ color: PRIMARY }}>
              Harbour, foreshore and civil work for ports and marinas.
            </h1>
            <p className="mt-3 max-w-[32rem] text-[16px] font-medium leading-relaxed md:mt-6 md:text-[20px]" style={{ color: PRIMARY, opacity: 0.85 }}>
              Civil and coastal engineers to ports, marinas and landowners.
            </p>
            <p className="mt-2 max-w-[32rem] text-[15px] leading-relaxed text-black/55 md:mt-5 md:text-[16px]">
              Harbourline designs boat ramps, seawalls, drainage and the civil jobs that sit next to them. Most of the work sits on a harbour, a marina or a private foreshore.
            </p>
            <a href="#services" className="mt-5 flex h-12 w-full items-center justify-center text-[15px] font-semibold text-white md:mt-8 md:inline-flex md:h-14 md:w-auto md:px-8 md:text-[16px]" style={{ background: PRIMARY }}>
              What we do
            </a>
            <div className="mt-5 flex max-w-[28rem] items-end gap-8 border-t border-black/10 pt-4 md:mt-6 md:grid md:grid-cols-2 md:gap-8 md:pt-6">
              <div>
                <p className="text-[24px] font-bold tabular-nums md:text-[30px]" style={{ color: PRIMARY }}>70+</p>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-black/45 md:mt-1 md:text-[12px]">Coastal projects</p>
              </div>
              <div>
                <p className="text-[24px] font-bold tabular-nums md:text-[30px]" style={{ color: PRIMARY }}>15</p>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-black/45 md:mt-1 md:text-[12px]">Years in practice</p>
              </div>
            </div>
          </div>

          <div className="relative order-1 -mx-5 aspect-[4/5] overflow-hidden bg-slate-200 sm:mx-0 sm:aspect-[5/4] lg:order-2 lg:mx-0 lg:aspect-auto lg:h-[560px]">
            <Image
              src={img('1503387762-592deb58ef4e', 2070)}
              alt="Engineer marking up a set of drawings"
              fill
              className="object-cover grayscale"
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 mix-blend-multiply" style={{ background: `${PRIMARY}1A` }} />
            <div className="absolute bottom-3 left-3 max-w-[15.5rem] border-t-4 bg-white/95 p-3.5 backdrop-blur-[2px] sm:bottom-0 sm:left-0 sm:right-auto sm:max-w-sm sm:bg-white sm:p-8 sm:backdrop-blur-none" style={{ borderColor: ACCENT }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/40 md:text-[11px] md:tracking-widest">Current project</p>
              <p className="mt-0.5 text-[15px] font-bold leading-tight md:mt-1 md:text-[18px]" style={{ color: PRIMARY }}>Boat ramp and groyne</p>
              <p className="mt-1 text-[12px] text-black/50 md:mt-2 md:text-[14px]">Detailed design and approvals · a private marina</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-white py-7 md:py-10">
        <p className="mb-4 px-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40 md:mb-6 md:text-center md:text-[11px] md:font-bold md:tracking-widest">
          Working with ports, marinas and utilities
        </p>
        <div className="flex snap-x snap-mandatory gap-8 overflow-x-auto px-5 pb-1 text-[15px] font-bold tracking-tight text-slate-800 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:justify-center md:gap-x-12 md:gap-y-4 md:overflow-visible md:px-6 md:text-[18px]">
          <span className="snap-start shrink-0">BARLOWS INLET <span className="font-normal text-slate-400">MARINA</span></span>
          <span className="snap-start shrink-0">WESTFERRY <span className="font-normal text-slate-400">PORTS</span></span>
          <span className="snap-start shrink-0">CAPE MERRICK <span className="font-normal text-slate-400">WHARF</span></span>
          <span className="snap-start shrink-0">INLET <span className="font-normal text-slate-400">WATER</span></span>
        </div>
      </section>

      <section id="services" className="bg-white py-14 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] md:text-[13px] md:font-bold md:tracking-widest" style={{ color: ACCENT }}>Services</p>
          <h2 className="mt-2 max-w-[20ch] text-[clamp(26px,6vw,48px)] font-bold tracking-tight text-balance md:mt-3" style={{ color: PRIMARY }}>
            From the first survey to the issued drawings.
          </h2>
          <div className="mt-8 divide-y divide-black/10 md:mt-16 md:grid md:grid-cols-2 md:gap-8 md:divide-y-0">
            {services.map((s, i) => (
              <div key={s.title} className="py-5 first:pt-0 md:border md:border-black/10 md:bg-[#FAFAFA] md:p-8">
                <p className="text-[11px] font-semibold tabular-nums text-black/35 md:hidden">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-1 text-[18px] font-bold md:mt-0 md:text-[22px]" style={{ color: PRIMARY }}>{s.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-black/55 md:mt-3">{s.desc}</p>
                <ul className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 md:mt-6 md:block md:space-y-3">
                  {s.items.map((item) => (
                    <li key={item} className="text-[12px] text-black/45 md:flex md:items-start md:gap-3 md:text-[14px] md:font-medium md:text-[#1E293B]">
                      <span className="mt-1.5 hidden h-1.5 w-1.5 shrink-0 md:block" style={{ background: ACCENT }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="border-t border-black/10 bg-slate-50 py-14 md:py-24">
        <div className="mx-auto max-w-[1200px] md:px-12">
          <div className="flex items-end justify-between gap-4 px-5 md:block md:px-0">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] md:text-[13px] md:font-bold md:tracking-widest" style={{ color: ACCENT }}>Our work</p>
              <h2 className="mt-2 text-[clamp(26px,6vw,40px)] font-bold tracking-tight md:mt-3" style={{ color: PRIMARY }}>Recent work</h2>
            </div>
            <p className="mb-0.5 text-[12px] font-semibold tabular-nums text-black/35 md:hidden" aria-live="polite">
              {String(projectIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </p>
          </div>
          <div
            ref={projectRail}
            onScroll={onProjectScroll}
            className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pl-5 pr-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-12 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:pb-0"
          >
            {projects.map((p) => (
              <figure key={p.title} className="w-[72vw] shrink-0 snap-start md:w-auto">
                <div className="relative mb-4 aspect-[4/5] overflow-hidden bg-slate-200 md:mb-5 md:aspect-[4/3]">
                  <Image src={img(p.id, 1600)} alt={p.title} fill className="object-cover" sizes="(min-width: 768px) 30vw, 72vw" />
                  <span className="absolute left-3 top-3 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] md:left-4 md:top-4 md:px-3 md:text-[11px] md:tracking-widest" style={{ color: PRIMARY }}>
                    {p.tag}
                  </span>
                </div>
                <figcaption>
                  <p className="text-[16px] font-bold md:text-[18px]" style={{ color: PRIMARY }}>{p.title}</p>
                  <p className="mt-1 text-[13px] text-black/50 md:text-[14px]">{p.loc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 text-white md:py-24" style={{ background: PRIMARY }}>
        <div className="mx-auto grid max-w-[1200px] gap-8 px-5 md:gap-16 md:px-12 lg:grid-cols-2">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] md:text-[13px] md:font-bold md:tracking-widest" style={{ color: ACCENT }}>How we work</p>
            <h2 className="mt-2 text-[clamp(26px,6vw,48px)] font-bold tracking-tight text-balance md:mt-3">Drawings an owner can act on.</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/70 md:mt-6 md:text-[17px]">
              The pack is read by the engineer, the owner and whoever has to build it. Short sentences, numbers that add up, and details that still make sense on a wet Thursday.
            </p>
          </div>
          <div className="grid gap-0 sm:grid-cols-2 sm:gap-6">
            {how.map((h) => (
              <div key={h.t} className="border-l-2 border-[#2F9B6A] py-3.5 pl-4 sm:border sm:border-white/10 sm:bg-white/5 sm:p-5 md:p-7">
                <h3 className="text-[16px] font-bold md:text-[18px]">{h.t}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-white/55 sm:mt-2">{h.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="custom-footer pb-[calc(5.75rem+env(safe-area-inset-bottom))] pt-12 text-white md:py-16" style={{ background: PRIMARY }}>
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 md:grid-cols-4 md:gap-12 md:px-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center text-[15px] font-bold" style={{ background: '#fff', color: PRIMARY }}>HL</span>
              <span className="text-[17px] font-bold md:text-[18px]">HARBOURLINE Environmental</span>
            </div>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-white/75 md:mt-5">
              Civil and coastal engineers to ports, marinas and landowners since 2011.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/60">Office</p>
            <p className="mt-3 text-[14px] leading-relaxed text-white/90 md:mt-4">
              Unit 3, 22 Pilot Street
              <br />
              Barlows Inlet
              <br />
              <a href="tel:0255184400" className="inline-flex min-h-11 items-center text-[16px] font-semibold text-white md:min-h-0 md:text-[14px] md:font-normal">
                02 5518 4400
              </a>
              <br />
              <a href="mailto:office@harbourline.com.au" className="inline-flex min-h-11 items-center text-[16px] font-semibold text-white md:min-h-0 md:text-[14px] md:font-normal">
                office@harbourline.com.au
              </a>
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/60">Links</p>
            <div className="mt-2 space-y-0 text-[14px] text-white/80 md:mt-4 md:space-y-2">
              <a href="#services" className="flex min-h-11 items-center hover:text-white md:min-h-0">Services</a>
              <a href="#projects" className="flex min-h-11 items-center hover:text-white md:min-h-0">Projects</a>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-[1200px] border-t border-white/10 px-5 pt-5 text-[12px] text-white/50 md:mt-12 md:px-12 md:pt-6">
          © 2026 Harbourline Environmental Pty Ltd.
        </p>
      </footer>

      <nav
        aria-label="Call or contact"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/95 px-4 pt-2.5 backdrop-blur-md pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden"
      >
        <div className="grid grid-cols-2 gap-2">
          <a
            href="tel:0255184400"
            className="inline-flex h-12 items-center justify-center text-[14px] font-semibold"
            style={{ color: PRIMARY, boxShadow: `inset 0 0 0 1.5px ${PRIMARY}` }}
          >
            Call
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center text-[14px] font-semibold text-white"
            style={{ background: PRIMARY }}
          >
            Contact
          </a>
        </div>
      </nav>
    </div>
  );
}
