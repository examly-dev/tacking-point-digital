import { SiteChrome } from "@/components/SiteChrome";

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome current="/work">{children}</SiteChrome>;
}
