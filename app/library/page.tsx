import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Eyebrow } from '@/components/ui';
import { LibraryClient } from '@/components/LibraryClient';
import { LESSONS } from '@/lib/content';

export const metadata: Metadata = { title: 'Lesson library', description: 'Search every learn-genai.in lesson by stop, length or seat.' };

export default function LibraryPage() {
  return (
    <>
      <div className="phead">
        <div className="wrap" style={{ display: 'grid', gap: 16 }}>
          <Eyebrow>Lesson library</Eyebrow>
          <h1 className="h1">Every lesson, <span className="mark">one search away.</span></h1>
          <p className="lead">{LESSONS.length} lessons across six stops. Filter by who you are, how long you have, or what kind of lesson you want.</p>
        </div>
      </div>
      <div className="wrap section--tight">
        <Suspense fallback={<div className="empty">Loading lessons…</div>}><LibraryClient /></Suspense>
      </div>
    </>
  );
}
