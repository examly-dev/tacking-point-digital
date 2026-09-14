import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MobileFooter } from "@/components/MobileFooter";
import { MobileHeader } from "@/components/MobileHeader";
import { Sidebar } from "@/components/Sidebar";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${satoshi.className} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-black font-medium">
        <MobileHeader />
        <main className="min-h-screen bg-white flex flex-col overflow-x-hidden tablet:flex-row">
          <Sidebar />
          <div className="flex w-full min-w-0 flex-1 flex-col tablet:ml-[340px] desktop:ml-[400px]">
            <div className="flex-1">{children}</div>
            <MobileFooter />
          </div>
        </main>
      </body>
    </html>
  );
}
