# learn-genai.in

Short lessons on working with AI, for senior engineers, tech leads and engineering managers. Written like a book: tracks, then lessons, one idea each.

Astro + MDX, static, deployed on Vercel. No accounts, no database, no API keys.

## Run

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
```

## Where things are

| Path | What |
|---|---|
| `GLOSSARY.md` | The meaning of every term used here. Read this first. |
| `docs/adr/` | One short record per decision. |
| `src/data/roadmap.json` | Every track and lesson, in order, with a status. The home page and contents are built from it. |
| `src/content/lessons/<track>/` | Lessons, one MDX file each. |
| `src/data/changelog.json` | The "What's new" list. |
| `public/drawings/<track>/` | Hand-drawn GIFs and their still frames. |
| `raw-notes/<date>/` | Vikas's handwritten notes, typed up. The source for all content. |
| `skills/` | The pipeline that turns notes into lessons, drawings and Shorts, and the scene sources for each drawing. |

## Adding a lesson

1. Write `src/content/lessons/<track>/NN-<slug>.mdx` with `track`, `slug`, `updated` and `sources` in the frontmatter.
2. In `roadmap.json`, set that lesson's `status` to `live` and add `minutes`.
3. Add a line to `changelog.json`.

The build fails if a lesson is marked live and has no file.
