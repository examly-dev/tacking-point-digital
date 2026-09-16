import { InvoiceSettingsClient } from "@/components/invoices/InvoiceSettingsClient";
import { getBusiness } from "@/lib/invoices/store";

export const metadata = { title: "Business details" };

export default async function InvoiceSettingsPage() {
  const business = await getBusiness();
  return <InvoiceSettingsClient business={business} />;
}
