# learn-genai.in — design

Status: buildable. This describes the app that is already running, plus the next slices that follow from it. It replaces the brainstorm as the document to build from.

Name: **learn-genai.in**
Tagline: **Prompt the Next Era.**
Price: free. No paid tier, no seat cap, no certificate for sale.

## 1. Purpose and audience

learn-genai.in is a short reading path for people who already have a generative AI tool on their laptop and need to use it on real software work without losing the ability to explain the result.

Three audiences, one path:

- A final-year student before a placement drive.
- A software engineer reading unfamiliar code or a failing test.
- A founder who has to demo something a model helped draft.

The product is not a course catalog, a research lab, or a hiring test. A learner can drop into the stop whose "assumes" sentence is already true.

## 2. What is already running

Verified locally: an admin signs in, uploads an mp4, and the clip plays on the Watch page and on the attached lesson. Learners are not asked to sign in.

| Piece | Where it lives | State |
| --- | --- | --- |
| Brand, tagline, audience line | `src/lib/brand.ts` | Done |
| Six stops, twelve lessons, five tools | `src/lib/content.ts` | Done, static TypeScript |
| Home, path, lesson, tool shelf, missing page | `src/app/` | Done |
| Two checks per lesson | `src/components/teach-check.tsx` | Done, client-side, not stored |
| Copyable try-prompt | `src/components/copy-prompt.tsx` | Done |
| Watch page | `src/app/watch/page.tsx` | Done |
| Admin sign-in | `src/app/admin/login/page.tsx`, `src/lib/auth.ts` | Done |
| Upload, edit, hide, delete | `src/app/admin/(panel)/`, `src/lib/admin-actions.ts`, `src/lib/videos.ts` | Done and upload verified |
| Pitch deck and video prompt | `src/app/pitch/page.tsx` | Done, static |

Dev server: `npm run dev` on port 43123.
Prototype admin: `admin@learn-genai.in` / `learn-genai`, overridable with `LEARN_GENAI_ADMIN_EMAIL`, `LEARN_GENAI_ADMIN_PASSWORD`, and `LEARN_GENAI_AUTH_SECRET`.

## 3. Core features

### Learner, no account

- Read the six stops in order, or open one stop.
- Open a lesson: read, watch if a video is published, answer two checks, copy a prompt and compare it with the "good reply" note.
- Open the tool shelf. Each tool says when to open it and when to leave it closed.
- Open Watch and play every published video. Each video links back to its lesson.
- If a lesson has no video, the Watch section is absent. The reading still works.

### Admin, one account

- Sign in with the single email and password.
- Upload an mp4, webm, or mov up to 64 MB. Required fields: title, lesson, file. Description is optional. "Publish" is on by default.
- Edit title, description, lesson, and published flag. Replacing the file is optional.
- Remove a video. The file is deleted from disk and the lesson reading stays.
- Sign out.

### Explicitly out of this version

- Learner accounts, progress, and saved quiz scores.
- Payments, coupons, and certificates.
- More than one admin role.
- A CMS for lesson prose. Lessons stay in `src/lib/content.ts` until a second author needs to edit them without a deploy.
- Comments, transcripts, and auto-captions.

## 4. Tech stack

| Choice | Why |
| --- | --- |
| Next.js 16 App Router, React 19, TypeScript | The site is already this. Server pages read the video list. One client component handles the checks. |
| Tailwind CSS 4 and shadcn/ui (`Button`, `Input`, `Label`) | The paper layout and the admin forms already use them. Do not add a second component library. |
| Server Actions in `src/lib/admin-actions.ts` | Login, upload, update, and delete are form posts. No separate API service. |
| HMAC cookie in `src/lib/auth.ts` | One admin. No user table. `connection()` runs before `Date.now()` so the session check happens on the live request. That is what kept upload from bouncing back to the login page. |
| `data/videos.json` plus `public/uploads/` | Enough for one admin on one machine. The JSON file is the catalog. The file name is a UUID. Lesson prose does not move when a video is attached. |
| No database and no object storage yet | Add them only when the app is deployed somewhere the local disk does not persist. See build order step 4. |

## 5. Data model

### Lesson content (code, not a database)

Defined in `src/lib/content.ts`.

```ts
type Stage = {
  id: string;        // "season" | "basics" | "shelf" | "practice" | "defend" | "lines"
  number: string;    // "01" … "06"
  title: string;
  promise: string;
  assumes: string;
  lessons: Lesson[];
};

type Lesson = {
  slug: string;
  title: string;
  minutes: number;
  summary: string;
  sayThis: string;
  read: { heading: string; paragraphs: string[] }[];
  checks: [Check, Check];
  tryThis: { title: string; prompt: string; good: string };
};

type Check = {
  question: string;
  choices: [string, string, string];
  answer: 0 | 1 | 2;
  why: string;
};

type Tool = {
  slug: string;
  name: string;
  job: string;
  studentHasIt: string;
  useWhen: string[];
  leaveWhen: string[];
  sitting: string;
};
```

Helpers already exported: `allLessons`, `lessonBySlug`, `neighbors`, `stageById`, `toolBySlug`.

The six stage ids and the twelve lesson slugs are the stable keys videos attach to. Do not rename a slug without updating `data/videos.json`.

### Video catalog (disk)

`VideoRecord` in `src/lib/videos.ts`:

```ts
type VideoRecord = {
  id: string;           // UUID
  title: string;
  description: string;
  lessonSlug: string;   // must match a lesson slug
  published: boolean;
  filename: string;     // "<uuid>.mp4" | ".webm" | ".mov"
  createdAt: string;    // ISO timestamp
};
```

