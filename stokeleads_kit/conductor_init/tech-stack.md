# Technology Stack

## Frontend
*   **Framework:** React (v19)
*   **Language:** TypeScript (v5)
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS (v4) with PostCSS
*   **Routing:** React Router DOM (v7)
*   **Icons:** Lucide React

## Backend & Serverless
*   **Logic:** Netlify Functions (Node.js/TypeScript)
*   **Hosting:** Netlify (Static + Functions)
*   **Authentication:** Shared Secret (Admin Password Protection)

## Data & Content Management (CMS)
*   **Database:** `src/data/projects.json` (Git-backed persistence)
*   **Persistence Layer:** GitHub API (via Octokit)
*   **Media Storage:** GoHighLevel (LeadConnector)

## External Integrations & CRM
*   **CRM/Lead Management:** GoHighLevel (GHL) - Used for lead data capture.
*   **Anti-Spam Security:** Cloudflare Turnstile (Client-side token generation + Server-side verification).
*   **Data Transport:** Node-fetch for server-side API requests; native Fetch API for client-side.

## Utilities
*   **Image Processing:** `browser-image-compression` (Client-side optimization before upload)
*   **Form Validation:** Custom TypeScript logic for client-side checks.
*   **Environment Management:** Netlify environment variables for secrets (API Keys, Site Keys).
