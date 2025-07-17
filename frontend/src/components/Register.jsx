import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaBirthdayCake, FaVenusMars, FaCamera } from 'react-icons/fa';
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
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

        try {
            const response = await axios.post(`${url}/api/users/register`, {
                ...formData,
                // Do not send photo for now
            });

            const { token, user } = response.data;

            localStorage.setItem('token', token);
            setUser(user);

            toast.success('Registration successful!');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-4 sm:p-6 md:p-8 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* Animated Background Elements */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
            >
                <motion.div
                    className="absolute w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-purple-200 rounded-full opacity-20 -top-24 -left-24"
                    animate={{
                        scale: [1, 1.15, 1],
                        x: [0, 25, 0],
                        y: [0, 35, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-indigo-200 rounded-full opacity-20 top-1/3 right-4"
                    animate={{
                        scale: [1, 1.25, 1],
                        x: [0, -20, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
                />
            </motion.div>

            <motion.div
                className="relative z-10 w-full max-w-md sm:max-w-lg lg:max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[400px]"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                {/* Left Section - Register Form */}
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-10 bg-white">
                    <motion.h2
                        className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Create Your Account
                    </motion.h2>

                    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                        {/* Photo Upload */}
                        <motion.div
                            className="flex flex-col items-center mb-6"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                        >
                            <div className="relative w-28 h-28 mb-2 flex items-center justify-center rounded-full bg-purple-600 border-4 border-purple-700 overflow-hidden">
                                {photoPreview ? (
                                    <img
                                        src={photoPreview}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-5xl font-bold text-white">US</span>
                                )}
                                <label
                                    htmlFor="photo-upload"
                                    className="absolute bottom-0 right-0 bg-purple-700 p-2 rounded-full cursor-pointer hover:bg-purple-800 transition-colors duration-200"
                                >
                                    <FaCamera className="text-white text-lg" />
                                    <input
                                        id="photo-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <span className="text-gray-600 text-sm">Profile Photo (optional)</span>
                        </motion.div>

                        {/* Name */}
                        <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <motion.input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 placeholder-gray-500 transition-all duration-300"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <motion.input
                                type="email"
                                name="gmail"
                                placeholder="Email"
                                value={formData.gmail}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 placeholder-gray-500 transition-all duration-300"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <motion.input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 placeholder-gray-500 transition-all duration-300"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <motion.input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 placeholder-gray-500 transition-all duration-300"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.7 }}
                            />
                        </div>

                        {/* Gender */}
                        <div className="relative">
                            <FaVenusMars className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <motion.select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 placeholder-gray-500 appearance-none transition-all duration-300"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.8 }}
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </motion.select>
                            <svg
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>

                        {/* Phone */}
                        <div className="relative">
                            <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <motion.input
                                type="tel"
                                name="phone"
                                placeholder="Phone (optional)"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 placeholder-gray-500 transition-all duration-300"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.9 }}
                            />
                        </div>

                        {/* Birthday */}
                        <div className="relative">
                            <FaBirthdayCake className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <motion.input
                                type="date"
                                name="birthday"
                                value={formData.birthday}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 placeholder-gray-500 transition-all duration-300"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 1.0 }}
                            />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 1.1 }}
                        >
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base sm:text-lg font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-50"
                            >
                                <AnimatePresence>
                                    {isLoading ? (
                                        <motion.span
                                            key="registering"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            Registering...
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="signup"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            Sign Up
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </motion.div>

                        <motion.p
                            className="mt-6 text-center text-sm text-gray-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 1.2 }}
                        >
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200">
                                Sign In
                            </Link>
                        </motion.p>
                    </form>
                </div>

                {/* Right Section - Decorative Background */}
                <motion.div
                    className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 relative overflow-hidden items-center justify-center p-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="text-white text-center">
                        <motion.h3
                            className="text-xl sm:text-2xl font-bold mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            Join the Recipe Hub
                        </motion.h3>
                        <motion.p
                            className="text-base sm:text-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            Create an account to save and share your favorite recipes
                        </motion.p>
                    </div>
                </motion.div>
            </motion.div>

        </motion.div>
    );
};

export default Register;