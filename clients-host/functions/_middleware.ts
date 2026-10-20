import {
  CLIENT_SESSION_COOKIE,
  clientPasswordsMatch,
  clientSessionMatches,
  sessionCookie,
  signClientSession,
} from "./auth";
import { loginPage } from "./login-page";

interface Env {
  CLIENT_PORTAL_KEY?: string;
}

function cookieValue(header: string | null): string | undefined {
  if (!header) return undefined;
  const match = header.match(new RegExp(`(?:^|; )${CLIENT_SESSION_COOKIE}=([^;]*)`));
  return match?.[1];
}

export const onRequest: PagesFunction<Env> = async ({ request, env, next }) => {
  const url = new URL(request.url);
  const key = env.CLIENT_PORTAL_KEY?.trim() ?? "";

  if (url.pathname === "/api/clients/session" && request.method === "POST") {
    if (!key) {
      return Response.json(
        { error: "Set CLIENT_PORTAL_KEY to unlock the client portal." },
        { status: 403 },
      );
    }
    const body = (await request.json().catch(() => ({}))) as { password?: string };
    const password = typeof body.password === "string" ? body.password : "";
    if (!clientPasswordsMatch(password, key)) {
      return Response.json({ error: "That password is not right." }, { status: 401 });
    }
    const headers = new Headers({ "content-type": "application/json" });
    headers.append("Set-Cookie", sessionCookie(await signClientSession(key), 60 * 60 * 24 * 30));
    return new Response(JSON.stringify({ ok: true }), { headers });
  }

  if (url.pathname === "/api/clients/session" && request.method === "DELETE") {
    const headers = new Headers({ "content-type": "application/json" });
    headers.append("Set-Cookie", sessionCookie("", 0));
    return new Response(JSON.stringify({ ok: true }), { headers });
  }

  // Satoshi + portal chrome CSS must load on the login page before a cookie
  // exists, or the type falls back to system UI.
  if (
    url.pathname.startsWith("/fonts/") ||
    url.pathname === "/portal.css" ||
    url.pathname.startsWith("/.well-known/")
  ) {
    return next();
  }

  if (!key) {
    return new Response(
      loginPage({
        locked: true,
        error: "Set CLIENT_PORTAL_KEY to unlock the client portal.",
      }),
      {
        status: 403,
        headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
      },
    );
  }

  if (await clientSessionMatches(cookieValue(request.headers.get("Cookie")), key)) {
    return next();
  }

  return new Response(loginPage({ locked: false, error: "" }), {
    status: 401,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
  });
};
