export function loginPage({ locked, error }: { locked: boolean; error: string }): string {
  const message = locked
    ? error || "Set CLIENT_PORTAL_KEY to unlock the client portal."
    : error;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Latest work — Tacking Point Digital</title>
  <link rel="stylesheet" href="/portal.css" />
</head>
<body>
  <div class="wrap">
    ${
      locked
        ? `<div class="locked">
            <p class="brand">${mark()} Tacking Point Digital</p>
            <p class="lead">Latest work. Private.</p>
            <p class="error">${escapeHtml(message)}</p>
          </div>`
        : `<form id="login">
            <p class="brand">${mark()} Tacking Point Digital</p>
            <p class="lead">Latest work. Private.</p>
            <label for="password">Access key</label>
            <input id="password" name="password" type="password" autocomplete="current-password" />
            <p class="error" id="error"${message ? "" : " hidden"}>${escapeHtml(message)}</p>
            <button type="submit">Continue</button>
          </form>`
    }
  </div>
  ${
    locked
      ? ""
      : `<script>
          const form = document.getElementById("login");
          const error = document.getElementById("error");
          form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const button = form.querySelector("button");
            button.disabled = true;
            error.hidden = true;
            try {
              const res = await fetch("/api/clients/session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: document.getElementById("password").value }),
              });
              if (!res.ok) {
                const json = await res.json().catch(() => ({}));
                throw new Error(json.error || "That password is not right.");
              }
              const next = new URLSearchParams(location.search).get("next");
              location.replace(next && next.startsWith("/") ? next : "/");
            } catch (err) {
              error.textContent = err instanceof Error ? err.message : "Could not sign in";
              error.hidden = false;
            } finally {
              button.disabled = false;
            }
          });
        </script>`
  }
</body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function mark(): string {
  return `<svg width="16" height="16" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polyline points="100 68 128 36 156 68"></polyline>
    <path d="M108 68v32h40V68"></path>
    <path d="M114 100 100 224h56l-14-124"></path>
    <line x1="64" y1="224" x2="192" y2="224"></line>
    <line x1="48" y1="80" x2="76" y2="80"></line>
    <line x1="180" y1="80" x2="208" y2="80"></line>
  </svg>`;
}
