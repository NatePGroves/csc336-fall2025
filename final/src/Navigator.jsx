import { NavLink } from "react-router-dom";

export default function Navigator() {
  return (
    <nav>
      <div className="container nav-container">
        <h2 className="logo">Nate Groves</h2>
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/resume">Resume</NavLink>
        </div>
      </div>
    </nav>
  );
}