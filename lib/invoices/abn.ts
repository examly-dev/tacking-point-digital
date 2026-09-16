const ABN_WEIGHTS = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19] as const;

export function stripAbn(value: string): string {
  return value.replace(/\s+/g, "");
}

export function isAbnChecksumValid(digits: string): boolean {
  if (!/^\d{11}$/.test(digits)) return false;
  const first = Number(digits[0]) - 1;
  let sum = first * ABN_WEIGHTS[0];
  for (let i = 1; i < 11; i += 1) {
    sum += Number(digits[i]) * ABN_WEIGHTS[i];
  }
  return sum % 89 === 0;
}

export function validateAbn(
  value: string,
): { ok: true; digits: string } | { ok: false; reason: string } {
  const digits = stripAbn(value);
  if (!digits) return { ok: false, reason: "ABN is empty" };
  if (!/^\d+$/.test(digits)) return { ok: false, reason: "ABN must contain only digits" };
  if (digits.length !== 11) return { ok: false, reason: "ABN must be 11 digits" };
  if (!isAbnChecksumValid(digits)) return { ok: false, reason: "ABN checksum is invalid" };
  return { ok: true, digits };
}

/** Display as `12 345 678 901`. */
export function formatAbn(value: string): string {
  const digits = stripAbn(value);
  if (digits.length !== 11) return value.trim();
  return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 11)}`;
}

export function normalizeOptionalAbn(value: string | undefined | null): string {
  const trimmed = (value ?? "").trim();
  if (!trimmed) return "";
  const result = validateAbn(trimmed);
  if (!result.ok) {
    throw new Error(result.reason);
  }
  return result.digits;
}
