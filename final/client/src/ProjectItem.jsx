import "./index.css";

export default function ProjectItem({ project }) {
  return (
    <div className="project-card">
      <h3>{project.name}</h3>

      <img 
        src={project.imageLink}
        className="project-image"
        alt="Image loading error!"
      />

      <p>{project.description}</p>

      <a href={project.projectLink} className="btn-primary" target="_blank">
        View Project
      </a>
    </div>
  );
}

