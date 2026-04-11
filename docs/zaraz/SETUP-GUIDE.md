# Zaraz Tracking Setup — deckmastersak.com
## Complete Implementation Guide

---

## Your IDs (already filled in `zaraz-config.json`)

| What | Value |
|---|---|
| GA4 Stream ID | `5964125496` |
| GA4 Measurement ID | `G-CLD2MQ2F7L` |
| Google Ads Conversion ID | `AW-879524969` (confirmed — "Form Fill" tag snippet shows this ID) |
| Meta Pixel ID | `492022321570146` |

---

## Google Ads Conversion Actions — What Exists and What Goes Where

| Conversion Action | Status in Google Ads | Managed by |
|---|---|---|
| **Form Fill** | Needs attention (tag not installed) | ✅ Zaraz → fires on `form_submit` — fix by adding label to Zaraz |
| **various - form** | No recent conversions | ⚠️ Likely old/MCC-level duplicate — check label, set to Secondary or remove |
| **Calls from Ads** | Active, working | 🔁 Google auto-forwarding number — no Zaraz tag needed |
| **Contact** | Active | 🔁 GBP click — no Zaraz tag needed |
| **Get directions** | Active | 🔁 GBP action — no Zaraz tag needed |
| **Download** | Misconfigured | ❌ Ignore / remove |

> **Phone calls from website (tel: link clicks)** — "Calls from Ads" is Google's call forwarding number, not a website click tracker. A separate "Phone Calls from Website" conversion action needs to be created (category: Phone call lead, type: Website) to track tel: link clicks via Zaraz.

> **To get the conversion label for "Form Fill":** Google Ads → Goals → Conversions → Form Fill → Tag Setup → the label is a short alphanumeric string (e.g. `AbCdEfGhIjKl`). Add it to `zaraz-config.json` → `google_ads.actions.lead_conversion.settings.conversionLabel`.

---

## Step 1 — Zaraz Dashboard Setup

Navigate to: **Cloudflare Dashboard → deckmastersak.com → Zaraz**

> **Fastest path:** Use the pre-filled `docs/zaraz/zaraz-config.json` file.
> Go to **Tools Configuration → ⋮ menu (top right) → Import** and paste the file contents.
> Then skip to Step 3 for the email hasher variable (triggers are already in the JSON).
>
> **Import format (Cloudflare API / dashboard import):** Each trigger must include `excludeRules` (often `[]`) and **`loadRules`**, not `rules`. Match rules use `id`, `match` (variable label such as `Event Name`), **`op`** in uppercase (`EQUALS`, `CONTAINS`, …), and `value`. Path-based rules use the same shape with `match` set to the property path (for example `system.page.url.pathname` in exports) instead of `Event Name`.
>
> **Managed tools (GA4, Google Ads, Meta):** Each tool in `tools` must look like a **Zaraz managed component**: `type` must be `"component"` (not `"GA4"` / `"GOOGLE_ADS"`). Include **`component`** (`google-analytics-4`, `google-ads`, `facebook-pixel`), **`blockingTriggers`**: `[]`, **`permissions`**: `[]`, and **`defaultFields`**: `{}` (or fields copied from a dashboard **Export**). Each **`actions[...]`** entry needs **`blockingTriggers`**: `[]` and the **NeoEvent** fields **`actionType`**, **`firingTriggers`**, and **`data`** (object; `{}` when there are no extra fields). Dashboard “settings” belong inside **`data`**, not a sibling `settings` key. If import still fails, export your current Zaraz JSON once and copy the exact `tools` / `actions` shape from that file, then merge in our IDs and triggers.

### 1a. Add Google Analytics 4 (manual)

1. Tools Configuration → Third-party tools → **Add tool** → Google Analytics 4
2. Enter Measurement ID: **`G-CLD2MQ2F7L`**
3. Enable **Automatic Events** (pageview is handled automatically)
4. Add these Custom Actions (Tools → GA4 → Edit → Add Action):

