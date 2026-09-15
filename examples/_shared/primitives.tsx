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

const IN_PAGE_STYLE_ID = 'in-page-scroll-style';
let inPageScrollOwners = 0;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function samePath(a: string, b: string) {
  const norm = (p: string) => (p.replace(/\/$/, '') || '/');
  return norm(a) === norm(b);
}

function hashFromAnchor(anchor: HTMLAnchorElement): string | null {
  const raw = anchor.getAttribute('href');
  if (!raw || raw === '#') return null;
  let url: URL;
  try {
    url = new URL(anchor.href);
  } catch {
    return null;
  }
  if (url.origin !== window.location.origin) return null;
  if (!samePath(url.pathname, window.location.pathname)) return null;
  if (!url.hash || url.hash === '#') return null;
  return url.hash;
}

function stickyHeaderBottom(): number {
  let bottom = 0;
  const nodes = document.querySelectorAll('header, .custom-header');
  for (const el of nodes) {
    const style = getComputedStyle(el);
    if (style.position !== 'fixed' && style.position !== 'sticky') continue;
    if (style.visibility === 'hidden' || style.display === 'none') continue;
    if (Number.parseFloat(style.opacity) === 0) continue;
    const rect = el.getBoundingClientRect();
    if (rect.height < 8) continue;
    if (rect.top < -8 || rect.top > 96) continue;
    bottom = Math.max(bottom, rect.bottom);
  }
  return bottom > 0 ? bottom + 12 : 0;
}

function shouldAnimateScroll(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const html = document.documentElement;
  if (html.dataset.capture != null) return false;
  if (html.style.scrollBehavior === 'auto') return false;
  return getComputedStyle(html).scrollBehavior !== 'auto';
}

function scrollToId(hash: string, animate: boolean) {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (!id) return;

  const target = id === 'top' ? document.getElementById('top') : document.getElementById(id);
  const offset = stickyHeaderBottom();
  document.documentElement.style.setProperty('--in-page-scroll-margin', `${Math.max(offset, 16)}px`);

  const destination = target
    ? Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset)
    : id === 'top'
      ? 0
      : null;
  if (destination == null) return;

  const html = document.documentElement;
  const previousBehavior = html.style.scrollBehavior;
  // Inline `auto` beats stylesheet `smooth` so per-frame jumps aren't re-eased by CSS.
  html.style.scrollBehavior = 'auto';
  const restore = () => {
    html.style.scrollBehavior = previousBehavior;
  };

  if (!animate) {
    window.scrollTo({ top: destination, behavior: 'auto' });
    restore();
    return;
  }

  const start = window.scrollY;
  const distance = destination - start;
  if (Math.abs(distance) < 2) {
    window.scrollTo({ top: destination, behavior: 'auto' });
    restore();
    return;
  }

  const duration = Math.min(900, Math.max(420, Math.abs(distance) * 0.55));
  const t0 = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / duration);
    window.scrollTo({ top: start + distance * easeInOutCubic(p), behavior: 'auto' });
    if (p < 1) requestAnimationFrame(step);
    else restore();
  };
  requestAnimationFrame(step);
}

/**
 * Smooth in-page hash navigation with sticky-header offset.
 * CSS `scroll-behavior` is the fallback; clicks get an ease-in-out scroll
 * so Next.js client routing and hash links don't jump. Capture scripts that
 * force `scroll-behavior: auto` (or `data-capture`) keep instant jumps.
 */
export function InPageScroll() {
  useEffect(() => {
    inPageScrollOwners += 1;
    if (inPageScrollOwners > 1) {
      return () => {
        inPageScrollOwners -= 1;
      };
    }
    if (!document.getElementById(IN_PAGE_STYLE_ID)) {
      const style = document.createElement('style');
      style.id = IN_PAGE_STYLE_ID;
      style.textContent = `
        @media (prefers-reduced-motion: no-preference) {
          html { scroll-behavior: smooth; }
        }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto !important; }
        }
      `;
      document.head.appendChild(style);
    }

    const syncOffset = () => {
      document.documentElement.style.setProperty('--in-page-scroll-margin', `${Math.max(stickyHeaderBottom(), 16)}px`);
    };
    syncOffset();

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const hash = hashFromAnchor(anchor);
      if (!hash) return;
      const id = decodeURIComponent(hash.slice(1));
      if (!document.getElementById(id) && id !== 'top') return;

      event.preventDefault();
      const animate = shouldAnimateScroll();
      scrollToId(hash, animate);
      if (window.location.hash !== hash) {
        history.pushState(null, '', hash);
      }
    };

    const onHash = () => {
      if (!window.location.hash) return;
      scrollToId(window.location.hash, shouldAnimateScroll());
    };

    document.addEventListener('click', onClick, true);
    window.addEventListener('hashchange', onHash);
    window.addEventListener('resize', syncOffset);
    if (window.location.hash) {
      scrollToId(window.location.hash, false);
    }

    return () => {
      inPageScrollOwners -= 1;
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('resize', syncOffset);
    };
  }, []);

  return null;
}

export type ClientMark = { name: string; kind: string };

/** Horizontal client wordmark carousel. Autoplays unless reduced-motion; arrows always work. */
export function ClientCarousel({
  items,
  titleClassName = '',
}: {
  items: ClientMark[];
  titleClassName?: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  const slideBy = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector('[data-client-card]');
    const w = card instanceof HTMLElement ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.7;
    el.scrollBy({ left: dir * w, behavior: shouldAnimateScroll() ? 'smooth' : 'auto' });
  };

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const tick = () => {
      if (paused.current) return;
      if (!shouldAnimateScroll()) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 8) return;
      if (el.scrollLeft >= max - 8) el.scrollTo({ left: 0, behavior: 'smooth' });
      else slideBy(1);
    };
    const id = window.setInterval(tick, 3800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
    >
      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        aria-label="Clients"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            slideBy(1);
          }
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            slideBy(-1);
          }
        }}
      >
        {items.map((c) => (
          <article
            key={c.name}
            data-client-card=""
            className="flex w-[min(78vw,280px)] shrink-0 snap-start flex-col justify-center border border-black/10 bg-white px-6 py-8 md:w-[calc((100%-2rem)/3)]"
          >
            <p className={`${titleClassName} text-[22px] leading-[1.15] md:text-[24px]`}>{c.name}</p>
            <p className="mt-2 text-[13px] text-black/45">{c.kind}</p>
          </article>
        ))}
      </div>
      <div className="mt-5 flex gap-2">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-current text-[18px] leading-none hover:bg-[#1A1A1A] hover:text-white"
          aria-label="Previous clients"
          onClick={() => slideBy(-1)}
        >
          ‹
        </button>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-current text-[18px] leading-none hover:bg-[#1A1A1A] hover:text-white"
          aria-label="Next clients"
          onClick={() => slideBy(1)}
        >
          ›
        </button>
      </div>
    </div>
  );
}
