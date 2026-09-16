import { NextResponse } from "next/server";

export function jsonError(error: unknown, fallback = 500) {
  const status =
    typeof error === "object" && error && "status" in error
      ? Number((error as { status: unknown }).status)
      : fallback;
  const message = error instanceof Error ? error.message : "Unexpected error";
  return NextResponse.json(
    { error: message },
    { status: Number.isInteger(status) && status >= 400 && status < 600 ? status : fallback },
  );
}