| Action Name | Firing Trigger | Event Name | Extra fields |
|---|---|---|---|
| Form Lead | FormSubmit | `generate_lead` | `method: website_form` |
| Phone Call | PhoneCallClick | `generate_lead` | `method: phone_call` |
| Sale | SaleComplete | `purchase` | `value: {{ client.sale_value }}`, `currency: USD` |

### 1b. Add Google Ads (manual)

1. Add tool → **Google Ads**
2. Enter Conversion ID: **`AW-879524969`** (confirmed — "Form Fill" tag snippet shows this ID)
3. Add these Conversion Actions:

| Action Name | Firing Trigger | Conversion Label | Enhanced Conv. |
|---|---|---|---|
| Phone Calls from Website | PhoneCallClick | `Phone Calls from Website` | ✅ `{{ client.hashed_email }}` |
| Quote Form Lead | FormSubmit | `JZz9CKWE3KUBEOn4saMD` | ✅ `{{ client.hashed_email }}` |
| Sale | SaleComplete | `JZz9CKWE3KUBEOn4saMD` | ✅ `{{ client.hashed_email }}` + `{{ client.sale_value }}` |

### 1c. Add Meta Pixel (manual)

1. Add tool → **Meta Pixel**
2. Enter Pixel ID: **`492022321570146`**
3. Add Actions:

| Action Name | Firing Trigger | Event Type |
|---|---|---|
| Pageview | Pageview | PageView |
| Lead | FormSubmit | Lead |
| Purchase | SaleComplete | Purchase |

---

## Step 2 — Create Triggers (or use `zaraz-config.json`)

If you **import** `zaraz-config.json`, triggers are already defined with `loadRules` matching `zaraz.track()` from the site.

To create them manually: Zaraz → Tools Configuration → **Triggers** → Create trigger:

### Trigger: Pageview
| Rule type | Variable name | Match operation | Match string |
|---|---|---|---|
| Match rule | Event Name | Equals | `Pageview` |

### Trigger: FormSubmit
| Rule type | Variable name | Match operation | Match string |
|---|---|---|---|
| Match rule | Event Name | Equals | `form_submit` |

### Trigger: PhoneCallClick
| Rule type | Variable name | Match operation | Match string |
|---|---|---|---|
| Match rule | Event Name | Equals | `phone_click` |

### Trigger: SaleComplete
| Rule type | Variable name | Match operation | Match string |
|---|---|---|---|
| Match rule | Event Name | Equals | `sale_complete` |

---

## Step 3 — Email hasher: deploy a Worker, then attach it in Zaraz

`zaraz-config.json` ships with **`variables`: `{}`** so import does not fail. Worker variables are wired to a **real Cloudflare Worker** — Zaraz does **not** show a code editor on the Variables screen. When you choose **Worker**, you only get a **dropdown of Workers already deployed** on your account (for example `form4exhibit`, `beta`). That is expected.

### 3a — Deploy the Worker (where the code goes)

1. Cloudflare dashboard → **Workers & Pages** → **Create application** → **Create Worker**.
2. Name it something clear, e.g. **`zaraz-hashed-email`** (or any unused name).
3. **Replace** the default “Hello world” code with the full contents of **`docs/zaraz/zaraz-email-hasher-worker.js`**.
4. **Save and deploy.**

