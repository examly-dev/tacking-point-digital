"use client";

import { useId, useState } from "react";
import { ContactForm } from "@/components/ContactForm";
import { mailto, site, tel } from "@/lib/site";

const link =
  "underline decoration-black/20 underline-offset-[3px] hover:decoration-black transition-colors duration-200";

/**
 * Closing line: email, call, or reveal the contact form underneath.
 * The form stays in the page (not a modal) and slides/fades in quietly.
 */
export function TalkThrough() {
  const [open, setOpen] = useState(false);
  const formId = useId();

  return (
    <div>
      <p>
        Or, if you&apos;d rather talk something through,{" "}
        <a href={mailto} className={link}>
          email me
        </a>{" "}
        or call{" "}
        <a href={tel} className="hover:opacity-50 transition-opacity duration-200">
          {site.phone}
        </a>
        . Or{" "}
        <button
          type="button"
          aria-expanded={open}
          aria-controls={formId}
          onClick={() => setOpen((v) => !v)}
          className={`${link} bg-transparent p-0 font-medium`}
        >
          use my contact form
        </button>
        .
      </p>
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          open ? "mt-6 grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            id={formId}
            inert={!open}
            aria-hidden={!open}
            className={`border-t border-black/10 pt-8 transition-opacity duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
