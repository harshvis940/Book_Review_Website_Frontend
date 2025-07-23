import React, { Children } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoutes({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currTime = Date.now() / 1000;

    if (decoded.exp < currTime) {
      localStorage.removeItem("token");
      return <Navigate to="/" replace />;
    }
    return children;
  } catch (err) {
    console.error("Token validation failed", err);
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
}

export default ProtectedRoutes;
