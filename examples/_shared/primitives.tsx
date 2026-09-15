'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

/**
 * Reveals children once they enter the viewport. Pure CSS transition, no
 * animation library, respects prefers-reduced-motion via the `motion-reduce` classes.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
  y = 24,
  id,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string;
  as?: 'div' | 'section' | 'li' | 'p' | 'h1' | 'h2' | 'h3' | 'figure' | 'span';
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
    transform: shown ? 'none' : `translateY(${y}px)`,
    opacity: shown ? 1 : 0,
  };

  // All allowed tags are plain HTML elements; typing the ref as a div keeps the polymorphic tag simple.
  const Comp = Tag as unknown as 'div';

  return (
    <Comp
      ref={ref}
      id={id}
      style={style}
      className={`transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-[opacity,transform] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${className}`}
    >
      {children}
    </Comp>
  );
}

/** Continuous horizontal ticker. Duplicates its content so the loop is seamless. */
export function Marquee({
  children,
  speed = 40,
  className = '',
}: {
  children: ReactNode;
  /** Seconds per loop. */
  speed?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden="true">
      <div
        className="inline-flex motion-reduce:animate-none"
        style={{ animation: `ex-marquee ${speed}s linear infinite` }}
      >
        <div className="inline-flex shrink-0">{children}</div>
        <div className="inline-flex shrink-0">{children}</div>
      </div>
      <style>{`@keyframes ex-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}

/** Live clock in a given timezone, rendered as HH:MM. Falls back to a dash on the server. */
export function Clock({ timeZone = 'Australia/Sydney', className = '' }: { timeZone?: string; className?: string }) {
  const [time, setTime] = useState<string>('––:––');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-AU', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, [timeZone]);
  return (
    <span className={className} suppressHydrationWarning>
      {time}
    </span>
  );
}

/** Counts from 0 to `to` once visible. */
export function Count({
  to,
  suffix = '',
  className = '',
  duration = 1400,
}: {
  to: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(to * eased));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {n.toLocaleString('en-AU')}
      {suffix}
    </span>
  );
}

export type SpyItem = { href: `#${string}`; label: string; n?: string };

/**
 * In-page nav that marks the section currently on screen with `aria-current`.
 * Styling is passed as class strings so server components can use it.
 */
export function ScrollSpy({
  items,
  className = '',
  linkClass = '',
  activeClass = '',
  inactiveClass = '',
  numberClass = '',
  markerClass,
}: {
  items: SpyItem[];
  className?: string;
  linkClass?: string;
  activeClass?: string;
  inactiveClass?: string;
  /** Rendered before the label when an item has `n`. */
  numberClass?: string;
  /** Optional trailing marker element (e.g. a dot) shown on the active item. */
  markerClass?: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((it) => document.getElementById(it.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const pick = () => {
      // The section whose top is nearest to (but above) 40% of the viewport wins.
      const line = window.innerHeight * 0.4;
      let best: string | null = null;
      let bestTop = -Infinity;
      for (const el of sections) {
        const top = el.getBoundingClientRect().top;
        if (top <= line && top > bestTop) {
          bestTop = top;
          best = el.id;
        }
      }
      setActive(best);
    };
    pick();
    window.addEventListener('scroll', pick, { passive: true });
    window.addEventListener('resize', pick);
    return () => {
      window.removeEventListener('scroll', pick);
      window.removeEventListener('resize', pick);
    };
  }, [items]);

  return (
    <div className={className}>
      {items.map((it) => {
        const isActive = active === it.href.slice(1);
        return (
          <a
            key={it.href}
            href={it.href}
            aria-current={isActive ? 'location' : undefined}
            className={`${linkClass} ${isActive ? activeClass : inactiveClass}`}
          >
            {it.n ? <span className={numberClass}>{it.n}</span> : null}
            <span>{it.label}</span>
            {markerClass ? <span aria-hidden="true" className={`${markerClass} ${isActive ? 'opacity-100' : 'opacity-0'}`} /> : null}
          </a>
        );
      })}
    </div>
  );
}
