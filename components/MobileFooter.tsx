import { analyticsNote, mailto, site, tel } from "@/lib/site";

/** Contact strip at the foot of every page on phones; the sidebar carries this elsewhere. */
export function MobileFooter() {
  return (
    <footer className="tablet:hidden mt-auto px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-10">
      <div className="flex flex-col gap-0.5 border-t border-black/10 pt-5 text-[13px] leading-relaxed text-black/60">
        <p>
          {site.name} · {site.location}
        </p>
        <p className="flex flex-wrap gap-x-4">
          <a href={tel} className="active:text-black">
            {site.phone}
          </a>
          <a href={mailto} className="active:text-black">
            {site.email}
          </a>
        </p>
        <p className="pt-3 text-[12px] text-black/40">{analyticsNote}</p>
      </div>
    </footer>
  );
}
