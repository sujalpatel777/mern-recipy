import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Saved from './components/Saved';
import AddRecipe from './components/AddRecipe';
import RecipeDetails from './components/RecipeDetails';
import Profile from './components/Profile';
import About from './components/About';
import EditRecipe from './components/EditRecipe';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <Routes>
        {/* Auth routes without navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      

        {/* Protected routes with navbar */}
        <Route
          path="/"
          element={
            <>
              {!hideNavbar && <Navbar />}
              <main className="container mx-auto px-4 py-8">
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              </main>
            </>
          }
        />
        <Route
          path="/recipe/:id"
          element={
            <>
              {!hideNavbar && <Navbar />}
              <main className="container mx-auto px-4 py-8">
                <ProtectedRoute>
                  <RecipeDetails />
                </ProtectedRoute>
              </main>
            </>
          }
        />
        <Route
          path="/saved-recipes"
          element={
            <>
              {!hideNavbar && <Navbar />}
              <main className="container mx-auto px-4 py-8">
                <ProtectedRoute>
                  <Saved />
                </ProtectedRoute>
              </main>
            </>
          }
        />
        <Route
          path="/add-recipe"
          element={
            <>
              {!hideNavbar && <Navbar />}
              <main className="container mx-auto px-4 py-8">
                <ProtectedRoute>
                  <AddRecipe />
                </ProtectedRoute>
              </main>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              {!hideNavbar && <Navbar />}
              <main className="container mx-auto px-4 py-8">
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              </main>
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              {!hideNavbar && <Navbar />}
              <main className="container mx-auto px-4 py-8">
                <About />
              </main>
            </>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <>
              {!hideNavbar && <Navbar />}
              <main className="container mx-auto px-4 py-8">
                <ProtectedRoute>
                  <EditRecipe />
                </ProtectedRoute>
              </main>
            </>
          }
        />

        {/* Redirect to register page by default */}
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </>
  );
};

const App = () => (
  <AuthProvider>
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  </AuthProvider>
);

export default App;