import Link from 'next/link';
import { Icon, type IconName } from './icons';

const NODES: { label: string; href: string; icon: IconName; tone: string; angle: number }[] = [
  { label: 'The path', href: '/path', icon: 'path', tone: 'var(--mint)', angle: -90 },
  { label: 'Prompt lab', href: '/lesson/small-checkable-asks', icon: 'spark', tone: 'var(--grape)', angle: -30 },
  { label: 'AI tutor', href: '/lesson/what-the-drive-is-testing', icon: 'chat', tone: 'var(--grape)', angle: 30 },
  { label: 'Checks', href: '/lesson/what-the-drive-is-testing', icon: 'check', tone: 'var(--sun)', angle: 90 },
  { label: 'Tool shelf', href: '/lesson/five-tools', icon: 'shelf', tone: 'var(--sky)', angle: 150 },
  { label: 'Library', href: '/library', icon: 'book', tone: 'var(--coral)', angle: 210 },
];

/** "How the pieces connect" diagram: six entry points around the core promise. */
export function Hub() {
  const r = 39; // % radius
  return (
    <div className="hub" aria-label="What's inside learn-genai.in">
      <svg className="hub__lines" viewBox="0 0 100 100" aria-hidden="true">
        <circle className="hub__ring" cx="50" cy="50" r={r} vectorEffect="non-scaling-stroke" />
        <circle className="hub__ring" cx="50" cy="50" r={r - 13} vectorEffect="non-scaling-stroke" />
        {NODES.map((n) => {
          const a = (n.angle * Math.PI) / 180;
          return <line key={n.label} className="hub__spoke" x1="50" y1="50" x2={50 + r * Math.cos(a)} y2={50 + r * Math.sin(a)} vectorEffect="non-scaling-stroke" />;
        })}
      </svg>
      <div className="hub__core"><div><b>Use it.<br />Explain it.</b><span>Free for every learner</span></div></div>
      {NODES.map((n, i) => {
        const a = (n.angle * Math.PI) / 180;
        return (
          <Link key={n.label} href={n.href} className="hub__node" style={{ left: `${50 + r * Math.cos(a)}%`, top: `${50 + r * Math.sin(a)}%`, animationDelay: `${i * -1}s` }}>
            <i style={{ background: n.tone }}><Icon name={n.icon} /></i>{n.label}
          </Link>
        );
      })}
    </div>
  );
}
