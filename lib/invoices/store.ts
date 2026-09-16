import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { normalizeOptionalAbn } from "./abn";
import { DEFAULT_BUSINESS, DEFAULT_INVOICE_NOTES, supplierFromProfile } from "./business";
import { dueDateFromTerms, paymentTermIdFromDays, todayIsoInSydney } from "./dates";
import { duplicateInvoiceDraft } from "./duplicate";
import { effectiveStatus, newInvoiceItem } from "./items";
import { isValidInvoiceNumber, nextInvoiceNumber } from "./numbering";
import type {
  Invoice,
  InvoiceBusinessProfile,
  InvoiceClient,
  InvoiceClientRecord,
  InvoiceItem,
  InvoiceStatus,
  InvoiceUnit,
  PaymentTermId,
} from "./types";
import { isInvoiceStatus, isInvoiceUnit, isPaymentTermId } from "./types";

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "invoices.json");

type StoreFile = {
  version: 1;
  business: InvoiceBusinessProfile;
  clients: InvoiceClientRecord[];
  invoices: Invoice[];
};

let queue: Promise<unknown> = Promise.resolve();

function enqueue<T>(work: () => Promise<T>): Promise<T> {
  const run = queue.then(work, work);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function emptyStore(): StoreFile {
  return { version: 1, business: { ...DEFAULT_BUSINESS, bank: { ...DEFAULT_BUSINESS.bank } }, clients: [], invoices: [] };
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asOptionalString(value: unknown): string | undefined {
  const text = typeof value === "string" ? value.trim() : "";
  return text || undefined;
}

function asBoolean(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function asNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function parseBank(raw: unknown): InvoiceBusinessProfile["bank"] {
  const bank = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  return {
    accountName: asString(bank.accountName),
    bsb: asString(bank.bsb),
    accountNumber: asString(bank.accountNumber),
  };
}

function parseBusiness(raw: unknown): InvoiceBusinessProfile {
  const row = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const merged: InvoiceBusinessProfile = {
    ...DEFAULT_BUSINESS,
    tradingName: asString(row.tradingName, DEFAULT_BUSINESS.tradingName),
    legalName: asString(row.legalName, DEFAULT_BUSINESS.legalName),
    abn: asString(row.abn, DEFAULT_BUSINESS.abn),
    email: asString(row.email, DEFAULT_BUSINESS.email),
    phone: asString(row.phone, DEFAULT_BUSINESS.phone),
    website: asString(row.website, DEFAULT_BUSINESS.website),
    address: asString(row.address, DEFAULT_BUSINESS.address),
    gstRegistered: asBoolean(row.gstRegistered, DEFAULT_BUSINESS.gstRegistered),
    paymentTermsDays: asNumber(row.paymentTermsDays, DEFAULT_BUSINESS.paymentTermsDays),
    bank: parseBank(row.bank),
  };
  if (!Number.isInteger(merged.paymentTermsDays) || merged.paymentTermsDays < 0) {
    merged.paymentTermsDays = DEFAULT_BUSINESS.paymentTermsDays;
  }
  return merged;
}

function parseClient(raw: unknown): InvoiceClient {
  const row = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  return {
    name: asString(row.name),
    contactName: asOptionalString(row.contactName),
    email: asOptionalString(row.email),
    abn: asOptionalString(row.abn),
    address: asOptionalString(row.address),
  };
}

function parseItem(raw: unknown): InvoiceItem | null {
  const row = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const unit = asString(row.unit, "hours");
  if (!isInvoiceUnit(unit)) return null;
  const quantity = asNumber(row.quantity, 1);
  const unitPriceCents = asNumber(row.unitPriceCents, 0);
  if (quantity < 0 || !Number.isInteger(unitPriceCents) || unitPriceCents < 0) return null;
  return {
    id: asString(row.id, crypto.randomUUID()),
    description: asString(row.description),
    quantity,
    unit: unit as InvoiceUnit,
    unitPriceCents,
  };
}

function parseInvoice(raw: unknown): Invoice | null {
  const row = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const status = asString(row.status, "draft");
  if (!isInvoiceStatus(status)) return null;
  const paymentTermId = asString(row.paymentTermId, "14");
  if (!isPaymentTermId(paymentTermId)) return null;
  const items = Array.isArray(row.items)
    ? row.items.map(parseItem).filter((item): item is InvoiceItem => item !== null)
    : [];
  const supplierRaw = row.supplier && typeof row.supplier === "object" ? (row.supplier as Record<string, unknown>) : {};
  return {
    id: asString(row.id, crypto.randomUUID()),
    invoiceNumber: asString(row.invoiceNumber),
    client: parseClient(row.client),
    clientId: typeof row.clientId === "string" ? row.clientId : null,
    issueDate: asString(row.issueDate),
    dueDate: asString(row.dueDate),
    dueDateManual: asBoolean(row.dueDateManual),
    paymentTermsDays: asNumber(row.paymentTermsDays, 14),
    paymentTermId: paymentTermId as PaymentTermId,
    reference: asOptionalString(row.reference),
    items: items.length ? items : [newInvoiceItem()],
    status: status as InvoiceStatus,
    notes: asOptionalString(row.notes) ?? DEFAULT_INVOICE_NOTES,
    currency: "AUD",
    supplier: {
      tradingName: asString(supplierRaw.tradingName, DEFAULT_BUSINESS.tradingName),
      legalName: asString(supplierRaw.legalName, DEFAULT_BUSINESS.legalName),
      abn: asString(supplierRaw.abn, DEFAULT_BUSINESS.abn),
      email: asString(supplierRaw.email, DEFAULT_BUSINESS.email),
      phone: asString(supplierRaw.phone, DEFAULT_BUSINESS.phone),
      website: asString(supplierRaw.website),
      address: asString(supplierRaw.address, DEFAULT_BUSINESS.address),
      gstRegistered: asBoolean(supplierRaw.gstRegistered, DEFAULT_BUSINESS.gstRegistered),
      bank: parseBank(supplierRaw.bank),
    },
    createdAt: asString(row.createdAt, new Date().toISOString()),
    updatedAt: asString(row.updatedAt, new Date().toISOString()),
  };
}

function parseClientRecord(raw: unknown): InvoiceClientRecord | null {
  const row = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const client = parseClient(row);
  if (!client.name.trim()) return null;
  return {
    ...client,
    id: asString(row.id, crypto.randomUUID()),
    createdAt: asString(row.createdAt, new Date().toISOString()),
    updatedAt: asString(row.updatedAt, new Date().toISOString()),
  };
}

async function readStore(): Promise<StoreFile> {
  try {
    const text = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(text) as unknown;
    const row = parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
    return {
      version: 1,
      business: parseBusiness(row.business),
      clients: Array.isArray(row.clients)
        ? row.clients.map(parseClientRecord).filter((c): c is InvoiceClientRecord => c !== null)
        : [],
      invoices: Array.isArray(row.invoices)
        ? row.invoices.map(parseInvoice).filter((invoice): invoice is Invoice => invoice !== null)
        : [],
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return emptyStore();
    throw error;
  }
}

async function writeStore(store: StoreFile): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const tmp = `${DATA_FILE}.${process.pid}.tmp`;
  await writeFile(tmp, `${JSON.stringify(store, null, 2)}\n`, "utf8");
  await rename(tmp, DATA_FILE);
}

function withEffectiveStatus(invoice: Invoice): Invoice {
  return { ...invoice, status: effectiveStatus(invoice) };
}

export type InvoiceListRow = Invoice & { totalCents: number };

export async function listInvoices(): Promise<Invoice[]> {
  return enqueue(async () => {
    const store = await readStore();
    return store.invoices
      .map(withEffectiveStatus)
      .sort((a, b) => b.invoiceNumber.localeCompare(a.invoiceNumber));
  });
}

export async function getInvoice(id: string): Promise<Invoice | null> {
  return enqueue(async () => {
    const store = await readStore();
    const invoice = store.invoices.find((row) => row.id === id);
    return invoice ? withEffectiveStatus(invoice) : null;
  });
}

export async function getBusiness(): Promise<InvoiceBusinessProfile> {
  return enqueue(async () => (await readStore()).business);
}

export async function saveBusiness(patch: Partial<InvoiceBusinessProfile>): Promise<InvoiceBusinessProfile> {
  return enqueue(async () => {
    const store = await readStore();
    const next: InvoiceBusinessProfile = {
      ...store.business,
      ...patch,
      bank: { ...store.business.bank, ...(patch.bank ?? {}) },
    };
    if (next.abn.trim()) {
      next.abn = normalizeOptionalAbn(next.abn);
    }
    store.business = next;
    await writeStore(store);
    return next;
  });
}

export async function listClients(): Promise<InvoiceClientRecord[]> {
  return enqueue(async () => {
    const store = await readStore();
    return [...store.clients].sort((a, b) => a.name.localeCompare(b.name));
  });
}

function upsertClient(store: StoreFile, client: InvoiceClient, existingId?: string | null): string {
  const name = client.name.trim();
  if (!name) return existingId ?? "";
  const now = new Date().toISOString();
  const match =
    (existingId && store.clients.find((row) => row.id === existingId)) ||
    store.clients.find((row) => row.name.toLowerCase() === name.toLowerCase());
  const record: InvoiceClientRecord = {
    id: match?.id ?? crypto.randomUUID(),
    name,
    contactName: client.contactName?.trim() || undefined,
    email: client.email?.trim() || undefined,
    abn: client.abn?.trim() || undefined,
    address: client.address?.trim() || undefined,
    createdAt: match?.createdAt ?? now,
    updatedAt: now,
  };
  if (record.abn) record.abn = normalizeOptionalAbn(record.abn);
  store.clients = [...store.clients.filter((row) => row.id !== record.id), record];
  return record.id;
}

export async function createInvoice(): Promise<Invoice> {
  return enqueue(async () => {
    const store = await readStore();
    const today = todayIsoInSydney();
    const year = Number(today.slice(0, 4));
    const invoiceNumber = nextInvoiceNumber(
      store.invoices.map((row) => row.invoiceNumber),
      year,
    );
    const now = new Date().toISOString();
    const invoice: Invoice = {
      id: crypto.randomUUID(),
      invoiceNumber,
      client: { name: "" },
      clientId: null,
      issueDate: today,
      dueDate: dueDateFromTerms(today, store.business.paymentTermsDays),
      dueDateManual: false,
      paymentTermsDays: store.business.paymentTermsDays,
      paymentTermId: paymentTermIdFromDays(store.business.paymentTermsDays, false),
      items: [newInvoiceItem()],
      status: "draft",
      notes: DEFAULT_INVOICE_NOTES,
      currency: "AUD",
      supplier: supplierFromProfile(store.business),
      createdAt: now,
      updatedAt: now,
    };
    store.invoices.push(invoice);
    await writeStore(store);
    return invoice;
  });
}

export type InvoicePatch = {
  invoiceNumber?: string;
  client?: InvoiceClient;
  clientId?: string | null;
  issueDate?: string;
  dueDate?: string;
  dueDateManual?: boolean;
  paymentTermId?: PaymentTermId;
  paymentTermsDays?: number;
  reference?: string;
  items?: InvoiceItem[];
  notes?: string;
  status?: InvoiceStatus;
  saveClient?: boolean;
};

export async function updateInvoice(id: string, patch: InvoicePatch): Promise<Invoice> {
  return enqueue(async () => {
    const store = await readStore();
    const index = store.invoices.findIndex((row) => row.id === id);
    if (index < 0) throw Object.assign(new Error("Invoice not found"), { status: 404 });
    const current = store.invoices[index];
    if (patch.invoiceNumber && !isValidInvoiceNumber(patch.invoiceNumber)) {
      throw Object.assign(new Error("Invoice number must look like INV-2026-001"), { status: 400 });
    }
    if (
      patch.invoiceNumber &&
      store.invoices.some((row) => row.id !== id && row.invoiceNumber === patch.invoiceNumber)
    ) {
      throw Object.assign(new Error("That invoice number is already in use"), { status: 400 });
    }
    if (patch.client?.abn?.trim()) {
      patch.client = { ...patch.client, abn: normalizeOptionalAbn(patch.client.abn) };
    }
    let clientId = patch.clientId !== undefined ? patch.clientId : current.clientId;
    const client = patch.client ?? current.client;
    if (patch.saveClient && client.name.trim()) {
      clientId = upsertClient(store, client, clientId);
    }
    const issued = (patch.status ?? current.status) !== "draft";
    const supplier = issued ? current.supplier : supplierFromProfile(store.business);
    const next: Invoice = {
      ...current,
      ...patch,
      client,
      clientId,
      items: patch.items?.length ? patch.items : current.items,
      supplier,
      currency: "AUD",
      updatedAt: new Date().toISOString(),
    };
    store.invoices[index] = next;
    await writeStore(store);
    return withEffectiveStatus(next);
  });
}

export async function duplicateInvoice(id: string): Promise<Invoice> {
  return enqueue(async () => {
    const store = await readStore();
    const source = store.invoices.find((row) => row.id === id);
    if (!source) throw Object.assign(new Error("Invoice not found"), { status: 404 });
    const today = todayIsoInSydney();
    const year = Number(today.slice(0, 4));
    const invoiceNumber = nextInvoiceNumber(
      store.invoices.map((row) => row.invoiceNumber),
      year,
    );
    const now = new Date().toISOString();
    const invoice: Invoice = {
      id: crypto.randomUUID(),
      ...duplicateInvoiceDraft(source, invoiceNumber, today),
      supplier: supplierFromProfile(store.business),
      createdAt: now,
      updatedAt: now,
    };
    store.invoices.push(invoice);
    await writeStore(store);
    return invoice;
  });
}

export async function deleteInvoice(id: string): Promise<void> {
  return enqueue(async () => {
    const store = await readStore();
    const next = store.invoices.filter((row) => row.id !== id);
    if (next.length === store.invoices.length) {
      throw Object.assign(new Error("Invoice not found"), { status: 404 });
    }
    store.invoices = next;
    await writeStore(store);
  });
}

export async function deleteClient(id: string): Promise<void> {
  return enqueue(async () => {
    const store = await readStore();
    store.clients = store.clients.filter((row) => row.id !== id);
    await writeStore(store);
  });
}
