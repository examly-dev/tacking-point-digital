import Image from 'next/image';
import { Inter } from 'next/font/google';
import { InPageScroll, Reveal, ScrollSpy, type SpyItem } from '@/examples/_shared/primitives';

/**
 * Hartwell Constructions. A Webflow-style build for a residential builder:
 * full-bleed photography, a floating pill nav, and project cards with a
 * detail panel sitting inside the image. Everything is a CMS collection
 * (projects, services, steps), which is the point of Webflow for a client
 * who wants to add a finished job themselves.
 */

const inter = Inter({ subsets: ['latin'], weight: 'variable', display: 'swap' });

const img = (id: string, w = 1800) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const INK = '#111111';
const PAPER = '#F4F3EF';
const rule = 'border-black/10';
const ruleDark = 'border-white/12';
const muted = 'text-black/55';
const mutedDark = 'text-white/55';
const h = 'font-medium tracking-[-0.03em]';
const chip = 'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[12px] font-medium';

const services = [
  { t: 'New homes', d: 'Architect-designed or from your plans. Slab to handover on one fixed-price contract.', id: '1600047509358-9dc75507daeb' },
  { t: 'Extensions and renovations', d: 'Second storeys, rear extensions, kitchens and bathrooms. We keep the house liveable while we work.', id: '1600607688969-a5bfcd646154' },
  { t: 'Decks, pavilions and pools', d: 'Outdoor rooms that get used. Hardwood, steel and concrete, detailed to last in the weather.', id: '1600566753190-17f0baa2a6c3' },
];

const steps = [
  { t: 'Site visit', d: 'We walk the block or the house with you, talk budget honestly, and tell you what is realistic.' },
  { t: 'Plans and approvals', d: 'Your architect or ours. We handle the DA or CDC, engineering and BASIX so you do not have to.' },
  { t: 'Fixed-price contract', d: 'An HIA contract with a real number and a start date. Variations only when you ask for them, priced in writing first.' },
  { t: 'Build and handover', d: 'One site supervisor, a weekly photo update, and a walk-through with a defects list we actually fix.' },
];

const projects = [
  { t: 'Ridgeline House', k: 'New home · 4 bed · 320 m²', d: 'Split-level on a sloping block. Off-form concrete, spotted gum cladding, a north-facing living wing.', when: 'Completed May 2026', id: '1600585154340-be6161a56a0c', wide: true },
  { t: 'Deck and pavilion', k: 'Extension · 14 weeks', d: 'A rear extension that opens the kitchen onto a hardwood deck and a covered pavilion.', when: 'Completed February 2026', id: '1600566752355-35792bedcfea', wide: false },
  { t: 'Kitchen and living', k: 'Renovation · 9 weeks', d: 'Two rooms knocked into one. New slab, steel beam, and a kitchen the owners still send us photos of.', when: 'Completed November 2025', id: '1600585152220-90363fe7e115', wide: false },
];

const navItems: SpyItem[] = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#projects', label: 'Projects' },
];

