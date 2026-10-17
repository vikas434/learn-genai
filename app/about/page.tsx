import type { Metadata } from 'next';
import { Button, Eyebrow } from '@/components/ui';

export const metadata: Metadata = { title: 'About', description: 'Why learn-genai.in exists and the principles behind it.' };

const PRINCIPLES = [
  { t: 'Explain beats avoid.', d: 'We never teach students to hide AI use. We teach them to understand and defend what they hand in.', tone: 'mint' },
  { t: 'Judgement over brand names.', d: 'Tools change monthly. The habit of asking small, checkable questions does not.', tone: 'sky' },
  { t: 'Free means free.', d: 'No card, no trial clock, no locked “pro” stop. Every learner gets the whole path.', tone: 'sun' },
  { t: 'Written for real rooms.', d: 'Placement drives, vivas, code reviews and demo days, not abstract scenarios.', tone: 'coral' },
];

export default function About() {
  return (
    <>
      <section className="phead" style={{ paddingBottom: 64 }}>
        <div className="wrap wrap--narrow" style={{ display: 'grid', gap: 20 }}>
          <Eyebrow>About</Eyebrow>
          <h1 className="h1">Every student now has an AI. <span className="mark">Few were taught to use it.</span></h1>
          <p className="lead">learn-genai.in started from a simple worry: students were either avoiding AI out of fear or leaning on it in ways that fell apart the moment an interviewer asked “why?”. Neither prepares anyone for work where AI is everywhere.</p>
          <p className="lead">So we built a short, free path that teaches the part nobody else teaches: how to use these tools on real work and still be the person who understands it.</p>
        </div>
      </section>
      <section className="section" id="principles" style={{ scrollMarginTop: 80 }}>
        <div className="wrap">
          <div className="section-head"><Eyebrow>Principles</Eyebrow><h2 className="h2">What we will and won’t do.</h2></div>
          <div className="grid-2">
            {PRINCIPLES.map((p) => (
              <div key={p.t} className="method__card">
                <span className="stop__n" style={{ background: `var(--${p.tone})` }} aria-hidden="true">✓</span>
                <h3 className="h3">{p.t}</h3>
                <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--sunk">
        <div className="wrap wrap--narrow" style={{ display: 'grid', gap: 18 }}>
          <Eyebrow>Who builds it</Eyebrow>
          <h2 className="h2">Built by an engineer, for students.</h2>
          <p className="lead">learn-genai.in is built by Vikas Ranjan, a software engineer with 14+ years in industry and a part-time PhD research scholar at BITS Pilani. Every lesson is written to answer one question a student will face in a real room.</p>
          <div className="row"><Button href="/path" trailingIcon="arrow">Start the path</Button><Button href="/colleges#contact" variant="secondary">Get in touch</Button></div>
        </div>
      </section>
    </>
  );
}
