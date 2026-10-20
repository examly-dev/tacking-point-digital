"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lighthouse } from "@/components/Lighthouse";
import { site } from "@/lib/site";

const pages = [
  { href: "/invoices", label: "Invoices" },
  { href: "/invoices/settings", label: "Business" },
] as const;

export function InvoiceShell({
  children,
  title,
  actions,
}: {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-full bg-white text-black font-sans font-medium">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 px-5 py-4 tablet:px-8 desktop:px-10">
        <div className="flex items-center gap-8">
          <Link href="/invoices" className="lighthouse-logo flex items-center gap-2 text-[14px] desktop:text-[16px]">
            <Lighthouse />
            {site.name}
          </Link>
          <nav className="flex gap-4 text-[14px]">
            {pages.map(({ href, label }) => {
              const active =
                href === "/invoices"
                  ? pathname === "/invoices" ||
                    (pathname.startsWith("/invoices/") &&
                      !pathname.startsWith("/invoices/settings") &&
                      pathname !== "/invoices/login")
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={active ? "text-black" : "text-black/30 hover:text-black transition-colors duration-200"}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {title ? <p className="text-[14px] text-black/40">{title}</p> : null}
          {actions}
        </div>
      </header>
      {children}
    </div>
  );
}
