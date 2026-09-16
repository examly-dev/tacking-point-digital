import { notFound } from "next/navigation";
import { InvoiceEditorClient } from "@/components/invoices/InvoiceEditorClient";
import { getInvoice, listClients } from "@/lib/invoices/store";

export default async function InvoiceEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [invoice, clients] = await Promise.all([getInvoice(id), listClients()]);
  if (!invoice) notFound();
  return <InvoiceEditorClient invoice={invoice} clients={clients} />;
}
