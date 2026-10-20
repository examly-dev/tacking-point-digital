import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  CLIENT_SESSION_COOKIE,
  clientAccessMode,
  clientPasswordsMatch,
  signClientSession,
} from "@/lib/clients/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const mode = clientAccessMode();
  if (mode.type === "closed") {
    return NextResponse.json(
      { error: "Set CLIENT_PORTAL_KEY in .env to unlock the client portal." },
      { status: 403 },
    );
  }
  const body = (await request.json().catch(() => ({}))) as { password?: string };
  const password = typeof body.password === "string" ? body.password : "";
  if (!clientPasswordsMatch(password, mode.key)) {
    return NextResponse.json({ error: "That password is not right." }, { status: 401 });
  }
  const store = await cookies();
  store.set(CLIENT_SESSION_COOKIE, signClientSession(mode.key), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const store = await cookies();
  store.delete(CLIENT_SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
