import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const token = localStorage.getItem("token");

    if (loading) {
        // Optionally show a loading spinner
        return <div>Loading...</div>;
    }

    if (!user && !token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute; 