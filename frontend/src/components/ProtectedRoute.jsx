import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const token = localStorage.getItem("token");

    if (!user && !token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
                <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-yellow-500 dark:text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                    <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                        Authentication Required
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Please log in to access this page.
                    </p>
                    <Navigate to="/login" replace />
                </div>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute; 