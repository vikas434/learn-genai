'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Icon } from './icons';
import { Badge, Button, TimeChip } from './ui';
import { INCLUDES, LESSONS, PERSONAS, STOPS, type Persona } from '@/lib/content';

const LENGTHS = [{ id: 'short', label: 'Under 10 min', test: (m: number) => m < 10 }, { id: 'mid', label: '10–12 min', test: (m: number) => m >= 10 && m <= 12 }, { id: 'long', label: '13+ min', test: (m: number) => m > 12 }];
const KINDS = ['Read', 'Practice', 'Watch'] as const;

export function LibraryClient() {
  const params = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(params.get('q') ?? '');
  const [seat, setSeat] = useState<Persona | null>((params.get('seat') as Persona) || null);
  const [stop, setStop] = useState<number | null>(null);
  const [len, setLen] = useState<string | null>(null);
  const [kind, setKind] = useState<string | null>(null);

  useEffect(() => { setSeat((params.get('seat') as Persona) || null); if (params.get('q') !== null) setQ(params.get('q') ?? ''); }, [params]);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return LESSONS.filter((l) =>
      (!s || (l.title + ' ' + l.summary).toLowerCase().includes(s)) &&
      (!seat || l.personas.includes(seat)) && (!stop || l.stop === stop) &&
      (!len || LENGTHS.find((x) => x.id === len)!.test(l.minutes)) && (!kind || l.kind === kind));
  }, [q, seat, stop, len, kind]);

  const clear = () => { setQ(''); setSeat(null); setStop(null); setLen(null); setKind(null); router.replace('/library'); };
  const any = q || seat || stop || len || kind;

  return (
    <div className="lib">
      <div className="lib__side">
        <div className="search__box" style={{ height: 52, boxShadow: 'var(--shadow-pop-sm)' }}>
          <Icon name="search" />
          <label htmlFor="lib-q" className="sr-only">Search lessons</label>
          <input id="lib-q" className="search__input" style={{ fontSize: 16 }} placeholder="Search lessons" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="lib__group"><h3>Your seat</h3><div className="row">{PERSONAS.map((p) => <button key={p.id} className="chip" aria-pressed={seat === p.id} onClick={() => setSeat(seat === p.id ? null : p.id)}>{p.name}</button>)}</div></div>
        <div className="lib__group"><h3>Stop</h3><div className="row">{STOPS.map((s) => <button key={s.n} className="chip" aria-pressed={stop === s.n} onClick={() => setStop(stop === s.n ? null : s.n)}>{String(s.n).padStart(2, '0')} · {s.short}</button>)}</div></div>
        <div className="lib__group"><h3>Length</h3><div className="row">{LENGTHS.map((x) => <button key={x.id} className="chip" aria-pressed={len === x.id} onClick={() => setLen(len === x.id ? null : x.id)}>{x.label}</button>)}</div></div>
        <div className="lib__group"><h3>Kind</h3><div className="row">{KINDS.map((k) => <button key={k} className="chip" aria-pressed={kind === k} onClick={() => setKind(kind === k ? null : k)}>{k}</button>)}</div></div>
        {any && <Button variant="ghost" onClick={clear}>Clear filters</Button>}
      </div>
      <div style={{ display: 'grid', gap: 24, minWidth: 0 }}>
        <p className="muted" style={{ margin: 0, fontWeight: 600 }} aria-live="polite">{list.length} {list.length === 1 ? 'lesson' : 'lessons'}</p>
        {list.length ? (
          <div className="lib__grid">
            {list.map((l) => (
              <Link key={l.slug} href={`/lesson/${l.slug}`} className="lcard">
                <div className="lcard__top"><Badge tone={STOPS[l.stop - 1].tone} soft>Stop {String(l.stop).padStart(2, '0')}</Badge><TimeChip minutes={l.minutes} /></div>
                <h2 className="lcard__t">{l.title}</h2>
                <p className="lcard__d">{l.summary}</p>
                <div className="lcard__meta"><Badge tone="neutral">{l.kind}</Badge><span className="muted" style={{ fontSize: 14 }}>{l.personas.length === 3 ? 'For everyone' : l.personas.map((p) => p[0].toUpperCase() + p.slice(1)).join(', ')}</span></div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty"><p style={{ margin: '0 0 16px', fontWeight: 700, color: 'var(--ink)' }}>No lessons match that yet.</p><Button variant="secondary" onClick={clear}>Clear filters</Button></div>
        )}
        <div style={{ marginTop: 16, padding: 28, borderRadius: 20, border: '2px solid var(--line)', background: 'var(--surface)' }}>
          <h2 className="h3" style={{ marginBottom: 16 }}>Every lesson includes</h2>
          <div className="includes">{INCLUDES.map((x) => <div key={x.label} className="include"><i style={{ background: `var(--${x.tone})` }}><Icon name="check" /></i>{x.label}</div>)}</div>
        </div>
      </div>
    </div>
  );
}
