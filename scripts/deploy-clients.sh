#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root/clients-host"

if [[ ! -d public/leap-type ]]; then
  echo "No Leap.Type snapshot in clients-host/public/leap-type." >&2
  echo "From the Leap Type repo run: npm run publish:tacking-point" >&2
  exit 1
fi

if ! npx wrangler whoami >/dev/null 2>&1; then
  echo "Cloudflare login required. Run: npx wrangler login" >&2
  echo "Then: npm run deploy:clients" >&2
  echo "Then put the password: npx wrangler pages secret put CLIENT_PORTAL_KEY --project-name lighthouse-clients" >&2
  echo "In the Pages project, set Functions fallback to Fail closed." >&2
  exit 1
fi

npx wrangler pages deploy --project-name lighthouse-clients

echo
echo "If this is the first deploy, store the password:"
echo "  npx wrangler pages secret put CLIENT_PORTAL_KEY --project-name lighthouse-clients"
echo "And in the dashboard: Settings → Functions → Fail closed."
