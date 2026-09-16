import Image from 'next/image';
import Link from 'next/link';
import { asset } from '@/lib/asset';
import { Reveal } from '@/examples/_shared/primitives';
import { BookingWidget } from '@/examples/physio/Booking';
import { PhysioShell } from '@/examples/physio/Shell';
import { GREEN, fees, label, people, rule, servicePath, services, slots } from '@/examples/physio/data';

const photo = (file: string) => asset(`/examples/physio/${file}`);

export default function RidgewayPage() {
  return (
    <PhysioShell home>
      <section id="top" className="flex min-h-[100svh] flex-col justify-between px-5 pb-8 pt-28 md:px-8">
        <div className="grid grid-cols-12 gap-x-4 gap-y-12">
          <div className="col-span-12 md:col-span-8">
            <Reveal delay={80}>
              <h1 className="text-[clamp(40px,7vw,88px)] font-medium leading-[0.95] tracking-[-0.04em]">
                Physiotherapy
                <br />
                for everyday injuries.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-[32rem] text-[17px] leading-[1.45] md:text-[19px]">
                Musculoskeletal physio, sports injuries, post-op rehab and exercise classes. Each service has its own
                page. Booking is through HotDoc.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200} className="col-span-12 md:col-span-4 md:self-end" as="div">
            <div className={`border-t ${rule} pt-4`}>
              <p className={label}>Next available</p>
              <p className="mt-3 text-[clamp(34px,4vw,56px)] font-medium leading-none tracking-[-0.04em]">
                Tomorrow <span className="tabular-nums" style={{ color: GREEN }}>08:15</span>
              </p>
              <ul className={`mt-6 divide-y ${rule} border-y ${rule}`}>
                {slots.map((s) => (
                  <li key={s.day + s.time}>
                    <a href="#book" className="group flex items-baseline justify-between py-3 text-[15px]">
                      <span>
                        {s.day} <span className="tabular-nums">{s.time}</span>
                        <span className="ml-2 text-[#0B0B0B]/45">with {s.who}</span>
                      </span>
                      <span className="translate-x-0 transition-transform group-hover:translate-x-1" aria-hidden="true">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#book" className="mt-4 inline-block text-[14px] underline decoration-[#0B0B0B]/30 underline-offset-4 hover:decoration-[#1A4D3E]">
                All times, online
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={260} className={`mt-16 grid grid-cols-1 gap-3 border-t ${rule} pt-4 md:grid-cols-3`}>
          {['HICAPS on the spot', 'Workers comp · CTP · NDIS · DVA', 'Medicare care plans (EPC / CDM)'].map((t) => (
            <p key={t} className={label}>
              {t}
            </p>
          ))}
        </Reveal>
      </section>

      <Reveal as="figure" className="relative aspect-[3/2] w-full overflow-hidden md:aspect-[21/9]">
        <Image
          src={photo('rehab.jpg')}
          alt="Supervised rehab on the reformers"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_40%] grayscale contrast-[1.1]"
        />
      </Reveal>

      <section id="book" className={`border-t ${rule} px-5 py-20 md:px-8 md:py-28`}>
        <div className="grid grid-cols-12 gap-x-4 gap-y-10">
          <Reveal className="col-span-12 md:col-span-4">
            <p className={label}>Book online</p>
            <h2 className="mt-4 text-[clamp(32px,4vw,56px)] font-medium leading-[0.95] tracking-[-0.04em]">
              Pick a time.
              <br />
              No phone call.
            </h2>
            <p className="mt-6 max-w-[22rem] text-[16px] leading-[1.5]">
              Bookings run through HotDoc, the same system most GPs use. You will get a text reminder the day before and can
              move or cancel online up to four hours out.
            </p>
            <ul className="mt-6 space-y-2 text-[14px] text-[#0B0B0B]/60">
              <li>No account needed for your first booking</li>
              <li>Workers compensation, CTP, NDIS, DVA and Medicare care plans accepted</li>
              <li>HICAPS claiming on the spot for private health</li>
            </ul>
          </Reveal>

          <Reveal delay={100} className="col-span-12 md:col-span-7 md:col-start-6">
            <BookingWidget />
          </Reveal>
        </div>
      </section>

      <section id="services" className={`border-t ${rule} px-5 py-20 md:px-8 md:py-28`}>
        <div className="grid grid-cols-12 gap-4">
          <Reveal className="col-span-12 md:col-span-3">
            <p className={label}>What we treat</p>
          </Reveal>
          <Reveal delay={60} className="col-span-12 md:col-span-8 md:col-start-5">
            <p className="text-[clamp(26px,3.6vw,44px)] font-medium leading-[1.08] tracking-[-0.03em]">
              Each service has its own page: what it is, who you would see, and a booking into HotDoc.
            </p>
          </Reveal>
        </div>
        <ul className={`mt-16 grid gap-8 border-t ${rule} pt-10 md:grid-cols-2`}>
          {services.map((s, i) => (
            <Reveal key={s.slug} as="li" delay={i * 40} y={14} className="md:pr-8">
              <h3 className="text-[22px] font-medium tracking-[-0.02em]">
                <Link href={servicePath(s.slug)} className="group inline-flex items-baseline gap-2 hover:text-[#1A4D3E]">
                  {s.h}
                  <span aria-hidden="true" className="text-[16px] transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </h3>
              <p className="mt-3 text-[15px] leading-[1.5] text-[#0B0B0B]/70 md:text-[16px]">{s.p}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section id="fees" className={`border-t ${rule} px-5 py-20 md:px-8 md:py-28`}>
        <div className="grid grid-cols-12 gap-4">
          <Reveal className="col-span-12 md:col-span-3">
            <p className={label}>Fees</p>
            <p className="mt-6 max-w-[16rem] text-[15px] leading-[1.5] text-[#0B0B0B]/70">
              Published fees. HICAPS on the spot. We accept workers compensation, CTP, NDIS, DVA and Medicare care plans
              (EPC / CDM).
            </p>
          </Reveal>
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <ul className={`border-t ${rule}`}>
              {fees.map((f, i) => (
                <Reveal key={f.item} as="li" delay={i * 50} y={12} className={`grid grid-cols-12 items-baseline gap-4 border-b ${rule} py-6`}>
                  <span className="col-span-8 text-[clamp(20px,2.2vw,30px)] font-medium leading-none tracking-[-0.03em] md:col-span-6">{f.item}</span>
                  <span className="col-span-4 hidden text-[12px] text-[#0B0B0B]/55 md:col-span-3 md:block">{f.len}</span>
                  <span className="col-span-4 text-right text-[clamp(28px,3.4vw,48px)] font-medium leading-none tracking-[-0.04em] tabular-nums md:col-span-3">
                    <span className="align-top text-[0.5em] font-normal text-[#0B0B0B]/55">$</span>
                    {f.price}
                  </span>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={200}>
              <p className="mt-6 text-[13px] leading-[1.5] text-[#0B0B0B]/55">
                No gap for DVA and icare claims. Missed appointments without 24 hours’ notice are charged at half rate, and
                we will remind you the day before.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="people" className={`border-t ${rule} px-5 py-20 md:px-8 md:py-28`}>
        <Reveal>
          <p className={label}>Who you will see</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-12 gap-x-4 gap-y-14">
          {people.map((p, i) => (
            <Reveal key={p.name} as="figure" delay={i * 80} className={`col-span-12 md:col-span-4 ${i === 1 ? 'md:mt-24' : ''} ${i === 2 ? 'md:mt-12' : ''}`}>
              <div className="relative aspect-[4/5] overflow-hidden bg-[#0B0B0B]/5">
                <Image
                  src={photo(p.photo)}
                  alt={`${p.name}, ${p.role}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className={`object-cover grayscale contrast-[1.1] transition-[filter] duration-700 hover:grayscale-0 ${p.pos}`}
                />
              </div>
              <figcaption className="mt-4">
                <p className="text-[19px] font-medium tracking-[-0.02em]">{p.name}</p>
                <p className={`${label} mt-1`}>{p.role}</p>
                <p className="mt-3 max-w-[22rem] text-[15px] leading-[1.5] text-[#0B0B0B]/70">{p.note}</p>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="visit" className={`border-t ${rule} px-5 py-20 md:px-8 md:py-28`}>
        <div className="grid grid-cols-12 gap-x-4 gap-y-10">
          <Reveal className="col-span-12 md:col-span-3">
            <p className={label}>Visit</p>
          </Reveal>
          <Reveal delay={60} className="col-span-12 md:col-span-4 md:col-start-5">
            <p className={label}>Where</p>
            <p className="mt-3 text-[19px] leading-[1.35] tracking-[-0.01em]">
              Ground floor, street entry
              <br />
              Next to the pharmacy
            </p>
            <p className="mt-3 text-[12px] text-[#0B0B0B]/55">Step-free · Parking behind · Bus stop outside</p>
            <p className="mt-6 text-[15px] leading-[1.5] text-[#0B0B0B]/70">
              Come in as you are. There is a change room, and you do not need to bring anything except the shoes you
              usually wear.
            </p>
          </Reveal>
          <Reveal delay={120} className="col-span-12 md:col-span-4">
            <p className={label}>When</p>
            <dl className="mt-3 text-[19px] leading-[1.35] tracking-[-0.01em]">
              {[
                ['Mon – Thu', '07:00 – 18:30'],
                ['Fri', '07:00 – 16:00'],
                ['Sat', '08:00 – 12:00'],
                ['Sun', 'Closed'],
              ].map(([d, t]) => (
                <div key={d} className={`flex justify-between border-b ${rule} py-2 md:max-w-[20rem]`}>
                  <dt>{d}</dt>
                  <dd className="tabular-nums">{t}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
    </PhysioShell>
  );
}
