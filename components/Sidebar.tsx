import Link from "next/link";
import { site } from "@/lib/site";
import { ContactIcons } from "./ContactIcons";
import { Nav, type CurrentPage } from "./Nav";
import { TackingPoint } from "./TackingPoint";

export function Sidebar({ current }: { current: CurrentPage }) {
  return (
    <aside className="site-rail flex-col justify-between bg-green px-8 py-8 text-cream">
      <div>
        <Link
          href="/"
          className="tacking-point-logo block w-fit max-w-[16rem] rounded-sm text-[20px] font-bold leading-[1.15] tracking-[-0.045em] desktop:text-[22px]"
        >
          <span className="flex items-start gap-2.5">
            <span className="mt-1 shrink-0">
              <TackingPoint />
            </span>
            <span>{site.name}</span>
          </span>
        </Link>
        <p className="mt-3 max-w-[16rem] text-[13px] leading-snug text-cream-muted desktop:text-[14px]">
          {site.tagline}
        </p>
      </div>

      <Nav
        current={current}
        className="relative z-10 flex flex-col items-start gap-1 text-[15px] desktop:text-[16px]"
        activeClassName="text-cream"
        inactiveClassName="text-cream-muted hover:text-cream motion-safe:transition-colors motion-safe:duration-200"
      />

      <ContactIcons tone="green" className="-ml-2" />
    </aside>
  );
}
