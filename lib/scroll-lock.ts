/**
 * Lock page scroll for overlays. On tablet+ the marketing site scrolls
 * `.site-canvas`, not `body`, so locking body alone leaves the page moving
 * behind the dialog.
 */
export function lockPageScroll() {
  const canvas = document.querySelector<HTMLElement>(".site-canvas");
  const bodyOverflow = document.body.style.overflow;
  const canvasOverflow = canvas?.style.overflow ?? "";

  document.body.style.overflow = "hidden";
  if (canvas) canvas.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = bodyOverflow;
    if (canvas) canvas.style.overflow = canvasOverflow;
  };
}
