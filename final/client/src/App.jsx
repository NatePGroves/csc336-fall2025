import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Navigator from "./Navigator";
import Home from "./Home";
import Projects from "./Projects";
import Resume from "./Resume";
import About from "./About";
import Contact from "./Contact";


function App() {
  return (
    <BrowserRouter>
      <Navigator />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
