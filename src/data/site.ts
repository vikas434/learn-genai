import roadmap from './roadmap.json';

export type LessonRef = { n: number; slug: string; title: string; blurb: string; minutes?: number; status: 'live' | 'planned' };
export type Part = { title: string; lessons: LessonRef[] };
export type Track = { n: number; slug: string; title: string; blurb: string; intro?: string; status: 'in-progress' | 'planned' | 'live'; label?: string; parts?: Part[] };

export const tracks = roadmap.tracks as Track[];
export const lessonsOf = (t: Track): LessonRef[] => (t.parts ?? []).flatMap((p) => p.lessons);
export const isOpen = (t: Track) => lessonsOf(t).some((l) => l.status === 'live');
export const lessonUrl = (t: Track, l: LessonRef) => `/${t.slug}/${l.slug}/`;
export const firstLive = (t: Track) => lessonsOf(t).find((l) => l.status === 'live');
