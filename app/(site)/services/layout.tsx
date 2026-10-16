import { SiteChrome } from "@/components/SiteChrome";

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome current="/services">{children}</SiteChrome>;
}
