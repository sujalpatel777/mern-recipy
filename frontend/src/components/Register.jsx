
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaBirthdayCake, FaVenusMars, FaCamera, FaEye, FaEyeSlash } from 'react-icons/fa';
import { url } from "../base";

const Register = () => {
  const { login, setUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    gmail: '',
    password: '',
    confirmPassword: '',
    gender: '',
    phone: '',
    birthday: '',
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error('Password should be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${url}/api/users/register`, {
        ...formData,
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      toast.success('Registration successful! Welcome to Recipe Hub!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: i * 0.1 }
    })
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-100 p-4 sm:p-6 md:p-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-teal-300 to-emerald-300 rounded-full opacity-20 -top-32 -left-32"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-r from-blue-300 to-sky-300 rounded-full opacity-15 -bottom-40 -right-40"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-amber-200 rounded-full opacity-10"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div 
        className="relative z-10 w-full max-w-4xl bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[600px] border border-white/20"
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
      >
        {/* Left Section - Enhanced Register Form */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 bg-transparent">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Join Recipe Hub
            </h2>
            <p className="text-gray-600 text-sm">Create your account and start your culinary journey</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            {/* Enhanced Photo Upload */}
            <motion.div 
              className="flex flex-col items-center mb-6"
              custom={0}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 p-1 shadow-lg">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                        US
                      </span>
                    )}
                  </div>
                </div>
                <label 
                  htmlFor="photo-upload" 
                  className="absolute bottom-0 right-0 bg-gradient-to-r from-teal-500 to-blue-500 p-2 rounded-full cursor-pointer shadow-lg transform transition-transform duration-200 hover:scale-110 group-hover:scale-110"
                >
                  <FaCamera className="text-white text-sm" />
                  <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                </label>
                <div className="absolute inset-0 rounded-full bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
              <span className="text-gray-500 text-xs mt-2">Click to upload profile photo</span>
            </motion.div>

            {/* Enhanced Input Fields */}
            {[
              { icon: FaUser, name: 'name', type: 'text', placeholder: 'Full Name', required: true },
              { icon: FaEnvelope, name: 'gmail', type: 'email', placeholder: 'Email Address', required: true },
              { 
                icon: FaLock, 
                name: 'password', 
                type: showPassword ? 'text' : 'password', 
                placeholder: 'Password', 
                required: true,
                showToggle: true,
                toggleState: showPassword,
                toggleAction: () => setShowPassword(!showPassword)
              },
              { 
                icon: FaLock, 
                name: 'confirmPassword', 
                type: showConfirmPassword ? 'text' : 'password', 
                placeholder: 'Confirm Password', 
                required: true,
                showToggle: true,
                toggleState: showConfirmPassword,
                toggleAction: () => setShowConfirmPassword(!showConfirmPassword)
              },
            ].map((field, index) => (
              <motion.div 
                key={field.name}
                className="relative"
                custom={index + 1}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <field.icon className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                  isFocused[field.name] ? 'text-teal-500' : 'text-gray-400'
                }`} />
                <input 
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  onFocus={() => handleFocus(field.name)}
                  onBlur={() => handleBlur(field.name)}
                  required={field.required}
                  className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-teal-200 focus:border-teal-400 bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
                />
                {field.showToggle && (
                  <button
                    type="button"
                    onClick={field.toggleAction}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-500 transition-colors duration-200"
                  >
                    {field.toggleState ? <FaEyeSlash /> : <FaEye />}
                  </button>
                )}
              </motion.div>
            ))}

            {/* Enhanced Select and Date Fields */}
            {[
              { 
                icon: FaVenusMars, 
                name: 'gender', 
                type: 'select', 
                placeholder: 'Select Gender', 
                options: ['Male', 'Female', 'Other'],
                required: true 
              },
              { icon: FaPhone, name: 'phone', type: 'tel', placeholder: 'Phone Number (optional)', required: false },
              { icon: FaBirthdayCake, name: 'birthday', type: 'date', placeholder: '', required: true },
            ].map((field, index) => (
              <motion.div 
                key={field.name}
                className="relative"
                custom={index + 5}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <field.icon className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                  isFocused[field.name] ? 'text-teal-500' : 'text-gray-400'
                }`} />
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    onFocus={() => handleFocus(field.name)}
                    onBlur={() => handleBlur(field.name)}
                    required={field.required}
                    className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-teal-200 focus:border-teal-400 bg-white/50 backdrop-blur-sm text-gray-900 appearance-none transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <option value="" disabled>{field.placeholder}</option>
                    {field.options.map(option => (
                      <option key={option.toLowerCase()} value={option.toLowerCase()}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input 
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    onFocus={() => handleFocus(field.name)}
                    onBlur={() => handleBlur(field.name)}
                    required={field.required}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-teal-200 focus:border-teal-400 bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                )}
                {field.type === 'select' && (
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                )}
              </motion.div>
            ))}

            {/* Enhanced Submit Button */}
            <motion.div 
              className="pt-4"
              custom={8}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
            >
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full relative overflow-hidden group bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="relative z-10 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.span 
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Creating Account...
                      </motion.span>
                    ) : (
                      <motion.span 
                        key="signup"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        Get Started
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </motion.div>

            {/* Enhanced Login Link */}
            <motion.p 
              className="text-center text-gray-600 text-sm pt-4"
              custom={9}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
            >
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-semibold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent hover:from-teal-600 hover:to-blue-600 transition-all duration-200 relative group"
              >
                Sign In
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </motion.p>
          </form>
        </div>

        {/* Enhanced Right Section */}
        <motion.div 
          className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-teal-500 via-blue-500 to-sky-500 relative overflow-hidden items-center justify-center p-12"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          
          <div className="text-white text-center relative z-10 max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">👨‍🍳</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Welcome to Recipe Hub
              </h3>
              <p className="text-lg mb-6 text-white/90 leading-relaxed">
                Join our community of food lovers. Share your recipes, discover new dishes, and connect with fellow chefs.
              </p>
              <div className="space-y-3 text-left">
                {['Share your culinary creations', 'Discover amazing recipes', 'Connect with food enthusiasts', 'Save your favorites'].map((item, index) => (
                  <motion.div 
                    key={item}
                    className="flex items-center text-white/80"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full mr-3" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Register;