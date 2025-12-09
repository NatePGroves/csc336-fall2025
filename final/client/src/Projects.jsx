import { useEffect, useState } from "react";
import ProjectItem from "./ProjectItem";

let nextID = 1;

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [skillTags, setSkillTags] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {

        const res = await fetch("http://localhost:3000/api/projects");
        const data = await res.json();

        const projects_to_display = data.projects.map(p => ({
          name: p.name,
          imageLink: p.imageLink,
          skillTags: p.skillTags,
          projectLink: p.projectLink,
          description: p.description,
          id: nextID++
        }));

        setProjects(projects_to_display);
      } catch (error) {
        alert("Error loading projects!");
      }
    }

    loadProjects();



  }, []);


  async function addProject(e) {
    e.preventDefault();
    if (!projectName || !skillTags || !description) {
      alert("Please fill out all required fields!");
      return;
    }

    const newProject = {
      name: projectName,
      imageLink: imageLink,
      skillTags: skillTags.split(",").map((s) => s.trim()),
      projectLink: projectLink,
      description: description,
    };

    try {
      
      const res = await fetch("http://localhost:3000/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      if (!res.ok) throw new Error("Failed to save project");

      const updatedProjects = await res.json();

      setProjects(updatedProjects.projects.map((p) => ({ ...p, id: nextID++ })));

      setProjectName("");
      setImageLink("");
      setSkillTags("");
      setProjectLink("");
      setDescription("");
    } catch (error) {
      alert("Error adding project: " + error.message);
      console.error(error);
    }
  }

  return (

    <div className="page-body">
      <form id="project-form" onSubmit={addProject}>
        <input
          type="text"
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter project image link"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}

        />

        <input
          type="text"
          placeholder="Enter skill tags (comma separated)"
          value={skillTags}
          onChange={(e) => setSkillTags(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter project link"
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button>Add Project</button>
      </form>

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectItem project={project} key={project.id} />
        ))}
      </div>
    </div>
  );
}
