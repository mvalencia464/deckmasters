# Docs archival policy

This project keeps older planning and migration documents for historical context, while keeping day-to-day docs focused on current operations.

## What "archival" means

- Content is kept for reference and decision history.
- It is not the source of truth for current implementation.
- If archival docs conflict with current docs/code, trust current docs and code.

## Source of truth order

1. Runtime code and current config in `src/`, `functions/`, `scripts/`, and root config files.
2. Current docs listed under "Current docs (active)" in `docs/README.md`.
3. Archival docs for context only.

## Current archival set

- `docs/MIGRATION-SEO-ADS-PLAYBOOK.md`
- `docs/site-architecture-prompt-0.md`
- `docs/Core30.md`
- `docs/Copywriting.md`

## When to move a doc to archival

Move a doc to archival when one or more are true:

- It describes a completed migration or one-time rollout.
- It references legacy infrastructure or URL patterns no longer in use.
- A newer project-specific document supersedes it.
- It is primarily prompt/template material rather than current operations.

## Restoration path

If an archival doc becomes relevant again:

- Move it back into current docs in `docs/README.md`.
- Add a short "updated on" note and reconcile mismatches with code.
