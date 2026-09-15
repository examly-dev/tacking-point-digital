'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Outfit } from 'next/font/google';

/*
  Original Impact Environmental design, kept as Harbourline.
  Forest green, Outfit, split hero — not the industrial restyle.
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
    title: 'Strategy & Planning',
    desc: 'Long-range waste and resource recovery strategy for councils and regional groups, grounded in real service data.',
    items: ['Regional Waste Strategies', 'Options & Business Cases', 'Collection Contract Tenders', 'Funding Submissions'],
  },
  {
    title: 'Approvals & Compliance',
    desc: 'Getting facilities licensed, keeping them licensed, and making the paperwork match what happens on site.',
    items: ['Environmental Licensing', 'Impact Assessment', 'Environmental Management Plans', 'Monitoring & Reporting'],
  },
  {
    title: 'Resource Recovery',
    desc: 'Kerbside, organics and commercial streams: what is being thrown away, what it is worth, and how to capture more of it.',
    items: ['Kerbside Audits', 'Organics Processing Options', 'Commercial Waste Reviews', 'Diversion Target Modelling'],
  },
  {
    title: 'Infrastructure',
    desc: 'Concept design and operational review for the assets that do the work.',
    items: ['Transfer Station Design', 'Landfill Closure Planning', 'Site Operations Review', 'Asset Condition Assessment'],
  },
];

const projects = [
  {
    title: 'Landfill Closure & Aftercare Plan',
    loc: 'A shire of 13,000',
    tag: 'Infrastructure',
    id: '1581094794329-c8112a89af12',
  },
  {
    title: 'Regional Waste Strategy 2035',
    loc: 'Five-council group',
    tag: 'Strategy',
    id: '1454165804606-c3d57bc86b40',
  },
  {
    title: 'FOGO Rollout Business Case',
    loc: 'A shire of 31,000',
    tag: 'Resource Recovery',
    id: '1504307651254-35680f356dfd',
  },
];

const how = [
  { t: 'Regulator-ready', p: 'Licensing, assessment and management plans written to the standard the regulator expects, not the minimum.' },
  { t: 'Operational first', p: 'Most of our team has run a site or a collection contract. The advice reflects it.' },
  { t: 'Built on data', p: 'Bin audits, weighbridge records and tonnage modelling before anyone writes a recommendation.' },
  { t: 'Safe by design', p: 'Facility layouts and procedures that keep the public, the crews and the environment out of harm.' },
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
            Get In Touch
          </a>
        </div>
      </header>

      <section id="top" className="bg-slate-50 pb-20 pt-32 lg:pb-32 lg:pt-48">
        <div className="mx-auto grid max-w-[1200px] items-center gap-16 px-6 md:px-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-12" style={{ background: PRIMARY }} />
              <span className="text-[13px] font-bold uppercase tracking-widest text-black/40">Est. 2004</span>
            </div>
            <h1 className="mt-6 max-w-[16ch] text-[clamp(36px,4.6vw,64px)] font-bold leading-[1.1] tracking-tight" style={{ color: PRIMARY }}>
              Waste strategy for the places that have to live with it.
            </h1>
            <p className="mt-6 max-w-[32rem] text-[20px] font-medium leading-relaxed" style={{ color: PRIMARY, opacity: 0.85 }}>
              Resource recovery, infrastructure and approvals consultants to regional councils, utilities and industry.
            </p>
            <p className="mt-5 max-w-[32rem] leading-relaxed text-black/55">
              Harbourline works on the unglamorous end of the environment sector: kerbside bins, transfer stations, landfill closures, and the contracts and licences that sit behind them.
            </p>
            <a href="#services" className="mt-8 inline-flex h-14 items-center px-8 text-[16px] font-semibold text-white" style={{ background: PRIMARY }}>
              Our Services
            </a>
            <div className="mt-10 grid max-w-[28rem] grid-cols-2 gap-8 border-t border-black/10 pt-8">
              <div>
                <p className="text-[30px] font-bold" style={{ color: PRIMARY }}>40+</p>
                <p className="mt-1 text-[12px] font-medium uppercase tracking-wide text-black/45">Council Clients</p>
              </div>
              <div>
                <p className="text-[30px] font-bold" style={{ color: PRIMARY }}>$310M</p>
                <p className="mt-1 text-[12px] font-medium uppercase tracking-wide text-black/45">Contracts Procured</p>
              </div>
            </div>
          </div>

          <div className="relative hidden h-[560px] lg:block">
            <Image
              src={img('1532996122724-e3c354a0b15b', 2070)}
              alt="Engineer on a site inspection"
              fill
              className="object-cover grayscale"
              priority
              sizes="50vw"
            />
            <div className="absolute inset-0 mix-blend-multiply" style={{ background: `${PRIMARY}1A` }} />
            <div className="absolute bottom-0 left-0 max-w-sm border-t-4 bg-white p-8" style={{ borderColor: ACCENT }}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-black/40">Current Project</p>
              <p className="mt-1 text-[18px] font-bold leading-tight" style={{ color: PRIMARY }}>Regional transfer station</p>
              <p className="mt-2 text-[14px] text-black/50">Concept design and licensing · a shire of 20,000</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-white py-10">
        <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-widest text-black/40">
          Working with councils, utilities and operators
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 text-[18px] font-bold tracking-tight text-slate-800">
          <span>RIDGE COAST <span className="font-normal text-slate-400">SHIRE</span></span>
          <span>EASTERN RIVERS <span className="font-normal text-slate-400">WATER</span></span>
          <span>COASTAL <span className="font-normal text-slate-400">COUNCILS GROUP</span></span>
          <span>TERRAFORM <span className="font-normal text-slate-400">RECOVERY</span></span>
        </div>
      </section>

      <section id="services" className="bg-white py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <p className="text-[13px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Services</p>
          <h2 className="mt-3 max-w-[20ch] text-[clamp(28px,4vw,48px)] font-bold tracking-tight" style={{ color: PRIMARY }}>
            From the strategy document to the weighbridge.
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
          <p className="text-[13px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Our Work</p>
          <h2 className="mt-3 text-[clamp(28px,4vw,40px)] font-bold tracking-tight" style={{ color: PRIMARY }}>Recent Projects</h2>
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
            <h2 className="mt-3 text-[clamp(28px,4vw,48px)] font-bold tracking-tight">Advice you can take to a council meeting.</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-white/70">
              Our reports get read by general managers, elected councillors and the regulator. They are written to survive all three: plain language, clear numbers, and recommendations that account for what the depot can actually do on a Tuesday.
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
              Waste and resource recovery consultants to regional councils, utilities and industry since 2004.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/60">Office</p>
            <p className="mt-4 text-[14px] leading-relaxed text-white/90">
              Suite 4, 18 Gordon Street
              <br />
              Mid North Coast NSW
              <br />
              02 5550 6620
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
