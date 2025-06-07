import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isConversionOpen, setIsConversionOpen] = useState(true);

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

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-gray-800/95 backdrop-blur-sm shadow-lg'
        : 'bg-gray-800'
        } border-b border-gray-700`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#c471ed] to-[#8a2be2] bg-clip-text text-transparent hover:from-[#8a2be2] hover:to-[#a145f7] transition-all duration-300 transform hover:scale-105">
                Recipy
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`px-3 py-2 text-white hover:bg-[#8a2be2] rounded-lg transition-all duration-200 ${isActive('/') ? 'bg-[#a145f7]' : ''}`}
              >
                <div className="flex items-center space-x-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Home</span>
                </div>
              </Link>
              <Link
                to="/add-recipe"
                className={`px-3 py-2 text-white hover:bg-[#8a2be2] rounded-lg transition-all duration-200 ${isActive('/add-recipe') ? 'bg-[#a145f7]' : ''}`}
              >
                <div className="flex items-center space-x-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add Recipe</span>
                </div>
              </Link>
              <Link
                to="/saved-recipes"
                className={`px-3 py-2 text-white hover:bg-[#8a2be2] rounded-lg transition-all duration-200 ${isActive('/saved-recipes') ? 'bg-[#a145f7]' : ''}`}
              >
                <div className="flex items-center space-x-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Saved Recipes</span>
                </div>
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 text-white hover:bg-[#8a2be2] rounded-lg transition-all duration-200 ${isActive('/about') ? 'bg-[#a145f7]' : ''}`}
              >
                <div className="flex items-center space-x-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>About</span>
                </div>
              </Link>
              <Link
                to="/profile"
                className={`px-3 py-2 text-white hover:bg-[#8a2be2] rounded-lg transition-all duration-200 ${isActive('/profile') ? 'bg-[#a145f7]' : ''}`}
              >
                <div className="flex items-center space-x-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Profile</span>
                </div>
              </Link>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-white bg-[#a145f7] hover:bg-[#8a2be2] rounded-lg transition-all duration-200"
                >
                  <div className="flex items-center space-x-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </div>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-red text-white font-semibold hover:bg-red transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red/20"
                >
                  Logout
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={toggleMobileMenu}
                className="text-[#a145f7] hover:text-[#8a2be2] focus:outline-none transition-all duration-300 transform hover:scale-110"
                aria-label="Toggle menu"
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
              </button>
            </div>

            {/* Desktop Theme Toggle */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800 rounded-lg shadow-lg mt-2 border border-gray-700">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${isActive('/')
                  ? 'bg-[#a145f7] text-white'
                  : 'text-white hover:bg-[#8a2be2]'
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Home</span>
                </div>
              </Link>
              <Link
                to="/add-recipe"
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${isActive('/add-recipe')
                  ? 'bg-[#a145f7] text-white'
                  : 'text-white hover:bg-[#8a2be2]'
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add Recipe</span>
                </div>
              </Link>
              <Link
                to="/saved-recipes"
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${isActive('/saved-recipes')
                  ? 'bg-[#a145f7] text-white'
                  : 'text-white hover:bg-[#8a2be2]'
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Saved Recipes</span>
                </div>
              </Link>
              <Link
                to="/about"
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${isActive('/about')
                  ? 'bg-[#a145f7] text-white'
                  : 'text-white hover:bg-[#8a2be2]'
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>About</span>
                </div>
              </Link>
              <Link
                to="/profile"
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${isActive('/profile')
                  ? 'bg-[#a145f7] text-white'
                  : 'text-white hover:bg-[#8a2be2]'
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Profile</span>
                </div>
              </Link>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-white bg-[#a145f7] hover:bg-[#8a2be2] transition-all duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </div>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-lg text-base font-medium bg-[#a145f7] text-white hover:bg-[#8a2be2] transition-all duration-200 text-center"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;