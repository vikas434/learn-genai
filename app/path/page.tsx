import type { Metadata } from 'next';
import { STOPS, lessonsIn, totalMinutes, LESSONS } from '@/lib/content';
import { Button, Eyebrow, LessonRow, StopTracker, TimeChip, Feedback } from '@/components/ui';

export const metadata: Metadata = { title: 'The path', description: 'Six stops from how the tools behave to the lines you do not cross.' };

export default function PathPage() {
  return (
    <>
      <div className="phead">
        <div className="wrap" style={{ display: 'grid', gap: 18 }}>
          <Eyebrow>The path · {STOPS.length} stops · {LESSONS.length} lessons</Eyebrow>
          <h1 className="h1">Six stops to using AI <span className="mark">you can explain.</span></h1>
          <p className="lead">Go in order the first time. After that, jump to whichever stop you need before tomorrow’s interview, review or demo.</p>
          <div className="row"><Button href={`/lesson/${LESSONS[0].slug}`} trailingIcon="arrow">Start at stop 01</Button><TimeChip>about {Math.round(totalMinutes / 60)} hours total</TimeChip></div>
          <div style={{ marginTop: 16, padding: 24, background: 'var(--surface)', border: '2px solid var(--line)', borderRadius: 20 }}>
            <StopTracker stops={STOPS.map((s) => s.short)} current={0} />
          </div>
        </div>
      </div>
      <div className="wrap section" style={{ display: 'grid', gap: 56 }}>
        {STOPS.map((s) => {
          const ls = lessonsIn(s.n);
          return (
            <section key={s.slug} id={`stop-${s.n}`} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 320px) minmax(0, 1fr)', gap: 40, scrollMarginTop: 100 }} className="stop-row">
              <div style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
                <span className="stop__n" style={{ background: `var(--${s.tone})`, width: 52, height: 52, fontSize: 20 }}>{s.n}</span>
                <Eyebrow muted>Stop {String(s.n).padStart(2, '0')}</Eyebrow>
                <h2 className="h3" style={{ fontSize: 30, lineHeight: '36px' }}>{s.title}</h2>
                <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>{s.blurb}</p>
                <TimeChip minutes={ls.reduce((a, l) => a + l.minutes, 0)} />
              </div>
              <div>
                {ls.map((l, i) => <LessonRow key={l.slug} index={i + 1} title={l.title} href={`/lesson/${l.slug}`} status={s.n === 1 && i === 0 ? 'current' : 'todo'} minutes={l.minutes} meta={s.n === 1 && i === 0 ? `Up next · ${l.checks} checks` : `${l.kind} · ${l.checks} checks`} />)}
                {s.n === 6 && <div style={{ marginTop: 16 }}><Feedback status="hint" title="Finish line">The last stop ends with an explain-it-back task: describe one piece of your own work and where AI did and did not help.</Feedback></div>}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
