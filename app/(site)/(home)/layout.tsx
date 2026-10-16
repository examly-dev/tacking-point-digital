import { SiteChrome } from "@/components/SiteChrome";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome current="/">{children}</SiteChrome>;
}
