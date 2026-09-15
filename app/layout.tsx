import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
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
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description:
    "Websites and web apps for small to medium sized businesses and professionals. Andy, web developer, Port Macquarie.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${satoshi.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
