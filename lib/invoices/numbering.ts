const NUMBER_PATTERN = /^INV-(\d{4})-(\d+)$/;

export function parseInvoiceNumber(
  invoiceNumber: string,
): { year: number; sequence: number } | null {
  const match = NUMBER_PATTERN.exec(invoiceNumber.trim());
  if (!match) return null;
  return { year: Number(match[1]), sequence: Number(match[2]) };
}

export function formatInvoiceNumber(year: number, sequence: number): string {
  if (!Number.isInteger(year) || year < 1000 || year > 9999) {
    throw new RangeError("year must be a 4-digit calendar year");
  }
  if (!Number.isInteger(sequence) || sequence < 1) {
    throw new RangeError("sequence must be a positive integer");
  }
  return `INV-${year}-${String(sequence).padStart(3, "0")}`;
}

export function nextInvoiceNumber(existingNumbers: readonly string[], year: number): string {
  let max = 0;
  for (const number of existingNumbers) {
    const parsed = parseInvoiceNumber(number);
    if (!parsed || parsed.year !== year) continue;
    if (parsed.sequence > max) max = parsed.sequence;
  }
  return formatInvoiceNumber(year, max + 1);
}

export function isValidInvoiceNumber(value: string): boolean {
  return parseInvoiceNumber(value) !== null;
}
