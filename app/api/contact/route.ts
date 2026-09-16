import { NextResponse } from "next/server";
import { enquiryHtml, enquirySubject, enquiryText, type Enquiry } from "@/lib/enquiry-email";
import { site } from "@/lib/site";

export const runtime = "nodejs";

function readEnquiry(body: unknown): Enquiry | null {
  if (!body || typeof body !== "object") return null;
  const { name, email, phone, message } = body as Record<string, unknown>;
  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return null;
  }
  const enquiry: Enquiry = { name: name.trim(), email: email.trim(), message: message.trim() };
  if (typeof phone === "string" && phone.trim()) enquiry.phone = phone.trim().slice(0, 40);
  if (!enquiry.name || !enquiry.email || !enquiry.message) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) return null;
  if (enquiry.message.length > 5000) return null;
  return enquiry;
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const honey = json && typeof json === "object" ? (json as { company?: unknown }).company : "";
  if (typeof honey === "string" && honey.trim()) {
    return NextResponse.json({ ok: true });
  }

  const enquiry = readEnquiry(json);
  if (!enquiry) return NextResponse.json({ ok: false }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, reason: "unconfigured" }, { status: 501 });
  }

  const from = process.env.CONTACT_FROM ?? `${site.name} <${site.email}>`;
  const to = process.env.CONTACT_TO ?? site.email;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: enquiry.email,
      subject: enquirySubject(enquiry),
      text: enquiryText(enquiry),
      html: enquiryHtml(enquiry),
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend responded", res.status, await res.text());
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
