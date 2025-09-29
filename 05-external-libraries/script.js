// I am using d3, which is really cool and I learned a bunch of stuff I learned from https://www.d3indepth.com/
let data = [], ingredientCount = 10, ingredientTypes = ["pepperoni", "tomato", "olive"]


let myDrag = d3.drag()
    .on('drag', handleDrag);

function handleDrag(e) {
    e.subject.x = e.x;
    e.subject.y = e.y;
    update();
}


function initDrag() {
    d3.select('svg')
        .selectAll('.ingredient')
        .call(myDrag);
}

function updateData() {
    data = [];

    for (let type in ingredientTypes) {
        for (let i = 0; i < ingredientCount; i++) {
            data.push({
                id: i,
                x: 45,
                y: (100 * parseInt(type) + 45),
                class: `ingredient ${ingredientTypes[type]}`,
                type: ingredientTypes[type]
            }); // not using parse int here made me lose my mind for a while
        }
    }
}

function update() {
    d3.select('svg')
        .selectAll('.pepperoni')
        .data(data.filter(d => d.type === "pepperoni"))
        .join('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('class', d => d.class)
        .attr('r', 25)
        .attr('fill', '#b71c1c');

    d3.select('svg')
        .selectAll('.olive')
        .data(data.filter(d => d.type === "olive"))
        .join('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('class', d => d.class)
        .attr('r', 12)
        .attr('fill', '#2e2a2a');
    const size = 20; // tomato size
    d3.select('svg')
        .selectAll('.tomato')
        .data(data.filter(d => d.type === "tomato"))
        .join('rect')
        .attr('x', d => d.x - size/2) //because svg rects are based on the top left corner and not the center, this centers it around the point I want   
        .attr('y', d => d.y - size/2)   
        .attr('width', size)
        .attr('height', size)
        .attr('fill', '#FF0000')
        .attr('class', d => d.class);

    initDrag(); // reapply drag each update
}

updateData();
update();
initDrag();

d3.selectAll("#crust")

function changeText() {
    let changedText = document.querySelector("#changing-text");
    changedText.innerHTML = "If you think our pizza is bad, you're wrong. Suck it up.";
}

function restoreText() {
    let changedText = document.querySelector("#changing-text");
    changedText.innerHTML = "Step into Parker’s Pizza Place, where the oven’s always hot and the vibe is even hotter. This local favorite is all about bold flavors, good times, and pizza done right. From the moment you walk in, the aroma hits you—and so does the energy. Whether you're grabbing a quick bite or settling in with friends, Parker’s delivers a crave-worthy experience that keeps people coming back for more. It’s not just pizza—it’s Parker’s.";
}

function resetPizza (){
    updateData();
    update();
    initDrag();
}