export default function HartwellPage() {
  return (
    <>
      <InPageScroll />

      <div data-example="" className={`${inter.className} min-h-screen antialiased`} style={{ background: PAPER, color: INK }}>
        {/* Floating pill nav */}
        <header className="custom-header fixed inset-x-0 top-4 z-50 flex justify-center px-4 md:top-6">
          <nav className="flex w-full max-w-[880px] items-center justify-between gap-4 rounded-full bg-[#111]/85 py-1.5 pl-5 pr-1.5 text-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <a href="#top" className={`${h} text-[16px]`}>
              Hartwell
            </a>
            <ScrollSpy
              items={navItems}
              className="hidden items-center gap-6 md:flex"
              linkClass="text-[13px] transition-colors"
              activeClass="text-white"
              inactiveClass="text-white/60 hover:text-white"
            />
            <a
              href="#contact"
              className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-[13px] font-medium text-[#111] transition-colors hover:bg-[#E6E4DC]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#111]" aria-hidden="true" />
              Contact us
            </a>
          </nav>
        </header>

        {/* Hero */}
        <section id="top" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden text-white">
          <Image src={img('1600585153490-76fb20a32601', 2400)} alt="A two-storey house at dusk, lights on inside" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/20" aria-hidden="true" />

          <div className="relative grid grid-cols-12 gap-x-6 gap-y-10 px-5 pb-10 pt-40 md:px-10 md:pb-14">
            <Reveal className="col-span-12 lg:col-span-7">
              <h1 className="text-[clamp(44px,7.5vw,112px)] font-light leading-[0.95] tracking-[-0.04em]">
                Homes built
                <br />
                to be lived in.
              </h1>
            </Reveal>

            <Reveal delay={120} className="col-span-12 flex flex-col justify-end lg:col-span-4 lg:col-start-9">
              <p className="max-w-[26rem] text-[15px] leading-[1.55] text-white/80">
                Hartwell is a licensed builder for new homes, extensions and renovations. Fixed-price contracts, one supervisor
                on your job, and a finish date we put in writing.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href="#contact" className="inline-flex h-11 items-center rounded-full bg-white px-5 text-[14px] font-medium text-[#111] transition-colors hover:bg-[#E6E4DC]">
                  Book a site visit
                </a>
                <a href="#projects" className="inline-flex h-11 items-center rounded-full border border-white/30 px-5 text-[14px] font-medium text-white transition-colors hover:border-white">
                  See projects
                </a>
              </div>
            </Reveal>

            <Reveal delay={200} className={`col-span-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-5 text-[12px] ${mutedDark}`}>
              <p>Licensed builder · NSW 287 411C · Home Building Compensation Fund insured</p>
              <p className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-0.5 w-6 rounded bg-white" />
                <span className="h-0.5 w-6 rounded bg-white/30" />
                <span className="h-0.5 w-6 rounded bg-white/30" />
              </p>
            </Reveal>
          </div>
        </section>

        {/* About: dark */}
        <section id="about" className="px-5 py-20 text-white md:px-10 md:py-28" style={{ background: INK }}>
          <Reveal>
            <span className={`${chip} ${ruleDark} ${mutedDark}`}>About</span>
          </Reveal>
          <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-10">
            <Reveal delay={60} className="col-span-12 lg:col-span-7">
              <p className={`${h} text-[clamp(26px,3.4vw,48px)] leading-[1.1]`}>
                Most builds run late and over budget.
                <span className="text-white/45"> Ours are planned so they do not have to.</span>
              </p>
            </Reveal>
            <Reveal delay={140} className={`col-span-12 space-y-4 text-[15px] leading-[1.6] ${mutedDark} lg:col-span-4 lg:col-start-9`}>
              <p>
                Hartwell has been building on the coast for eighteen years. Small enough that the director is on every site each week;
                big enough to carry a job from slab to handover without waiting on someone else&rsquo;s trades.
              </p>
              <p>We quote a fixed price, we put the finish date in the contract, and we send you photos every Friday.</p>
            </Reveal>
          </div>

          <Reveal delay={200} className={`mt-16 grid grid-cols-2 gap-6 border-t ${ruleDark} pt-8 md:grid-cols-4`}>
            {[
              ['18', 'years building'],
              ['140+', 'homes and extensions'],
              ['92%', 'handed over on the contract date'],
              ['4.9', 'Google rating, 86 reviews'],
            ].map(([n, l]) => (
              <div key={l}>
                <p className={`${h} text-[40px] leading-none md:text-[48px]`}>{n}</p>
                <p className={`mt-2 text-[13px] ${mutedDark}`}>{l}</p>
              </div>
            ))}
          </Reveal>
        </section>

        {/* Services */}
        <section id="services" className="px-5 py-20 md:px-10 md:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className={`${chip} ${rule} ${muted}`}>What we build</span>
              <h2 className={`${h} mt-4 text-[clamp(30px,4vw,56px)] leading-[1.02]`}>Three things, done properly.</h2>
            </div>
            <a href="#contact" className={`text-[14px] underline decoration-black/25 underline-offset-4 hover:decoration-black`}>
              Talk about your project
            </a>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.t} delay={i * 80} className={`group rounded-2xl border ${rule} bg-white p-3`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={img(s.id, 1200)} alt={s.t} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="px-2 pb-2 pt-5">
                  <p className={`${h} text-[20px]`}>{s.t}</p>
                  <p className={`mt-2 text-[14px] leading-[1.55] ${muted}`}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Process */}
        <section id="process" className={`border-t ${rule} px-5 py-20 md:px-10 md:py-28`}>
          <div className="grid grid-cols-12 gap-x-6 gap-y-12">
            <Reveal className="col-span-12 lg:col-span-4">
              <span className={`${chip} ${rule} ${muted}`}>How a build runs</span>
              <h2 className={`${h} mt-4 text-[clamp(30px,4vw,56px)] leading-[1.02]`}>Four steps. No surprises.</h2>
              <p className={`mt-5 max-w-[24rem] text-[15px] leading-[1.6] ${muted}`}>
                You will know the price before we start and the finish date before we pour. If something changes, you hear it from
                us first, in writing, with a number.
              </p>
              <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={img('1503387762-592deb58ef4e', 1400)} alt="Plans being marked up at a desk" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover grayscale" />
              </div>
            </Reveal>

            <ol className="col-span-12 grid gap-3 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
              {steps.map((s, i) => (
                <Reveal key={s.t} as="li" delay={i * 70} className={`rounded-2xl border ${rule} bg-white p-6`}>
                  <p className={`${h} mt-3 text-[20px]`}>{s.t}</p>
                  <p className={`mt-2 text-[14px] leading-[1.55] ${muted}`}>{s.d}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Projects: image cards with a detail panel inside */}
        <section id="projects" className={`border-t ${rule} px-5 py-20 md:px-10 md:py-28`}>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className={`${chip} ${rule} ${muted}`}>Recent work</span>
              <h2 className={`${h} mt-4 text-[clamp(30px,4vw,56px)] leading-[1.02]`}>Three from the last year.</h2>
            </div>
            <a href="#" className="text-[14px] underline decoration-black/25 underline-offset-4 hover:decoration-black">
              All projects
            </a>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.t} delay={i * 80} className={`group relative overflow-hidden rounded-2xl ${p.wide ? 'md:col-span-2' : ''}`}>
                <div className={`relative ${p.wide ? 'aspect-[4/3] md:aspect-[21/9]' : 'aspect-[4/3]'}`}>
                  <Image src={img(p.id, p.wide ? 2400 : 1400)} alt={p.t} fill sizes={p.wide ? '100vw' : '(min-width: 768px) 50vw, 100vw'} className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                </div>
                <div className="absolute inset-x-3 bottom-3 flex flex-col gap-3 rounded-xl bg-white/95 p-4 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:inset-x-auto sm:left-4 sm:bottom-4 sm:w-[min(360px,80%)] sm:p-5">
                  <div className={`flex items-center justify-between text-[12px] ${muted}`}>
                    <span>{p.k}</span>
                    <span>{p.when}</span>
                  </div>
                  <div>
                    <p className={`${h} text-[20px]`}>{p.t}</p>
                    <p className={`mt-1.5 text-[14px] leading-[1.5] ${muted}`}>{p.d}</p>
                  </div>
                  <a href="#" className="inline-flex h-9 w-fit items-center rounded-full border border-black/15 px-3.5 text-[13px] font-medium transition-colors hover:border-black">
                    See project
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* One quote */}
        <section className={`border-t ${rule} px-5 py-20 md:px-10 md:py-28`}>
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <Reveal className="col-span-12 lg:col-span-8">
              <blockquote className={`${h} text-[clamp(24px,3vw,40px)] leading-[1.15]`}>
                &ldquo;They gave us a number and a date in March. We moved in on the date, and the number did not move.&rdquo;
              </blockquote>
            </Reveal>
            <Reveal delay={100} className="col-span-12 flex items-center gap-4 lg:col-span-3 lg:col-start-10">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image src={img('1556909114-f6e7ad7d3136', 200)} alt="Sarah and Tom Lindqvist" fill sizes="48px" className="object-cover grayscale" />
              </div>
              <div className="text-[14px]">
                <p className="font-medium">Sarah and Tom Lindqvist</p>
                <p className={muted}>Ridgeline House, 2026</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="px-5 py-20 text-white md:px-10 md:py-28" style={{ background: INK }}>
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <Reveal className="col-span-12 lg:col-span-6">
              <span className={`${chip} ${ruleDark} ${mutedDark}`}>Start here</span>
              <h2 className={`${h} mt-4 text-[clamp(32px,4.5vw,64px)] leading-[1.0]`}>Book a site visit.</h2>
              <p className={`mt-5 max-w-[26rem] text-[15px] leading-[1.6] ${mutedDark}`}>
                Forty-five minutes at your block or your house. We will tell you what it will roughly cost and how long it will take,
                and whether we are the right builder for it. No charge.
              </p>
              <div className={`mt-8 space-y-1 text-[15px] ${mutedDark}`}>
                <p>
                  <a href="tel:+61255502210" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                    (02) 5550 2210
                  </a>{' '}
                  · Mon to Fri, 7 to 5
                </p>
                <p>
                  <a href="mailto:hello@hartwell.build" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                    hello@hartwell.build
                  </a>
                </p>
              </div>
            </Reveal>

            <Reveal delay={100} as="div" className="col-span-12 lg:col-span-5 lg:col-start-8">
              <form className="grid gap-3 rounded-2xl border border-white/12 bg-white/[0.04] p-5 md:p-6">
                {[
                  ['Name', 'text', 'Your name'],
                  ['Phone', 'tel', '04'],
                  ['Where is the job', 'text', 'Suburb'],
                ].map(([l, t, ph]) => (
                  <label key={l} className="grid gap-1.5 text-[13px]">
                    <span className={mutedDark}>{l}</span>
                    <input type={t} placeholder={ph} className="h-11 rounded-lg border border-white/12 bg-transparent px-3 text-[15px] text-white placeholder:text-white/30 focus:border-white/60 focus:outline-none" />
                  </label>
                ))}
                <fieldset className="grid gap-1.5 text-[13px]">
                  <legend className={`${mutedDark} mb-1.5`}>What is it</legend>
                  <div className="flex flex-wrap gap-2">
                    {['New home', 'Extension', 'Renovation', 'Outdoor'].map((o, i) => (
                      <button
                        key={o}
                        type="button"
                        aria-pressed={i === 1}
                        className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
                          i === 1 ? 'border-white bg-white text-[#111]' : 'border-white/20 text-white/80 hover:border-white/60'
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <button type="submit" className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-white text-[14px] font-medium text-[#111] transition-colors hover:bg-[#E6E4DC]">
                  Request a visit
                </button>
                <p className={`text-[12px] ${mutedDark}`}>We reply within one working day.</p>
              </form>
            </Reveal>
          </div>

          <footer className={`custom-footer mt-20 flex flex-wrap items-end justify-between gap-6 border-t ${ruleDark} pt-6 text-[13px] ${mutedDark}`}>
            <div>
              <p className={`${h} text-[18px] text-white`}>Hartwell Constructions</p>
              <p className="mt-1">Licence NSW 287 411C · ABN 51 824 753 556 · Member, Housing Industry Association</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {navItems.map((n) => (
                <a key={n.href} href={n.href} className="hover:text-white">
                  {n.label}
                </a>
              ))}
              <a href="#" className="hover:text-white">
                Instagram
              </a>
            </div>
          </footer>
        </section>

      </div>
    </>
  );
}
