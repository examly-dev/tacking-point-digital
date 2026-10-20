# Tacking Point Digital

Business homepage for Tacking Point Digital (tackingpointdigital.com.au) with a private invoice workspace and a gated client preview portal.

- Stack: Next.js (App Router), TypeScript, self-hosted Satoshi; GitHub Pages for the public site; Cloudflare Pages (`clients-host/`) for the client portal.
- Run: `npm install && npm run dev`, or `docker compose up` for OrbStack (https://tackingpoint.local).
- Deploy the portal with `scripts/deploy-clients.sh`; copy `.env.example` to `.env` for local keys.
- Next actions live in `TODO.md` (Now / Next / Later / Done). Update it when work finishes.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
