import { Hanken_Grotesk } from 'next/font/google';
import { asset } from '@/lib/asset';
import { Reveal } from '@/examples/_shared/primitives';
import { BookingForm } from '@/examples/walsh/BookingForm';

/*
  WALSH MATHEMATICS
  Claire Walsh. Hanken Grotesk only — modern grotesque, no serif.
  Short blocks, portrait, interactive calendar.
*/

const sans = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--wm-sans',
  display: 'swap',
});

const INK = '#111111';
const PAPER = '#F5F5F3';
const mute = 'text-[#111]/50';

export default function WalshPage() {
  return (
    <>
      <div
        data-example=""
        className={`${sans.variable} font-[family-name:var(--wm-sans)] min-h-screen antialiased`}
        style={{ background: PAPER, color: INK }}
      >
        <header className="custom-header flex items-center justify-between px-6 py-6 md:px-12">
          <a href="#top">
            <p className="text-[15px] font-semibold tracking-[-0.02em]">Claire Walsh</p>
            <p className={`mt-0.5 text-[12px] ${mute}`}>Mathematics · 7–12</p>
          </a>
          <a href="#book" className="text-[13px] font-medium underline decoration-[#111]/25 underline-offset-4 hover:decoration-[#111]">
            Book
          </a>
        </header>

        <section id="top" className="grid items-center gap-10 px-6 pb-16 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:px-12 md:pb-24">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#111]/5 md:max-w-[28rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/examples/walsh/claire.jpg")}
              alt="Claire Walsh, mathematics teacher"
              className="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
            />
          </div>
          <div>
            <Reveal>
              <p className={`text-[13px] font-medium ${mute}`}>One-to-one · In person or online</p>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="mt-4 max-w-[12ch] text-[clamp(36px,5.4vw,64px)] font-medium leading-[1.02] tracking-[-0.04em]">
                NSW maths, years 7 to 12.
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className={`mt-6 max-w-[28rem] text-[16px] leading-[1.5] ${mute}`}>
                Standard, Advanced and Extension 1. After school and Saturday mornings. We start from the student’s own work.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="about" className="border-t border-[#111]/10 px-6 py-16 md:px-12 md:py-20">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: 'Teaching', v: 'Fourteen years in classrooms. Part-time at a regional comprehensive; five years before that at a selective girls’ school in Sydney.' },
              { k: 'HSC', v: 'Marker for Mathematics Advanced since 2019.' },
              { k: 'Qualifications', v: 'B.Sc. (Mathematics), Dip.Ed. I still teach a class of my own.' },
              { k: 'Fee', v: '$80 / 60 minutes. In person on the coast, or online. A short note to the parent after the first lesson.' },
            ].map((item, i) => (
              <Reveal key={item.k} delay={i * 50}>
                <p className={`text-[12px] font-medium uppercase tracking-[0.12em] ${mute}`}>{item.k}</p>
                <p className="mt-3 text-[15px] leading-[1.5]">{item.v}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-t border-[#111]/10 px-6 py-16 md:px-12 md:py-20">
          <div className="grid gap-12 md:grid-cols-3">
            {[
              { h: 'Years 7–10', p: 'Number and algebra, rebuilt properly if it did not land the first time.' },
              { h: 'Standard / Advanced', p: 'Current school work, then past papers. Exam technique without the theatre.' },
              { h: 'Extension 1', p: 'For students already coping with Advanced. I do not take Extension 2.' },
            ].map((item, i) => (
              <Reveal key={item.h} delay={i * 60}>
                <p className="text-[18px] font-medium tracking-[-0.02em]">{item.h}</p>
                <p className={`mt-3 text-[15px] leading-[1.5] ${mute}`}>{item.p}</p>
              </Reveal>
            ))}
          </div>
          <div className={`mt-14 flex flex-wrap gap-x-10 gap-y-3 text-[14px] ${mute}`}>
            <span>Mon–Fri 16:00–18:00</span>
            <span>Saturday 09:00–11:00</span>
            <span>$80 · 60 minutes</span>
          </div>
        </section>

        <section id="book" className="border-t border-[#111]/10 px-6 py-16 md:px-12 md:py-24">
          <Reveal>
            <h2 className="text-[clamp(28px,4vw,40px)] font-medium tracking-[-0.03em]">Book a first lesson</h2>
            <p className={`mt-3 max-w-[32rem] text-[15px] leading-[1.5] ${mute}`}>
              Pick a date and a time. I confirm the same day.
            </p>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <BookingForm />
          </Reveal>
        </section>

        <footer className="custom-footer flex flex-col gap-2 border-t border-[#111]/10 px-6 py-8 text-[13px] text-[#111]/40 md:flex-row md:justify-between md:px-12">
          <p>© Claire Walsh 2026</p>
          <a href="mailto:claire@walshmaths.com.au" className="hover:text-[#111]">claire@walshmaths.com.au</a>
        </footer>
      </div>
    </>
  );
}
