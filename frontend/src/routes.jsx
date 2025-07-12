import React from 'react';
import { Routes, Route, Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import AddRecipe from './components/AddRecipe';
import FetchRecipeById from './components/FetchRecipeById';
import AuthPage from './components/AuthPage';
import Profile from './components/Profile';
import Saved from './components/Saved';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './components/Landing';
import EditRecipe from './components/EditRecipe';

// Create router with future flags
const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/add-recipe",
        element: <ProtectedRoute><AddRecipe /></ProtectedRoute>,
    },
    {
        path: "/recipe/:id",
        element: <FetchRecipeById />,
    },
    {
        path: "/login",
        element: <AuthPage />,
    },
    {
        path: "/register",
        element: <AuthPage />,
    },
    {
        path: "/profile",
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
    },
    {
        path: "/saved",
        element: <ProtectedRoute><Saved /></ProtectedRoute>,
    },
    {
        path: "/edit/:id",
        element: <ProtectedRoute><EditRecipe /></ProtectedRoute>,
    },
    {
        path: "*",
        element: <Navigate to={localStorage.getItem('token') ? "/" : "/login"} />,
    },
], {
    future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true
    }
});

function AppRoutes() {
    return <RouterProvider router={router} />;
}

export default AppRoutes; 