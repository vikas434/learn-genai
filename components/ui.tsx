'use client';
// React/TSX port of the learn-genai.in design system components (components/bundle.js).
import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { Icon, type IconName } from './icons';
import type { Tone } from '@/lib/content';

const cx = (...a: (string | false | undefined | null)[]) => a.filter(Boolean).join(' ');

export function Button({ variant = 'primary', size = 'md', icon, trailingIcon, href, block, disabled, onClick, type = 'button', children, className }: {
  variant?: 'primary' | 'secondary' | 'ai' | 'sun' | 'ghost'; size?: 'sm' | 'md' | 'lg'; icon?: IconName; trailingIcon?: IconName;
  href?: string; block?: boolean; disabled?: boolean; onClick?: () => void; type?: 'button' | 'submit'; children: ReactNode; className?: string;
}) {
  const cls = cx('lg-btn', variant !== 'primary' && `lg-btn--${variant}`, size !== 'md' && `lg-btn--${size}`, block && 'lg-btn--block', className);
  const inner = <>{icon && <Icon name={icon} />}<span>{children}</span>{trailingIcon && <Icon name={trailingIcon} />}</>;
  if (href) return <Link className={cls} href={href}>{inner}</Link>;
  return <button type={type} className={cls} disabled={disabled} onClick={onClick}>{inner}</button>;
}

export function Badge({ tone = 'mint', soft, icon, children }: { tone?: Tone | 'neutral'; soft?: boolean; icon?: IconName; children: ReactNode }) {
  return <span className={cx('lg-badge', `lg-badge--${tone}`, soft && 'lg-badge--soft')}>{icon && <Icon name={icon} />}{children}</span>;
}

export function Eyebrow({ muted, children, style }: { muted?: boolean; children: ReactNode; style?: React.CSSProperties }) {
  return <span className={cx('lg-eyebrow', muted && 'lg-eyebrow--muted')} style={style}>{children}</span>;
}

export function TimeChip({ minutes, children }: { minutes?: number; children?: ReactNode }) {
  return <span className="lg-time"><Icon name="clock" />{children ?? `${minutes} min`}</span>;
}

