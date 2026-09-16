import { site } from "@/lib/site";
import type { InvoiceBusinessProfile, InvoiceSupplier } from "./types";

/**
 * Sole trader trading as Tacking Point Digital.
 * ABR entity: FONG, ANDREW JAMES. ABN 77 124 933 069.
 * GST registration is separate from the ABN / business name — off until set.
 */
export const INVOICE_EMAIL = "andy@tackingpointdigital.com.au";

export const DEFAULT_BUSINESS: InvoiceBusinessProfile = {
  tradingName: site.name,
  legalName: "Andrew James Fong",
  abn: "77124933069",
  email: INVOICE_EMAIL,
  phone: site.phone,
  website: "",
  address: site.location,
  gstRegistered: false,
  paymentTermsDays: 14,
  bank: {
    accountName: "",
    bsb: "",
    accountNumber: "",
  },
};

export const DEFAULT_INVOICE_NOTES = "Thank you for your business.";

/** ASIC business names are not legal entities. Sole-trader invoices should say who holds the ABN. */
export function supplierIdentityLine(legalName: string, tradingName: string): string {
  const legal = legalName.trim();
  const trading = tradingName.trim();
  if (!legal) return "";
  if (!trading || legal.toLowerCase() === trading.toLowerCase()) return legal;
  return `${legal} trading as ${trading}`;
}

export function supplierFromProfile(profile: InvoiceBusinessProfile): InvoiceSupplier {
  return {
    tradingName: profile.tradingName,
    legalName: profile.legalName,
    abn: profile.abn,
    email: profile.email,
    phone: profile.phone,
    website: profile.website,
    address: profile.address,
    gstRegistered: profile.gstRegistered,
    bank: { ...profile.bank },
  };
}
