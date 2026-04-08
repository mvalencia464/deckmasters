# Zaraz Tracking Setup — deckmastersak.com
## Complete Implementation Guide

---

## Prerequisites — IDs you need before starting

| What | Where to find it |
|---|---|
| GA4 Measurement ID (`G-XXXXXXXX`) | GA4 > Admin > Data Streams > your stream |
| Google Ads Conversion ID (`AW-XXXXXXXXXX`) | Google Ads > Goals > Conversions > top of page |
| Google Ads Conversion Labels (3×) | Google Ads > Goals > each conversion action > Tag Setup |
| Meta Pixel ID | Meta Events Manager > your pixel |

---

## Step 1 — Zaraz Dashboard Setup

Navigate to: **Cloudflare Dashboard → deckmastersak.com → Zaraz**

### 1a. Add Google Analytics 4

1. Tools Configuration → Third-party tools → **Add tool** → Google Analytics 4
2. Enter your `G-XXXXXXXX` Measurement ID
3. Enable **Automatic Events** (pageview is handled automatically)
4. Add these Custom Actions (Tools → GA4 → Edit → Add Action):

| Action Name | Firing Trigger | Event Name | Extra fields |
|---|---|---|---|
| Form Lead | FormSubmit | `generate_lead` | `method: website_form` |
| Phone Call | PhoneCallClick | `generate_lead` | `method: phone_call` |
| Sale | SaleComplete | `purchase` | `value: {{ client.sale_value }}`, `currency: USD` |

### 1b. Add Google Ads

1. Add tool → **Google Ads**
2. Enter your `AW-XXXXXXXXXX` Conversion ID
3. Add these Conversion Actions:

| Action Name | Firing Trigger | Conversion Label | Enhanced Conv. |
|---|---|---|---|
| Phone Call | PhoneCallClick | (your call label) | ✅ `{{ client.hashed_email }}` |
| Form Lead | FormSubmit | (your lead label) | ✅ `{{ client.hashed_email }}` |
| Sale | SaleComplete | (your sale label) | ✅ `{{ client.hashed_email }}` |

### 1c. Add Meta Pixel

1. Add tool → **Meta Pixel**
2. Enter your Pixel ID
3. Add Actions:

| Action Name | Firing Trigger | Event Type |
|---|---|---|
| Pageview | Pageview | PageView |
| Lead | FormSubmit | Lead |
| Purchase | SaleComplete | Purchase |

---

## Step 2 — Create Triggers

Zaraz → Tools Configuration → **Triggers** → Create trigger:

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

## Step 3 — Create the Email Hasher Worker Variable

Zaraz → Tools Configuration → **Variables** → Create variable:
- **Name:** `hashed_email`
- **Type:** Worker
- **Code:** paste contents of `zaraz-email-hasher-worker.js`

This variable is referenced as `{{ client.hashed_email }}` in all Enhanced Conversion fields above.

---

## Step 4 — Add files to your Astro project

```
src/
  lib/
    zaraz-tracking.ts       ← tracking utility (copy from zaraz-tracking.ts)
  components/
    ContactForm.astro       ← form with Zaraz wired in (copy from ContactForm.astro)
  pages/
    api/
      sale-webhook.ts       ← CRM webhook endpoint (optional)
  layouts/
    BaseLayout.astro        ← add autoTrackPhoneLinks() call (see BaseLayout.astro.example)
```

---

## Step 5 — Google Ads Enhanced Conversions

In Google Ads:
1. Goals → Conversions → Settings → **Enhanced conversions for leads** → Turn ON
2. Select **Manually set up enhanced conversions** (Zaraz handles the tag)
3. For each conversion action → Tag Setup → confirm the hashed email field maps to `email`

---

## Step 6 — Closing the Loop (Sale Tracking)

Since deck sales close offline (phone/in-person), you have two options:

### Option A: Protected confirmation page (simplest)
- Create `/sale-confirmed` page in Astro
- After marking job won in your CRM/notes, open:  
  `https://deckmastersak.com/sale-confirmed?email=customer@email.com&value=4500&order=JOB-123`
- Page fires `trackSale()` automatically
- Protect with a simple password or IP allowlist

### Option B: Google Ads Offline Conversion Import
- Export won jobs monthly from your CRM as CSV
- Google Ads → Goals → Conversions → Upload → upload GCLID + conversion data
- More work but works even without a website touchpoint

---

## Step 7 — Meta Pixel (Future)

When you're ready to run Meta ads:
- The Pixel is already installed via Zaraz
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

## ID Replacement Checklist

Replace these placeholders in `zaraz-config.json` before importing:

- [ ] `REPLACE_WITH_YOUR_G-XXXXXXXX` → your GA4 Measurement ID
- [ ] `REPLACE_WITH_YOUR_AW-XXXXXXXXXX` → your Google Ads Conversion ID
- [ ] `REPLACE_CALL_LABEL` → Google Ads call conversion label
- [ ] `REPLACE_LEAD_LABEL` → Google Ads lead conversion label
- [ ] `REPLACE_SALE_LABEL` → Google Ads sale conversion label
- [ ] `REPLACE_WITH_YOUR_META_PIXEL_ID` → your Meta Pixel ID
