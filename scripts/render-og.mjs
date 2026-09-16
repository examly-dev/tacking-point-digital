/**
 * Renders the WhatsApp / social preview images from the site mark.
 *
 *   node scripts/render-og.mjs
 *
 * Writes app/opengraph-image.png, app/twitter-image.png, app/apple-icon.png.
 */
import { chromium } from "./sanity-shots/node_modules/playwright/index.mjs";
import { copyFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const font = readFileSync(join(root, "app/fonts/Satoshi-Medium.woff2")).toString("base64");
const iconSvg = readFileSync(join(root, "app/icon.svg"), "utf8");

const lighthouse = `<svg width="148" height="148" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M108 68v32h40V68Z" fill="#ffd54a"/>
  <g stroke="#000" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <polyline points="100 68 128 36 156 68"/>
    <path d="M108 68v32h40V68"/>
    <path d="M114 100 100 224h56l-14-124"/>
    <line x1="64" y1="224" x2="192" y2="224"/>
    <line x1="48" y1="80" x2="76" y2="80" stroke="#ffd54a"/>
    <line x1="180" y1="80" x2="208" y2="80" stroke="#ffd54a"/>
  </g>
</svg>`;

const ogHtml = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8"/>
    <style>
      @font-face {
        font-family: Satoshi;
        src: url(data:font/woff2;base64,${font}) format("woff2");
        font-weight: 500;
        font-style: normal;
      }
      html, body { margin: 0; }
      .card {
        width: 1200px;
        height: 630px;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        color: #111;
        font-family: Satoshi, ui-sans-serif, system-ui, sans-serif;
        font-weight: 500;
        box-sizing: border-box;
      }
      .glow {
        position: absolute;
        inset: 0;
        background: radial-gradient(45% 55% at 50% 42%, rgba(255, 213, 74, 0.22), transparent 70%);
        pointer-events: none;
      }
      .inner {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      .mark { width: 148px; height: 148px; }
      .mark svg { display: block; width: 148px; height: 148px; }
      .name {
        margin-top: 28px;
        font-size: 40px;
        letter-spacing: -0.025em;
        line-height: 1.1;
      }
      .line {
        margin-top: 14px;
        font-size: 22px;
        letter-spacing: -0.015em;
        color: rgba(0, 0, 0, 0.5);
        line-height: 1.35;
        max-width: 22ch;
      }
    </style>
  </head>
  <body>
    <div class="card" id="og">
      <div class="glow"></div>
      <div class="inner">
        <div class="mark">${lighthouse}</div>
        <div class="name">Tacking Point Digital</div>
        <div class="line">Websites and web apps for businesses and professionals.</div>
      </div>
    </div>
  </body>
</html>`;

const iconHtml = `<!doctype html>
<html>
  <body style="margin:0;background:#fff">
    <div id="icon" style="width:180px;height:180px">${iconSvg.replace("<svg", '<svg width="180" height="180"')}</div>
  </body>
</html>`;

const browser = await chromium.launch();

const ogPage = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
});
await ogPage.setContent(ogHtml, { waitUntil: "load" });
const ogPath = join(root, "app/opengraph-image.png");
await ogPage.locator("#og").screenshot({ path: ogPath, type: "png" });
copyFileSync(ogPath, join(root, "app/twitter-image.png"));

const iconPage = await browser.newPage({
  viewport: { width: 180, height: 180 },
  deviceScaleFactor: 2,
});
await iconPage.setContent(iconHtml, { waitUntil: "load" });
await iconPage.locator("#icon").screenshot({
  path: join(root, "app/apple-icon.png"),
  type: "png",
});

await browser.close();
console.log("wrote app/opengraph-image.png, app/twitter-image.png, app/apple-icon.png");
