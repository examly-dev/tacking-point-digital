/**
 * Line icons for the services list. 24×24, 1.5 stroke, round joins, so they
 * sit with the lighthouse mark and the arrow at the site's light weight.
 */

type IconProps = { className?: string };

function Icon({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

/** A browser window with a page layout: a site designed from scratch. */
export function WebsiteIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2.75" y="4.25" width="18.5" height="15.5" rx="2" />
      <path d="M2.75 8.75h18.5" />
      <path d="M6.5 12.5h5" />
      <path d="M6.5 15.75h3" />
      <rect x="14" y="12" width="4" height="4.5" rx="0.75" />
    </Icon>
  );
}

/** A pen on a page: a site the owner edits themselves. */
export function SelfManagedIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.75H5.75a2 2 0 0 0-2 2v12.5a2 2 0 0 0 2 2h12.5a2 2 0 0 0 2-2V12" />
      <path d="M18.4 3.1a1.9 1.9 0 0 1 2.7 2.7l-8.3 8.3-3.4.8.8-3.4Z" />
    </Icon>
  );
}

/** A wrench: changes and fixes to a site that already exists. */
export function UpdatesIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
    </Icon>
  );
}

/** Dashboard tiles: booking systems, portals and tools. */
export function AppsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.25" y="3.25" width="7.5" height="9" rx="1.25" />
      <rect x="13.25" y="3.25" width="7.5" height="5" rx="1.25" />
      <rect x="13.25" y="11.25" width="7.5" height="9.5" rx="1.25" />
      <rect x="3.25" y="15.25" width="7.5" height="5.5" rx="1.25" />
    </Icon>
  );
}

/** Arrows going round: repeating work handled for you. */
export function AutomationIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.5 12a8.5 8.5 0 0 1 14.6-5.9L20.5 8.5" />
      <path d="M20.5 3.75V8.5h-4.75" />
      <path d="M20.5 12a8.5 8.5 0 0 1-14.6 5.9L3.5 15.5" />
      <path d="M3.5 20.25V15.5h4.75" />
    </Icon>
  );
}

/** A price tag: fixed prices, no markups. */
export function PricingIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12.6 3.25H5.25a2 2 0 0 0-2 2v7.35a2 2 0 0 0 .59 1.41l7.95 7.95a2.4 2.4 0 0 0 3.4 0l6.06-6.06a2.4 2.4 0 0 0 0-3.4l-7.95-7.95a2 2 0 0 0-1.41-.59Z" />
      <circle cx="8" cy="8" r="1.1" />
    </Icon>
  );
}
