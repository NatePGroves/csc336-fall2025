import express from "express";
import fs from "fs";

const app = express();


// This line will make it so the node server will make the "front end" (html, css, js)
// is served by the server. No more Live-server!
app.use(express.static("./public"));

// This line helps us process requests that contain json (e.g. in the '/excite' 
// route req.data is automatically json because of this)
app.use(express.json());

app.get("/world", async (req, res) => {
    // Read in the data, parse it into an object and send it over as json to the client
    const dataString = await fs.readFileSync("world.json", "utf-8");
    const dataObject = JSON.parse(dataString);
    res.json(dataObject);
});

app.post("/addregion", async (req, res) => {
    // Read the file that contains all of the world info
    const worldData = await fs.readFileSync("./world.json", "utf-8");
    // As readFile brought in the data as a string, parse it into a JS object.
    let newData =  req.body;
    delete newData.region;
    delete newData.town;
    delete newData.person;
    newData.towns = [];
    console.log('region_update');
    
    const world = JSON.parse(worldData);
    world.regions.push(newData)


    // Write it back to file
    await fs.writeFileSync("./world.json", JSON.stringify(world, null, 2));

    // Now that we've modified the world data, and written it back to file
    // send it back to the client.
    res.json(world);
});

app.post("/addtown", async (req, res) => {
    // Read the file that contains all of the world info
    const worldData = await fs.readFileSync("./world.json", "utf-8");
    // As readFile brought in the data as a string, parse it into a JS object.

    let newData =  req.body;
    delete newData.town;
    delete newData.person;
    newData.notable_people = []
    
    const world = JSON.parse(worldData);
    for(let r of world.regions){
        if (r.name == newData.region){
            delete newData.region
            r.towns.push(newData)
        }
    }
    console.log('town_update');

    // Write it back to file
    await fs.writeFileSync("world.json", JSON.stringify(world, null, 2));

    // Now that we've modified the world data, and written it back to file
    // send it back to the client.
    res.json(world);
});

app.post("/additem", async (req, res) => {
    // Read the file that contains all of the world info
    const worldData = await fs.readFileSync("./world.json", "utf-8");
    // As readFile brought in the data as a string, parse it into a JS object.
    console.log('item_update');
    let newData =  req.body;
    
    const world = JSON.parse(worldData);
    for(let r of world.regions){
        if (r.name == newData.region){
            delete newData.region
            for(let t of r.towns){
                if (t.name == newData.town){
                    delete newData.town
                    for(let p of t.notable_people){
                        if (p.name == newData.person){
                            delete newData.person
                            p.items.push(newData)
                        }
                    }
                }
            }
        }
    }


    // Write it back to file
    await fs.writeFileSync("world.json", JSON.stringify(world, null, 2));

    // Now that we've modified the world data, and written it back to file
    // send it back to the client.
    res.json(world);
});

app.post("/addperson", async (req, res) => {
    // Read the file that contains all of the world info
    const worldData = await fs.readFileSync("./world.json", "utf-8");
    // As readFile brought in the data as a string, parse it into a JS object.
    let newData =  req.body;
    newData.items = [];
    console.log('person_update');
    delete newData.person;
    const world = JSON.parse(worldData);
    for(let r of world.regions){
        if (r.name == newData.region){
            delete newData.region
            for(let t of r.towns){
                if (t.name == newData.town){
                    t.notable_people.push(newData)
                }
            }
        }
    }


    // Write it back to file
    await fs.writeFileSync("world.json", JSON.stringify(world, null, 2));

    // Now that we've modified the world data, and written it back to file
    // send it back to the client.
    res.json(world);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));