import { createHmac, timingSafeEqual } from "node:crypto";

export const CLIENT_SESSION_COOKIE = "tpd_clients";
export const CLIENT_SESSION_MESSAGE = "tpd-client-ok";

export type ClientAccessMode = { type: "password"; key: string } | { type: "closed" };

export function clientAccessMode(
  env: NodeJS.Dict<string | undefined> = process.env,
): ClientAccessMode {
  const key = env.CLIENT_PORTAL_KEY?.trim() ?? "";
  if (key) return { type: "password", key };
  return { type: "closed" };
}

export function signClientSession(secret: string): string {
  return createHmac("sha256", secret).update(CLIENT_SESSION_MESSAGE).digest("hex");
}

export function clientSessionMatches(cookieValue: string | undefined, secret: string): boolean {
  if (!cookieValue) return false;
  const expected = signClientSession(secret);
  const actual = cookieValue.trim();
  if (actual.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function isClientSessionValid(
  cookieValue: string | undefined,
  env: NodeJS.Dict<string | undefined> = process.env,
): boolean {
  const mode = clientAccessMode(env);
  if (mode.type === "closed") return false;
  return clientSessionMatches(cookieValue, mode.key);
}

export function clientPasswordsMatch(input: string, secret: string): boolean {
  const a = Buffer.from(input);
  const b = Buffer.from(secret);
  if (a.length !== b.length) {
    timingSafeEqual(a, a);
    return false;
  }
  return timingSafeEqual(a, b);
}
