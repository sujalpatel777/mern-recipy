import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please log in first.");
          navigate('/login');
          return;
        }

        const response = await axios.get("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(response.data.user);
        toast.success("Profile fetched successfully!");
      } catch (err) {
        console.error("Profile fetch error:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          toast.error("Session expired. Please login again.");
          navigate('/login');
        } else {
          toast.error(err.response?.data?.message || "Failed to fetch profile.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Your Profile</h1>
        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : user ? (
          <div className="space-y-4 text-white">
            <p><strong className="text-yellow-400">Name:</strong> {user.name}</p>
            <p><strong className="text-yellow-400">Email:</strong> {user.gmail}</p>
          </div>
        ) : (
          <p className="text-white text-center">No profile data available.</p>
        )}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '8px',
              padding: '16px',
              fontSize: '14px',
            },
            success: {
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </div>
  );
}