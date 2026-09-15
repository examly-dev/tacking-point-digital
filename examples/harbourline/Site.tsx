'use client';

import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      data-example=""
      className={`${sans.variable} min-h-screen antialiased`}
      style={{ fontFamily: 'var(--hl-sans), ui-sans-serif, system-ui', color: '#1E293B', background: '#fff' }}
    >
      <InPageScroll />
      <header
        className="custom-header fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
          borderColor: scrolled ? 'rgba(0,0,0,0.05)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
        }}
      >
        <div className="mx-auto flex h-24 max-w-[1200px] items-center justify-between px-6 md:px-12">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center text-[20px] font-bold text-white" style={{ background: PRIMARY }}>
              HL
            </span>
            <span className="leading-none">
              <span className="block text-[20px] font-bold tracking-tight" style={{ color: PRIMARY }}>
                HARBOURLINE
              </span>
              <span className="mt-1 block text-[12px] font-normal uppercase tracking-[0.2em] text-black/40">Environmental</span>
            </span>
          </a>
          <nav className="hidden items-center gap-10 text-[14px] font-medium lg:flex">
            <a href="#services" className="hover:opacity-60">Services</a>
            <a href="#projects" className="hover:opacity-60">Projects</a>
            <a href="#contact" className="hover:opacity-60">Contact</a>
          </nav>
          <a
            href="#contact"
            className="hidden h-12 items-center px-8 text-[15px] font-semibold text-white lg:inline-flex"
            style={{ background: PRIMARY }}
          >
            Write to us
          </a>
        </div>
      </header>

      <section id="top" className="bg-slate-50 pb-20 pt-32 lg:pb-32 lg:pt-48">
        <div className="mx-auto grid max-w-[1200px] items-center gap-16 px-6 md:px-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-12" style={{ background: PRIMARY }} />
              <span className="text-[13px] font-bold uppercase tracking-widest text-black/40">Est. 2011</span>
            </div>
            <h1 className="mt-6 max-w-[16ch] text-[clamp(36px,4.6vw,64px)] font-bold leading-[1.1] tracking-tight" style={{ color: PRIMARY }}>
              Harbour, foreshore and civil work for ports and marinas.
            </h1>
            <p className="mt-6 max-w-[32rem] text-[20px] font-medium leading-relaxed" style={{ color: PRIMARY, opacity: 0.85 }}>
              Civil and coastal engineers to ports, marinas and landowners.
            </p>
            <p className="mt-5 max-w-[32rem] leading-relaxed text-black/55">
              Harbourline designs boat ramps, seawalls, drainage and the civil jobs that sit next to them. Most of the work sits on a harbour, a marina or a private foreshore.
            </p>
            <a href="#services" className="mt-8 inline-flex h-14 items-center px-8 text-[16px] font-semibold text-white" style={{ background: PRIMARY }}>
              What we do
            </a>
            <div className="mt-6 grid max-w-[28rem] grid-cols-2 gap-8 border-t border-black/10 pt-6">
              <div>
                <p className="text-[30px] font-bold" style={{ color: PRIMARY }}>70+</p>
                <p className="mt-1 text-[12px] font-medium uppercase tracking-wide text-black/45">Coastal projects</p>
              </div>
              <div>
                <p className="text-[30px] font-bold" style={{ color: PRIMARY }}>15</p>
                <p className="mt-1 text-[12px] font-medium uppercase tracking-wide text-black/45">Years in practice</p>
              </div>
            </div>
          </div>

          <div className="relative hidden h-[560px] lg:block">
            <Image
              src={img('1503387762-592deb58ef4e', 2070)}
              alt="Engineer marking up a set of drawings"
              fill
              className="object-cover grayscale"
              priority
              sizes="50vw"
            />
            <div className="absolute inset-0 mix-blend-multiply" style={{ background: `${PRIMARY}1A` }} />
            <div className="absolute bottom-0 left-0 max-w-sm border-t-4 bg-white p-8" style={{ borderColor: ACCENT }}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-black/40">Current project</p>
              <p className="mt-1 text-[18px] font-bold leading-tight" style={{ color: PRIMARY }}>Boat ramp and groyne</p>
              <p className="mt-2 text-[14px] text-black/50">Detailed design and approvals · a private marina</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-white py-10">
        <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-widest text-black/40">
          Working with ports, marinas and utilities
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 text-[18px] font-bold tracking-tight text-slate-800">
          <span>BARLOWS INLET <span className="font-normal text-slate-400">MARINA</span></span>
          <span>WESTFERRY <span className="font-normal text-slate-400">PORTS</span></span>
          <span>CAPE MERRICK <span className="font-normal text-slate-400">WHARF</span></span>
          <span>INLET <span className="font-normal text-slate-400">WATER</span></span>
        </div>
      </section>

      <section id="services" className="bg-white py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <p className="text-[13px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Services</p>
          <h2 className="mt-3 max-w-[20ch] text-[clamp(28px,4vw,48px)] font-bold tracking-tight" style={{ color: PRIMARY }}>
            From the first survey to the issued drawings.
          </h2>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {services.map((s) => (
              <div key={s.title} className="border border-black/10 bg-[#FAFAFA] p-8">
                <h3 className="text-[22px] font-bold" style={{ color: PRIMARY }}>{s.title}</h3>
                <p className="mt-3 leading-relaxed text-black/55">{s.desc}</p>
                <ul className="mt-6 space-y-3">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] font-medium">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0" style={{ background: ACCENT }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="border-t border-black/10 bg-slate-50 py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <p className="text-[13px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Our work</p>
          <h2 className="mt-3 text-[clamp(28px,4vw,40px)] font-bold tracking-tight" style={{ color: PRIMARY }}>Recent work</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {projects.map((p) => (
              <figure key={p.title}>
                <div className="relative mb-5 aspect-[4/3] overflow-hidden bg-slate-200">
                  <Image src={img(p.id, 1600)} alt={p.title} fill className="object-cover" sizes="(min-width: 768px) 30vw, 100vw" />
                  <span className="absolute left-4 top-4 bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-widest" style={{ color: PRIMARY }}>
                    {p.tag}
                  </span>
                </div>
                <figcaption>
                  <p className="text-[18px] font-bold" style={{ color: PRIMARY }}>{p.title}</p>
                  <p className="mt-1 text-[14px] text-black/50">{p.loc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 text-white" style={{ background: PRIMARY }}>
        <div className="mx-auto grid max-w-[1200px] gap-16 px-6 md:px-12 lg:grid-cols-2">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>How we work</p>
            <h2 className="mt-3 text-[clamp(28px,4vw,48px)] font-bold tracking-tight">Drawings an owner can act on.</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-white/70">
              The pack is read by the engineer, the owner and whoever has to build it. Short sentences, numbers that add up, and details that still make sense on a wet Thursday.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {how.map((h) => (
              <div key={h.t} className="border border-white/10 bg-white/5 p-7">
                <h3 className="text-[18px] font-bold">{h.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/55">{h.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="custom-footer py-16 text-white" style={{ background: PRIMARY }}>
        <div className="mx-auto grid max-w-[1200px] gap-12 px-6 md:grid-cols-4 md:px-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center text-[15px] font-bold" style={{ background: '#fff', color: PRIMARY }}>HL</span>
              <span className="text-[18px] font-bold">HARBOURLINE Environmental</span>
            </div>
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-white/75">
              Civil and coastal engineers to ports, marinas and landowners since 2011.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/60">Office</p>
            <p className="mt-4 text-[14px] leading-relaxed text-white/90">
              Unit 3, 22 Pilot Street
              <br />
              Barlows Inlet
              <br />
              02 5518 4400
              <br />
              office@harbourline.com.au
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/60">Links</p>
            <p className="mt-4 space-y-2 text-[14px] text-white/80">
              <a href="#services" className="block hover:text-white">Services</a>
              <a href="#projects" className="block hover:text-white">Projects</a>
            </p>
          </div>
        </div>
        <p className="mx-auto mt-12 max-w-[1200px] border-t border-white/10 px-6 pt-6 text-[12px] text-white/50 md:px-12">
          © 2026 Harbourline Environmental Pty Ltd.
        </p>
      </footer>
    </div>
  );
}
