import { MobileFooter } from "./MobileFooter";
import { MobileHeader } from "./MobileHeader";
import { Sidebar } from "./Sidebar";

/** Public marketing chrome: skip link, mobile header, sidebar, page, footer. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full bg-white text-black font-sans font-medium">
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <MobileHeader />
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-white tablet:flex-row">
        <Sidebar />
        <div className="flex w-full min-w-0 flex-1 flex-col tablet:ml-[340px] desktop:ml-[400px]">
          <main id="content" className="flex-1 outline-none" tabIndex={-1}>
            {children}
          </main>
          <MobileFooter />
        </div>
      </div>
    </div>
  );
}
