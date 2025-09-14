console.log('This is running from my js file');


let dbs = document.getElementsByClassName("demo-box").length;
console.log(dbs.length);

let clickcount = 0;

function clickedOnDemoBox(){
    clickcount ++;
    console.log('CLICK!');
    let topbox = document.getElementById("seen")
    topbox.textContent = "Let's Learn JS! Click Count: " + clickcount
    topbox.style.backgroundColor = `rgba(${Math.random() * (256 - 0) + 0}, ${Math.random() * (256 - 0) + 0}, ${Math.random() * (256 - 0) + 0}, ${Math.random() * (1 - 0) + 0})`
    alert("RAHHHHHHHH")
}