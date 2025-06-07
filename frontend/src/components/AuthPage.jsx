import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaCamera } from 'react-icons/fa';

const AuthPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-600 p-8 relative overflow-hidden">
            {/* Decorative Orbs */}
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-700 rounded-full opacity-30"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-700 rounded-full opacity-30"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-700 rounded-full opacity-30"></div>

            <div className="relative z-10 flex w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px]">
                {/* Left Section - Login Form */}
                <div className="w-1/2 flex flex-col items-center justify-center p-12 bg-white">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">LOGIN</h2>
                    <p className="text-gray-600 mb-8 text-center"></p>

                    <form className="w-full max-w-sm space-y-6">
                        <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                id="login-email"
                                name="email"
                                type="text"
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Username"
                                value=""
                                readOnly
                            />
                        </div>
                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                id="login-password"
                                name="password"
                                type="password"
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Password"
                                value=""
                                readOnly
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                disabled
                            >
                                Login Now
                            </button>
                        </div>

                        <p className="mt-8 text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>

                {/* Right Section - Register Form */}
                <div className="w-1/2 bg-gradient-to-br from-blue-700 to-blue-500 flex flex-col items-center justify-center p-12 text-white relative">
                    <h2 className="text-4xl font-bold mb-2 text-center">REGISTER</h2>
                    <p className="text-center text-lg leading-relaxed opacity-90 mb-8"></p>

                    <form className="w-full max-w-sm space-y-4">
                        {/* Name */}
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value=""
                                readOnly
                                className="pl-10 w-full p-3 bg-blue-600 text-white rounded-lg border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-blue-200"
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value=""
                                readOnly
                                className="pl-10 w-full p-3 bg-blue-600 text-white rounded-lg border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-blue-200"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value=""
                                readOnly
                                className="pl-10 w-full p-3 bg-blue-600 text-white rounded-lg border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-blue-200"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value=""
                                readOnly
                                className="pl-10 w-full p-3 bg-blue-600 text-white rounded-lg border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-blue-200"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                            disabled
                        >
                            Register Now
                        </button>

                        <p className="mt-8 text-center text-sm text-white">
                            Already have an account?{' '}
                            <Link to="#" className="font-medium text-blue-200 hover:text-blue-100">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthPage; 