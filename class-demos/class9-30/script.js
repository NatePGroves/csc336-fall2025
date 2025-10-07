let button = document.querySelector("#callbackDemoButton");


// function clickEventHappened(e){
//     console.log('clicked!')
// }

// button.addEventListener("click", clickEventHappened);

// below is an arrow function, aka an anonymous function or a lambda function

// button.addEventListener("click", e => {console.log("click")}); This also works BECAUSE there's only one parameter

button.addEventListener("click", getAndDisplayDogImage); //now this adds a dog image for every call :)

function doSomething(numTimes){
    let sum = 0;
    for (let i = 0; i < numTimes; i++){
        sum += i * numTimes / 4;
    }
    return sum;
}

let result = doSomething(4);
console.log(result);


// API Calls, callbacks, and promises

let dogRequest = fetch("https://dog.ceo/api/breeds/image/random");

let beforeRequest = Date.now(); // Date.now() is a built in function for time

// dogRequest is a promise that can be fulfilled or unfulfilled

// dogRequest
//     .then( (response) => {return response.json()} ) //when dogRequest is fulfilled, the arrow function in this case is called (which returns a promise)
//     .then( (dogData) => { //then is a method of the promise which specifies code to run when promise is fulfilled
//         // to add something from the request to the website, this is where it goes
//         //check out my long ass arrow function
//         let timePassed = Date.now() - beforeRequest;
//         console.log(`It took ${timePassed} for the request`);
//         console.log(dogData)
//         let dogImgHTML = document.createElement('img'); //here's an example
//         dogImgHTML.src= dogData.message;
//         dogImgHTML.width = 200;
//         dogImgHTML.height = 200;
//         document.querySelector("#dogDiv").appendChild(dogImgHTML);
//     })// response.json() also returns a promise which will return the json
//     .catch(() => {console.log('something messed up')});

console.log('This happens before the JSON') //happens before the JSON as the promise is being evaluated

async function getAndDisplayDogImage() { // async function means that the stuff in this function will block functionality when the await lines happen
    let dogResponse = await fetch("https://dog.ceo/api/breeds/image/random"); // await means we aren't doing anything else until this fetch function works
    let dodData = await dogResponse.json();
    let timePassed = Date.now() - beforeRequest;
    console.log(`It took ${timePassed} for the request`);
    console.log(dodData)
    let dogImgHTML = document.createElement('img'); //here's an example
    dogImgHTML.src= dodData.message;
    dogImgHTML.width = 200;
    dogImgHTML.height = 200;
    document.querySelector("#dogDiv").appendChild(dogImgHTML); //this is the same as before just without the chaining of stuff
}
