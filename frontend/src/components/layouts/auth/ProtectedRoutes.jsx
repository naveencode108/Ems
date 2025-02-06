import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children, allowedRole = [] }) => {
  let { token, user } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRole.includes(user?.role)) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default ProtectedRoutes;
