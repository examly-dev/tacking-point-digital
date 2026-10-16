import Link from "next/link";

export const pages = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export type CurrentPage = "/" | "/work" | "/services" | "/about" | "/contact";

export function isActive(pathname: string, href: string) {
  if (href === "/work") return pathname === "/work" || pathname.startsWith("/work/");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav({
  current,
  className,
  linkClassName,
  activeClassName,
  inactiveClassName,
}: {
  current: string;
  className?: string;
  linkClassName?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}) {
  return (
    <nav className={className} aria-label="Primary">
      {pages.map(({ href, label }) => {
        const active = isActive(current, href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`${linkClassName ?? ""} ${active ? activeClassName : inactiveClassName}`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
