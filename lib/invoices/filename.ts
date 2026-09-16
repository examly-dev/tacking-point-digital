function slugPart(value: string, max = 80): string {
  const slug = value
    .normalize("NFKD")
    .replace(/[^\w]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, max);
  return slug || "invoice";
}

export function invoicePdfFilename(
  invoiceNumber: string,
  clientName: string,
  tradingName = "Tacking Point Digital",
): string {
  const parts = [slugPart(tradingName), slugPart(invoiceNumber), slugPart(clientName || "Client")];
  return `${parts.join("-")}.pdf`;
}
