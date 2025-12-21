
const { handler } = require('./netlify/functions/upload-portfolio.cjs');

// Mock Environment Variables
process.env.HIGHLEVEL_TOKEN = 'pit-130480ed-2f3b-4cb0-bb1e-49a0f3cba173';

// Mock Event
const event = {
    httpMethod: 'POST',
    body: JSON.stringify({
        fileData: 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', // 1x1 GIF
        fileName: 'test-verification-pixel.gif',
        mimeType: 'image/gif'
    })
};

// Execute
(async () => {
    console.log("Starting verification...");
    try {
        const response = await handler(event, {});
        console.log("Response Status:", response.statusCode);
        console.log("Response Body:", response.body);
        if (response.statusCode !== 200) {
            console.error("Verification FAILED");
            process.exit(1);
        }
        console.log("Verification SUCCESS");
    } catch (e) {
        console.error("Script Error:", e);
        process.exit(1);
    }
})();
