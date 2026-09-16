'use client';

import Link from 'next/link';
import { GREEN, mark, menu, nav, physioPath, rule } from '@/examples/physio/data';
import { ScrollSpy } from '@/examples/_shared/primitives';

export function PhysioHeader({ home }: { home: boolean }) {
  return (
    <header className={`custom-header fixed inset-x-0 top-0 z-50 border-b ${rule} bg-[#FAFAF8]/90 backdrop-blur-md`}>
      <div className="flex min-h-[4.5rem] flex-wrap items-center justify-between gap-x-3 gap-y-2 px-5 py-2 md:flex-nowrap md:px-8">
        {home ? (
          <a href="#top" className="min-w-0 shrink-0">
            <span className={`${mark} block text-[18px] leading-none sm:text-[20px] md:text-[22px]`}>
              Ridgeway <span className="font-normal text-[#0B0B0B]/55">Physio</span>
            </span>
          </a>
        ) : (
          <Link href={physioPath} className="min-w-0 shrink-0">
            <span className={`${mark} block text-[18px] leading-none sm:text-[20px] md:text-[22px]`}>
              Ridgeway <span className="font-normal text-[#0B0B0B]/55">Physio</span>
            </span>
          </Link>
        )}

        {home ? (
          <ScrollSpy
            items={nav.map(({ href, label }) => ({ href, label }))}
            className="hidden h-11 min-w-0 flex-1 items-stretch justify-center md:flex"
            linkClass={`${menu} relative flex items-center whitespace-nowrap px-2.5 text-[13px] transition-colors duration-200 after:absolute after:inset-x-2 after:bottom-0 after:h-[2px] after:origin-left after:bg-[#1A4D3E] after:transition-transform after:duration-300 after:content-[''] lg:px-3.5 lg:text-[14px]`}
            activeClass="text-[#0B0B0B] after:scale-x-100"
            inactiveClass="text-[#0B0B0B]/55 hover:text-[#0B0B0B] after:scale-x-0"
          />
        ) : (
          <nav className="hidden h-11 min-w-0 flex-1 items-stretch justify-center md:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.path}
                className={`${menu} relative flex items-center whitespace-nowrap px-2.5 text-[13px] text-[#0B0B0B]/55 transition-colors duration-200 hover:text-[#0B0B0B] lg:px-3.5 lg:text-[14px]`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        <a
          href="#book"
          className={`${menu} group inline-flex h-10 shrink-0 items-center gap-2 rounded-md px-4 text-[13px] text-white transition-colors duration-200 hover:bg-[#0B0B0B] lg:h-11 lg:px-5 lg:text-[14px]`}
          style={{ background: GREEN }}
        >
          Book
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </div>
    </header>
  );
}

export function PhysioFooter({ home = false }: { home?: boolean }) {
  return (
    <footer className="custom-footer border-t border-[#0B0B0B]">
      <div className="px-5 py-16 md:px-8 md:py-24">
        <Link href={home ? '#book' : `${physioPath}#book`} className="group block">
          <p className="text-[clamp(44px,9vw,150px)] font-medium leading-[0.9] tracking-[-0.045em] transition-colors duration-300 group-hover:text-[#1A4D3E]">
            Book an
            <br />
            appointment <span className="inline-block transition-transform duration-300 group-hover:translate-x-3">→</span>
          </p>
        </Link>
      </div>
      <div className={`flex flex-col gap-2 border-t ${rule} px-5 py-5 text-[11px] uppercase tracking-[0.18em] text-[#0B0B0B]/45 md:flex-row md:items-center md:justify-between md:px-8`}>
        <span>© Ridgeway Physiotherapy 2026</span>
        <span>AHPRA registered · 02 5550 2110 · hello@ridgewayphysio.com.au</span>
      </div>
    </footer>
  );
}
