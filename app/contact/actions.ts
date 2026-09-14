"use server";

import { site } from "@/lib/site";

export type ContactState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "error"; message: string; fields?: Record<string, string> };

const fallback = `Something went wrong sending that. Please email ${site.email} or call ${site.phone} instead.`;

function field(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Bots fill in the hidden field; people never see it.
  if (field(formData, "website")) return { status: "sent" };

  const name = field(formData, "name");
  const email = field(formData, "email");
  const message = field(formData, "message");
  const fields = { name, email, message };

  if (!name || !email || !message) {
    return {
      status: "error",
      message: "Please fill in your name, email and a message.",
      fields,
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      status: "error",
      message: "That email address does not look right.",
      fields,
    };
  }
  if (message.length > 5000) {
    return {
      status: "error",
      message: "That message is a bit long. Could you trim it to a few paragraphs?",
      fields,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] RESEND_API_KEY not set; message was:", fields);
      return { status: "sent" };
    }
    console.error("[contact] RESEND_API_KEY is not set");
    return { status: "error", message: fallback, fields };
  }

  const from =
    process.env.CONTACT_FROM ?? `${site.name} <${site.email}>`;
  const to = process.env.CONTACT_TO ?? site.email;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Website enquiry from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
        html: `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p><p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
      }),
    });

    if (!res.ok) {
      console.error("[contact] Resend responded", res.status, await res.text());
      return { status: "error", message: fallback, fields };
    }
  } catch (err) {
    console.error("[contact] Failed to send", err);
    return { status: "error", message: fallback, fields };
  }

  return { status: "sent" };
}
