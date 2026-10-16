import type { Metadata } from "next";
import { InPageScroll } from "@/examples/_shared/primitives";

export const metadata: Metadata = {
  title: "Preview",
  robots: { index: false, follow: false },
};

/**
 * Isolated chrome-free shell so example sites can be iframed from a work page.
 * `data-site-preview` marks the document so shared globals never apply the
 * marketing rail scroll-lock inside this frame.
 */
export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-site-preview="" className="min-h-full bg-white">
      <InPageScroll />
      {children}
    </div>
  );
}
