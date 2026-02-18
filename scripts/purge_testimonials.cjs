const fs = require('fs');
const path = require('path');

const jsonPath = path.resolve(__dirname, '../Testimonials.json');
const csvPath = path.resolve(__dirname, '../resources/testimonials.csv');

function parseCSV(text) {
    const rows = [];
    let currentRow = [];
    let currentField = '';
    let inQuote = false;
    let i = 0;

    // Remove BOM if present
    if (text.charCodeAt(0) === 0xFEFF) {
        text = text.slice(1);
    }

    while (i < text.length) {
        const char = text[i];
        const nextChar = text[i + 1];

        if (inQuote) {
            if (char === '"') {
                if (nextChar === '"') {
                    currentField += '"';
                    i++; // Skip the escaped quote
                } else {
                    inQuote = false;
                }
            } else {
                currentField += char;
            }
        } else {
            if (char === '"' && currentField === '') {
                inQuote = true;
            } else if (char === ',') {
                currentRow.push(currentField);
                currentField = '';
            } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
                currentRow.push(currentField);
                rows.push(currentRow);
                currentRow = [];
                currentField = '';
                if (char === '\r') i++; // Skip \n
            } else if (char === '\r') {
                 // Standalone \r
                currentRow.push(currentField);
                rows.push(currentRow);
                currentRow = [];
                currentField = '';
            } else {
                currentField += char;
            }
        }
        i++;
    }

    if (currentField || currentRow.length > 0) {
        currentRow.push(currentField);
        rows.push(currentRow);
    }

    return rows;
}

try {
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    const jsonContent = fs.readFileSync(jsonPath, 'utf8');
    const jsonData = JSON.parse(jsonContent);

    let parsedRows = parseCSV(csvContent);
    // Filter out completely empty rows
    parsedRows = parsedRows.filter(row => row.length > 1 || (row.length === 1 && row[0].trim() !== ''));

    if (parsedRows.length < 2) {
        console.error("CSV file is empty or missing header.");
        process.exit(1);
    }

    const headers = parsedRows[0];
    const ratingIndex = headers.indexOf('rating_score');
    const reviewIndex = headers.indexOf('review');
    const reviewerFirstIndex = headers.indexOf('reviewer_first_name');
    const reviewerLastIndex = headers.indexOf('reviewer_last_name');
    const sourceIndex = headers.indexOf('source_name');
    const dateIndex = headers.indexOf('created_at');

    if (ratingIndex === -1 || reviewIndex === -1 || sourceIndex === -1) {
        console.error("Missing required columns in CSV.");
        process.exit(1);
    }

    const newReviews = [];

    for (let i = 1; i < parsedRows.length; i++) {
        const fields = parsedRows[i];
        if (fields.length < headers.length) continue; 

        const rating = parseInt(fields[ratingIndex], 10);
        const text = fields[reviewIndex];
        const firstName = fields[reviewerFirstIndex] || '';
        const lastName = fields[reviewerLastIndex] || '';
        const author = `${firstName} ${lastName}`.trim();
        const source = fields[sourceIndex];
        const date = fields[dateIndex];

        newReviews.push({
            date: date,
            text: text,
            author: author,
            rating: rating,
            source: source
        });
    }

    jsonData.rawReviews = newReviews;

    fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));
    console.log(`Successfully updated Testimonials.json with ${newReviews.length} reviews.`);

} catch (error) {
    console.error("Error:", error);
    process.exit(1);
}
