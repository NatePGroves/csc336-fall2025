const fs = require("fs") //Import library using "CommonJS"

console.log('sup node')
let randomNumbers = [];

for (let i =0; i <10; i++){
    let rand = Math.random();
    randomNumbers[i] = rand;
    
}

fs.writeFileSync(`random_nums.txt`, JSON.stringify(randomNumbers));

let fileContents = fs.readFileSync("./random_nums.txt", "utf8");

console.log(fileContents);
