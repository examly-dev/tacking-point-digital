import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { InvoiceViewModel } from "../view-model";

const COLOR = {
  text: "#000000",
  secondary: "#444444",
  muted: "#888888",
  border: "#e6e6e6",
};

export const invoicePdfStyles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 48,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: COLOR.text,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
  },
  wordmark: {
    fontSize: 13,
    fontFamily: "Helvetica",
    letterSpacing: -0.2,
    marginBottom: 10,
  },
  supplierBlock: {
    maxWidth: 260,
  },
  supplierLine: {
    fontSize: 9,
    color: COLOR.secondary,
    lineHeight: 1.45,
  },
  heading: {
    fontSize: 11,
    fontFamily: "Helvetica",
    letterSpacing: 1.4,
    textAlign: "right",
    marginBottom: 10,
  },
  meta: {
    alignItems: "flex-end",
  },
  metaLine: {
    fontSize: 9,
    color: COLOR.secondary,
    textAlign: "right",
    lineHeight: 1.45,
  },
  metaStrong: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: COLOR.text,
    textAlign: "right",
    marginBottom: 2,
  },
  sectionLabel: {
    fontSize: 8,
    letterSpacing: 1.2,
    color: COLOR.muted,
    marginBottom: 6,
  },
  clientName: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  clientLine: {
    fontSize: 9,
    color: COLOR.secondary,
    lineHeight: 1.45,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLOR.border,
    paddingBottom: 6,
    marginTop: 22,
    marginBottom: 6,
  },
  th: {
    fontSize: 8,
    letterSpacing: 0.8,
    color: COLOR.muted,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.border,
    alignItems: "flex-start",
  },
  desc: { width: "48%", fontSize: 9, lineHeight: 1.4, paddingRight: 8 },
  qty: { width: "14%", fontSize: 9, textAlign: "right" },
  rate: { width: "19%", fontSize: 9, textAlign: "right" },
  amount: { width: "19%", fontSize: 9, textAlign: "right" },
  totals: {
    marginTop: 18,
    alignSelf: "flex-end",
    width: 220,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  totalLabel: {
    fontSize: 9,
    color: COLOR.secondary,
  },
  totalValue: {
    fontSize: 9,
    textAlign: "right",
  },
  grandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: COLOR.text,
    marginTop: 6,
    paddingTop: 8,
  },
  grandLabel: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.4,
  },
  grandValue: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
  },
  gstNote: {
    fontSize: 8,
    color: COLOR.muted,
    textAlign: "right",
    marginTop: 4,
  },
  footer: {
    marginTop: 36,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: COLOR.border,
  },
  paymentRow: {
    flexDirection: "row",
    gap: 28,
  },
  paymentCol: {
    minWidth: 120,
  },
  paymentValue: {
    fontSize: 9,
    marginBottom: 2,
  },
  notes: {
    marginTop: 18,
    fontSize: 9,
    color: COLOR.secondary,
  },
});

