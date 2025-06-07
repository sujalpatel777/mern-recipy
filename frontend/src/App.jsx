import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import GitHubCallback from './components/GitHubCallback';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1F2937',
                color: '#fff',
                borderRadius: '8px',
                padding: '16px',
                fontSize: '14px',
              },
              success: {
                iconTheme: {
                  primary: '#FCD34D',
                  secondary: '#000',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          <Routes>
            {/* Auth routes without navbar */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/github/callback" element={<GitHubCallback />} />

            {/* Protected routes with navbar */}
            <Route
              path="/"
              element={
                <>
                  <Navbar />
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
                  <Navbar />
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
                  <Navbar />
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
                  <Navbar />
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
                  <Navbar />
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
                  <Navbar />
                  <main className="container mx-auto px-4 py-8">
                    <About />
                  </main>
                </>
              }
            />

            {/* Redirect to register page by default */}
            <Route path="*" element={<Navigate to="/register" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;