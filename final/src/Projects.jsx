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
      const res = await fetch("/projects.json");
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
    }

    loadProjects();
  }, []);


  function addProject() {
    const newProject = {
      name: projectName,
      imageLink: imageLink,
      skillTags: skillTags.split(",").map((s) => s.trim()),
      projectLink: projectLink,
      description: description,
      id: nextID++,
    };

    setProjects((prev) => [...prev, newProject]);

    setProjectName("");
    setImageLink("");
    setSkillTags("");
    setProjectLink("");
    setDescription("");
  }

  return (

    <div className="page-body">
      <form id  = "project-form">
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

        <button onClick={addProject}>Add Project</button>
      </form>

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectItem project={project} key={project.id} />
        ))}
      </div>
    </div>
  );
}
