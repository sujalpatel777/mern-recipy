import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { Utensils, Plus, Bookmark, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const navItems = [
    { icon: <Utensils className="h-5 w-5" />, text: "Home", to: "/" },
    { icon: <Plus className="h-5 w-5" />, text: "Add Recipe", to: "/add-recipe" },
    { icon: <Bookmark className="h-5 w-5" />, text: "Saved", to: "/saved-recipes" },
    { icon: <User className="h-5 w-5" />, text: "Profile", to: "/profile" },
  ];

  return (
    <motion.nav
      className="fixed w-full z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Link to="/" className="text-xl font-bold text-purple-600 dark:text-purple-400 flex items-center">
              <Utensils className="h-6 w-6 mr-2" />
              Mern-recipy
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-6">
            {token && navItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.to}
                  className={`flex items-center px-3 py-2 rounded-lg transition-all ${location.pathname === item.to
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  {item.icon}
                  <span className="ml-2 font-medium">{item.text}</span>
                </Link>
              </motion.div>
            ))}

            {token ? (
              <motion.button
                onClick={logout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </motion.button>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Login
                </Link>
              </motion.div>
            )}
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            {/* Mobile menu button would go here */}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;