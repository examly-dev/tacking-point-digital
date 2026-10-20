import { existsSync } from "node:fs";
import path from "node:path";
import { Font } from "@react-pdf/renderer";

export const INVOICE_PDF_FONT = "Satoshi";

const SATOSHI_MEDIUM = path.join(process.cwd(), "app/fonts/Satoshi-Medium.ttf");

let registered = false;

export function registerInvoicePdfFonts() {
  if (registered) return;
  if (!existsSync(SATOSHI_MEDIUM)) {
    throw new Error(`Satoshi Medium is missing at ${SATOSHI_MEDIUM}`);
  }

  Font.register({
    family: INVOICE_PDF_FONT,
    fonts: [
      { src: SATOSHI_MEDIUM, fontWeight: 400 },
      { src: SATOSHI_MEDIUM, fontWeight: 500 },
      { src: SATOSHI_MEDIUM, fontWeight: 700 },
    ],
  });
  Font.registerHyphenationCallback((word) => [word]);
  registered = true;
}
