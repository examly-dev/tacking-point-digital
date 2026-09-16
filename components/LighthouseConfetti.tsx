"use client";

import { useLayoutEffect, useMemo, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

const COUNT = 28;

function piece(i: number) {
  const angle = (i / COUNT) * Math.PI * 2;
  return {
    id: i,
    left: 50 + Math.cos(angle) * 4,
    top: 36 + Math.sin(angle) * 3,
    delay: (i % 10) * 0.03,
    duration: 1.35 + (i % 6) * 0.16,
    drift: Math.cos(angle) * (160 + (i % 5) * 40),
    drop: 56 + (i % 7) * 6,
    spin: (i % 2 === 0 ? 1 : -1) * (280 + (i % 8) * 50),
    size: 32 + (i % 5) * 8,
  };
}

function Mark() {
  return (
    <svg viewBox="0 0 256 256" width="100%" height="100%" aria-hidden>
      <path fill="#111" d="M128 36 100 68h56L128 36ZM114 100 100 224h56l-14-124H114ZM64 214h128v20H64v-20Z" />
      <path fill="#ffd54a" d="M108 68h40v32h-40z" />
      <path fill="#ffd54a" d="M48 72h28v16H48zM180 72h28v16h-28z" />
    </svg>
  );
}

export function LighthouseConfetti() {
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const pieces = useMemo(() => Array.from({ length: COUNT }, (_, i) => piece(i)), []);

  useLayoutEffect(() => {
    setRoot(document.body);
  }, []);

  if (!root) return null;

  return createPortal(
    <div className="lighthouse-confetti" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="lighthouse-confetti-piece"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ["--drift"]: `${p.drift}px`,
            ["--drop"]: `${p.drop}vh`,
            ["--spin"]: `${p.spin}deg`,
          } as CSSProperties}
        >
          <Mark />
        </span>
      ))}
    </div>,
    root,
  );
}
