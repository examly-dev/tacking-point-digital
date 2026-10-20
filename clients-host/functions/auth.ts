export const CLIENT_SESSION_COOKIE = "tpd_clients";
export const CLIENT_SESSION_MESSAGE = "tpd-client-ok";

function hex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return hex(signature);
}

export function signClientSession(secret: string): Promise<string> {
  return hmacHex(secret, CLIENT_SESSION_MESSAGE);
}

export async function clientSessionMatches(
  cookieValue: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!cookieValue) return false;
  const expected = await signClientSession(secret);
  const actual = cookieValue.trim();
  if (actual.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i += 1) {
    mismatch |= expected.charCodeAt(i) ^ actual.charCodeAt(i);
  }
  return mismatch === 0;
}

export function clientPasswordsMatch(input: string, secret: string): boolean {
  const a = new TextEncoder().encode(input);
  const b = new TextEncoder().encode(secret);
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a[i] ^ b[i];
  }
  return mismatch === 0;
}

export function sessionCookie(value: string, maxAge: number): string {
  return `${CLIENT_SESSION_COOKIE}=${value}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`;
}
