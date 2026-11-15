# 0010. The repo is public

Date: 2026-11-15 · Status: accepted

## Context

Vercel's free plan would not deploy from the private repo, so the repo was made public. Everything in it, including its full git history, can now be read by anyone.

## Decision

- Nothing private goes into the repo: no API keys, tokens, `.env` files, personal email addresses, phone numbers, or other people's details.
- Keys for ElevenLabs, YouTube and any model API live only in a local `.env` file. `.env*` is in `.gitignore`.
- Commits use the GitHub no-reply address, never a personal email.
- Every push runs gitleaks in GitHub Actions (`.github/workflows/secrets-scan.yml`). A finding fails the check.
- Before every push, the `publish` skill runs gitleaks locally and scans the diff for personal data, and asks Vikas before pushing.
- Handwritten notes are published as PDFs with metadata removed. Private material (talk prep, Q&A answers) never goes in the repo.

## Scan when the repo went public (2026-11-15)

- gitleaks over all 7 commits on all branches: no leaks found.
- Manual search of the full history: two commits from the earlier prototype (`73738be`, `6af40d4`) carry a personal email address as the commit author. The prototype also documented a default local admin login. That prototype is no longer deployed and the files are deleted, but both remain in history. Whether to rewrite history is decided separately.

## Consequence

Anyone can read and fork the content. In return, readers can check that the lessons come from real handwritten notes.
