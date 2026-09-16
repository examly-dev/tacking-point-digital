import { Sora, Source_Sans_3 } from 'next/font/google';
import { InPageScroll } from '@/examples/_shared/primitives';
import { PhysioHeader, PhysioFooter } from '@/examples/physio/Chrome';

const display = Sora({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--rw-display',
  display: 'swap',
});
const sans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--rw-sans',
  display: 'swap',
});

export function PhysioShell({
  children,
  home = false,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <>
      <InPageScroll />
      <div
        data-example=""
        className={`${display.variable} ${sans.variable} font-[family-name:var(--rw-sans)] min-h-screen bg-[#FAFAF8] text-[#0B0B0B] antialiased selection:bg-[#1A4D3E] selection:text-white`}
      >
        <PhysioHeader home={home} />
        {children}
        <PhysioFooter home={home} />
      </div>
    </>
  );
}
