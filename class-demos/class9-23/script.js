function buttonClick(e){
    console.log(this);
// this keyword refers to the scope from where the function is being called
// // here, it is called by the button
}



let myButton = document.querySelector("#my-button")
myButton.addEventListener("click",(e) => {
    console.log(this);
// and here, it is called by the window
});

// myButton.addEventListener("click", buttonClick);

// Classes

class Person {
    constructor(n){
        // using 'this' to define the scope as within the class
        // n will be an argument when creating the object
        this.name = n;
    }

    sayHello(howManyTimes){
        for (let i = 0; i < howManyTimes; i++){
        console.log(`Hello ${this.name}`); // using the this syntax to grab the name from this class
    }
}

}

let nate = new Person("nate") // The 'new' kw is required

// Local Storage
// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
// Local storage is read-only properties from the window interface to access a storage object of the document's origin
// Lasts beyond a refresh!

localStorage.setItem("key", "value"); // Both key and value must be strings (we can use JSON to store objects)

console.log(localStorage.getItem('key')); //this will log 'key'

// Think of this as a cache, you can clear it or delete things from it

// JSON (JavaScript Object Notation)

console.log(JSON.stringify(nate)) // stringify will anything into JSON string format
// let nate2 = JSON.parse(JSON.stringify(nate)) // this will turn it back into a JS object
// console.log(nate2.sayHello(10)) // This causes an error, remember! This is not a person object, it is just a blank object with the name 'nate' in it
let nate3 = new Person(JSON.parse(JSON.stringify(nate))) // this will turn it back into a JS person object
console.log(nate3.sayHello(10)) // This will not cause an error, as the object is a person


// Canvas
const canvas  = document.querySelector("#my-canvas");
const ctx = canvas.getContext('2d'); //gets the context of the canvas

// drawing a filled rect
ctx.fillStyle = "#000000"
ctx.fillRect(1, 0, 10, 50) //top left x, top left y, width, height

//Do it with a button

function randomRect(){

    // Canvas
    const canvas  = document.querySelector("#my-canvas");
    const ctx = canvas.getContext('2d'); //gets the context of the canvas

    // drawing a filled rect
    ctx.fillStyle = `rgb(${Math.round((Math.random() * 255))}, ${Math.round((Math.random() * 255))}, ${Math.round((Math.random() * 255))})`
    ctx.fillRect(1, 0, 10, 50) //top left x, top left y, width, height
}

// use setInterval(function, delay in ms) to do animation

setInterval(randomRect, 100)
