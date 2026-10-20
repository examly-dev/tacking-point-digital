export function Lighthouse() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth="20"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path className="lighthouse-lantern" d="M108 68v32h40V68Z" stroke="none" />
      <path
        className="lighthouse-well"
        d="M114 100 100 224h56l-14-124Z"
        stroke="none"
      />
      <polyline points="100 68 128 36 156 68" />
      <path d="M108 68v32h40V68" />
      <path d="M114 100 100 224h56l-14-124" />
      <line x1="64" y1="224" x2="192" y2="224" />
      <line className="lighthouse-beam" x1="48" y1="80" x2="76" y2="80" />
      <line className="lighthouse-beam" x1="180" y1="80" x2="208" y2="80" />
    </svg>
  );
}
