"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function focusables(root: HTMLElement) {
  return [...root.querySelectorAll<HTMLElement>(FOCUSABLE)];
}

/**
 * Keep Tab inside an open dialog and restore focus when it closes.
 */
export function useFocusTrap(
  active: boolean,
  containerRef: RefObject<HTMLElement | null>,
  options?: {
    initialFocusRef?: RefObject<HTMLElement | null>;
    restoreFocusRef?: RefObject<HTMLElement | null>;
  },
) {
  const initialFocusRef = options?.initialFocusRef;
  const restoreFocusRef = options?.restoreFocusRef;

  useEffect(() => {
    if (!active) return;
    const root = containerRef.current;
    if (!root) return;

    const previously =
      restoreFocusRef?.current ?? (document.activeElement as HTMLElement | null);
    const start = initialFocusRef?.current ?? focusables(root)[0];
    start?.focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusables(root);
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    root.addEventListener("keydown", onKey);
    return () => {
      root.removeEventListener("keydown", onKey);
      if (previously?.isConnected) {
        previously.focus({ preventScroll: true });
      }
    };
  }, [active, containerRef, initialFocusRef, restoreFocusRef]);
}
