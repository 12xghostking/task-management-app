import './App.css';
import React from 'react';
import LandingPage from './Components/LandingPage/LandingPage.js';
import Login from './Components/Login/Login.js';
import SignUp from './Components/SignUp/SignUp.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/features" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    {/* Define other routes for different pages */}
  </Routes>
  );
}

export default App;
