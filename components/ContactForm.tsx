'use client';
import { useState } from 'react';
import { Button, Feedback } from './ui';

export function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) return <Feedback status="correct" title="Thanks, we’ve got it.">We’ll reply within two working days with a pilot plan for your batch.</Feedback>;
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'grid', gap: 18, padding: 28, borderRadius: 20, border: '2px solid var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow-pop)' }}>
      <div><label className="label" htmlFor="c-name">Your name</label><input id="c-name" className="input" required style={{ width: '100%' }} /></div>
      <div><label className="label" htmlFor="c-college">College</label><input id="c-college" className="input" required style={{ width: '100%' }} /></div>
      <div><label className="label" htmlFor="c-email">Work email</label><input id="c-email" type="email" className="input" required style={{ width: '100%' }} /></div>
      <div><label className="label" htmlFor="c-size">Batch size</label>
        <select id="c-size" className="input" style={{ width: '100%' }} defaultValue="60–200"><option>Under 60</option><option>60–200</option><option>200–500</option><option>500+</option></select>
      </div>
      <Button type="submit" block trailingIcon="arrow">Request a pilot</Button>
    </form>
  );
}
