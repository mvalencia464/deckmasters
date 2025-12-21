# New Project Playbook: Home Services Setup
**The "StokeLeads" Standard Model**

This playbook serves as the master checklist for spinning up a new high-performance, lead-generating website for a home services company (e.g., Plumbing, Roofing, HVAC). It consolidates our standardized architecture for Auth, CMS, and Lead Gen.

---

## 🏗 Phase 1: Core Setup

### 1.1 Tech Stack Initialization
We use the "Vite + React + Tailwind + Netlify" stack for speed and low cost.
*   [ ] **Scaffold Project:** `npm create vite@latest my-project -- --template react-ts`
*   [ ] **Install Tailwind CSS:** Follow [Tailwind Vite Guide](https://tailwindcss.com/docs/guides/vite).
*   [ ] **Install Core Dependencies:**
    ```bash
    npm install react-router-dom lucide-react octokit dotenv
    npm install -D @types/node
    ```
*   [ ] **Setup Netlify Functions:**
    *   Create `netlify/functions/` folder.
    *   Create `netlify.toml` for redirect rules (`/* /index.html 200`).

### 1.2 Environment Variables (The "Keys")
Create a `.env` file locally and add these to Netlify Dashboard immediately.

```ini
# Security
ADMIN_PASSWORD="super-secret-password-here"

# GoHighLevel (CRM & Media)
VITE_HIGHLEVEL_TOKEN="your-ghl-location-api-key"
# Note: Location ID is often part of the request body or header depending on V1/V2 API

# Cloudflare Turnstile (Anti-Spam)
VITE_TURNSTILE_SITE_KEY="0x4AAAAAA..."
TURNSTILE_SECRET_KEY="0x4AAAAAA..."

# GitHub (For "Headless" CMS)
GITHUB_TOKEN="ghp_..." # Personal Access Token with repo scope
GITHUB_REPO_OWNER="your-username"
GITHUB_REPO_NAME="repo-name"
GITHUB_BRANCH="main"
```

---

## 🛡 Phase 2: Lead Generation System

### 2.1 The "Fortress" Form (Anti-Spam)
Never send raw form data directly to CRM. Always filter through a serverless function.

1.  **Frontend:**
    *   Install: `npm install react-turnstile` (or use the custom component pattern).
    *   Add `<TurnstileWidget />` to your form.
    *   **Logic:** Block submission until a `token` is received.
2.  **Backend (`netlify/functions/lead.ts`):**
    *   **Step 1:** Verify Turnstile Token with Cloudflare API.
    *   **Step 2:** If valid, format data for GoHighLevel.
    *   **Step 3:** POST to GHL Webhook/API.

---

## 📸 Phase 3: The "Project Studio" (CMS)

### 3.1 Architecture: "Headless Git CMS"
We don't use a database. We use `src/data/projects.json`.
*   **Reading:** The app imports the JSON file directly. Instant load.
*   **Writing:** The Admin Dashboard commits changes to GitHub, triggering a Netlify rebuild.

### 3.2 Authentication (Shared Secret)
*   **Pattern:** [See `conductor/auth_pattern.md`](./auth_pattern.md)
*   **Implementation:**
    *   `src/context/AuthContext.tsx`: Stores password in memory.
    *   `netlify/functions/save-project.js`: Checks `x-admin-password` header.

### 3.3 Image Handling (The "Squeezer")
*   **Pattern:** [See `conductor/image_upload_pattern.md`](./image_upload_pattern.md)
*   **Workflow:**
    *   **Client:** `AdminProjectForm` selects 10MB image -> Canvas API resizes to 1200px/80% JPEG (~200KB).
    *   **Proxy:** `netlify/functions/upload-portfolio.js` receives Base64.
    *   **Storage:** Proxy uploads to GoHighLevel Media Library.
    *   **Result:** Public URL is returned and saved to `projects.json`.

### 3.4 Data Persistence (The "Commit")
The logic to update `projects.json` without a database.

**Backend (`netlify/functions/save-project.js`):**
```javascript
import { Octokit } from "octokit";

// 1. Get current file SHA (to prevent race conditions)
const { data: { sha } } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}');

// 2. Commit the new JSON string
await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
  message: "content: update portfolio projects",
  content: Buffer.from(JSON.stringify(newProjects)).toString('base64'),
  sha: sha
});
```

---

## 🚀 Phase 4: Launch Checklist

1.  **Netlify Setup:**
    *   Connect GitHub Repo.
    *   Set **Build Command:** `npm run build`.
    *   Set **Publish Directory:** `dist`.
2.  **Verify Functions:**
    *   Check `Netlify > Functions` tab to ensure `lead`, `save-project`, and `upload-portfolio` are detected.
3.  **Domain & DNS:**
    *   Add Custom Domain.
    *   Provision SSL (Automatic).
4.  **Test Run:**
    *   [ ] Submit a Lead (Check GHL).
    *   [ ] Login to Admin (Check Auth).
    *   [ ] Upload a Project (Check GitHub Commit & Netlify Rebuild).

---

## 📂 File Structure Template

```
/
├── src/
│   ├── components/
│   │   ├── QuoteForm.tsx       # Lead Gen
│   │   ├── TurnstileWidget.tsx # Security
│   │   └── portfolio/
│   │       └── AdminProjectForm.tsx # CMS UI
│   ├── data/
│   │   └── projects.json       # The Database
│   └── context/
│       └── AuthContext.tsx     # The Gatekeeper
├── netlify/
│   └── functions/
│       ├── lead.ts             # Form Handler
│       ├── upload-portfolio.js # Image Proxy
│       └── save-project.js     # Git Committer
└── conductor/                  # Documentation
    ├── auth_pattern.md
    ├── image_upload_pattern.md
    └── new_project_playbook.md
```
