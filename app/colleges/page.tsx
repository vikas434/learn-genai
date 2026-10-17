import type { Metadata } from 'next';
import { Icon } from '@/components/icons';
import { Badge, Button, Eyebrow } from '@/components/ui';
import { ContactForm } from '@/components/ContactForm';
import { STOPS } from '@/lib/content';

export const metadata: Metadata = { title: 'For colleges & placement cells', description: 'Run the learn-genai.in path for a whole batch before drive season.' };

// Illustrative rows for the dashboard mock-up (not real students).
const ROWS = [
  { name: 'Section A', students: 62, stop: 4, pct: 71 },
  { name: 'Section B', students: 58, stop: 3, pct: 55 },
  { name: 'Section C', students: 64, stop: 5, pct: 83 },
  { name: 'Section D', students: 60, stop: 2, pct: 34 },
];

const STEPS = [
  { t: 'Kickoff', d: 'A 45-minute online session for the batch: what the drive tests and how the path works.' },
  { t: 'Two weeks on the path', d: 'Students finish six stops at their own pace, about two hours in total, on their phones.' },
  { t: 'Explain-it-back', d: 'Each student describes one project and where AI did and did not help. Faculty see who is ready.' },
];

export default function Colleges() {
  return (
    <>
      <section className="hero" style={{ paddingBottom: 72 }}>
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <Eyebrow>For colleges & placement cells</Eyebrow>
            <h1 className="h1">Get your batch <span className="mark">drive-ready</span> on AI.</h1>
            <p className="lead">Students are already using AI. Give them a two-hour path to use it well and explain their own work, with a progress view for faculty.</p>
            <div className="row"><Button href="#contact" trailingIcon="arrow">Run a pilot</Button><Button href="/path" variant="secondary">See the path</Button></div>
            <div className="hero__proof"><span><Icon name="check" />Free during the pilot</span><span><Icon name="check" />No installs</span><span><Icon name="check" />Works on phones</span></div>
          </div>
          <div className="dash" aria-label="Faculty progress view, illustrative">
            <div className="dash__bar"><i style={{ background: 'var(--coral)' }} /><i style={{ background: 'var(--sun)' }} /><i style={{ background: 'var(--mint)' }} /><b style={{ marginLeft: 10, fontSize: 13 }}>Batch 2027 · Faculty view</b><span style={{ marginLeft: 'auto' }}><Badge tone="sun" soft>Sample data</Badge></span></div>
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead><tr><th>Section</th><th>Students</th><th>Furthest stop</th><th>Explain-it-back</th></tr></thead>
                <tbody>{ROWS.map((r) => (
                  <tr key={r.name}><td style={{ fontWeight: 700 }}>{r.name}</td><td>{r.students}</td><td>{String(r.stop).padStart(2, '0')} · {STOPS[r.stop - 1].short}</td><td><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div className="minibar"><span style={{ width: `${r.pct}%` }} /></div><span style={{ fontWeight: 700 }}>{r.pct}%</span></div></td></tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--sunk">
        <div className="wrap">
          <div className="section-head"><Eyebrow>How a pilot runs</Eyebrow><h2 className="h2">Three weeks, start to ready.</h2></div>
          <div className="grid-3">
            {STEPS.map((s, i) => (
              <div key={s.t} className="method__card">
                <span className="stop__n" style={{ background: ['var(--mint)', 'var(--sun)', 'var(--grape)'][i] }}>{i + 1}</span>
                <h3 className="h3">{s.t}</h3>
                <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" id="contact" style={{ scrollMarginTop: 80 }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>
          <div className="section-head" style={{ marginBottom: 0 }}>
            <Eyebrow>Talk to us</Eyebrow>
            <h2 className="h2">Bring it to your campus.</h2>
            <p className="lead">Tell us about your batch and drive dates. We reply within two working days with a pilot plan.</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
