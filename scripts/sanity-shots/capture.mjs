import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";
import fs from "node:fs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "../..");
const outDir = path.join(root, "public/work");

const SITES = [
  "proof-room",
  "halfway",
  "ridgeway-physio",
  "marlow-finch",
  "harbourline",
  "ironbark",
  "ballast",
  "hartwell",
  "ellery",
  "sancrox",
];

function contentType(file) {
  if (file.endsWith(".html")) return "text/html; charset=utf-8";
  if (file.endsWith(".js")) return "text/javascript";
  if (file.endsWith(".css")) return "text/css";
  return "application/octet-stream";
}

function serve(dir) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url || "/", "http://127.0.0.1");
      const file = path.join(dir, url.pathname === "/" ? "studio.html" : url.pathname);
      if (!file.startsWith(dir)) {
        res.writeHead(403);
        res.end();
        return;
      }
      fs.readFile(file, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end("not found");
          return;
        }
        res.writeHead(200, { "Content-Type": contentType(file) });
        res.end(data);
      });
    });
    server.listen(0, "127.0.0.1", () => {
      resolve({ server, port: server.address().port });
    });
  });
}

const { server, port } = await serve(here);
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});

await page.goto(`http://127.0.0.1:${port}/studio.html`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

for (const slug of SITES) {
  await page.goto(`http://127.0.0.1:${port}/studio.html?site=${slug}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  const dest = path.join(outDir, `${slug}-sanity.jpg`);
  await page.screenshot({
    path: dest,
    type: "jpeg",
    quality: 86,
  });
  console.log(dest);
}

await browser.close();
server.close();
