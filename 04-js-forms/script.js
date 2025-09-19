let points = [
    {
        label: "example",
        xPos: 50,
        yPos: 50,
        color: "Red",
        radius: 10
    }
]

let lines = []

function populateLineForm() {
    let lineForm = document.querySelector("#line-form")
    if (points.length > 2) { //2 points + example
        lineForm.innerHTML = `<label for="point-1">Choose point 1 for the new line:</label>
                                 <select id="point-1" class = "selector">
                                </select>
                                <label for="point-2">Choose point 2 for the new line:</label>
                                 <select id="point-2" class = "selector">
                                </select>
                                <button type="submit" id = "add-point">Add Line</button>`
        let drop1 = document.querySelector("#point-1")
        let drop2 = document.querySelector("#point-2")
        for (let point of points) {
            if (point.label === "example") {
                continue;
            }
            drop1.innerHTML += `<option value="${point.label}">${point.label}</option>`;
            drop2.innerHTML += `<option value="${point.label}">${point.label}</option>`;
        }

    } else {
        lineForm.innerHTML = '<p>Add at least two lines to create a line!</p>';
    }
}

function populateListAndPlot() {
    let listDiv = document.querySelector("#list-area");
    let graphSVG = document.querySelector("#graph");

    listDiv.innerHTML = "";
    graphSVG.innerHTML = "";


    for (let point of points) {
        let pointCardHTML = htmlPointCard(point);
        let pointHTML = htmlPoint(point);
        if (point.label === "example" && (points.length > 1 || lines.length > 0)) {
            continue; //Once a point is added, it will no longer load the example point
        }
        listDiv.innerHTML += pointCardHTML;
        graphSVG.innerHTML += pointHTML;
    }
    for (let line of lines) {
        let lineHTML = htmlLine(line);
        graphSVG.innerHTML += lineHTML;
        listDiv.innerHTML += htmlLineCard(line);
    }
    populateLineForm();
}


function htmlPointCard(point) {
    return `<div class="point-card" id = "${point.label}" onclick = "deletePoint('${point.label}')">
            <p>Type: Point</p>
            <p>Label: ${point.label}</p>
            <p>X: ${point.xPos}, Y: ${point.yPos}</p>
            <p>Color: ${point.color}</p>
            <p>Radius: ${point.radius}</p>
            </div>`
}

function htmlPoint(point) {
    return `<circle id="#${point.label}" cx="${point.xPos}%" cy="${point.yPos}%" r="${point.radius}" fill="${point.color}" />`
}

function labelFinder(item) {
    return item.label !== labelToDelete;
}

let labelToDelete = ""

function deletePoint(id) { // using help from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    if (id === "example") {
        alert("Example point cannot be deleted, add a point and example will disappear!")
        return false
    }
    labelToDelete = id
    points = points.filter(labelFinder);
    populateListAndPlot();
}


function addPoint(e) {
    e.preventDefault();

    for (let point of points) {
        if (point.label === document.querySelector("#label-field").value) {
            alert("Label value must be unique (and cannot be 'example')")
            return false
        }
    }

    points.push({
        label: document.querySelector("#label-field").value,
        xPos: document.querySelector("#x-pos-field").value,
        yPos: document.querySelector("#y-pos-field").value,
        color: document.querySelector("#color").value,
        radius: document.querySelector("#radius-field").value,
    })

    populateListAndPlot();
}

function addLine(e) {

    e.preventDefault();

    let p1 = document.querySelector("#point-1").value;
    let p2 = document.querySelector("#point-2").value;

    if (p1 == p2) {
        alert("The endpoints must be different");
        return false;
    }
    let p1X = 0;
    let p1Y = 0;
    let p1ID = "";

    let p2X = 0;
    let p2Y = 0;
    let p2ID = "";

    let graphSVG = document.querySelector("#graph");

    for (let point of points) {
        if (point.label == p1) {
            p1ID = point.label;
            p1X = (point.xPos / 100) * graphSVG.clientWidth;
            p1Y = (point.yPos / 100) * graphSVG.clientHeight;
            continue;
        }
        if (point.label == p2) {
            p2ID = point.label;
            p2X = (point.xPos / 100) * graphSVG.clientWidth;
            p2Y = (point.yPos / 100) * graphSVG.clientHeight;
            continue;
        }
    }

    for (let line of lines) {
        if ((line.p1ID == p1ID && line.p2ID == p2ID) || (line.p2ID == p1ID && line.p1ID == p2ID)) {
            alert("Line already exists");
            return false
        }
    }
    lines.push({
        p1ID: p1ID,
        p1X: p1X,
        p1Y: p1Y,
        p2ID: p2ID,
        p2X: p2X,
        p2Y: p2Y
    })
    populateListAndPlot()
}

function htmlLine(line) {
    return `<path d="M${line.p1X} ${line.p1Y} L${line.p2X} ${line.p2Y}" stroke="black" stroke-width="2"/>`;
}

function htmlLineCard(line) {
    return `<div class="line-card" id="${line.p1ID}-${line.p2ID}" onclick="deleteLine('${line.p1ID}', '${line.p2ID}')">
        <p>Type: Line</p>
        <p>Label: ${line.p1ID} -> ${line.p2ID}</p>
    </div>`;
}

let idsToDelete = [];

function idsFinder(item) {
    return !(
        (item.p1ID === idsToDelete[0] && item.p2ID === idsToDelete[1]) ||
        (item.p1ID === idsToDelete[1] && item.p2ID === idsToDelete[0])
    );
}

function deleteLine(p1, p2) {
    idsToDelete = [p1, p2];
    lines = lines.filter(idsFinder);
    populateListAndPlot();
}

let pointForm = document.querySelector("#point-form");
pointForm.addEventListener("submit", addPoint);

let lineForm = document.querySelector("#line-form");
lineForm.addEventListener("submit", addLine)

// This function call draws the initial array of animals.
populateListAndPlot();