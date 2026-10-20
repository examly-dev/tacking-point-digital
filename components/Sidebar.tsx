import Link from "next/link";
import { clientsLabel, clientsUrl, intro, mailto, site, tel } from "@/lib/site";
import { Lighthouse } from "./Lighthouse";
import { Nav } from "./Nav";

const body = "text-[14px] desktop:text-[16px] leading-[1.6] desktop:leading-[1.4]";

/** Fixed left column on tablet and up. Phones get `MobileHeader` instead. */
export function Sidebar() {
  return (
    <aside className="hidden tablet:flex w-[340px] desktop:w-[400px] bg-white p-8 flex-col fixed left-0 top-0 h-screen overflow-y-auto">
      <div className="flex items-start justify-between gap-6 mb-10 desktop:mb-12">
        <Link
          href="/"
          className="lighthouse-logo block w-fit shrink-0 rounded-sm"
        >
          <h1 className="flex items-center gap-2 text-[14px] desktop:text-[16px] font-medium tracking-[-0.01em] leading-tight">
            <Lighthouse />
            {site.name}
          </h1>
        </Link>
        <Nav />
      </div>

      <div className={`flex-1 ${body} space-y-5`}>
        {intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <footer className="mt-auto pt-6">
        <div className="space-y-1 text-[12px] text-black/60 leading-relaxed">
          <p>{site.name}</p>
          <p>
            <a
              href={tel}
              className="hover:text-black transition-colors duration-200"
            >
              {site.phone}
            </a>
          </p>
          <p>
            <a
              href={mailto}
              className="hover:text-black transition-colors duration-200"
            >
              {site.email}
            </a>
          </p>
          <p className="pt-2">
            <a
              href={clientsUrl}
              className="text-[11px] text-black/40 hover:text-black/70 transition-colors duration-200"
            >
              {clientsLabel}
            </a>
          </p>
        </div>
      </footer>
    </aside>
  );
}
