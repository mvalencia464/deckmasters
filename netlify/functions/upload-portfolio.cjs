// const FormData = require('form-data'); // Removed: Using native FormData

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { fileData, fileName, mimeType } = data;

    if (!fileData || !fileName || !mimeType) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing file data, name, or type' })
      };
    }

    // Use environment variables for credentials
    // Fallback to VITE_ prefixed vars if standard ones aren't set (common in this project's context)
    const GHL_API_KEY = process.env.GHL_API_KEY || process.env.HIGHLEVEL_TOKEN || process.env.VITE_HIGHLEVEL_TOKEN;
    // Location ID might not be strictly needed for the upload endpoint depending on the token type, 
    // but good to have if we expand to attaching it to a contact.

    if (!GHL_API_KEY) {
      console.error('GHL_API_KEY or VITE_HIGHLEVEL_TOKEN is missing');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error: Missing GHL credentials' })
      };
    }

    // Convert Base64 back to Buffer
    const buffer = Buffer.from(fileData, 'base64');

    // CRITICAL FIX: Use native Blob and FormData (Node 18+)
    // This avoids impedance mismatch between 'form-data' package and native 'fetch'
    const blob = new Blob([buffer], { type: mimeType });
    
    const formData = new FormData();
    formData.append('file', blob, fileName);

    console.log(`Uploading ${fileName} to HighLevel...`);

    const response = await fetch(`https://services.leadconnectorhq.com/medias/upload-file`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Version': '2021-07-28'
        // Content-Type header (multipart/form-data; boundary=...) is set automatically by fetch
        // Content-Length is also handled automatically
      },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('HighLevel Upload Failed:', errorText);
      throw new Error(`GHL Upload failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log('HighLevel Upload Success:', result);

    // The result usually contains { url: "...", ... }
    // We return this URL to the frontend
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        url: result.url || result.fileUrl, // Handle potential API variations
        meta: result
      })
    };

  } catch (error) {
    console.error('Upload error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
