import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

import { FaUser, FaLock, FaGithub } from 'react-icons/fa';
import { url } from "../base";

const Login = () => {
    const [formData, setFormData] = useState({
        gmail: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const success = await login(formData);
            if (success) {
                navigate('/');
            }
        } catch (error) {
            // Error handled in context
        } finally {
            setIsLoading(false);
        }
    };

    const handleGitHubLogin = () => {
        window.location.href = `${url}/api/auth/github`;
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
                {/* Left Section - Login Form */}
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-10 bg-white">
                    <motion.h2
                        className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Welcome Back
                    </motion.h2>

                    <div className="w-full max-w-md space-y-6">
                        <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <motion.input
                                id="gmail"
                                name="gmail"
                                type="email"
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 placeholder-gray-500 transition-all duration-300"
                                placeholder="Email"
                                value={formData.gmail}
                                onChange={handleChange}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                            />
                        </div>
                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <motion.input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 placeholder-gray-500 transition-all duration-300"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                            />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                        >
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base sm:text-lg font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-50"
                            >
                                <AnimatePresence>
                                    {isLoading ? (
                                        <motion.span
                                            key="loading"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            Logging in...
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="login"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            Login Now
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </motion.div>


                        <motion.p
                            className="mt-6 text-center text-sm text-gray-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.7 }}
                        >
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200">
                                Sign Up
                            </Link>
                        </motion.p>
                    </div>
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
                            Your Recipe Hub
                        </motion.h3>
                        <motion.p
                            className="text-base sm:text-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            Sign in to explore and save your favorite recipes
                        </motion.p>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Login;