import Link from 'next/link';

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 320 }}>
            <Link href="/" className="brand"><span className="brand__dot" aria-hidden="true" />learn-genai.in</Link>
            <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>A free path for students, engineers and founders who want to use generative AI on real work, and still explain it.</p>
          </div>
          <div><h4>Learn</h4><ul><li><Link href="/path">The path</Link></li><li><Link href="/library">Lesson library</Link></li><li><Link href="/lesson/five-tools">Tool shelf</Link></li><li><Link href="/lesson/small-checkable-asks">Prompt lab</Link></li></ul></div>
          <div><h4>For</h4><ul><li><Link href="/library?seat=students">Students</Link></li><li><Link href="/library?seat=engineers">Engineers</Link></li><li><Link href="/library?seat=founders">Founders</Link></li><li><Link href="/colleges">Colleges & TPOs</Link></li></ul></div>
          <div><h4>Company</h4><ul><li><Link href="/about">About</Link></li><li><Link href="/about#principles">Principles</Link></li><li><Link href="/colleges#contact">Contact</Link></li></ul></div>
        </div>
        <div className="ftr__bottom"><span>© 2026 learn-genai.in · Free for every learner.</span><span>Made in India for everyone learning to work with AI.</span></div>
      </div>
    </footer>
  );
}
