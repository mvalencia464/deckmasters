/**
 * Cloudflare Pages Function: POST /api/submit-quote
 * Receives quote form JSON and creates a contact in GoHighLevel (GHL).
 * Env vars (set in Cloudflare Pages): HIGHLEVEL_TOKEN, HIGHLEVEL_LOCATION_ID
 */
const GHL_BASE = 'https://services.leadconnectorhq.com';

/** GHL HTTP timeout — avoids hanging until the Workers/Pages CPU wall and surfacing as a Cloudflare 502 HTML page. */
const GHL_FETCH_TIMEOUT_MS = 25_000;

/**
 * Resolve env var from a list of aliases.
 * This keeps production resilient if variable names differ between environments.
 */
const resolveEnv = (env, keys) => {
  for (const key of keys) {
    const value = env?.[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
};

/**
 * When the browser never filled hidden city/state/zip (no Places selection, or incomplete
 * address_components), recover structured fields from a typical US formatted address.
 * The greedy leading group yields street when the tail matches ", City, ST ZIP".
 * Example: "625 W 59th Ave Unit J, Anchorage, AK 99518, USA"
 */
function parseUsAddressFromFreeform(text) {
  if (!text || typeof text !== 'string') return null;
  const trimmed = text
    .trim()
    .replace(/,\s*(USA|United States)\s*$/i, '')
    .trim();
  const m = trimmed.match(/^(.*),\s*([^,]+),\s*([A-Za-z]{2})\s+(\d{5})(?:-\d{4})?\s*$/);
  if (!m) return null;
  const line1 = m[1].trim();
  const city = m[2].trim();
  const state = m[3].toUpperCase();
  const zip = m[4];
  if (!city || !line1 || !/^[A-Z]{2}$/.test(state) || !/^\d{5}$/.test(zip)) return null;
  return { line1, city, state, zip };
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const requestId =
    request.headers.get('cf-ray') ||
    request.headers.get('x-request-id') ||
    (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`);

  const respond = (payload, status) =>
    new Response(JSON.stringify({ ...payload, requestId }), {
      status,
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': requestId,
        'Cache-Control': 'no-store',
      },
    });

  try {
    const token = resolveEnv(env, [
      'HIGHLEVEL_TOKEN',
      'GHL_TOKEN',
      'GHL_API_KEY',
      'LEADCONNECTOR_TOKEN',
    ]);
    const locationId = resolveEnv(env, [
      'HIGHLEVEL_LOCATION_ID',
      'GHL_LOCATION_ID',
      'LEADCONNECTOR_LOCATION_ID',
    ]);

    if (!token || !locationId) {
      console.error(
        `[submit-quote:${requestId}] Missing required server configuration`,
        JSON.stringify({
          hasHighlevelToken: Boolean(env.HIGHLEVEL_TOKEN),
          hasGhlToken: Boolean(env.GHL_TOKEN),
          hasGhlApiKey: Boolean(env.GHL_API_KEY),
          hasLeadconnectorToken: Boolean(env.LEADCONNECTOR_TOKEN),
          hasHighlevelLocationId: Boolean(env.HIGHLEVEL_LOCATION_ID),
          hasGhlLocationId: Boolean(env.GHL_LOCATION_ID),
          hasLeadconnectorLocationId: Boolean(env.LEADCONNECTOR_LOCATION_ID),
        })
      );
      return respond({ success: false, error: 'Server configuration error' }, 500);
    }

    const contentType = request.headers.get('content-type') || '';
    let data = {};
    let photoFile = null;

    try {
      if (contentType.includes('multipart/form-data')) {
        const formData = await request.formData();
        photoFile = formData.get('photo');
        for (const [key, value] of formData.entries()) {
          if (key !== 'photo') data[key] = value;
        }
      } else {
        data = await request.json();
      }
    } catch (err) {
      console.error(`[submit-quote:${requestId}] Invalid request body`, err);
      return respond({ success: false, error: 'Invalid request body', debug: String(err) }, 400);
    }

  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim();
  const phone = String(data.phone || '').trim();
  const serviceType = String(data.serviceType || '').trim();
  let projectDescription = String(data.projectDescription || '').trim();
  const neighborhood = String(data.neighborhood || '').trim();
  const projectAddress = String(data.projectAddress || '').trim();
  let addressLine1 = String(data.addressLine1 || '').trim();
  let addressCity = String(data.addressCity || '').trim();
  let addressState = String(data.addressState || '').trim();
  let addressZip = String(data.addressZip || '').trim();
  const addressCountry = String(data.addressCountry || '').trim();

  const inferred = parseUsAddressFromFreeform(projectAddress);
  if (inferred) {
    if (!addressCity) addressCity = inferred.city;
    if (!addressState) addressState = inferred.state;
    if (!addressZip) addressZip = inferred.zip;
    if (!addressLine1) addressLine1 = inferred.line1;
  }

  let fileUrl = '';
  // Handle Photo Upload (R2)
  if (photoFile && photoFile.name && photoFile.size > 0 && env.IMG_BUCKET) {
    const ext = photoFile.name.split('.').pop() || 'jpg';
    
    // Generate a unique filename using crypto or fallback to timestamp
    let uuid;
    try {
      uuid = crypto.randomUUID();
    } catch {
      uuid = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    }
    
    const filename = `deckmasters/${uuid}.${ext}`;
    
    try {
      // Passing the File object directly to .put() is often more robust than .stream()
      await env.IMG_BUCKET.put(filename, photoFile, {
        httpMetadata: { contentType: photoFile.type || 'application/octet-stream' },
      });
      
      fileUrl = `https://media.stokeleads.com/${filename}`;
      projectDescription += `\n\nUploaded Photo: ${fileUrl}`;
      console.log(`R2 Success: ${filename}`);
    } catch (err) {
      console.error('R2 Upload Failed:', err);
      // We don't crash the whole submission, but we note it for debugging
      projectDescription += `\n\n(Photo upload failed: ${String(err)})`;
    }
  }


  if (!name || !email || !phone) {
    return respond({ success: false, error: 'Name, email, and phone are required' }, 400);
  }

  const nameParts = name.split(/\s+/);
  const firstName = nameParts[0] || name;
  const lastName = nameParts.slice(1).join(' ') || '';

  const tags = ['quote', 'website'];
  if (serviceType) tags.push(serviceType);
  if (neighborhood) tags.push(neighborhood);

  const basePayload = {
    locationId,
    firstName,
    lastName,
    email,
    phone,
    source: 'Website Quote Form',
    tags,
  };

  if (addressLine1) basePayload.address1 = addressLine1;
  else if (projectAddress) basePayload.address1 = projectAddress;
  if (addressCity) basePayload.city = addressCity;
  if (addressState) basePayload.state = addressState;
  if (addressZip) basePayload.postalCode = addressZip;
  if (addressCountry) basePayload.country = addressCountry;

  if (projectAddress) {
    projectDescription = projectDescription
      ? `Project address: ${projectAddress}\n\n${projectDescription}`
      : `Project address: ${projectAddress}`;
  }

  const customFields = [];
  const projectDescriptionFieldId = resolveEnv(env, [
    'HIGHLEVEL_CUSTOM_FIELD_PROJECT_DESCRIPTION',
    'GHL_CUSTOM_FIELD_PROJECT_DESCRIPTION',
  ]);
  const quoteImageFieldId = resolveEnv(env, [
    'HIGHLEVEL_CUSTOM_FIELD_QUOTE_IMAGE',
    'GHL_CUSTOM_FIELD_QUOTE_IMAGE',
  ]);

  if (projectDescriptionFieldId && projectDescription) {
    customFields.push({ id: projectDescriptionFieldId, value: projectDescription });
  }
  if (quoteImageFieldId && fileUrl) {
    customFields.push({ id: quoteImageFieldId, value: fileUrl });
  }

  if (customFields.length > 0) {
    basePayload.customFields = customFields;
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Version': '2021-07-28',
  };

    const postToGHL = async (payload) => {
      const signal =
        typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function'
          ? AbortSignal.timeout(GHL_FETCH_TIMEOUT_MS)
          : undefined;
      const res = await fetch(`${GHL_BASE}/contacts/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        ...(signal ? { signal } : {}),
      });
      const result = await res.json().catch(() => ({}));
      return { res, data: result };
    };

    try {
      let { res, data: ghlData } = await postToGHL(basePayload);

      // Fallback if custom field ID is wrong (common source of 400s)
      if (!res.ok && basePayload.customFields) {
        const fallbackPayload = { ...basePayload };
        delete fallbackPayload.customFields;
        const retry = await postToGHL(fallbackPayload);
        res = retry.res;
        ghlData = retry.data;
      }

      if (!res.ok) {
        console.error(
          `[submit-quote:${requestId}] GHL API error`,
          JSON.stringify({ status: res.status, body: ghlData })
        );
        // 503 = our app returned JSON (upstream CRM issue). Cloudflare edge HTML 502 is a separate failure mode.
        return respond(
          {
            success: false,
            error: ghlData.message || ghlData.error || `GHL API Error (${res.status})`,
          },
          503
        );
      }

      return respond({ success: true, message: "Thank you! We'll be in touch soon." }, 200);
    } catch (err) {
      console.error(`[submit-quote:${requestId}] Submission failed`, err);
      return respond(
        { success: false, error: 'Submission failed. Please try again.', debug: String(err) },
        503
      );
    }
  } catch (err) {
    console.error(`[submit-quote:${requestId}] Unhandled error`, err);
    return respond(
      {
        success: false,
        error: 'Server error. Please try again in a moment.',
        debug: String(err),
      },
      500
    );
  }
}

