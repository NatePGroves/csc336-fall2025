const SHEET_URL = 'https://docs.google.com/spreadsheets/d/15U45s84ewobF-CzR1p9rQafFGzQiwPenM7qmrcAm7TE/export?format=csv'

async function fetchAndParseSheet() {
    try {
        const res = await fetch(SHEET_URL);
        const text = await res.text();

        console.log(text)
    } catch {
        console.log("failed")
    }

}

fetchAndParseSheet();