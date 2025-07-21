import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { Utensils, UtensilsCrossed, Moon as Spoon, ChefHat, Home, Plus, Bookmark, Info, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isConversionOpen, setIsConversionOpen] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleConversion = () => {
    setIsConversionOpen(!isConversionOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  function NavItem({ icon, text, to, active = false }) {
    return (
      <Link
        to={to}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-purple-600/20 hover:scale-105 ${active ? 'text-purple-400 bg-purple-600/20' : 'text-white hover:text-purple-400'}`}
      >
        {icon}
        <span className="font-medium">{text}</span>
      </Link>
    );
  }

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled
          ? 'bg-gray-800/95 backdrop-blur-md shadow-lg'
          : 'bg-gray-800'
          } border-b border-gray-700`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2 group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/">
                <img src="/recipy-logo.png" alt="Recipy Logo" className="h-12 w-12 object-contain transition-transform group-hover:scale-110" />
              </Link>
              <Link to="/" className="text-xl font-bold text-purple-400 tracking-wide transition-colors group-hover:text-yellow-300">
                MAKE RECIPY
              </Link>
            </motion.div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <NavItem icon={<Home className="h-5 w-5" />} text="Home" to="/" active={isActive('/')} />
              {token && (
                <>
                  <NavItem icon={<Plus className="h-5 w-5" />} text="Add Recipe" to="/add-recipe" active={isActive('/add-recipe')} />
                  <NavItem icon={<Bookmark className="h-5 w-5" />} text="Saved Recipes" to="/saved-recipes" active={isActive('/saved-recipes')} />
                  <NavItem icon={<User className="h-5 w-5" />} text="Profile" to="/profile" active={isActive('/profile')} />
                  <NavItem icon={<Info className="h-5 w-5" />} text="About" to="/about" active={isActive('/about')} />
                  <motion.button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </motion.button>
                </>
              )}
              {!token && (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-purple-600/20"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button and Theme Toggle */}
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <motion.button
                onClick={toggleMobileMenu}
                className="text-purple-400 hover:text-purple-300 focus:outline-none transition-all duration-300 transform hover:scale-110"
                aria-label="Toggle menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Desktop Theme Toggle */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="md:hidden overflow-hidden"
              >
                <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800/95 rounded-lg shadow-lg mt-2 border border-gray-700">
                  <NavItem icon={<Home className="h-5 w-5" />} text="Home" to="/" active={isActive('/')} />
                  {token && (
                    <>
                      <NavItem icon={<Plus className="h-5 w-5" />} text="Add Recipe" to="/add-recipe" active={isActive('/add-recipe')} />
                      <NavItem icon={<Bookmark className="h-5 w-5" />} text="Saved Recipes" to="/saved-recipes" active={isActive('/saved-recipes')} />
                      <NavItem icon={<User className="h-5 w-5" />} text="Profile" to="/profile" active={isActive('/profile')} />
                      <motion.button
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-white bg-purple-600 hover:bg-purple-700 transition-all duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex items-center space-x-2">
                          <LogOut className="h-5 w-5" />
                          <span>Logout</span>
                        </div>
                      </motion.button>
                    </>
                  )}
                  <NavItem icon={<Info className="h-5 w-5" />} text="About" to="/about" active={isActive('/about')} />
                  {!token && (
                    <Link
                      to="/login"
                      className="block px-3 py-2 rounded-lg text-base font-medium bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200 text-center"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;