Stored as a JSON array in `data/videos.json`. Bytes live at `public/uploads/<filename>` and are served as `/uploads/<filename>`. `public/uploads/*` is gitignored. A clone starts with an empty catalog.

Accepted types: `video/mp4`, `video/webm`, `video/quicktime`. Anything else is rejected. Cap: 64 MB (`experimental.serverActions.bodySizeLimit` in `next.config.ts`).

### Admin session (cookie, not a row)

Cookie name: `learn_genai_admin`. Value: `admin.<expiryMillis>.<hmac>`. HttpOnly, SameSite lax, path `/`, one week. There is no session table.

## 6. Routes and files

```text
src/app/layout.tsx                         header, footer, fonts
src/app/page.tsx                           home
src/app/path/page.tsx                      six stops
src/app/path/[stage]/page.tsx              one stop
src/app/lessons/[slug]/page.tsx            read, watch, checks, try
src/app/tools/page.tsx
src/app/tools/[slug]/page.tsx
src/app/watch/page.tsx                     published videos only
src/app/pitch/page.tsx                     deck, tagline options, video prompt
src/app/not-found.tsx
src/app/admin/login/page.tsx
src/app/admin/(panel)/layout.tsx           redirects if the cookie is missing
src/app/admin/(panel)/page.tsx             library
src/app/admin/(panel)/videos/new/page.tsx
src/app/admin/(panel)/videos/[id]/page.tsx
src/components/site-header.tsx
src/components/teach-check.tsx             "use client"
src/components/copy-prompt.tsx             "use client"
src/components/lesson-select.tsx
src/components/ui/                         button, input, label
src/lib/brand.ts
src/lib/content.ts
src/lib/auth.ts
src/lib/videos.ts
src/lib/admin-actions.ts                   "use server"
data/videos.json
public/uploads/                            runtime files, not committed
```

Public routes and what they render:

| Route | Renders |
| --- | --- |
| `/` | Tagline, three doors (path, shelf, first lesson), three audiences, stop 01 lessons |
| `/path` | Six stops with promise, assumes, and lesson links |
| `/path/[stage]` | One stop and its lessons |
| `/lessons/[slug]` | Read, then Watch if any published video matches the slug, then two checks, then the prompt |
| `/tools`, `/tools/[slug]` | The five tools |
| `/watch` | Published videos, newest first, each with a player and a lesson link |
| `/pitch` | Ten slides, tagline options, the founder-video prompt |
| `/admin/login` | Email and password |
| `/admin` | Every video, published or hidden |
| `/admin/videos/new` | Upload form |
| `/admin/videos/[id]` | Player, edit form, remove |

Unknown lesson, stage, tool, or video ids call `notFound()`.

## 7. User flows

### Learner reads a lesson

1. Home → Open the path, or Sit the first lesson.
2. `/lessons/what-companies-test` loads the lesson from `content.ts` and calls `videosForLesson(slug)`.
3. The reader sees the "say this" line, the reading, the checks, and the prompt.
4. Choosing a check shows the stored explanation in the browser. Nothing is posted.
5. Copy prompt writes the prompt to the clipboard. The "good reply" note stays on the page so the learner can judge the model's answer.

### Learner watches

1. Admin has published a video whose `lessonSlug` matches.
2. The lesson page renders a `<video controls>` with `src` `/uploads/<filename>` between Read and Make sense.
3. `/watch` lists the same published set. Hidden videos are absent from both pages.

### Admin uploads

1. `/admin` with no cookie redirects to `/admin/login`.
2. `loginAction` checks the email and password with a constant-time compare, sets the cookie, redirects to `/admin`.
3. `/admin/videos/new` posts `uploadVideoAction`.
4. The action checks the cookie, requires a title, a real lesson slug, and a file, writes the bytes, appends a `VideoRecord`, redirects to `/admin/videos/[id]?saved=1`.
5. A bad type or a missing field redirects back to the form with `?error=1`.
6. Edit and delete use `updateVideoAction` and `deleteVideoAction`. Unpublish is the published checkbox cleared, then Save.

The sign-out button in the admin bar is its own form. It must not be nested inside the upload form.

## 8. Build order

Start from the tree above. Do not rewrite it.

1. **Keep the verified slice.** Do not reopen auth or the upload path unless a regression shows up. The check that matters: sign in, upload an mp4 under 64 MB, see it on `/watch` and on the lesson, hide it, confirm both pages drop it, delete it, confirm the reading remains.
2. **Content pass in `src/lib/content.ts` only.** The stage promises already speak to students, engineers, and founders. Lesson bodies are still placement-heavy. Edit the prose in place. Do not move lessons into the database. Do not rename slugs that videos already point at (`what-companies-test` is the one used in the verified upload).
3. **Empty and error copy.** Watch with an empty `videos.json` already explains that no video is published. Keep that. Confirm `/admin/login?error=1` and `/admin/videos/new?error=1` stay specific.
4. **Deploy only when the disk is a problem.** The JSON file and `public/uploads` work on one machine. For a host with an ephemeral disk, move bytes to object storage and the catalog to a single table with the same `VideoRecord` fields. Keep the server actions. Do not add learner accounts in that step.
5. **Leave pitch as a page.** `/pitch` is the deck and the video prompt. It does not need a CMS.

After step 2, the site is the product described in the brainstorm: a free path, an admin who can attach a clip, and a learner who can watch it without an account.
