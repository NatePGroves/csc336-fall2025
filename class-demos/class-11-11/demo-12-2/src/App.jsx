import { useState } from 'react'
import './App.css'
import Home from './Home'
import About from './About'

function App() {

  
  let arr = [1,2,3,4,5,6]

  return(
    <>
      <BrowserRouter>
      <nav>
      <Link to = "/">Home</Link>
      <Link to = "/about">About</Link>
      </nav>
      <Routes></Routes>
      </BrowserRouter>

    </>
  )
}

export default App
