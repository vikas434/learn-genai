'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Icon } from './icons';
import { Badge, Button, Feedback, ProgressBar, PromptBox, QuizCheck } from './ui';
import type { Body } from '@/lib/lessons';

type Msg = { me: boolean; text: string };

function Tutor({ title, body }: { title: string; body: Body }) {
  const [log, setLog] = useState<Msg[]>([{ me: false, text: `Hi! I only answer from “${title}”. Ask me anything about it.` }]);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const ask = (text: string) => {
    if (!text.trim() || busy) return;
    setLog((l) => [...l, { me: true, text }]); setQ(''); setBusy(true);
    const canned = body.tutor[text] ?? `Short answer from this lesson: ${body.rule}\n\nThe section “${body.sections[0].h}” above goes into the detail.`;
    setTimeout(() => { setLog((l) => [...l, { me: false, text: canned }]); setBusy(false); }, 900);
  };
  return (
    <aside className="tutor" aria-label="AI tutor">
      <div className="tutor__head">
        <span className="tutor__av"><Icon name="spark" /></span>
        <div style={{ flex: 1 }}><b style={{ display: 'block', fontSize: 15 }}>Lesson tutor</b><span className="muted" style={{ fontSize: 13 }}>Answers from this lesson only</span></div>
        <Badge tone="grape" soft>AI</Badge>
      </div>
      <div className="tutor__log" aria-live="polite">
        {log.map((m, i) => <div key={i} className={`bubble ${m.me ? 'bubble--me' : 'bubble--ai'}`}>{m.text}</div>)}
        {busy && <div className="bubble bubble--ai"><span className="lg-prompt__dots" aria-label="Tutor is writing"><span /><span /><span /></span></div>}
      </div>
      <div className="tutor__chips">{Object.keys(body.tutor).map((k) => <button key={k} className="chip" onClick={() => ask(k)}>{k}</button>)}</div>
      <form className="tutor__form" onSubmit={(e) => { e.preventDefault(); ask(q); }}>
        <label htmlFor="tutor-q" className="sr-only">Ask the tutor</label>
        <input id="tutor-q" className="input" placeholder="Ask about this lesson…" value={q} onChange={(e) => setQ(e.target.value)} />
        <Button type="submit" variant="ai" size="sm" disabled={!q.trim() || busy}>Ask</Button>
      </form>
    </aside>
  );
}

export function LessonClient({ title, body, next, stopHref }: { title: string; body: Body; next?: { href: string; title: string }; stopHref: string }) {
  const [done, setDone] = useState<number[]>([]);
  const mark = (i: number) => setDone((d) => (d.includes(i) ? d : [...d, i]));
  return (
    <>
      <div style={{ position: 'sticky', top: 68, zIndex: 5, background: 'var(--paper)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 24px' }}>
          <Link href={stopHref} style={{ fontSize: 14, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>← Stop</Link>
          <div style={{ flex: 1, minWidth: 0 }}><ProgressBar value={done.length} max={2} label="Lesson progress" /></div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: 'var(--ink-muted)', whiteSpace: 'nowrap' }}>{done.length}/2 checks</span>
        </div>
      </div>
      <div className="wrap section--tight">
        <div className="lesson">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 40, minWidth: 0 }}>
            <article className="prose">
              <p style={{ fontSize: 21, lineHeight: 1.6 }}>{body.intro}</p>
              {body.sections.map((s) => (<div key={s.h}><h2>{s.h}</h2>{s.p.map((p, i) => <p key={i} className={i ? 'muted' : ''}>{p}</p>)}</div>))}
              <Feedback status="info" title="Keep this one">{body.rule}</Feedback>
            </article>
            <section style={{ display: 'grid', gap: 20 }} aria-labelledby="checks-h">
              <h2 id="checks-h" className="h3" style={{ fontSize: 28 }}>Check yourself</h2>
              {body.checks.map((c, i) => (
                <QuizCheck key={i} eyebrow={`Check ${i + 1} of 2`} question={c.q} options={c.options} correctId={c.correct} explainRight={c.right} explainWrong={c.wrong} onCheck={(ok) => ok && mark(i)} />
              ))}
              {done.length === 2 && <Feedback status="correct" title="Lesson complete">Both checks done. Try the prompt below, then move on.</Feedback>}
            </section>
            <section style={{ display: 'grid', gap: 14 }} aria-labelledby="try-h">
              <div><h2 id="try-h" className="h3" style={{ fontSize: 28 }}>Try a prompt you can judge</h2><p className="muted" style={{ margin: '6px 0 0' }}>Ask for something short enough that you can check every word of the answer.</p></div>
              <PromptBox defaultValue={body.prompt} answer={body.answer} />
            </section>
            <div className="row" style={{ justifyContent: 'space-between', paddingTop: 24, borderTop: '2px solid var(--line)' }}>
              <Button href={stopHref} variant="secondary" icon="back">Back to the stop</Button>
              {next ? <Button href={next.href} size="lg" trailingIcon="arrow">Next: {next.title}</Button> : <Button href="/path" size="lg" trailingIcon="arrow">Back to the path</Button>}
            </div>
          </div>
          <Tutor title={title} body={body} />
        </div>
      </div>
    </>
  );
}
