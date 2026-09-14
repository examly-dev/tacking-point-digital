"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const body = "text-[15px] tablet:text-[14px] desktop:text-[16px] leading-[1.6] desktop:leading-[1.4]";
const label = "block text-black/40";
const input =
  "block w-full bg-transparent border-b border-black/10 py-2.5 tablet:py-2 text-[16px] tablet:text-[14px] desktop:text-[16px] outline-none placeholder:text-black/20 focus:border-black transition-colors duration-200 rounded-none";

/**
 * Static-export stand-in for the Resend form. Opens the visitor's mail app
 * with the message filled in. Used on GitHub Pages, where Server Actions
 * cannot run.
 */
export function ContactForm() {
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (String(data.get("website") ?? "").trim()) return;

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setError("Please fill in your name, email and a message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("That email address does not look right.");
      return;
    }

    const subject = `Website enquiry from ${name}`;
    const bodyText = `From: ${name} <${email}>\n\n${message}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
  }

  return (
    <form onSubmit={onSubmit} className={`${body} space-y-6`} noValidate>
      <div className="grid gap-6 tablet:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name
          </label>
          <input id="name" name="name" type="text" autoComplete="name" required className={input} />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required className={input} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="A line or two on what you have in mind is plenty."
          className={`${input} resize-y`}
        />
      </div>

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <button
          type="submit"
          className="inline-flex min-h-11 tablet:min-h-0 items-center underline decoration-black/20 underline-offset-[3px] hover:decoration-black active:decoration-black transition-colors duration-200"
        >
          Send message
        </button>
        {error ? (
          <p className="text-black/60" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
}
