import Link from "next/link";
import { site } from "@/lib/site";
import { ContactIcons } from "./ContactIcons";
import { Nav, type CurrentPage } from "./Nav";
import { TackingPoint } from "./TackingPoint";

export function MobileHeader({ current }: { current: CurrentPage }) {
  return (
    <header className="site-mobile-bar fixed left-0 right-0 top-0 z-40">
      <div className="flex h-14 w-full max-w-[100vw] items-center justify-between bg-green px-5 text-cream">
        <Link
          href="/"
          className="tacking-point-logo min-w-0 truncate rounded-sm pr-3 text-[18px] font-bold tracking-[-0.04em]"
        >
          <span className="flex items-center gap-2">
            <TackingPoint />
            <span className="truncate">{site.name}</span>
          </span>
        </Link>
        <details key={current} className="group">
          <summary className="inline-flex h-11 min-w-11 cursor-pointer list-none items-center justify-end text-[15px] text-cream [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Menu</span>
            <span className="hidden group-open:inline">Close</span>
          </summary>
          <div
            id="mobile-nav"
            className="menu-sheet fixed inset-x-0 bottom-0 top-14 z-40 flex flex-col bg-green px-5 pb-8 pt-6 text-cream"
          >
            <Nav
              current={current}
              className="flex flex-col gap-3 text-[28px] font-bold tracking-[-0.04em]"
              activeClassName="text-cream"
              inactiveClassName="text-cream-muted hover:text-cream motion-safe:transition-colors motion-safe:duration-200"
            />
            <p className="mt-10 max-w-[20rem] text-[15px] leading-snug text-cream-muted">
              {site.tagline}
            </p>
            <div className="mt-auto">
              <ContactIcons tone="green" className="-ml-2" />
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
