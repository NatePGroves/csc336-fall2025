import express from "express";
import cors from "cors"
import fs from "fs";
const app = express();

app.use(express.json());
app.use(cors());





app.get("/api/projects", async (req, res) => {
  try{
  const dataString = await fs.readFileSync("./api/projects.json", "utf-8");
  const dataObject = JSON.parse(dataString);
  res.json(dataObject);}
  catch (error) {
    console.error("Error reading projects:", error);
    res.status(500).json({ error: "Failed to read projects data" });
  }
});

app.post("/api/add", async (req, res) => {
  const dataString = await fs.readFileSync("./api/projects.json", "utf-8");
  const project_list = JSON.parse(dataString);
  let newData = req.body;
  project_list.projects.push(newData)
  await fs.writeFileSync("./api/projects.json", JSON.stringify(project_list, null, 2));
  res.json(project_list);
})





app.use(express.static("./client"));
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

