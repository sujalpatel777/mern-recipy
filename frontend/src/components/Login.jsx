import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaLock, FaGithub } from 'react-icons/fa';

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
            const response = await axios.post('http://localhost:5000/api/users/login', formData);
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            login(user);

            toast.success('Login successful!');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGitHubLogin = () => {
        // Redirect to GitHub OAuth page
        window.location.href = 'http://localhost:5000/api/auth/github';
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-8 relative overflow-hidden">
            <div className="relative z-10 flex w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden min-h-[500px]">
                {/* Left Section - Login Form */}
                <div className="w-1/2 flex flex-col items-center justify-center p-8">
                    <h2 className="text-3xl font-extrabold text-black mb-8">LOGIN</h2>

                    <form className="w-full max-w-xs space-y-6" onSubmit={handleSubmit}>
                        <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input
                                id="gmail"
                                name="gmail"
                                type="email"
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#a145f7] focus:border-[#a145f7] bg-white text-black placeholder-gray-500"
                                placeholder="Email"
                                value={formData.gmail}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#a145f7] focus:border-[#a145f7] bg-white text-black placeholder-gray-500"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-medium text-white bg-[#a145f7] hover:bg-[#8a2be2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a145f7] transition-all duration-200"
                            >
                                {isLoading ? 'Logging in...' : 'Login Now'}
                            </button>
                        </div>

                        {/* GitHub Login Button */}
                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={handleGitHubLogin}
                                className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a145f7] transition-all duration-200"
                            >
                                <FaGithub className="w-5 h-5 mr-2" />
                                Continue with GitHub
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-center text-sm text-black">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-[#a145f7] hover:text-[#8a2be2]">
                            Sign Up
                        </Link>
                    </p>
                </div>

                {/* Right Section - Decorative Background */}
                <div className="w-1/2 bg-gradient-to-br from-[#c471ed] to-[#8a2be2] relative overflow-hidden flex items-center justify-center">
                    {/* You can add content here if needed, like a logo or illustration */}
                </div>
            </div>
        </div>
    );
};

export default Login; 