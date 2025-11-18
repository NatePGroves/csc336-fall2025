import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Home from "./Home.jsx";
import About from "./About.jsx";
import API from "./API.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/API">Random Image</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/API" element={<API />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
