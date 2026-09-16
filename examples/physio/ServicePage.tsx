import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { asset } from '@/lib/asset';
import { Reveal } from '@/examples/_shared/primitives';
import { BookingWidget } from '@/examples/physio/Booking';
import { PhysioShell } from '@/examples/physio/Shell';
import { getService, GREEN, label, people, physioPath, rule, services } from '@/examples/physio/data';

const photo = (file: string) => asset(`/examples/physio/${file}`);

export function PhysioServicePage({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) notFound();

  const clinicians = service.clinicians
    .map((id) => people.find((p) => p.id === id))
    .filter((p): p is (typeof people)[number] => Boolean(p));
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <PhysioShell>
      <article className="px-5 pb-8 pt-28 md:px-8">
        <p className={label}>
          <Link href={`${physioPath}#services`} className="hover:text-[#0B0B0B]">
            Services
          </Link>
          <span className="mx-2 text-[#0B0B0B]/30">/</span>
          {service.h}
        </p>
        <h1 className="mt-4 max-w-[18ch] text-[clamp(40px,7vw,88px)] font-medium leading-[0.95] tracking-[-0.04em]">
          {service.h}
        </h1>
        <p className="mt-6 max-w-[36rem] text-[17px] leading-[1.45] md:text-[19px]">{service.p}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#book"
            className="inline-flex h-11 items-center rounded-md px-5 text-[15px] font-medium text-white hover:bg-[#0B0B0B]"
            style={{ background: GREEN }}
          >
            Book this service
          </a>
          <p className="flex items-center text-[14px] text-[#0B0B0B]/55">
            {service.duration} · ${service.price}
          </p>
        </div>
      </article>

      <div className={`border-t ${rule} px-5 py-16 md:px-8 md:py-24`}>
        <div className="grid grid-cols-12 gap-x-4 gap-y-12">
          <div className="col-span-12 md:col-span-7">
            {service.body.map((p, i) => (
              <Reveal key={p} delay={i * 60}>
                <p className={`max-w-[38rem] text-[16px] leading-[1.55] md:text-[17px] ${i ? 'mt-5' : ''}`}>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={140} className="mt-10">
              <p className={label}>Typical presentations</p>
              <ul className={`mt-4 max-w-[28rem] border-t ${rule}`}>
                {service.typical.map((t) => (
                  <li key={t} className={`border-b ${rule} py-3 text-[16px]`}>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <p className={label}>Who you would see</p>
            <ul className="mt-6 space-y-8">
              {clinicians.map((p) => (
                <li key={p.id} className="flex gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-[#0B0B0B]/5">
                    <Image
                      src={photo(p.photo)}
                      alt={`${p.name}, ${p.role}`}
                      fill
                      sizes="64px"
                      className={`object-cover grayscale contrast-[1.1] ${p.pos}`}
                    />
                  </div>
                  <div>
                    <p className="text-[16px] font-medium tracking-[-0.02em]">{p.name}</p>
                    <p className={`${label} mt-1`}>{p.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section id="book" className={`border-t ${rule} px-5 py-16 md:px-8 md:py-24`}>
        <div className="grid grid-cols-12 gap-x-4 gap-y-10">
          <Reveal className="col-span-12 md:col-span-4">
            <p className={label}>Book</p>
            <h2 className="mt-4 text-[clamp(28px,3.6vw,44px)] font-medium leading-[0.95] tracking-[-0.04em]">
              {service.appointment} on HotDoc.
            </h2>
            <p className="mt-6 max-w-[22rem] text-[16px] leading-[1.5]">
              The diary is HotDoc. This page opens on {service.appointment.toLowerCase()}
              {clinicians[0] ? ` with ${clinicians[0].name.split(' ')[0]}` : ''}. You can still change type or clinician
              before you confirm.
            </p>
          </Reveal>
          <Reveal delay={80} className="col-span-12 md:col-span-7 md:col-start-6">
            <BookingWidget
              appointment={service.appointment}
              practitioner={clinicians[0] ? clinicians[0].name : 'Any'}
            />
          </Reveal>
        </div>
      </section>

      <section className={`border-t ${rule} px-5 py-16 md:px-8 md:py-20`}>
        <h2 className={label}>Other services</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {others.map((s) => (
            <li key={s.slug}>
              <Link href={`${physioPath}/services/${s.slug}`} className={`group block border-t ${rule} pt-4`}>
                <p className="text-[18px] font-medium tracking-[-0.02em] group-hover:text-[#1A4D3E]">
                  {s.h} <span aria-hidden="true">→</span>
                </p>
                <p className="mt-2 text-[14px] leading-[1.45] text-[#0B0B0B]/65">{s.p}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PhysioShell>
  );
}
