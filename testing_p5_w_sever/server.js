import express from "express";
import fs from "fs";

const app = express();

app.use(express.static("./public"));
app.use(express.json());





app.get("/world", async (req, res) => {
    let result = await fs.readFileSync("./world.json");
    let world = JSON.parse(result);
    res.json(world);
})

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
