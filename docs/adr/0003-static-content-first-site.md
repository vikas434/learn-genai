# 0003. Static, content-first site

Date: 2026-11-15 · Status: accepted

## Context
The site is mostly reading. Content is written by the pipeline as files.

## Decision
Astro with MDX, deployed on Vercel. Lessons are MDX files. Interactive parts (checks, progress) are small islands.

## Consequence
Fast pages, no server to run. Lessons stay plain files that are easy to diff and review. If we later need accounts or a tutor API, we add server routes then.
