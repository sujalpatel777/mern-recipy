import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import AddRecipe from './components/AddRecipe';
import FetchRecipeById from './components/FetchRecipeById';
import AuthPage from './components/AuthPage';
import Profile from './components/Profile';
import Saved from './components/Saved';
import ProtectedRoute from './components/ProtectedRoute';

function AppRoutes() {
    const token = localStorage.getItem('token');

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/add-recipe" element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} />
            <Route path="/recipe/:id" element={<FetchRecipeById />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/saved" element={<ProtectedRoute><Saved /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
        </Routes>
    );
}

export default AppRoutes; 