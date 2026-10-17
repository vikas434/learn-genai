# learn-genai.in

A free path for students, engineers and founders who want to use generative AI on real work, and still explain it.

Next.js 15 (App Router) · React 19 · TypeScript · plain CSS with design tokens. No external services, no runtime API keys.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build check
```

## Deploy on Vercel

Import this repo in Vercel. It is detected as Next.js automatically: no environment variables, no build settings to change. Every branch gets its own preview URL.

## What's where

| Path | What |
|---|---|
| `app/page.tsx` | Home: announcement bar, mega-menu, search-first hero, hub diagram, method, six stops, seats, numbers, prompt sandbox, library preview, FAQ, colleges teaser, newsletter |
| `app/path` | The six stops and their lessons |
| `app/lesson/[slug]` | Lesson: reading, two checks, prompt sandbox, lesson tutor (statically generated for every lesson) |
| `app/library` | Search and filters (seat, stop, length, kind) |
| `app/colleges` | Pilot offer for placement cells, faculty view mock-up, contact form |
| `app/about` | Story, principles, who builds it |
| `lib/content.ts` | Stops, lessons, personas: edit the curriculum here |
| `lib/lessons.ts`, `lib/lessons-more.ts` | Lesson bodies, checks, prompts and tutor answers for all 12 lessons |
| `components/ui.tsx` | Design-system components (Button, Badge, QuizCheck, PromptBox, …) |
| `app/globals.css` | Design tokens (light + dark) and component styles |
| `app/site.css` | Page layout and section styles |
| `docs/teardown.md` | Competitor pattern teardown that shaped this build |

## Prototype notes (wire these up before launch)

- **Prompt sandbox and lesson tutor** return scripted answers. Swap the `setTimeout` replies in `components/ui.tsx` (`PromptBox`) and `components/LessonClient.tsx` (`Tutor`) for a call to your model API route.
- **Newsletter and colleges forms** confirm on the client only. Point them at your email tool or a `/api/contact` route.
- **Lesson tutor** uses scripted answers per lesson (`tutor` in `lib/lessons.ts` / `lib/lessons-more.ts`) and falls back to the lesson’s key rule.
- **Faculty view** on `/colleges` is labelled sample data.
