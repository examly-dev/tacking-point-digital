"use client";

import { useMemo, type CSSProperties } from "react";
import { Lighthouse } from "@/components/Lighthouse";

const COUNT = 24;

function piece(i: number) {
  return {
    id: i,
    left: 6 + ((i * 37) % 88),
    delay: (i % 8) * 0.04,
    duration: 1.15 + (i % 5) * 0.18,
    drift: ((i % 7) - 3) * 28,
    spin: (i % 2 === 0 ? 1 : -1) * (220 + (i % 6) * 40),
    size: 14 + (i % 5) * 3,
    start: 28 + (i % 9) * 4,
  };
}

export function LighthouseConfetti() {
  const pieces = useMemo(() => Array.from({ length: COUNT }, (_, i) => piece(i)), []);

  return (
    <div className="lighthouse-confetti" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="lighthouse-confetti-piece"
          style={{
            left: `${p.left}%`,
            top: `${p.start}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ["--drift"]: `${p.drift}px`,
            ["--spin"]: `${p.spin}deg`,
          } as CSSProperties}
        >
          <Lighthouse />
        </span>
      ))}
    </div>
  );
}
