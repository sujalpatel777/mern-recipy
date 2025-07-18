import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaCamera } from 'react-icons/fa';
import { url } from "../base";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const [userResponse, savedResponse] = await Promise.all([
          axios.get(`${url}/api/users/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${url}/api/recipes/saved`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setUser(userResponse.data.user);
        setSavedRecipes(savedResponse.data.savedRecipes);
        setEditData({ ...userResponse.data.user });
        setPhotoPreview(userResponse.data.user.photo || null);
        setLoading(false);
      } catch (err) {
        handleFetchError(err);
      }
    };

    fetchUserData();
  }, []);

  const handleFetchError = (err) => {
    setError('Failed to fetch profile data. Please try again later.');
    setLoading(false);
    console.error('Error fetching profile:', err);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setEditData({ ...editData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in first.");
        navigate('/login');
        return;
      }
      await axios.put(`${url}/api/users/me`, editData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Profile updated successfully!");
      setUser(editData);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 dark:border-primary-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg w-full max-w-md border border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-[#a145f7] dark:text-[#c471ed] mb-6 text-center">profile</h1>
          <form onSubmit={handleUpdate} className="space-y-4">
            {/* Profile Photo */}
            <div className="flex flex-col items-center mb-2">
              <div className="relative w-20 h-20 mb-2">
                <img
                  src={photoPreview || 'https://ui-avatars.com/api/?name=User&background=random'}
                  alt="Profile Preview"
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#8a2be2] dark:border-[#a145f7] shadow"
                />
                <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-[#a145f7] hover:bg-[#8a2be2] dark:bg-[#a145f7] dark:hover:bg-[#8a2be2] p-2 rounded-full cursor-pointer transition">
                  <FaCamera className="text-white" />
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            {/* Name */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300">
                <FaUser />
              </span>
              <input
                type="text"
                name="name"
                placeholder="What's your name?"
                value={editData.name || ''}
                onChange={handleChange}
                required
                className="w-full pl-10 p-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:border-[#a145f7] dark:focus:border-[#a145f7] focus:outline-none transition"
              />
            </div>
            {/* Email (read-only) */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300">
                <FaEnvelope />
              </span>
              <input
                type="email"
                name="gmail"
                placeholder="Email"
                value={editData.gmail || ''}
                readOnly
                className="w-full pl-10 p-3 bg-gray-100 dark:bg-gray-700 text-gray-400 rounded-lg border border-gray-200 dark:border-gray-600 cursor-not-allowed"
              />
            </div>
            {/* Phone */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300">
                <FaPhone />
              </span>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={editData.phone || ''}
                onChange={handleChange}
                className="w-full pl-10 p-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:border-[#a145f7] dark:focus:border-[#a145f7] focus:outline-none transition"
              />
            </div>
            {/* Gender */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300">
                <FaVenusMars />
              </span>
              <select
                name="gender"
                value={editData.gender || ''}
                onChange={handleChange}
                required
                className="w-full pl-10 p-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:border-[#a145f7] dark:focus:border-[#a145f7] focus:outline-none transition"
              >
                <option value="" disabled>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* Birthday */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300">
                <FaBirthdayCake />
              </span>
              <input
                type="date"
                name="birthday"
                placeholder="What is your date of birth?"
                value={editData.birthday || ''}
                onChange={handleChange}
                required
                className="w-full pl-10 p-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:border-[#a145f7] dark:focus:border-[#a145f7] focus:outline-none transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#a145f7] hover:bg-[#8a2be2] dark:bg-[#a145f7] dark:hover:bg-[#8a2be2] text-white font-semibold py-3 rounded-lg shadow transition text-lg mt-4"
            >
              Update Profile
            </button>
          </form>
          <button
            className="mt-8 w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-[#a145f7] dark:text-[#c471ed] font-semibold py-2 px-6 rounded-lg shadow transition"
            onClick={() => navigate('/Home')}
          >
            Back to Home
          </button>

        </div>
      </div>
    </div>
  );
}