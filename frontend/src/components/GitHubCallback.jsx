import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const GitHubCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useAuth();

    useEffect(() => {
        const handleCallback = async () => {
            const params = new URLSearchParams(location.search);
            const token = params.get('token');

            if (token) {
                try {
                    // Store token
                    localStorage.setItem('token', token);

                    // Fetch user data
                    const response = await fetch('http://localhost:5000/api/users/me', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUser(data.user);
                        toast.success('GitHub login successful!');
                        navigate('/');
                    } else {
                        throw new Error('Failed to fetch user data');
                    }
                } catch (error) {
                    console.error('GitHub callback error:', error);
                    toast.error('Failed to complete GitHub login');
                    navigate('/login');
                }
            } else {
                toast.error('No token received from GitHub');
                navigate('/login');
            }
        };

        handleCallback();
    }, [location, navigate, setUser]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a145f7] mx-auto"></div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                    Completing GitHub login...
                </h2>
                <p className="mt-2 text-gray-600">
                    Please wait while we set up your account.
                </p>
            </div>
        </div>
    );
};

export default GitHubCallback; 