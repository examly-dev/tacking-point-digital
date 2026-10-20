import { describe, expect, it } from "vitest";
import {
  clientAccessMode,
  clientPasswordsMatch,
  clientSessionMatches,
  isClientSessionValid,
  signClientSession,
} from "./auth";

describe("client portal auth", () => {
  it("is closed without a key, including in development", () => {
    expect(clientAccessMode({ NODE_ENV: "development" })).toEqual({ type: "closed" });
    expect(clientAccessMode({ NODE_ENV: "production" })).toEqual({ type: "closed" });
  });

  it("uses the key when set", () => {
    expect(clientAccessMode({ CLIENT_PORTAL_KEY: " secret " })).toEqual({
      type: "password",
      key: "secret",
    });
  });

  it("checks the password and signed cookie", () => {
    expect(clientPasswordsMatch("secret", "secret")).toBe(true);
    expect(clientPasswordsMatch("nope", "secret")).toBe(false);
    const token = signClientSession("secret");
    expect(clientSessionMatches(token, "secret")).toBe(true);
    expect(clientSessionMatches("deadbeef", "secret")).toBe(false);
    expect(isClientSessionValid(token, { CLIENT_PORTAL_KEY: "secret" })).toBe(true);
    expect(isClientSessionValid(token, {})).toBe(false);
  });
});
