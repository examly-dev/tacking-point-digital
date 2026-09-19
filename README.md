# Tacking Point Digital

A small Next.js site. Type is self-hosted [Satoshi](https://www.fontshare.com/fonts/satoshi) (Fontshare).

**Live site:**
[https://tackingpointdigital.com.au](https://tackingpointdigital.com.au)

Layout: a fixed sidebar (`components/Sidebar.tsx`) from 850px up; on phones a sticky bar with a full-screen menu (`components/MobileHeader.tsx`) and a contact strip at the foot of each page (`components/MobileFooter.tsx`). Name, contact details and the introduction all live in `lib/site.ts`. The public **Clients** nav item is the door to the locked portal; the files live on Cloudflare Pages, not GitHub Pages.

```bash
npm install
npm run dev
```

## OrbStack

```bash
docker compose up
```

Then open [https://web.tackingpoint.orb.local](https://web.tackingpoint.orb.local) or [https://tackingpoint.local](https://tackingpoint.local).

## Invoices

A private invoice workspace lives at `/invoices` on the local/OrbStack app. It is stripped from the GitHub Pages build.

- Trading as **Tacking Point Digital**; legal supplier **Andrew James Fong**; ABN **77 124 933 069**
- Records are stored in `.data/invoices.json` (gitignored)
- Fill in bank details under `/invoices/settings`
- Optional `INVOICE_ACCESS_KEY` in `.env` — required in production, optional in development

## Add a piece of work

1. Drop screenshots or short silent clips (H.264 MP4, with a JPEG or PNG poster) in `public/work/`. The card shows the cover in a 16:10 frame (220×138 from tablet up), so a 1440×900 capture fits without cropping. Keep the inline `src` at 1× (1440×900) so it decodes cheaply while the page animates; put the 2× file in `hd` and only the lightbox will use it. Clips do not autoplay in the grid: the card shows the poster and plays on hover or focus (on touch screens, while the card is mostly on screen). On project pages only the clip in view plays, and `prefers-reduced-motion` shows posters only. Every shot on a project page opens full size in a lightbox (`components/Lightbox.tsx`), with a link to the raw file.
2. Append an object in `lib/work.ts`. Each item gets its own page at `/work/<slug>`:

```ts
{
  slug: "studio",
  name: "Studio name",
  kind: "Website · 2026",
  summary: "One line on what it is.",
  url: "https://example.com", // optional; omit to hide "Visit site"
  cover: { type: "image", src: "/work/studio.png", alt: "Studio home page" }, // optional
  mobile: { type: "video", src: "/work/studio-mobile.mp4", hd: "/work/studio-mobile-2x.mp4", poster: "/work/studio-mobile.jpg", alt: "On a phone" }, // optional; shown in a phone frame under the hero
  gallery: [
    { type: "video", src: "/work/studio.mp4", hd: "/work/studio-2x.mp4", poster: "/work/studio.jpg", alt: "Booking flow" },
  ], // optional
  overview: ["A short paragraph or two."],
  design: ["Optional design notes."],
  stack: ["Next.js"], // optional
}
```

Clips are captured with Playwright against the running apps, no audio. The example sites are captured frame by frame with `page.screenshot` at `deviceScaleFactor: 2` and encoded at 30 fps, because `recordVideo` only captures at 1×: desktop is 1440×900 at 2× (2880×1800), phone is 390×844 at 2× (780×1688). Each is encoded twice with `libx264` (CRF 21, yuv420p, faststart): the 2× file for the lightbox and a 1× downscale for inline use. H.264 rather than VP8/VP9 because it is hardware-decoded everywhere, which is what keeps the morph and the rise-ins smooth while a clip is playing. The Accordion and Examly clips are older `recordVideo` captures at 1440×900, transcoded the same way. Playback also waits ~0.9 s after a page mounts before starting, so decoding never overlaps the entrance animation.
