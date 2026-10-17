'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Icon } from './icons';
import { Button } from './ui';
import { LESSONS, STOPS } from '@/lib/content';

/** Fades children up when they scroll into view. */
export function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }: { children: ReactNode; delay?: number; as?: 'div' | 'section' | 'li'; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setIn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (!('IntersectionObserver' in window)) { setIn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIn(true); io.disconnect(); } }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <Tag ref={ref as never} className={`reveal ${inView ? 'is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>;
}

/** Counts up to `to` the first time it is visible. */
export function Counter({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) { setN(to); return; }
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now(), dur = 1200;
      const tick = (t: number) => { const p = Math.min(1, (t - t0) / dur); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el); return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}

/** Search-first hero box: live suggestions from the lesson list, Enter goes to the library. */
export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [focus, setFocus] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const s = q.trim().toLowerCase(); if (!s) return [];
    return LESSONS.filter((l) => (l.title + ' ' + l.summary).toLowerCase().includes(s))
      .sort((a, b) => Number(b.title.toLowerCase().includes(s)) - Number(a.title.toLowerCase().includes(s))).slice(0, 5);
  }, [q]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') { e.preventDefault(); inputRef.current?.focus(); } };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, []);
  const go = () => {
    if (results[active] && q.trim()) router.push(`/lesson/${results[active].slug}`);
    else router.push(`/library${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''}`);
  };
  return (
    <div className="search">
      <form className="search__box" role="search" onSubmit={(e) => { e.preventDefault(); go(); }}>
        <Icon name="search" />
        <label htmlFor="hero-q" className="sr-only" style={{ position: 'absolute', left: -9999 }}>Search lessons</label>
        <input id="hero-q" ref={inputRef} className="search__input" placeholder="Try ‘viva’, ‘failing test’ or ‘demo’" value={q} autoComplete="off"
          onChange={(e) => { setQ(e.target.value); setActive(0); }} onFocus={() => setFocus(true)} onBlur={() => setTimeout(() => setFocus(false), 150)}
          onKeyDown={(e) => { if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); } if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); } }}
          role="combobox" aria-expanded={focus && results.length > 0} aria-controls="hero-results" aria-autocomplete="list" />
        <span className="search__kbd" aria-hidden="true">/</span>
        <Button type="submit" size="sm" className="search__go">Search</Button>
      </form>
      {focus && results.length > 0 && (
        <ul className="search__results" id="hero-results" role="listbox">
          {results.map((l, i) => (
            <li key={l.slug} role="option" aria-selected={i === active}>
              <Link href={`/lesson/${l.slug}`} data-active={i === active}>
                <span><b style={{ display: 'block', fontSize: 15 }}>{l.title}</b><small>Stop {String(l.stop).padStart(2, '0')} · {STOPS[l.stop - 1].title}</small></span>
                <small>{l.minutes} min</small>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div className="search__chips">
        <span>Popular:</span>
        <Link className="chip" href="/lesson/mock-viva">Mock viva</Link>
        <Link className="chip" href="/lesson/debug-a-failing-test">Failing test</Link>
        <Link className="chip" href="/lesson/when-to-close-it">When to close it</Link>
      </div>
    </div>
  );
}

/** Newsletter signup, client-only confirmation (wire to your email provider). */
export function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (done) return <p style={{ marginTop: 24, fontWeight: 700, position: 'relative', zIndex: 1 }}>You’re on the list. One short email when a new stop goes live.</p>;
  return (
    <form className="form-row" onSubmit={(e) => { e.preventDefault(); if (valid) setDone(true); }}>
      <label htmlFor="nl-email" style={{ position: 'absolute', left: -9999 }}>Email address</label>
      <input id="nl-email" type="email" required className="input" placeholder="you@college.edu" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button type="submit" variant="secondary" disabled={!valid}>Get new lessons</Button>
    </form>
  );
}
