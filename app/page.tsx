import Link from 'next/link';
import { Hub } from '@/components/Hub';
import { Icon } from '@/components/icons';
import { Badge, Button, Eyebrow, Feedback, PromptBox, TimeChip } from '@/components/ui';
import { Counter, HeroSearch, Newsletter, Reveal } from '@/components/bits';
import { INCLUDES, LESSONS, PERSONAS, STOPS, lessonsIn, totalMinutes } from '@/lib/content';

const SITUATIONS = ['Placement drives', 'Final-year projects', 'Code reviews', 'Vivas', 'Hackathons', 'Demo days', 'Internships', 'Take-home assignments'];
const TONES = ['var(--mint)', 'var(--sun)', 'var(--coral)', 'var(--grape)', 'var(--sky)'];

const FAQ = [
  ['Is it really free?', 'Yes. Every stop, lesson, check and prompt exercise is free, with no card and no trial clock. Colleges can ask us to run it for a whole batch, also free during the pilot.'],
  ['Will this get me in trouble for using AI?', 'The opposite. The first stop is about exactly where AI is fine, where it is not, and how to show a reviewer the work is yours.'],
  ['Do I need to know how to code?', 'No. Stops 1–3 and 6 need no code at all. Engineers get extra lessons on repos and failing tests in stops 4 and 5.'],
  ['Which AI tools does it teach?', 'Five kinds of tools rather than five brand names: chat, code assistants, cited search, notebook helpers and diagram makers. Brands change every month; the judgement does not.'],
  ['How long does it take?', `About ${Math.round(totalMinutes / 60)} hours for all twelve lessons. Each lesson is 8–15 minutes, so it fits between classes.`],
  ['Is there a certificate?', 'Not yet. Each stop ends with a short explain-it-back task you can show a recruiter; a shareable completion page is next on the roadmap.'],
];

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <Eyebrow>Free for every learner</Eyebrow>
            <h1 className="display">Prompt the <span className="mark">Next Era.</span></h1>
            <p className="lead">The free path for students, engineers and founders who want to use generative AI on real work, and still explain every line of it.</p>
            <HeroSearch />
            <div className="hero__proof">
              <span><Icon name="check" />Six stops, about two hours</span>
              <span><Icon name="check" />No sign-up to start</span>
              <span><Icon name="check" />Built for phones</span>
            </div>
          </div>
          <div><Hub /></div>
        </div>
      </section>

      {/* ---------- Situations strip ---------- */}
      <div className="strip" aria-label="Made for the moments that matter">
        <div className="strip__track">
          {[...SITUATIONS, ...SITUATIONS].map((s, i) => (
            <span key={i} className="strip__item" aria-hidden={i >= SITUATIONS.length}><i style={{ background: TONES[i % TONES.length] }} />{s}</span>
          ))}
        </div>
      </div>

      {/* ---------- Method ---------- */}
      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <Eyebrow>How every lesson works</Eyebrow>
            <h2 className="h2">Read it. Check it. <span className="mark">Try it.</span></h2>
            <p className="lead">Twelve minutes, three moves. You leave each lesson with one thing you can do tomorrow and the reason it works.</p>
          </Reveal>
          <div className="grid-3 method">
            <Reveal delay={0}>
              <div className="method__card">
                <div className="method__art" aria-hidden="true">
                  <div style={{ width: '100%', display: 'grid', gap: 8 }}>
                    <div style={{ height: 10, width: '70%', borderRadius: 99, background: 'var(--ink)' }} />
                    <div style={{ height: 8, width: '100%', borderRadius: 99, background: 'var(--line-soft)' }} />
                    <div style={{ height: 8, width: '92%', borderRadius: 99, background: 'var(--line-soft)' }} />
                    <div style={{ height: 8, width: '60%', borderRadius: 99, background: 'var(--sun)' }} />
                    <div style={{ height: 8, width: '84%', borderRadius: 99, background: 'var(--line-soft)' }} />
                  </div>
                </div>
                <span className="method__num">01 · READ</span>
                <h3 className="h3">A short, plain lesson</h3>
                <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>Eight to fifteen minutes on one idea, written for the situation you are actually in.</p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="method__card">
                <div className="method__art" aria-hidden="true">
                  <div style={{ width: '100%', display: 'grid', gap: 8 }}>
                    {['A', 'B', 'C'].map((k) => (
                      <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 6, borderRadius: 10, border: '2px solid var(--line)', background: k === 'B' ? 'var(--mint-soft)' : 'var(--surface)' }}>
                        <span style={{ width: 22, height: 22, borderRadius: 6, border: '2px solid var(--line)', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 800, background: k === 'B' ? 'var(--mint)' : 'var(--surface-sunk)', color: 'var(--on-bright)' }}>{k === 'B' ? '✓' : k}</span>
                        <span style={{ height: 6, flex: 1, borderRadius: 99, background: 'var(--line-soft)' }} />
                      </div>
                    ))}
                  </div>
                </div>
                <span className="method__num">02 · CHECK</span>
                <h3 className="h3">Two checks, with the why</h3>
                <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>Every answer explains itself. Wrong is not a red cross, it is a reason.</p>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="method__card">
                <div className="method__art" aria-hidden="true" style={{ alignItems: 'stretch', flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, padding: '8px 10px', borderRadius: 8, background: 'var(--surface)', border: '1.5px solid var(--line-soft)' }}>Explain this test in 2 lines.</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, padding: '8px 10px', borderRadius: 8, background: 'var(--grape-soft)', border: '2px solid var(--line)' }}>✦ Model draft · check it</div>
                </div>
                <span className="method__num">03 · TRY</span>
                <h3 className="h3">One prompt you can judge</h3>
                <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>A sandbox and an AI tutor that cites the lesson, so you learn to check a draft before you trust it.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Six stops ---------- */}
      <section className="section section--sunk">
        <div className="wrap">
          <Reveal className="section-head" >
            <Eyebrow>The path</Eyebrow>
            <h2 className="h2">Six stops. About two hours. Free.</h2>
            <p className="lead">From how the tools behave to the lines you do not cross. Go in order, or jump to the stop you need tonight.</p>
          </Reveal>
          <div className="stops">
            {STOPS.map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}>
                <Link href={`/path#stop-${s.n}`} className="stop" style={{ height: '100%' }}>
                  <span className="stop__n" style={{ background: `var(--${s.tone})` }}>{s.n}</span>
                  <span className="stop__t">{s.title}</span>
                  <span className="muted" style={{ fontSize: 14, lineHeight: 1.45 }}>{s.blurb}</span>
                  <span className="stop__m">{lessonsIn(s.n).length} lessons · {lessonsIn(s.n).reduce((a, l) => a + l.minutes, 0)} min</span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="row" style={{ marginTop: 36 }}>
            <Button href="/path" trailingIcon="arrow">Open the path</Button>
            <Button href="/lesson/what-the-drive-is-testing" variant="secondary" icon="play">Start lesson 01</Button>
          </div>
        </div>
      </section>

      {/* ---------- Seats ---------- */}
      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <Eyebrow>Built for where you are</Eyebrow>
            <h2 className="h2">Pick your seat.</h2>
          </Reveal>
          <div className="grid-3">
            {PERSONAS.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <Link href={`/library?seat=${p.id}`} className={`lg-card lg-card--${p.tone} lg-card--interactive`} style={{ height: '100%' }}>
                  <span className="lg-card__blob" aria-hidden="true">{p.name[0]}</span>
                  <h3 className="lg-card__title">{p.name}</h3>
                  <p className="lg-card__body"><b style={{ color: 'var(--ink)' }}>{p.line}</b> {p.detail}</p>
                  <div className="lg-card__footer"><span style={{ fontWeight: 700, fontSize: 15 }}>{LESSONS.filter((l) => l.personas.includes(p.id)).length} lessons for you</span><Icon name="arrow" width={20} height={20} /></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Numbers ---------- */}
      <section className="section--tight">
        <div className="wrap">
          <Reveal>
            <div className="stats">
              <div className="stat"><div className="stat__n"><Counter to={STOPS.length} /></div><div className="stat__l">stops on the path</div></div>
              <div className="stat"><div className="stat__n"><Counter to={LESSONS.length} /></div><div className="stat__l">lessons, 8–15 min each</div></div>
              <div className="stat"><div className="stat__n">~<Counter to={Math.round(totalMinutes / 60)} />h</div><div className="stat__l">to finish everything</div></div>
              <div className="stat"><div className="stat__n">₹<Counter to={0} /></div><div className="stat__l">forever, for every learner</div></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Try it ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="grid-2" style={{ gap: 56, alignItems: 'center' }}>
            <Reveal className="section-head" >
              <Eyebrow>Try it now</Eyebrow>
              <h2 className="h2">Write a prompt you can judge.</h2>
              <p className="lead">Every lesson ends here. You ask, the model drafts, and you check the draft before you trust it.</p>
              <div className="includes" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', marginTop: 12 }}>
                {INCLUDES.map((x) => <div key={x.label} className="include"><i style={{ background: `var(--${x.tone})` }}><Icon name="check" /></i>{x.label}</div>)}
              </div>
            </Reveal>
            <Reveal className="" delay={120}>
              <div style={{ minWidth: 0, display: 'grid', gap: 16 }}>
                <PromptBox badge={<Badge tone="grape" soft>Try it</Badge>} defaultValue="I have a placement interview Friday. Ask me three questions about my final-year project that a reviewer would ask, one at a time."
                  answer={'Question 1 of 3:\nWhy did you choose this approach over the simplest one that would have worked? Walk me through the trade-off.'} />
                <Feedback status="hint" title="What makes this a good prompt">It asks for something small, it is about your own work, and you can judge every word of the answer.</Feedback>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Library preview ---------- */}
      <section className="section section--sunk">
        <div className="wrap">
          <Reveal className="section-head">
            <Eyebrow>Lesson library</Eyebrow>
            <h2 className="h2">Find the lesson for tonight.</h2>
          </Reveal>
          <div className="grid-3">
            {LESSONS.filter((l) => ['what-the-drive-is-testing', 'debug-a-failing-test', 'demo-day-prompts'].includes(l.slug)).map((l, i) => (
              <Reveal key={l.slug} delay={i * 100}>
                <Link href={`/lesson/${l.slug}`} className="lcard" style={{ height: '100%' }}>
                  <div className="lcard__top"><Badge tone={STOPS[l.stop - 1].tone} soft>Stop {String(l.stop).padStart(2, '0')}</Badge><TimeChip minutes={l.minutes} /></div>
                  <h3 className="lcard__t">{l.title}</h3>
                  <p className="lcard__d">{l.summary}</p>
                  <div className="lcard__meta"><Badge tone="neutral">{l.kind}</Badge><span className="muted" style={{ fontSize: 14 }}>{l.checks} checks</span></div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: 32 }}><Button href="/library" variant="secondary" trailingIcon="arrow">Browse all {LESSONS.length} lessons</Button></div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section">
        <div className="wrap wrap--narrow">
          <Reveal className="section-head section-head--center">
            <Eyebrow>Questions students ask</Eyebrow>
            <h2 className="h2">Before you start.</h2>
          </Reveal>
          <div style={{ display: 'grid', gap: 12 }}>
            {FAQ.map(([q, a]) => (
              <details key={q} className="faq">
                <summary>{q}<Icon name="chevron" width={18} height={18} /></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Colleges ---------- */}
      <section className="section--tight">
        <div className="wrap">
          <Reveal>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between', padding: 32, borderRadius: 'var(--radius-xl)', border: '2px solid var(--line)', background: 'var(--sky-soft)' }}>
              <div style={{ display: 'grid', gap: 8, maxWidth: 640 }}>
                <Eyebrow style={{ color: 'var(--ink)' }}>For colleges & placement cells</Eyebrow>
                <h2 className="h3" style={{ fontSize: 28, lineHeight: '34px' }}>Run the path for a whole batch before drive season.</h2>
                <p className="muted" style={{ margin: 0 }}>A progress view for faculty, a kickoff session, and the same free lessons.</p>
              </div>
              <Button href="/colleges" variant="secondary" trailingIcon="arrow">For colleges</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="cta">
              <span className="cta__blob" style={{ width: 220, height: 220, right: -60, top: -70, background: 'var(--sun)' }} aria-hidden="true" />
              <span className="cta__blob" style={{ width: 140, height: 140, right: 120, bottom: -60, background: 'var(--grape)' }} aria-hidden="true" />
              <div style={{ position: 'relative', zIndex: 1, maxWidth: 620 }}>
                <h2 className="h2">Use AI on real work. Still explain every line.</h2>
                <p style={{ fontSize: 18, lineHeight: 1.6, margin: '14px 0 0' }}>Start the first lesson now, or get one short email when a new stop goes live.</p>
                <div className="row" style={{ marginTop: 24 }}><Button href="/lesson/what-the-drive-is-testing" variant="secondary" size="lg" trailingIcon="arrow">Start lesson 01</Button></div>
                <Newsletter />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
