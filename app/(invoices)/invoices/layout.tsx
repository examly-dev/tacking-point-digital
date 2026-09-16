import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Invoices",
  robots: { index: false, follow: false },
};

export default function InvoicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
