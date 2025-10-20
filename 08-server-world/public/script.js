formStrings = [`
                <label for="name">Name:</label>
                <input type="text" name="name" required>

                <label for="climate">Climate:</label>
                <input type="text" name="climate" required>

                <button type = "submit">Add Region</button>
                `

,`
                <label for="name">Name:</label>
                <input type="text" name="name" required>

                <label for="population">Population:</label>
                <input type="number" name="population" required>

                <button type = "submit">Add Town</button>
                `

,`
                <label for="name">Name:</label>
                <input type="text" name="name" required>

                <label for="role">Role:</label>
                <input type="text" name="role" required>

                <button type = "submit">Add Notable Person</button>
                `

,`
                <label for="name">Name:</label>
                <input type="text" name="name" required>

                <label for="rarity">Rarity:</label>
                <input type="text" name="rarity" required>

                <label for="use">Use:</label>
                <input type="text" name="use" required>

                <label for = "power">Power Level Out of Ten:</label>
                <input type="number" name="power" min="0" max="10" step = "0.5"required>

                <button type = "submit">Add Item</button>
                `]

function formatString(str) { // Thank you ChatGPT
    return str
        .split('_')                  // split on underscores
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each word
        .join(' ');                  // join back with spaces
}


function makeSafeId(name) { //Thank you chatgpt, apparently the apostrophes I thought were nice in my assignment last week destroy my code
    return name.replace(/[^a-zA-Z0-9_-]/g, "_"); // replace anything that is not a letter, number, _ or -
}

let levels = ["region", "town", "person", "item"];
let currentSearchLevel = 0;
let currentROI = null;
let currentTOI = null;
let currentPOI = null;
let worldData = null;



// This is a function that makes an api call to the local route called '/world'.
// All the '/world' route does (defined in server.js) is load the file world.json,
// and then send that json over to the client (this file).
// 
// As a contrived demo, this function also displays the name of a notable person
// in by generating HTML to add to a div.


async function loadWorld() {
    const res = await fetch("/world");
    const data = await res.json();
    const regions = data.regions
    window.worldData = data
}


function showSummaries(aoi) {
    for (let i of aoi) {
        let doi = document.querySelector(`div#${makeSafeId(i.name)}`);
        doi.innerHTML = "";
        for (const [key, value] of Object.entries(i)) {  //learned how to iterate arrays
            if (key == "name"){
                continue;
            }
            if (Array.isArray(value)){ //checking if its an array
                doi.innerHTML += `<p><strong>Number of ${formatString(key)}:</strong> ${value.length}</p>`;
                continue;
            }
            doi.innerHTML += `<p><strong>${formatString(key)}:</strong> ${(value)}</p>`;
        }
    }
}


function resetGetForm() {
    window.currentSearchLevel = 0;
    postForm.innerHTML = formStrings[window.currentSearchLevel];
    const worldInfo = window.worldData
    const regions = worldInfo.regions;
    const getForm = document.querySelector("#getForm");
    getForm.innerHTML = "<p> Select a region to learn more</p>";
    for (r of regions) {
        getForm.innerHTML += `<input type="radio" id="${r.name}" name="type" value="${r.name}" required> 
                                <label for=${r.name}>${formatString(r.name)}</label>
                                <div id = ${makeSafeId(r.name)}></div><br>`
    }

    getForm.innerHTML += `<button type="submit">Submit</button>`
    getForm.innerHTML += `<button type = "button" id="showSummary">Show Summaries</button>`
    document.getElementById("showSummary").addEventListener("click", () => {
        showSummaries(worldInfo.regions);
    });
    currentPOI = null;
    currentROI = null;
    currentTOI = null;
}

function lowerLevelGetForm(aoi) {
    window.currentSearchLevel += 1;
    postForm.innerHTML = formStrings[window.currentSearchLevel];

    const getForm = document.getElementById("getForm");
    getForm.innerHTML = `<p> Select a ${levels[window.currentSearchLevel]} to learn more</p>`;
    for (i of aoi) {
        getForm.innerHTML += `<input type="radio" id="${makeSafeId(i.name)}" name="type" value="${makeSafeId(i.name)}" required>
                                <label for=${makeSafeId(i.name)}>${formatString(i.name)}</label>
                                <div id = ${makeSafeId(i.name)}></div> <br>`
    }
    getForm.innerHTML += `<button type="submit">Submit</button>`
    getForm.innerHTML += `<button type="reset">Back To Beginning</button>`
    getForm.innerHTML += `<button type = "button" id="showSummary">Show Summaries</button>`
    document.getElementById("showSummary").addEventListener("click", () => {
        showSummaries(aoi);
    });
}

function searchForArray(valueOfInterest, region = null, town = null, person = null, item = null) {
    const worldInfo = window.worldData;
    let roi = null;
    let toi = null;
    let poi = null;

    for (let r of worldInfo.regions) {
        if (r.name == region) {
            roi = r;
            break;
        } else if (r.name == valueOfInterest) {
            return r.towns;
        }
    }
    for (let t of roi.towns) {
        if (t.name == town) {
            toi = t;
            break;
        } else if (t.name == valueOfInterest) {
            return t.notable_people;
        }
    }
    for (let p of toi.notable_people) {
        if (p.name == person) {
            poi = p;
            break;
        } else if (p.name == valueOfInterest) {
            return p.items;
        }
    }
    for (let i of poi.items) {
        if (r.name == valueOfInterest) {
            return i;
        }
    }
    alert("Already at the lowest level!")
    throw new Error("Object not found!"); //looked this line up
}




// This function will run when the script is loaded
(async () => {
    window.worldData = await loadWorld();
    resetGetForm();
})();


// Get a reference to the form (defined in html)
let postForm = document.querySelector("#postForm");
postForm.innerHTML = formStrings[currentSearchLevel];
let getForm = document.querySelector("#getForm")

// When the user clicks the button, this event listener will read the text in the
// form, construct an object and send it over to the server's 'excite' route using
// a post http request. On the server side, it loops through the world data, and
// if it finds someone with the name that it was given, it adds "!!!" to the data,
// writes it to a file, and then returns the data to the client (here). At this point,
// we can call loadWorld() again to refresh the data displayed on the front end.
postForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // FormData is a utility class that helps us access the data inside of forms
    // without needing to manually call 'document.querySelector' or for every input
    // in the form. After these two lines, we will have a single javascript object
    // where the keys are the "name" field of each input, and the values are the 
    // value of each input (e.g. the text written into a text input).
    let formData = new FormData(postForm);
    let formDataInObjectForm = Object.fromEntries(formData.entries());

    // Tell the server to add excitement to a 
    const res = await fetch(`/add${window.levels[window.currentSearchLevel]}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataInObjectForm)
    });

    const updatedWorld = await res.json();
    // document.getElementById("worldDiv").innerHTML =
    //     `<ul><li>${updatedWorld.regions[0].towns[0].notable_people[0].name}</li></ul>`;
});


getForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let getFormData = new FormData(getForm);
    let getFormDataInObjectForm = Object.fromEntries(getFormData.entries()).type;
    let arr = searchForArray(getFormDataInObjectForm, currentROI, currentTOI, currentPOI);
    if (currentROI == null) {
        currentROI = getFormDataInObjectForm;
    } else if (currentTOI == null) {
        currentTOI = getFormDataInObjectForm;
    } else if (currentPOI == null) {
        currentPOI = getFormDataInObjectForm;
    }
    lowerLevelGetForm(arr);
}
)

getForm.addEventListener("reset", async (e) => {
    e.preventDefault();
    resetGetForm();
})