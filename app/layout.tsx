import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { businessJsonLd, defaultDescription } from "@/lib/metadata";
import { site } from "@/lib/site";
import "./globals.css";

const satoshi = localFont({
  src: "./fonts/Satoshi-Medium.woff2",
  weight: "500",
  style: "normal",
  display: "swap",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: defaultDescription,
  applicationName: site.name,
  authors: [{ name: "Andy", url: site.url }],
  creator: "Andy",
  publisher: site.name,
  keywords: ["web developer", "Port Macquarie", "Mid North Coast", "Next.js", "websites", "web apps"],
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = JSON.stringify(businessJsonLd()).replace(/</g, "\\u003c");

  return (
    <html lang="en" className={`${satoshi.variable} h-full antialiased`}>
      <body className="min-h-full">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
        {children}
      </body>
    </html>
  );
}
