import { SiteChrome } from "@/components/SiteChrome";

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome current="/contact">{children}</SiteChrome>;
}
