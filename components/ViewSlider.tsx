"use client";

const label =
  "text-[13px] tablet:text-[12px] motion-safe:transition-colors motion-safe:duration-200";

/**
 * Quiet two-position slider: Desktop ← thumb → Mobile.
 * Default at the call site must be `"desktop"`.
 */
export function ViewSlider({
  value,
  onChange,
  tone = "paper",
}: {
  value: "desktop" | "mobile";
  onChange: (next: "desktop" | "mobile") => void;
  tone?: "paper" | "green";
}) {
  const mobile = value === "mobile";
  const active = tone === "green" ? "text-cream" : "text-ink";
  const idle =
    tone === "green"
      ? "text-cream-muted hover:text-cream"
      : "text-muted hover:text-ink";
  const track = tone === "green" ? "bg-cream/20" : "bg-ink/10";
  const thumb = tone === "green" ? "bg-cream" : "bg-ink";

  return (
    <div className="flex items-center gap-2.5" role="group" aria-label="Preview size">
      <button
        type="button"
        className={`${label} ${mobile ? idle : active}`}
        onClick={() => onChange("desktop")}
      >
        Desktop
      </button>
      <button
        type="button"
        role="switch"
        aria-checked={mobile}
        aria-label={mobile ? "Mobile view. Switch to desktop." : "Desktop view. Switch to mobile."}
        onClick={() => onChange(mobile ? "desktop" : "mobile")}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "Home") {
            e.preventDefault();
            onChange("desktop");
          }
          if (e.key === "ArrowRight" || e.key === "End") {
            e.preventDefault();
            onChange("mobile");
          }
        }}
        className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center tablet:h-[18px] tablet:w-[32px]"
      >
        <span className={`relative block h-[18px] w-[32px] rounded-full ${track}`}>
          <span
            aria-hidden
            className={`absolute top-[2px] left-[2px] h-[14px] w-[14px] rounded-full ${thumb} transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none`}
            style={{ transform: mobile ? "translateX(14px)" : "translateX(0)" }}
          />
        </span>
      </button>
      <button
        type="button"
        className={`${label} ${mobile ? active : idle}`}
        onClick={() => onChange("mobile")}
      >
        Mobile
      </button>
    </div>
  );
}
