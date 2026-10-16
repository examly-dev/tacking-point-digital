import { clientsLabel, clientsUrl, mailto, site, tel } from "@/lib/site";

type Tone = "paper" | "green";

const links = [
  { href: mailto, label: site.email, icon: Envelope, external: false },
  { href: tel, label: site.phone, icon: Phone, external: false },
  { href: clientsUrl, label: clientsLabel, icon: Keyhole, external: true },
] as const;

const box = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.35,
  strokeLinejoin: "miter" as const,
};

export function ContactIcons({
  tone = "paper",
  className = "",
}: {
  tone?: Tone;
  className?: string;
}) {
  const item =
    tone === "green"
      ? "text-cream-muted hover:text-cream focus-visible:text-cream"
      : "text-muted hover:text-ink focus-visible:text-ink";

  return (
    <ul className={`flex items-center gap-1 ${className}`.trim()}>
      {links.map(({ href, label, icon: Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            className={`flex h-11 w-11 items-center justify-center motion-safe:transition-colors motion-safe:duration-200 ${item}`}
            {...(external ? { rel: "noreferrer" } : {})}
          >
            <Icon />
            <span className="sr-only">{label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function Envelope() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.2" {...box} />
      <path d="M3.2 5.35 10 10.7l6.8-5.35" {...box} />
    </svg>
  );
}

function Phone() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M6.2 3.8h2.1l1 3.1-1.35 1.1a9.2 9.2 0 0 0 4.05 4.05l1.1-1.35 3.1 1v2.1a1.4 1.4 0 0 1-1.5 1.4A11.7 11.7 0 0 1 3.8 6.3a1.4 1.4 0 0 1 1.4-1.5Z"
        {...box}
      />
    </svg>
  );
}

function Keyhole() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="8" r="2.4" {...box} />
      <path d="M10 10.4v5.1" {...box} />
      <rect x="3.5" y="3.5" width="13" height="13" rx="2.2" {...box} />
    </svg>
  );
}
