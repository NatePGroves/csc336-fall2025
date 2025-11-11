const SHEET_URL = 'https://docs.google.com/spreadsheets/d/11XhA5zlgcSNtbhrCKjInq330YgjbAxXrl41rbtzc8Yw/export?format=csv'

async function fetchAndParseSheet() {
    try {
        const res = await fetch(SHEET_URL);
        const text = await res.text();
        let studentInfos = [];
        console.log("gathered csv");
        let lines = text.split("\n");
        let headers = lines[0].split(",");
        for (let i = 1; i < lines.length; i++) {
            let line = lines[i].trim();
            let entries = line.split(',');
            let student = {}
            for (let j = 0; j < entries.length; j++) {
                student[headers[j].trim()] = entries[j]
            }
            studentInfos.push(student)
        }
        console.log(studentInfos);
        for (let student of studentInfos){
            if (student.render != "" && student["cors"] === "1"){
                // console.log(`${student["First"]}'s World`);
                let response = await grabWorld(student["render"]);
                let worldJSON = await response.json() ;
                console.log(worldJSON);

            }
        }
    } catch {
        console.log("failed")
    }

}

fetchAndParseSheet();

async function grabWorld(url) {
    if (url.charAt(url.length-1) == "/"){
        url = url.slice(0, url.length-1);
        console.log(url)
    }
    let response = await fetch(`${url}/world`);
    return response
}