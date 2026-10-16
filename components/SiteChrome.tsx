import { MobileFooter } from "@/components/MobileFooter";
import { MobileHeader } from "@/components/MobileHeader";
import { Sidebar } from "@/components/Sidebar";
import type { CurrentPage } from "@/components/Nav";

export function SiteChrome({
  current,
  children,
}: {
  current: CurrentPage;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full min-w-0 bg-paper text-ink">
      <a href="#content" className="skip">
        Skip to content
      </a>
      <MobileHeader current={current} />
      <Sidebar current={current} />
      <main
        id="content"
        className="site-main site-canvas flex min-h-screen min-w-0 flex-col pt-[calc(3.5rem+env(safe-area-inset-top))]"
      >
        <div className="min-w-0 flex-1">{children}</div>
        <MobileFooter />
      </main>
    </div>
  );
}
