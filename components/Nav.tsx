"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const pages = [
  { href: "/", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/" || pathname.startsWith("/work");
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Sidebar navigation (tablet and up). */
export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex shrink-0 flex-col items-end gap-0.5 text-[14px] desktop:text-[16px]">
      {pages.map(({ href, label }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "text-black"
                : "text-black/30 hover:text-black transition-colors duration-200"
            }
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
