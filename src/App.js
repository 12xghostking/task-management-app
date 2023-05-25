import './App.css';
import React from 'react';
import LandingPage from './Components/LandingPage/LandingPage.js';
import Login from './Components/Login/Login.js';
import SignUp from './Components/SignUp/SignUp.js';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard.js';
import UserDashboard from './Components/UserDashboard/UserDashboard.js';
import UserProfile from './Components/UserDashboard/UserProfile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/features" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/user" element={<UserDashboard />} />
    <Route path="/user/profile" element={<UserProfile />} />
    {/* Define other routes for different pages */}
  </Routes>
  );
}

export default App;
