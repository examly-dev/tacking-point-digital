import type { Metadata } from "next";
import { InPageScroll } from "@/examples/_shared/primitives";

export const metadata: Metadata = {
  title: "Preview",
  robots: { index: false, follow: false },
};

/** Isolated chrome-free shell so example sites can be iframed from a work page. */
export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-white">
      <InPageScroll />
      {children}
    </div>
  );
}
