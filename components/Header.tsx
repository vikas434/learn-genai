'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Icon, type IconName } from './icons';
import { Button } from './ui';

type MenuLink = { href: string; title: string; desc: string; icon: IconName; tone: string };
const MENUS: { id: string; label: string; small?: boolean; links: MenuLink[]; foot?: { text: string; href: string; cta: string } }[] = [
  {
    id: 'learn', label: 'Learn', links: [
      { href: '/path', title: 'The path', desc: 'Six stops, about two hours, start to finish.', icon: 'path', tone: 'var(--mint)' },
      { href: '/library', title: 'Lesson library', desc: 'Search every lesson by stop, length or seat.', icon: 'book', tone: 'var(--sky)' },
      { href: '/lesson/five-tools', title: 'The tool shelf', desc: 'Five kinds of tools and when to leave each closed.', icon: 'shelf', tone: 'var(--sun)' },
      { href: '/lesson/small-checkable-asks', title: 'Prompt lab', desc: 'Practise prompts you can actually check.', icon: 'spark', tone: 'var(--grape)' },
    ],
    foot: { text: 'New here? The first lesson takes 12 minutes.', href: '/lesson/what-the-drive-is-testing', cta: 'Start lesson 01 →' },
  },
  {
    id: 'for', label: 'Who it’s for', links: [
      { href: '/library?seat=students', title: 'Students', desc: 'Placements, projects and vivas.', icon: 'grad', tone: 'var(--mint)' },
      { href: '/library?seat=engineers', title: 'Engineers', desc: 'Repos, reviews and failing tests.', icon: 'code', tone: 'var(--sky)' },
      { href: '/library?seat=founders', title: 'Founders', desc: 'Demos you can explain.', icon: 'rocket', tone: 'var(--coral)' },
      { href: '/colleges', title: 'Colleges & TPOs', desc: 'Run the path for a whole batch.', icon: 'building', tone: 'var(--sun)' },
    ],
  },
];

export function Announcement() {
  const [open, setOpen] = useState(true);
  useEffect(() => { try { if (sessionStorage.getItem('lg-announce') === 'x') setOpen(false); } catch {} }, []);
  if (!open) return null;
  return (
    <div className="announce" role="region" aria-label="Announcement">
      <div className="announce__in wrap">
        <span className="announce__pill">New</span>
        <span>Placement-season track for final-year students. <Link href="/path">See the path →</Link></span>
        <button className="announce__x" aria-label="Dismiss announcement" onClick={() => { setOpen(false); try { sessionStorage.setItem('lg-announce', 'x'); } catch {} }}><Icon name="x" width={16} height={16} /></button>
      </div>
    </div>
  );
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.dataset.theme === 'dark'); }, []);
  const flip = () => {
    const next = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next; setDark(!dark);
    try { localStorage.setItem('lg-theme', next); } catch {}
  };
  return <button className="icon-btn" onClick={flip} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}><Icon name={dark ? 'sun' : 'moon'} /></button>;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { setOpen(null); setDrawer(false); }, [pathname]);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); };
    document.addEventListener('mousedown', onDoc); document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, []);
  return (
    <header className="hdr" ref={ref}>
      <div className="wrap hdr__in">
        <Link href="/" className="brand" aria-label="learn-genai.in home"><span className="brand__dot" aria-hidden="true" />learn-genai.in<span className="brand__tag">Free</span></Link>
        <nav aria-label="Main">
          <ul className="nav">
            {MENUS.map((m) => (
              <li className="nav__item" key={m.id} onMouseEnter={() => setOpen(m.id)} onMouseLeave={() => setOpen(null)}>
                <button className="nav__btn" aria-expanded={open === m.id} aria-controls={`mega-${m.id}`} onClick={() => setOpen(open === m.id ? null : m.id)}>
                  {m.label}<Icon name="chevron" />
                </button>
                {open === m.id && (
                  <div className="mega" id={`mega-${m.id}`} style={{ marginTop: 0 }}>
                    {m.links.map((l) => (
                      <Link key={l.href} href={l.href} className="mega__link">
                        <span className="mega__ic" style={{ background: l.tone }}><Icon name={l.icon} /></span>
                        <span><span className="mega__t">{l.title}</span><span className="mega__d">{l.desc}</span></span>
                      </Link>
                    ))}
                    {m.foot && <div className="mega__foot"><span>{m.foot.text}</span><Link href={m.foot.href}>{m.foot.cta}</Link></div>}
                  </div>
                )}
              </li>
            ))}
            <li><Link className="nav__btn" href="/library" aria-current={pathname === '/library' ? 'page' : undefined}>Library</Link></li>
            <li><Link className="nav__btn" href="/about" aria-current={pathname === '/about' ? 'page' : undefined}>About</Link></li>
          </ul>
        </nav>
        <div className="hdr__right">
          <ThemeToggle />
          <span className="hdr__login"><Button size="sm" href="/lesson/what-the-drive-is-testing">Start free</Button></span>
          <button className="icon-btn hdr__burger" aria-label="Open menu" aria-expanded={drawer} onClick={() => setDrawer(!drawer)}><Icon name={drawer ? 'x' : 'menu'} /></button>
        </div>
      </div>
      {drawer && (
        <div className="drawer wrap">
          <Link href="/path">The path</Link><Link href="/library">Lesson library</Link><Link href="/colleges">For colleges</Link><Link href="/about">About</Link>
          <div style={{ marginTop: 16 }}><Button block href="/lesson/what-the-drive-is-testing">Start free</Button></div>
        </div>
      )}
    </header>
  );
}