Official reference: [Worker Variables](https://developers.cloudflare.com/zaraz/variables/worker-variables/) (Zaraz sends `{ system, client }` as JSON POST; the Worker’s **response body** is the variable value).

### 3b — Create the Zaraz variable (dropdown only)

1. **Zaraz** → your site → **Tag setup** → **Variables** → **Create variable**.
2. **Variable name:** `hashed_email`
3. **Variable type:** **Worker**
4. **Worker:** choose **`zaraz-hashed-email`** (the Worker you just deployed) — not unrelated apps like `form4exhibit` unless that Worker is intentionally the same logic.
5. **Save.**

Do **not** use type **String** for this; that only stores a fixed text value, not a Worker.

This variable is referenced as `{{ client.hashed_email }}` in Enhanced Conversion fields. The site sets `zaraz.set("hashed_email", …)` from `src/lib/zaraz-tracking.ts`; the deployed Worker reads `client` from the [Zaraz Context](https://developers.cloudflare.com/zaraz/reference/context/) and returns the hash for tools that need it.

---

## Step 4 — Astro project files (already done)

These are already implemented:
- `src/lib/zaraz-tracking.ts` — typed helpers for all conversion events
- `src/layouts/Layout.astro` — auto-tracks all `tel:` link clicks
- `src/components/QuoteForm.astro` — fires `form_submit` on quote form submit
- `src/pages/sale-confirmed.astro` — fires `sale_complete` (token-protected)
- `src/pages/api/sale-webhook.ts` — CRM webhook endpoint (optional)

---

## Step 5 — Google Ads Enhanced Conversions (TODO)

In Google Ads:
1. **Goals → Conversions → Settings → Enhanced conversions for leads → Turn ON**
2. Select **"Manually set up enhanced conversions"** (Zaraz handles the tag)
3. For each conversion action → **Tag Setup** → confirm the hashed email field maps to `email`

> This must be done before enhanced conversion data will appear in Google Ads reports.
> Zaraz already passes `{{ client.hashed_email }}` on every conversion — the Google Ads
> side just needs to be told to accept it.

---

## Step 6 — Closing the Loop (Sale Tracking)

Since deck sales close offline (phone/in-person), you have two options:

### Option A: Protected confirmation page (simplest — already built)
After marking a job won in your CRM/notes, open:
```
https://deckmastersak.com/sale-confirmed?token=YOUR_SALE_CONFIRM_TOKEN&email=customer@email.com&value=4500&order=JOB-123
```
- Page fires `trackSale()` automatically
- `SALE_CONFIRM_TOKEN` must be set in Cloudflare Pages → Settings → Environment variables

### Option B: Google Ads Offline Conversion Import
- Export won jobs monthly from your CRM as CSV
- Google Ads → Goals → Conversions → Upload → upload GCLID + conversion data
- More work but works even without a website touchpoint

---

## Step 7 — Meta Pixel (Future)

When you're ready to run Meta ads:
- The Pixel is already installed via Zaraz (`492022321570146`)
- `Lead` event fires on form submit automatically
- For Meta lead forms: set up Meta's native lead form integration separately — those leads come through Meta's own system, not your website
- For landing page campaigns: Zaraz CAPI (Conversions API) can be enabled in Meta Pixel settings in Zaraz for server-side deduplication

---

## Testing Checklist

- [ ] Visit deckmastersak.com — GA4 Realtime shows pageview
- [ ] Click phone number — GA4 Realtime shows `generate_lead` (method: phone_call)
- [ ] Submit contact form — GA4 Realtime shows `generate_lead` (method: website_form)
- [ ] Google Ads Conversion Preview tool shows conversion firing
- [ ] Meta Pixel Helper extension shows Lead event on form submit
- [ ] Zaraz debug mode: add `?zaraz-debug=true` to any URL

---

## ID Reference (all real values)

| Variable | Value |
|---|---|
| `GA4_STREAM_ID` | `5964125496` |
| `GA4_MEASUREMENT_ID` | `G-CLD2MQ2F7L` |
| `GOOGLE_ADS_CONVERSION_ID` | `AW-879524969` (confirmed — "Form Fill" conversion action lives here) |
| `GOOGLE_ADS_OTHER_ID` | `AW-8713494041` (separate account — ignore for Zaraz) |
| `META_PIXEL_ID` | `492022321570146` |
| Zaraz phone label | `Phone Calls from Website` |
| Zaraz quote form label | `JZz9CKWE3KUBEOn4saMD` (from "Form Fill" conversion action) |