export function ProgressBar({ value, max = 100, label, showCount, tone }: { value: number; max?: number; label?: string; showCount?: boolean; tone?: 'sun' | 'grape' }) {
  const v = Math.max(0, Math.min(max, value)); const pct = (v / max) * 100;
  return (
    <div className={cx('lg-progress', tone && `lg-progress--${tone}`)}>
      {(label || showCount) && <div className="lg-progress__head"><span>{label}</span>{showCount && <span className="lg-progress__count">{v}/{max}</span>}</div>}
      <div className="lg-progress__track" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={v} aria-label={label || 'Progress'}>
        <div className="lg-progress__fill" data-empty={pct === 0 ? 'true' : undefined} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function StopTracker({ stops, current }: { stops: string[]; current: number }) {
  return (
    <ol className="lg-stops" aria-label="Path progress">
      {stops.map((s, i) => {
        const st = i < current ? 'done' : i === current ? 'current' : 'todo';
        return (
          <li key={s} className={`lg-stop lg-stop--${st}`} aria-current={st === 'current' ? 'step' : undefined}>
            <span className="lg-stop__dot">{st === 'done' ? <Icon name="check" /> : i + 1}</span>
            <span className="lg-stop__label">{s}</span>
          </li>
        );
      })}
    </ol>
  );
}

const FB = { correct: ['check', 'Nice, that’s it.'], wrong: ['x', 'Not quite.'], hint: ['bulb', 'Hint'], info: ['info', 'Good to know'] } as const;
export function Feedback({ status = 'correct', title, children }: { status?: keyof typeof FB; title?: ReactNode; children?: ReactNode }) {
  return (
    <div className={`lg-feedback lg-feedback--${status}`} role={status === 'correct' || status === 'wrong' ? 'status' : undefined}>
      <span className="lg-feedback__icon"><Icon name={FB[status][0]} /></span>
      <div><p className="lg-feedback__title">{title ?? FB[status][1]}</p>{children && <p className="lg-feedback__body">{children}</p>}</div>
    </div>
  );
}

export function QuizCheck({ eyebrow, question, options, correctId, explainRight, explainWrong, onCheck }: {
  eyebrow?: string; question: string; options: { id: string; label: string }[]; correctId: string; explainRight: string; explainWrong: string; onCheck?: (ok: boolean) => void;
}) {
  const [sel, setSel] = useState<string | null>(null);
  const [rev, setRev] = useState(false);
  const right = sel === correctId;
  return (
    <div className="lg-quiz">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <p className="lg-quiz__q">{question}</p>
      <div className="lg-quiz__opts" role="group" aria-label={question}>
        {options.map((o, i) => {
          const result = rev ? (o.id === correctId ? 'correct' : o.id === sel ? 'wrong' : 'dim') : undefined;
          return (
            <button key={o.id} type="button" className="lg-quiz__opt" disabled={rev} aria-pressed={!rev && sel === o.id} data-result={result} onClick={() => setSel(o.id)}>
              <span className="lg-quiz__key" aria-hidden="true">{result === 'correct' ? <Icon name="check" /> : result === 'wrong' ? <Icon name="x" /> : 'ABCD'[i]}</span>
              <span>{o.label}</span>
            </button>
          );
        })}
      </div>
      {rev ? (
        <div style={{ display: 'grid', gap: 12 }}>
          <Feedback status={right ? 'correct' : 'wrong'}>{right ? explainRight : explainWrong}</Feedback>
          {!right && <div><Button variant="ghost" onClick={() => { setRev(false); setSel(null); }}>Try again</Button></div>}
        </div>
      ) : (
        <div className="lg-quiz__actions"><Button disabled={!sel} onClick={() => { setRev(true); onCheck?.(sel === correctId); }}>Check answer</Button></div>
      )}
    </div>
  );
}

export function PromptBox({ defaultValue = '', answer, label = 'Your prompt', badge }: { defaultValue?: string; answer: string; label?: string; badge?: ReactNode }) {
  const [val, setVal] = useState(defaultValue);
  const [running, setRunning] = useState(false);
  const [out, setOut] = useState<string | null>(null);
  const run = () => { setRunning(true); setOut(null); setTimeout(() => { setRunning(false); setOut(answer); }, 1300); };
  return (
    <div className="lg-prompt">
      <div className="lg-prompt__head"><span className="lg-prompt__label">{label}</span>{badge}</div>
      <textarea className="lg-prompt__input" value={val} onChange={(e) => setVal(e.target.value)} maxLength={600} rows={3} aria-label={label} placeholder="Ask for something small enough to check…" />
      <div className="lg-prompt__bar">
        <span className="lg-prompt__count">{val.length} / 600</span>
        <Button variant="ai" icon="spark" disabled={!val.trim() || running} onClick={run}>{running ? 'Thinking…' : 'Run prompt'}</Button>
      </div>
      {(running || out) && (
        <div className="lg-prompt__out" aria-live="polite">
          <div className="lg-prompt__out-tag"><Icon name="spark" />Model draft · check it</div>
          {running ? <span className="lg-prompt__dots" aria-label="Model is writing"><span /><span /><span /></span> : out}
        </div>
      )}
    </div>
  );
}

export function LessonRow({ index, title, href, status, minutes, meta }: { index: number; title: string; href: string; status: 'todo' | 'current' | 'done'; minutes: number; meta?: string }) {
  return (
    <Link href={href} className={`lg-lesson lg-lesson--${status}`} aria-current={status === 'current' ? 'step' : undefined}>
      <span className="lg-lesson__num" aria-hidden="true">{status === 'done' ? <Icon name="check" /> : String(index).padStart(2, '0')}</span>
      <span className="lg-lesson__text"><span className="lg-lesson__title">{title}</span><span className="lg-lesson__status">{meta ?? (status === 'done' ? 'Done' : status === 'current' ? 'Up next' : 'Not started')}</span></span>
      <TimeChip minutes={minutes} />
      <span className="lg-lesson__arrow"><Icon name="arrow" /></span>
    </Link>
  );
}
