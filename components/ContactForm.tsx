"use client";

import { useState, type FormEvent } from "react";
import { enquirySubject, enquiryText } from "@/lib/enquiry-email";
import { site } from "@/lib/site";

const body =
  "text-[15px] tablet:text-[14px] desktop:text-[16px] leading-[1.6] desktop:leading-[1.4]";
const label = "block text-[13px] tablet:text-[12px] desktop:text-[13px] text-black/50 mb-1";
const input =
  "block w-full bg-transparent border-0 border-b border-black/15 py-2.5 tablet:py-2 text-[16px] tablet:text-[14px] desktop:text-[16px] text-black outline-none focus:border-black transition-colors duration-200 rounded-none";

type Status = "idle" | "sending" | "sent" | "error";

function inbox() {
  return process.env.NEXT_PUBLIC_CONTACT_INBOX || site.email;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company") ?? "").trim()) {
      setStatus("sent");
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim().slice(0, 40);
    const message = String(data.get("message") ?? "").trim();
    const enquiry = { name, email, ...(phone ? { phone } : {}), message };

    if (!name || !email || !message) {
      setError("Please fill in your name, email and a message.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("That email address does not look right.");
      setStatus("error");
      return;
    }
    if (message.length > 5000) {
      setError("That message is a bit long. Could you trim it to a few paragraphs?");
      setStatus("error");
      return;
    }

    setError(null);
    setStatus("sending");

    try {
      const hosted = process.env.NEXT_PUBLIC_STATIC !== "true";
      if (hosted) {
        const local = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...enquiry, company: data.get("company") }),
        });
        if (local.ok) {
          setStatus("sent");
          form.reset();
          return;
        }
      }

      const res = await fetch(`https://formsubmit.co/ajax/${inbox()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: enquirySubject(enquiry),
          _template: "box",
          _captcha: "false",
          _replyto: email,
          Message: enquiryText(enquiry),
        }),
      });
      const payload = (await res.json().catch(() => null)) as
        | { success?: boolean | string; message?: string }
        | null;
      const ok =
        res.ok &&
        (payload?.success === true || payload?.success === "true");
      if (!ok) throw new Error(payload?.message ?? "send failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError(`Something went wrong sending that. Email ${site.email} or call ${site.phone} instead.`);
    }
  }

  if (status === "sent") {
    return (
        <p className={body} role="status">
          Thanks for getting in touch. I&apos;ll get back to you ASAP.
        </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`${body} space-y-7`} noValidate>
      <div className="grid gap-7 tablet:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={input}
          />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Your email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            className={input}
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className={label}>
          Your number, if you&apos;d like
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          maxLength={40}
          className={input}
        />
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`${input} resize-y min-h-[8rem]`}
        />
      </div>

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-11 tablet:min-h-0 items-center underline decoration-black/20 underline-offset-[3px] hover:decoration-black active:decoration-black transition-colors duration-200 disabled:opacity-40 disabled:hover:decoration-black/20"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "error" && error ? (
          <p className="text-black/60" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
}
