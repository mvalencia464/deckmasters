# The "High-Efficiency" Image Upload Pattern
**Client-Side Compression + Serverless Proxy**

This document outlines the pattern used to handle high-quality portfolio images without requiring a dedicated storage bucket (S3/Cloudinary) or heavy backend processing. It leverages the user's browser for compression and an existing CRM (GoHighLevel/LeadConnector) for storage.

## 🎯 Use Case
**Best for:**
- Portfolio websites, Admin CMS tools.
- "Headless" sites where you want to avoid paying for S3/Cloudinary.
- Projects already using GoHighLevel (GHL) or similar CRMs.
- Scenarios where you need to prevent users from uploading 10MB raw photos.

**Why use this?**
- **Free Storage:** Piggybacks on your existing CRM's media storage.
- **Fast UX:** Images are compressed *before* upload, making the progress bar 10x faster.
- **Cost Efficient:** Zero server CPU used for image resizing (it happens on the user's device).
- **Security:** Hides your CRM API Keys behind a serverless proxy.

---

## 🏗 Architecture

1.  **The Client (Browser):**
    - User selects a huge raw image (e.g., 5MB HEIC/PNG).
    - **Canvas API** resizes it to max 1200px width.
    - **Canvas API** compresses it to JPEG (80% quality).
    - Result: ~200KB optimized JPEG.
2.  **The Proxy (Serverless Function):**
    - Receives the *optimized* base64 string.
    - Converts it back to a Buffer.
    - Proxies it to the External API (GoHighLevel).
3.  **The Storage (GoHighLevel):**
    - Stores the file and returns a public CDN URL.
4.  **The Result:**
    - The public URL is saved to your JSON data or Database.

---

## 🛠 Step-by-Step Implementation

### Phase 1: Client-Side Compression (The "Squeezer")

We use the native HTML5 Canvas API. No heavy libraries like `browser-image-compression` required.

**File:** `src/utils/imageUtils.ts` (or inside your Component)

```typescript
export const compressImage = (file: File): Promise<{ data: string, name: string, type: string }> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        // 1. Setup Canvas
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_WIDTH = 1200; // Good balance for web

        // 2. Resize Logic (Maintain Aspect Ratio)
        if (width > MAX_WIDTH) {
          height = (height * MAX_WIDTH) / width;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        // 3. Compress (JPEG @ 80%)
        // This strips metadata and drastically reduces size
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        const base64Data = dataUrl.split(',')[1];

        resolve({
          data: base64Data,
          name: file.name.replace(/\.[^/.]+$/, "") + ".jpg", // Force .jpg
          type: 'image/jpeg'
        });
      };
    };
  });
};
```

**Usage in Component:**
```tsx
const handleUpload = async (e) => {
  const file = e.target.files[0];
  
  // 1. Show local preview immediately (instant feedback)
  setPreview(URL.createObjectURL(file));

  // 2. Compress in background
  const compressedFile = await compressImage(file);
  
  // 3. Send to Server
  await uploadToServer(compressedFile);
};
```

---

### Phase 2: The Serverless Proxy (The "Tunnel")

We use a Netlify Function (Node.js) to safely hold our API keys and talk to the storage provider.

**Dependencies:** `npm install node-fetch form-data`

**File:** `netlify/functions/upload-media.js`

```javascript
const fetch = require('node-fetch');
const FormData = require('form-data');

exports.handler = async (event) => {
  // 1. Security Checks
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const { fileData, fileName, mimeType } = JSON.parse(event.body);

    // 2. Credentials (Stored in Netlify Env Vars)
    const API_KEY = process.env.GHL_API_KEY; 
    
    // 3. Reconstruct File from Base64
    const buffer = Buffer.from(fileData, 'base64');
    const formData = new FormData();
    formData.append('file', buffer, {
        filename: fileName,
        contentType: mimeType
    });

    // 4. Send to GoHighLevel (or S3, Cloudinary, etc.)
    const response = await fetch(`https://services.leadconnectorhq.com/medias/upload-file`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Version': '2021-07-28', // GHL Specific
          ...formData.getHeaders() // CRITICAL: Sets correct boundary headers
        },
        body: formData
    });

    const result = await response.json();

    // 5. Return the public URL
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        url: result.url || result.fileUrl 
      })
    };

  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
```

---

## 🧩 Integration (The Glue)

**Frontend Service:** `src/services/uploadService.ts`

```typescript
export const uploadImage = async (compressedFile: { data: string, name: string, type: string }) => {
  const response = await fetch('/.netlify/functions/upload-media', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fileData: compressedFile.data,
      fileName: compressedFile.name,
      mimeType: compressedFile.type
    })
  });

  const result = await response.json();
  if (!result.success) throw new Error(result.error);
  
  return result.url; // The permanent URL
};
```

## ⚠️ Important Considerations

1.  **Payload Limits:**
    *   AWS Lambda / Netlify Functions have a **6MB payload limit**.
    *   Since we compress *client-side* to ~200KB, we stay safely under this limit.
    *   *Without* client-side compression, uploading a 7MB iPhone photo would crash the function.

2.  **Environment Variables:**
    *   Never hardcode your API Token in the frontend.
    *   Set `GHL_API_KEY` in your hosting dashboard.

3.  **CORS:**
    *   The Proxy handles CORS for you. The frontend talks to `same-origin` (/.netlify/functions...), and the function talks to the external API.
