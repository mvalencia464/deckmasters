# Zaraz docs index

This folder documents how conversion tracking is wired through Cloudflare Zaraz for this project.

## Canonical implementation in the app

- `src/lib/zaraz-tracking.ts` — typed helpers and event names used by the site.
- `src/layouts/Layout.astro` — auto-wires `tel:` click tracking.
- `src/pages/sale-confirmed.astro` — protected internal sale-confirmation tracking page.
- `src/pages/api/sale-webhook.ts` — token-protected webhook endpoint that returns tracking HTML.

Use those files as source-of-truth when behavior and docs differ.

## Files in this folder

- `SETUP-GUIDE.md` — step-by-step dashboard setup and implementation flow.
- `zaraz-config.json` — importable template for tools/triggers/actions (replace placeholder IDs).
- `zaraz-email-hasher-worker.js` — Worker Variable example for email hashing.
- `zaraz-tracking.ts` — copy template that mirrors app helper patterns.
- `sale-webhook.ts` — copy template for webhook pattern.

## Current event contract

These event names are emitted by the app helper and should stay aligned with Zaraz triggers:

- `phone_click`
- `form_submit`
- `sale_complete`

Primary event fields:

- `hashed_email` via `zaraz.set()` (for enhanced conversions where configured)
- `sale_value` and `currency` on `sale_complete`
- `order_id` on `sale_complete` for dedupe

## Notes

- Correct spelling is `zaraz` (not `zeraz`).
- Zaraz is injected by Cloudflare; no extra `<script>` tag is required in templates.
