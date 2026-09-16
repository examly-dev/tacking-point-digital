import { InvoiceListClient } from "@/components/invoices/InvoiceListClient";
import { listInvoices } from "@/lib/invoices/store";

export default async function InvoicesPage() {
  const invoices = await listInvoices();
  return <InvoiceListClient invoices={invoices} />;
}
