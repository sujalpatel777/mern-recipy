import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaBirthdayCake, FaVenusMars, FaCamera } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

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
            const response = await axios.post('http://localhost:5000/api/users/register', {
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
        <div className="min-h-screen flex items-center justify-center bg-white p-8 relative overflow-hidden">
            <div className="relative z-10 flex w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden min-h-[500px]">
                {/* Left Section - Register Form */}
                <div className="w-1/2 flex flex-col items-center justify-center p-8">
                    <h2 className="text-3xl font-extrabold text-[#a145f7] mb-8">REGISTER</h2>

                    <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-6">
                        {/* Photo Upload */}
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative w-28 h-28 mb-2 flex items-center justify-center rounded-full bg-[#a145f7] border-4 border-[#8a2be2] overflow-hidden">
                                {photoPreview ? (
                                    <img
                                        src={photoPreview}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-5xl font-bold text-white">US</span>
                                )}
                                <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-[#8a2be2] p-2 rounded-full cursor-pointer hover:bg-[#a145f7] transition-colors duration-200">
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
                        </div>

                        {/* Name */}
                        <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#a145f7] focus:border-[#a145f7] bg-gray-100 text-black placeholder-gray-400"
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="gmail"
                                placeholder="Email"
                                value={formData.gmail}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#a145f7] focus:border-[#a145f7] bg-gray-100 text-black placeholder-gray-400"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#a145f7] focus:border-[#a145f7] bg-gray-100 text-black placeholder-gray-400"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#a145f7] focus:border-[#a145f7] bg-gray-100 text-black placeholder-gray-400"
                            />
                        </div>

                        {/* Gender */}
                        <div className="relative">
                            <FaVenusMars className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#a145f7] focus:border-[#a145f7] bg-gray-100 text-black placeholder-gray-400 appearance-none"
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>

                        {/* Phone */}
                        <div className="relative">
                            <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone (optional)"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#a145f7] focus:border-[#a145f7] bg-gray-100 text-black placeholder-gray-400"
                            />
                        </div>

                        {/* Birthday */}
                        <div className="relative">
                            <FaBirthdayCake className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="date"
                                name="birthday"
                                value={formData.birthday}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#a145f7] focus:border-[#a145f7] bg-gray-100 text-black placeholder-gray-400"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-medium text-white bg-[#a145f7] hover:bg-[#8a2be2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a145f7] transition-all duration-200"
                            >
                                {isLoading ? 'Registering...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-[#a145f7] hover:text-[#8a2be2]">
                            Sign In
                        </Link>
                    </p>
                </div>

                {/* Right Section - Decorative Background */}
                <div className="w-1/2 bg-gradient-to-br from-[#c471ed] to-[#8a2be2] relative overflow-hidden">
                    <svg
                        className="absolute inset-0 w-full h-full opacity-20"
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#ffffff"
                            d="M44.7,-48.5C57.4,-33.5,67.7,-16.7,65.8,-0.9C63.9,14.9,49.8,29.8,36.5,41.9C23.2,54,11.6,63.3,-3.8,67.2C-19.3,71.1,-38.6,69.5,-47.5,58.3C-56.4,47,-54.9,26,-55.9,7.6C-56.8,-10.7,-60.3,-27.7,-52.9,-43.3C-45.5,-58.9,-27.2,-73.2,-8.9,-71.7C9.4,-70.2,18.8,-53.1,31.5,-40.4Z"
                            transform="translate(100 100)"
                        />
                    </svg>
                </div>
            </div>
            <Toaster position="top-right" toastOptions={{
                duration: 4000,
                style: {
                    background: '#333',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '16px',
                    fontSize: '14px',
                },
                success: { iconTheme: { primary: '#4ade80', secondary: '#fff' } },
                error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }} />
        </div>
    );
};

export default Register; 