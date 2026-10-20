"use client";

import { useId, useState, type ReactNode } from "react";

export type Service = {
  id: string;
  title: string;
  /** One line under the title, always visible. */
  summary: string;
  /** Two or three plain sentences, shown when the row is open. */
  body: string[];
  /** A rendered icon from ServiceIcons (server pages cannot pass components). */
  icon: ReactNode;
};

const text = "text-[15px] tablet:text-[14px] desktop:text-[16px] leading-[1.6] desktop:leading-[1.4]";
const ease = "ease-[cubic-bezier(0.2,0.8,0.2,1)]";

/**
 * One row open at a time. The panel animates its height with the
 * grid-template-rows 0fr → 1fr trick and fades its text up; closed panels are
 * `inert`, so they are skipped by Tab and screen readers. Reduced motion
 * turns the transitions off (see `motion-safe:` below).
 */
export function ServiceAccordion({ services }: { services: Service[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const base = useId();

  return (
    <ul>
      {services.map(({ id, title, summary, body, icon }, i) => {
        const open = openId === id;
        const buttonId = `${base}-${id}-button`;
        const panelId = `${base}-${id}-panel`;

        return (
          <li
            key={id}
            className="rise border-t border-black/10"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <h2>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : id)}
                className="group flex w-full items-center gap-4 py-5 text-left tablet:gap-5"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full motion-safe:transition-colors motion-safe:duration-300 ${
                    open ? "bg-black text-white" : "bg-black/[0.05] text-black/70 group-hover:bg-black/[0.08] group-hover:text-black"
                  }`}
                >
                  {icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`${text} block font-medium text-black`}>{title}</span>
                  <span className={`${text} block text-black/40`}>{summary}</span>
                </span>
                <Toggle open={open} />
              </button>
            </h2>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!open}
              className={`grid motion-safe:transition-[grid-template-rows] motion-safe:duration-500 ${ease} ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  className={`${text} max-w-[34rem] space-y-4 pb-6 pl-14 tablet:pl-[3.75rem] motion-safe:transition-[opacity,transform] motion-safe:duration-500 ${ease} ${
                    open ? "translate-y-0 opacity-100 motion-safe:delay-75" : "-translate-y-1 opacity-0"
                  }`}
                >
                  {body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** A plus whose upright stroke turns flat to make a minus. */
function Toggle({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      className={`shrink-0 motion-safe:transition-colors motion-safe:duration-300 ${
        open ? "text-black" : "text-black/40 group-hover:text-black"
      }`}
    >
      <path d="M2.5 8h11" />
      <path
        d="M8 2.5v11"
        className={`origin-center motion-safe:transition-transform motion-safe:duration-500 ${ease} ${
          open ? "rotate-90" : "rotate-0"
        }`}
        style={{ transformBox: "fill-box" }}
      />
    </svg>
  );
}
