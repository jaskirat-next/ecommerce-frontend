import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home';
import { AllCollection } from './pages/allCollection';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/collection/all' element={<AllCollection />} />
    </Routes>
  )
}

export default App
