import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../../AuthContext";

// ProtectedRoute component using Outlet
const ProtectedRoute = () => {
    const { isLoggedIn } = useAuth(); // Get authentication state from context

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;