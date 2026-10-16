import { SiteChrome } from "@/components/SiteChrome";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome current="/about">{children}</SiteChrome>;
}
