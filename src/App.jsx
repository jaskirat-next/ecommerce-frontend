import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home';
import { AllCollection } from './pages/allCollection';
import Signup from './components/Signup';
import Login from './components/Login';
import { Cart } from './pages/Cart';
import CheckOut from './pages/checkout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/collection/all' element={<AllCollection />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path='/address' element={<CheckOut />}/>

    </Routes>
  )
}

export default App
