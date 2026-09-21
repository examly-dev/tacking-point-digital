import { Analytics } from "@/components/Analytics";
import { SiteChrome } from "@/components/SiteChrome";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Analytics />
      <SiteChrome>{children}</SiteChrome>
    </>
  );
}
