# 0006. Pipeline: propose, approve, build, review, publish

Date: 2026-11-15 · Status: accepted

## Decision
For each batch of notes the pipeline: (1) saves the raw notes by date, (2) writes a proposal of lesson, drawing, lab and Short changes, (3) waits for Vikas's approval, (4) builds, (5) waits for his review of audio and video, (6) checks for personal data and secrets, pushes, and updates the changelog.

## Consequence
Nothing reaches the site without two approvals. The pipeline skill lives in `skills/` and changes only with approval.