export function InvoicePdfDocument({ model }: { model: InvoiceViewModel }) {
  return (
    <Document
      title={`${model.tradingName} ${model.invoiceNumber}`}
      author={model.tradingName}
      subject={model.heading}
    >
      <Page size="A4" style={invoicePdfStyles.page} wrap>
        <View style={invoicePdfStyles.header}>
          <View style={invoicePdfStyles.supplierBlock}>
            <Text style={invoicePdfStyles.wordmark}>{model.tradingName}</Text>
            {model.legalName ? <Text style={invoicePdfStyles.supplierLine}>{model.legalName}</Text> : null}
            {model.abnLabel ? <Text style={invoicePdfStyles.supplierLine}>{model.abnLabel}</Text> : null}
            {model.address ? <Text style={invoicePdfStyles.supplierLine}>{model.address}</Text> : null}
            {model.email ? <Text style={invoicePdfStyles.supplierLine}>{model.email}</Text> : null}
            {model.phone ? <Text style={invoicePdfStyles.supplierLine}>{model.phone}</Text> : null}
            {model.website ? <Text style={invoicePdfStyles.supplierLine}>{model.website}</Text> : null}
          </View>
          <View style={invoicePdfStyles.meta}>
            <Text style={invoicePdfStyles.heading}>{model.heading}</Text>
            <Text style={invoicePdfStyles.metaStrong}>{model.invoiceNumber}</Text>
            <Text style={invoicePdfStyles.metaLine}>{model.issueDateLabel}</Text>
            <Text style={invoicePdfStyles.metaLine}>Due {model.dueDateLabel}</Text>
            {model.reference ? <Text style={invoicePdfStyles.metaLine}>{model.reference}</Text> : null}
          </View>
        </View>

        <View>
          <Text style={invoicePdfStyles.sectionLabel}>BILL TO</Text>
          <Text style={invoicePdfStyles.clientName}>{model.clientName}</Text>
          {model.clientContactName ? (
            <Text style={invoicePdfStyles.clientLine}>{model.clientContactName}</Text>
          ) : null}
          {model.clientAbnLabel ? <Text style={invoicePdfStyles.clientLine}>{model.clientAbnLabel}</Text> : null}
          {model.clientAddress ? <Text style={invoicePdfStyles.clientLine}>{model.clientAddress}</Text> : null}
          {model.clientEmail ? <Text style={invoicePdfStyles.clientLine}>{model.clientEmail}</Text> : null}
        </View>

        <View style={invoicePdfStyles.tableHeader}>
          <Text style={[invoicePdfStyles.th, invoicePdfStyles.desc]}>DESCRIPTION</Text>
          <Text style={[invoicePdfStyles.th, invoicePdfStyles.qty]}>QTY</Text>
          <Text style={[invoicePdfStyles.th, invoicePdfStyles.rate]}>RATE</Text>
          <Text style={[invoicePdfStyles.th, invoicePdfStyles.amount]}>AMOUNT</Text>
        </View>
        {model.lines.map((line) => (
          <View key={line.id} style={invoicePdfStyles.row} wrap={false}>
            <Text style={invoicePdfStyles.desc}>{line.description}</Text>
            <Text style={invoicePdfStyles.qty}>{line.quantityLabel}</Text>
            <Text style={invoicePdfStyles.rate}>{line.rateLabel}</Text>
            <Text style={invoicePdfStyles.amount}>{line.amountLabel}</Text>
          </View>
        ))}

        <View style={invoicePdfStyles.totals} wrap={false}>
          {model.gstRegistered ? (
            <>
              <View style={invoicePdfStyles.totalRow}>
                <Text style={invoicePdfStyles.totalLabel}>Subtotal</Text>
                <Text style={invoicePdfStyles.totalValue}>{model.subtotalLabel}</Text>
              </View>
              <View style={invoicePdfStyles.totalRow}>
                <Text style={invoicePdfStyles.totalLabel}>GST (10%)</Text>
                <Text style={invoicePdfStyles.totalValue}>{model.gstLabel}</Text>
              </View>
            </>
          ) : null}
          <View style={invoicePdfStyles.grandRow}>
            <Text style={invoicePdfStyles.grandLabel}>TOTAL</Text>
            <Text style={invoicePdfStyles.grandValue}>{model.totalWithCurrency}</Text>
          </View>
          {model.gstRegistered ? null : (
            <Text style={invoicePdfStyles.gstNote}>GST not applicable</Text>
          )}
        </View>

        <View style={invoicePdfStyles.footer} wrap={false}>
          <Text style={invoicePdfStyles.sectionLabel}>PAYMENT DETAILS</Text>
          <View style={invoicePdfStyles.paymentRow}>
            <View style={invoicePdfStyles.paymentCol}>
              <Text style={invoicePdfStyles.sectionLabel}>ACCOUNT NAME</Text>
              <Text style={invoicePdfStyles.paymentValue}>{model.bankAccountName || "—"}</Text>
            </View>
            <View style={invoicePdfStyles.paymentCol}>
              <Text style={invoicePdfStyles.sectionLabel}>BSB</Text>
              <Text style={invoicePdfStyles.paymentValue}>{model.bankBsb || "—"}</Text>
            </View>
            <View style={invoicePdfStyles.paymentCol}>
              <Text style={invoicePdfStyles.sectionLabel}>ACCOUNT NUMBER</Text>
              <Text style={invoicePdfStyles.paymentValue}>{model.bankAccountNumber || "—"}</Text>
            </View>
          </View>
          <Text style={invoicePdfStyles.notes}>{model.notes}</Text>
        </View>
      </Page>
    </Document>
  );
}
