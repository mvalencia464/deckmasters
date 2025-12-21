import { Handler } from '@netlify/functions';
import { verifyTurnstile } from './utils/verify';

export const handler: Handler = async (event) => {
  // 1. Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const turnstileToken = data['cf-turnstile-response'];

    // 2. Validate Turnstile token existence
    if (!turnstileToken) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing Turnstile token' }),
      };
    }

    // 3. Verify Turnstile token with Cloudflare
    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!secretKey) {
      console.error('Configuration Error: TURNSTILE_SECRET_KEY is missing');
      throw new Error('Server configuration error');
    }

    console.log('Verifying Turnstile token...');
    const isValid = await verifyTurnstile(turnstileToken, secretKey);

    if (!isValid) {
      console.warn('Turnstile verification failed for token:', turnstileToken.substring(0, 10) + '...');
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Security verification failed. Please try again.' }),
      };
    }

    // 4. Forward data to GoHighLevel (GHL)
    const ghlApiKey = process.env.VITE_HIGHLEVEL_TOKEN;
    const ghlLocationId = process.env.VITE_HIGHLEVEL_LOCATION_ID;

    if (!ghlApiKey || !ghlLocationId) {
       console.error('Configuration Error: VITE_HIGHLEVEL_TOKEN or VITE_HIGHLEVEL_LOCATION_ID is missing');
       throw new Error('Server configuration error');
    }

    console.log(`Forwarding lead to GHL (Token prefix: ${ghlApiKey.substring(0, 4)}...)...`);
    // Minimal payload mapping - can be expanded
    const contactPayload = {
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      phone: data.phone || '',
      address1: data.address || '',
      locationId: ghlLocationId,
      customFields: data.message ? [{ id: 'message', value: data.message }] : [],
    };

    const ghlResponse = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ghlApiKey}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      },
      body: JSON.stringify(contactPayload),
    });

    if (!ghlResponse.ok) {
      const errorText = await ghlResponse.text();
      console.error(`GHL Integration Error (${ghlResponse.status}):`, errorText);
      throw new Error(`Failed to forward lead to CRM: ${ghlResponse.statusText}`);
    }

    console.log('Lead successfully processed');
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Lead processed successfully' }),
    };

  } catch (error: any) {
    console.error('Lead Function Critical Failure:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Failed to process lead.' }),
    };
  }
};
