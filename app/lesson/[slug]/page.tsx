import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LESSONS, STOPS } from '@/lib/content';
import { bodyFor } from '@/lib/lessons';
import { LessonClient } from '@/components/LessonClient';
import { Badge, Eyebrow, TimeChip } from '@/components/ui';

export function generateStaticParams() { return LESSONS.map((l) => ({ slug: l.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const l = LESSONS.find((x) => x.slug === slug);
  return l ? { title: l.title, description: l.summary } : {};
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = LESSONS.findIndex((l) => l.slug === slug);
  if (idx < 0) notFound();
  const l = LESSONS[idx]; const stop = STOPS[l.stop - 1]; const next = LESSONS[idx + 1];
  const body = bodyFor(l.slug, l.title, l.summary);
  return (
    <>
      <div className="phead" style={{ paddingBottom: 32 }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/path">The path</Link><span>/</span><Link href={`/path#stop-${stop.n}`}>Stop {String(stop.n).padStart(2, '0')} · {stop.title}</Link></nav>
          <div className="row" style={{ gap: 10, marginBottom: 14 }}><Eyebrow>Lesson · {l.kind}</Eyebrow><TimeChip minutes={l.minutes} />{l.personas.length === 3 ? <Badge tone="neutral">Everyone</Badge> : l.personas.map((p) => <Badge key={p} tone={p === 'students' ? 'mint' : p === 'engineers' ? 'sky' : 'coral'} soft>{p[0].toUpperCase() + p.slice(1)}</Badge>)}</div>
          <h1 className="h1" style={{ maxWidth: 820 }}>{l.title}</h1>
        </div>
      </div>
      <LessonClient title={l.title} body={body} stopHref={`/path#stop-${stop.n}`} next={next ? { href: `/lesson/${next.slug}`, title: next.title } : undefined} />
    </>
  );
}
