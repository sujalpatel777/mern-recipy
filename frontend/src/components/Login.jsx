

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGithub, FaApple, FaGoogle } from 'react-icons/fa';
import { url } from "../base";

const Login = () => {
    const [formData, setFormData] = useState({
        gmail: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
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
                navigate('/Home');
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
                <motion.div
                    className="absolute top-10 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 30, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 7, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-10 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -25, 0],
                        y: [0, 25, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 left-32 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"
                    animate={{
                        scale: [1, 1.1, 1],
                        x: [0, 20, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ duration: 9, repeat: Infinity }}
                />
            </div>

            <motion.div
                className="relative z-10 w-full max-w-md"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Glassmorphism Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                    <div className="p-8">
                        {/* Header */}
                        <motion.div
                            className="text-center mb-8"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                            <p className="text-white/70">Sign in to your account</p>
                        </motion.div>

                        {/* Social Login Buttons */}
                        <motion.div
                            className="grid grid-cols-2 gap-3 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >

                        </motion.div>

                        {/* Divider */}
                        <div className="flex items-center mb-6">
                            <div className="flex-1 h-px bg-white/20"></div>
                            <div className="flex-1 h-px bg-white/20"></div>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Input */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 text-sm" />
                                    <input
                                        id="gmail"
                                        name="gmail"
                                        type="email"
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                                        placeholder="Enter your email"
                                        value={formData.gmail}
                                        onChange={handleChange}
                                    />
                                </div>
                            </motion.div>

                            {/* Password Input */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 text-sm" />
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-200"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </motion.div>

                            {/* Remember Me & Forgot Password */}
                            <motion.div
                                className="flex items-center justify-between"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >

                            </motion.div>

                            {/* Login Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-xl shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <AnimatePresence mode="wait">
                                        {isLoading ? (
                                            <motion.span
                                                key="loading"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center justify-center gap-2"
                                            >
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Signing in...
                                            </motion.span>
                                        ) : (
                                            <motion.span
                                                key="login"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                Sign in
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </motion.div>
                        </form>

                        {/* Sign Up Link */}
                        <motion.div
                            className="text-center mt-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <p className="text-white/70">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-purple-300 hover:text-purple-200 font-medium transition-colors duration-200">
                                    Sign up
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Add custom styles for blob animation */}
            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default Login;