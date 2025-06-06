import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import AddRecipe from './components/AddRecipe';
import Profile from './components/Profile';
import Home from './components/Home';
import Logout from './components/Logout';
import Saved from './components/Saved';
import FetchRecipeById from "./components/FetchRecipeById"
import About from './components/About';
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/About" element={<About/>} />
          <Route path="/:id" element={<FetchRecipeById />} />
        </Routes>
      </div>
    </Router>
  );
}