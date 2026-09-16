"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { intro, mailto, site, tel } from "@/lib/site";
import { Lighthouse } from "./Lighthouse";
import { isActive, pages } from "./Nav";

/**
 * Phone chrome: a slim sticky bar with the wordmark and a Menu button that
 * opens a full-screen sheet holding the nav, the introduction and contact
 * details (everything the desktop sidebar shows). Hidden from tablet up.
 */
export function MobileHeader() {
  const pathname = usePathname();
  // The sheet remembers which route opened it, so navigating closes it for free.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const setOpen = (next: boolean) => setOpenedAt(next ? pathname : null);
  const [scrolled, setScrolled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenedAt(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`tablet:hidden sticky top-0 z-40 bg-white/85 backdrop-blur-md pt-[env(safe-area-inset-top)] transition-[box-shadow] duration-300 ${
          scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.08)]" : "shadow-none"
        }`}
      >
        <div className="flex h-14 items-center justify-between px-5">
          <Link href="/" className="lighthouse-logo -ml-1 flex h-11 items-center rounded-sm px-1">
            <span className="flex items-center gap-2 text-[15px] font-medium tracking-[-0.01em] leading-none">
              <Lighthouse />
              {site.name}
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 flex h-11 items-center px-2 text-[15px] text-black/60 active:text-black"
          >
            Menu
          </button>
        </div>
      </header>

      {open ? (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="tablet:hidden menu-sheet fixed inset-0 z-50 flex flex-col bg-white pt-[env(safe-area-inset-top)] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
        >
          <div className="flex h-14 shrink-0 items-center justify-between px-5">
            <Link href="/" className="lighthouse-logo -ml-1 flex h-11 items-center rounded-sm px-1">
              <span className="flex items-center gap-2 text-[15px] font-medium tracking-[-0.01em] leading-none">
                <Lighthouse />
                {site.name}
              </span>
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className="-mr-2 flex h-11 items-center px-2 text-[15px] text-black/60 active:text-black"
            >
              Close
            </button>
          </div>

          <nav className="flex flex-col px-5 pt-8" aria-label="Primary">
            {pages.map(({ href, label }, i) => {
              const active = isActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`rise flex h-[3.25rem] items-center text-[2.25rem] font-medium leading-none tracking-[-0.03em] active:translate-x-1 transition-transform duration-200 ${
                    active ? "text-black" : "text-black/60"
                  }`}
                  style={{ animationDelay: `${60 + i * 50}ms` }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div
            className="rise mt-auto space-y-4 px-5 pt-10 text-[15px] leading-[1.6]"
            style={{ animationDelay: "300ms" }}
          >
            {intro.slice(0, 2).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div
            className="rise mt-8 flex flex-col gap-1 px-5 text-[15px] leading-[1.6] text-black/60"
            style={{ animationDelay: "360ms" }}
          >
            <a href={tel} className="flex h-10 items-center active:text-black">
              {site.phone}
            </a>
            <a href={mailto} className="flex h-10 items-center active:text-black">
              {site.email}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
