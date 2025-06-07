import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Set default authorization header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Fetch user data
            axios.get('http://localhost:5000/api/users/me')
                .then(response => {
                    setUser(response.data.user);
                })
                .catch(() => {
                    // If token is invalid, clear it
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['Authorization'];
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (gmail, password) => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/users/login', {
                gmail,
                password
            });

            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setUser(user);
            toast.success('Login successful!');
            return true;
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.response?.data?.message || 'Login failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, gmail, password) => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/users/register', {
                name,
                gmail,
                password
            });

            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setUser(user);
            toast.success('Registration successful!');
            return true;
        } catch (error) {
            console.error('Registration error:', error);
            toast.error(error.response?.data?.message || 'Registration failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        toast.success('Logged out successfully');
        delete axios.defaults.headers.common['Authorization'];
    };

    const updateProfile = async (userData) => {
        try {
            setLoading(true);
            const response = await axios.put('http://localhost:5000/api/users/me', userData);
            setUser(response.data.user);
            toast.success('Profile updated successfully');
            return true;
        } catch (error) {
            console.error('Profile update error:', error);
            toast.error(error.response?.data?.message || 'An error occurred');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const changePassword = async (currentPassword, newPassword) => {
        try {
            setLoading(true);
            await axios.put('http://localhost:5000/api/users/change-password', {
                currentPassword,
                newPassword
            });
            toast.success('Password changed successfully');
            return true;
        } catch (error) {
            console.error('Password change error:', error);
            toast.error(error.response?.data?.message || 'An error occurred');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const forgotPassword = async (email) => {
        try {
            setLoading(true);
            await axios.post('http://localhost:5000/api/users/forgot-password', { email });
            toast.success('Password reset instructions sent to your email');
            return true;
        } catch (error) {
            console.error('Forgot password error:', error);
            toast.error(error.response?.data?.message || 'Failed to process request');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (token, newPassword) => {
        try {
            setLoading(true);
            await axios.post('http://localhost:5000/api/users/reset-password', {
                token,
                newPassword
            });
            toast.success('Password reset successful');
            return true;
        } catch (error) {
            console.error('Reset password error:', error);
            toast.error(error.response?.data?.message || 'Failed to reset password');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        forgotPassword,
        resetPassword,
        setUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext; 