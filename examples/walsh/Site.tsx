import { Hanken_Grotesk } from 'next/font/google';
import { asset } from '@/lib/asset';
import { InPageScroll, Reveal } from '@/examples/_shared/primitives';
import { BookingForm } from '@/examples/walsh/BookingForm';

/*
  WALSH MATHEMATICS
  Claire Walsh. Hanken Grotesk only — modern grotesque, no serif.
  Short blocks, profile portrait, interactive calendar.
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
const section = 'scroll-mt-24 border-t border-[#111]/10 px-6 py-16 md:px-12 md:py-20';
const link =
  'text-[13px] font-medium underline decoration-[#111]/25 underline-offset-4 hover:decoration-[#111]';

const cv = [
  {
    k: 'Classroom',
    v: 'Fourteen years teaching mathematics, Years 7–12, and Engineering Studies in 11 and 12. Part-time at a regional comprehensive. Five years before that at a selective girls’ school.',
  },
  {
    k: 'HSC',
    v: 'Marker for Mathematics Advanced since 2019. Past papers are a normal part of senior lessons.',
  },
  {
    k: 'Qualifications',
    v: 'B.Sc. (Mathematics), Dip.Ed. I still have a class of my own, including Engineering Studies.',
  },
  {
    k: 'Fee',
    v: '$80 / 60 minutes. In person around Port Macquarie, or online. A short note to the parent after the first lesson.',
  },
];

const stages = [
  {
    k: 'Stage 4',
    h: 'Years 7–8',
    p: 'Number and algebra, and the habits later courses assume.',
  },
  {
    k: 'Stage 5',
    h: 'Years 9–10',
    p: 'Linear relationships, trigonometry, and the gap between the exercise and the exam.',
  },
  {
    k: 'Stage 6',
    h: 'Years 11–12',
    p: 'Mathematics Standard, Advanced, and Extension 1. I do not take Extension 2.',
  },
  {
    k: 'Engineering',
    h: 'Years 11–12',
    p: 'Engineering Studies. Mechanics, materials, and the written papers.',
  },
];

const notes = [
  {
    q: 'I kept dropping marks on related rates because I could not see the diagram. Claire made me draw it every time. The half-yearly was ordinary after that.',
    who: 'Maya · Year 11 Advanced',
  },
  {
    q: 'We spent three weeks going back to fractions. Algebra started landing in term 3, which had not been true since Year 8.',
    who: 'Josh · Year 9',
  },
  {
    q: 'I finished the Standard trial calculator paper with time left. We had done that paper twice, slowly.',
    who: 'Priya · Year 12 Standard',
  },
  {
    q: 'I was behind on the Engineering Studies modules before trials. We went through the last two assessment tasks and the written paper.',
    who: 'Tom · Year 12 Engineering',
  },
];

export default function WalshPage() {
  return (
    <>
      <InPageScroll />
      <div
        data-example=""
        className={`${sans.variable} font-[family-name:var(--wm-sans)] min-h-screen antialiased`}
        style={{ background: PAPER, color: INK }}
      >
        <header className="custom-header flex items-center justify-between gap-6 px-6 py-6 md:px-12">
          <a href="#top">
            <p className="text-[15px] font-semibold tracking-[-0.02em]">Claire Walsh</p>
            <p className={`mt-0.5 text-[12px] ${mute}`}>Mathematics and Engineering · 7–12</p>
          </a>
          <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2">
            <a href="#about" className={link}>
              About
            </a>
            <a href="#syllabus" className={link}>
              Syllabus
            </a>
            <a href="#students" className={link}>
              Students
            </a>
            <a href="#book" className={link}>
              Book
            </a>
          </nav>
        </header>

        <section id="top" className="scroll-mt-24 px-6 pb-16 md:px-12 md:pb-24">
          <Reveal>
            <p className={`text-[13px] font-medium ${mute}`}>Years 7–12 · In person or online</p>
            <h1 className="mt-4 max-w-[18ch] text-[clamp(28px,4.2vw,44px)] font-medium leading-[1.15] tracking-[-0.03em]">
              Mathematics tutor in the Port Macquarie area.
            </h1>
            <p className={`mt-5 max-w-[34rem] text-[16px] leading-[1.5] ${mute}`}>
              Standard, Advanced, Extension 1, and Engineering Studies. After school and Saturday mornings.
            </p>
          </Reveal>
        </section>

        <section id="about" className={section}>
          <div className="grid gap-10 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:items-start md:gap-16">
            <Reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset('/examples/walsh/claire.jpg')}
                alt="Claire Walsh"
                className="aspect-[4/5] w-full max-w-[15rem] object-cover object-[50%_12%]"
              />
            </Reveal>
            <Reveal delay={60}>
              <p className={`text-[12px] font-medium uppercase tracking-[0.12em] ${mute}`}>About</p>
              <h2 className="mt-3 max-w-[22ch] text-[clamp(24px,3.2vw,36px)] font-medium leading-[1.2] tracking-[-0.03em]">
                Fourteen years teaching, years 7 to 12.
              </h2>
              <p className="mt-6 max-w-[36rem] text-[16px] leading-[1.55]">
                I teach mathematics and Engineering Studies at a high school on the coast, and one student at a time after
                that. Same NESA syllabuses as school.
              </p>
              <p className={`mt-4 max-w-[36rem] text-[16px] leading-[1.55] ${mute}`}>
                I mark HSC Mathematics Advanced. Senior lessons use current school work and past papers. Years 7–10 we go
                back as far as the algebra needs.
              </p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {cv.map((item, i) => (
              <Reveal key={item.k} delay={i * 50}>
                <p className={`text-[12px] font-medium uppercase tracking-[0.12em] ${mute}`}>{item.k}</p>
                <p className="mt-3 text-[15px] leading-[1.5]">{item.v}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="syllabus" className={section}>
          <div className="grid gap-10 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:items-end md:gap-16">
            <Reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset('/examples/walsh/nesa.png')}
                alt="NSW Education Standards Authority"
                className="h-[4.25rem] w-auto md:h-[4.75rem]"
              />
            </Reveal>
            <Reveal delay={60}>
              <p className={`text-[12px] font-medium uppercase tracking-[0.12em] ${mute}`}>Syllabus</p>
              <p className="mt-3 max-w-[36rem] text-[16px] leading-[1.55]">
                Lessons follow the NESA syllabuses for Mathematics (Stage 4, 5 and 6) and Engineering Studies. Same
                outcomes as school. This is not a NESA program.
              </p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((item, i) => (
              <Reveal key={item.k} delay={i * 60}>
                <p className={`text-[12px] font-medium uppercase tracking-[0.12em] ${mute}`}>{item.k}</p>
                <p className="mt-3 text-[18px] font-medium tracking-[-0.02em]">{item.h}</p>
                <p className={`mt-3 text-[15px] leading-[1.5] ${mute}`}>{item.p}</p>
              </Reveal>
            ))}
          </div>
          <div className={`mt-14 flex flex-wrap gap-x-10 gap-y-3 text-[14px] ${mute}`}>
            <span>Mathematics Standard</span>
            <span>Mathematics Advanced</span>
            <span>Mathematics Extension 1</span>
            <span>Engineering Studies</span>
            <span>Mon–Fri 16:00–18:00</span>
            <span>Saturday 09:00–11:00</span>
          </div>
        </section>

        <section id="students" className={section}>
          <Reveal>
            <p className={`text-[12px] font-medium uppercase tracking-[0.12em] ${mute}`}>Students</p>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,36px)] font-medium tracking-[-0.03em]">A few notes.</h2>
          </Reveal>
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {notes.map((item, i) => (
              <Reveal key={item.who} delay={i * 50}>
                <blockquote>
                  <p className="text-[16px] leading-[1.55]">“{item.q}”</p>
                  <p className={`mt-4 text-[13px] ${mute}`}>{item.who}</p>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="book" className="scroll-mt-24 border-t border-[#111]/10 px-6 py-16 md:px-12 md:py-24">
          <Reveal>
            <h2 className="text-[clamp(24px,3.4vw,36px)] font-medium tracking-[-0.03em]">Book a first lesson</h2>
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
          <a href="mailto:claire@walshmaths.com.au" className="hover:text-[#111]">
            claire@walshmaths.com.au
          </a>
        </footer>
      </div>
    </>
  );
}
