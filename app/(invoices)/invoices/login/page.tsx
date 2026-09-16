import { InvoiceLoginForm } from "@/components/invoices/InvoiceLoginForm";
import { invoiceAccessMode } from "@/lib/invoices/auth";

export default async function InvoiceLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const mode = invoiceAccessMode();
  return (
    <InvoiceLoginForm
      nextPath={next && next.startsWith("/invoices") ? next : "/invoices"}
      locked={mode.type === "closed"}
    />
  );
}
