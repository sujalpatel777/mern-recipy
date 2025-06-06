import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success('Logged out successfully!');
    navigate('/Home');
  };

  return (
    <nav className="flex items-center justify-between h-16 bg-gray-800 px-6 shadow-md">
      <div className="text-2xl font-bold text-yellow-400">MERN Recipe</div>
      <div className="flex space-x-4">
        <Link to="/Home" className="px-3 py-2 text-white hover:bg-gray-700 rounded-lg">Home</Link>
        <Link to="/register" className="px-3 py-2 text-white hover:bg-gray-700 rounded-lg">Register</Link>
        <Link to="/login" className="px-3 py-2 text-white hover:bg-gray-700 rounded-lg">Login</Link>
        <Link to="/add-recipe" className="px-3 py-2 text-white hover:bg-gray-700 rounded-lg">Add Recipe</Link>
        <Link to="/profile" className="px-3 py-2 text-white hover:bg-gray-700 rounded-lg">Profile</Link>
        <Link to="/saved" className="px-3 py-2 text-white hover:bg-gray-700 rounded-lg">Saved Recipes</Link>
        <Link to="/about" className="px-3 py-2 text-white hover:bg-gray-700 rounded-lg">About</Link>
        <button onClick={handleLogout} className="px-3 py-2 text-white hover:bg-red-600 rounded-lg">
          Logout
        </button>
      </div>
    </nav>
  );
}