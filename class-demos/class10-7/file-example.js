const fs = require("fs");

let programCount = 0;

try{
    let fileContents = fs.readFileSync("program_count.txt");
    programCount = JSON.parse(fileContents);
    programCount ++;
    fs.writeFileSync("program_count.txt", JSON.stringify(programCount));
} catch(error){
    console.log("Error happened! Probably because the file doesn't exist.");
    fs.writeFileSync("program_count.txt", JSON.stringify(programCount));
}
