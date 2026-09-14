"use client";

import { useActionState } from "react";
import { sendMessage, type ContactState } from "@/app/contact/actions";

const body = "text-[15px] tablet:text-[14px] desktop:text-[16px] leading-[1.6] desktop:leading-[1.4]";
const label = "block text-black/40";
// 16px on phones so iOS Safari does not zoom the page when a field is focused.
const input =
  "block w-full bg-transparent border-b border-black/10 py-2.5 tablet:py-2 text-[16px] tablet:text-[14px] desktop:text-[16px] outline-none placeholder:text-black/20 focus:border-black transition-colors duration-200 rounded-none";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initial);

  if (state.status === "sent") {
    return (
      <p className={`rise ${body}`} role="status">
        Thanks, that has come through. I will get back to you within a day or
        so.
      </p>
    );
  }

  const values = state.status === "error" ? state.fields : undefined;

  return (
    <form action={action} className={`${body} space-y-6`} noValidate>
      <div className="grid gap-6 tablet:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={values?.name}
            className={input}
          />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={values?.email}
            className={input}
          />
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
          defaultValue={values?.message}
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
          disabled={pending}
          className="inline-flex min-h-11 tablet:min-h-0 items-center underline decoration-black/20 underline-offset-[3px] hover:decoration-black active:decoration-black transition-colors duration-200 disabled:opacity-40 disabled:hover:decoration-black/20"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        {state.status === "error" && (
          <p className="text-black/60" role="alert">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
