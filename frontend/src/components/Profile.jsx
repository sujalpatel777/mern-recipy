// 

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaCamera, FaHeart, FaHome } from 'react-icons/fa';
import { url } from "../base";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
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
      setIsEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setEditData({ ...user });
      setPhotoPreview(user?.photo || null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-purple-900">
        <div className="flex flex-col items-center">
          <div className="spinner"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your profile...</p>
        </div>
        <style jsx>{`
          .spinner {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: conic-gradient(#0000 10%, #a145f7);
            -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
            animation: spinner-zp9dbg 1s infinite linear;
          }
          @keyframes spinner-zp9dbg {
            to {
              transform: rotate(1turn);
            }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-purple-900 p-6">
        <div className="text-center">
          <div className="error-animation mb-6">
            <div className="error-icon">⚠️</div>
          </div>
          <p className="text-red-600 dark:text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-purple-900 py-8 px-4">
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your personal information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-3xl p-8">
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-1">
                    <img
                      src={photoPreview || 'https://ui-avatars.com/api/?name=User&background=random'}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-800"
                    />
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full cursor-pointer shadow-lg transform transition-transform hover:scale-110">
                      <FaCamera className="text-white text-lg" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">
                  {user?.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{user?.gmail}</p>
              </div>

              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="form-group">
                    <label className="form-label">
                      <FaUser className="inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editData?.name || ''}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="form-input"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="form-group">
                    <label className="form-label">
                      <FaEnvelope className="inline mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="gmail"
                      value={editData?.gmail || ''}
                      readOnly
                      className="form-input opacity-60 cursor-not-allowed"
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="form-group">
                    <label className="form-label">
                      <FaPhone className="inline mr-2" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editData?.phone || ''}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="form-input"
                    />
                  </div>

                  {/* Gender Field */}
                  <div className="form-group">
                    <label className="form-label">
                      <FaVenusMars className="inline mr-2" />
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={editData?.gender || ''}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="form-input"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Birthday Field */}
                  <div className="form-group md:col-span-2">
                    <label className="form-label">
                      <FaBirthdayCake className="inline mr-2" />
                      Birthday
                    </label>
                    <input
                      type="date"
                      name="birthday"
                      value={editData?.birthday || ''}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="form-input"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="btn-primary flex-1">
                      Save Changes
                    </button>
                    <button type="button" onClick={toggleEdit} className="btn-secondary flex-1">
                      Cancel
                    </button>
                  </div>
                )}
              </form>

              {!isEditing && (
                <div className="flex gap-4 mt-6">
                  <button onClick={toggleEdit} className="btn-primary flex-1">
                    Edit Profile
                  </button>
                  <button onClick={() => navigate('/Home')} className="btn-secondary flex-1">
                    <FaHome className="inline mr-2" />
                    Back to Home
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Saved Recipes Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-3xl p-6 h-full">
              <div className="flex items-center mb-6">
                <FaHeart className="text-pink-500 mr-3 text-xl" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Saved Recipes ({savedRecipes.length})
                </h3>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {savedRecipes.length > 0 ? (
                  savedRecipes.map((recipe) => (
                    <div key={recipe._id} className="recipe-card">
                      <div className="flex items-center space-x-3">
                        <img
                          src={recipe.image || '/api/placeholder/50/50'}
                          alt={recipe.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                            {recipe.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {recipe.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FaHeart className="text-gray-300 dark:text-gray-600 text-4xl mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      No saved recipes yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
        
        .dark .glass-card {
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          color: #4b5563;
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .dark .form-label {
          color: #d1d5db;
        }

        .form-input {
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.75rem;
          background: rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
          font-size: 0.875rem;
        }

        .form-input:focus {
          outline: none;
          border-color: #a145f7;
          box-shadow: 0 0 0 3px rgba(161, 69, 247, 0.1);
          background: rgba(255, 255, 255, 0.95);
        }

        .form-input:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .dark .form-input {
          background: rgba(0, 0, 0, 0.3);
          border-color: #4b5563;
          color: white;
        }

        .dark .form-input:focus {
          border-color: #a145f7;
          box-shadow: 0 0 0 3px rgba(161, 69, 247, 0.2);
        }

        .btn-primary {
          background: linear-gradient(135deg, #a145f7 0%, #ff6b9d 100%);
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(161, 69, 247, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(161, 69, 247, 0.4);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.8);
          color: #a145f7;
          padding: 0.75rem 1.5rem;
          border: 2px solid #a145f7;
          border-radius: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dark .btn-secondary {
          background: rgba(0, 0, 0, 0.3);
          color: #c471ed;
          border-color: #c471ed;
        }

        .btn-secondary:hover {
          background: #a145f7;
          color: white;
        }

        .recipe-card {
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 0.75rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .recipe-card:hover {
          transform: translateX(4px);
          background: rgba(255, 255, 255, 0.8);
        }

        .dark .recipe-card {
          background: rgba(0, 0, 0, 0.3);
        }

        .dark .recipe-card:hover {
          background: rgba(0, 0, 0, 0.5);
        }

        .error-animation {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
}