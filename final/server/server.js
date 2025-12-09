import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// --- API routes ---
app.get("/api/projects", (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, "api/projects.json"), "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Failed to read projects data" });
  }
});

app.post("/api/add", (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, "api/projects.json"), "utf-8");
    const projects = JSON.parse(data);
    projects.projects.push(req.body);
    fs.writeFileSync(path.join(__dirname, "api/projects.json"), JSON.stringify(projects, null, 2));
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to write projects data" });
  }
});

// --- Serve React static files ---
app.use(express.static(path.join(__dirname, "public")));

// --- Catch-all route for React Router ---
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// --- Start server ---
const PORT = 2000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
