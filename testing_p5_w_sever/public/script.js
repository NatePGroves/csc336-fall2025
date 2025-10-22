let world;
let people = []

async function getWorld(){
    let resp = await fetch("/world");
    world  = await resp.json();
} 


async function setup(){
    createCanvas(800,600);
    console.log("p5 loaded");
    await getWorld();
    
    colorMode(HSB);
    for (let region of world.regions){
        for (let town of region.towns){
            console.log(town.name);
            for (person of town.notable_people){
                people[person.name] = new Person(person);
            }
        }
    }

}


function draw(){
    background(frameCount%360, 100,100);
    for (let name in people){
        let person = people[name];
        person.update();
    }
}
