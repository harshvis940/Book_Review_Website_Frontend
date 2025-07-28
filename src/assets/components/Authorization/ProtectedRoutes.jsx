import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProtectedRoutes({ children }) {
  console.log(children.type.name);
  const navigate = useNavigate();

  // Check admin access
  if (children.type.name === "AdminDashboard") {
    const role = localStorage.getItem("role");
    if (role !== "ADMIN") {
      toast.error("Access denied! Admin privileges required.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
      return null; // Return null to prevent rendering while redirecting
    }
  }

  // Check token existence
  const token = localStorage.getItem("token");
  if (!token) {
    toast.warning("Please login to access this page", {
      position: "top-right",
      autoClose: 3000,
    });
    return <Navigate to="/" replace />;
  }

  try {
    // Validate token
    const decoded = jwtDecode(token);
    const currTime = Date.now() / 1000;

    if (decoded.exp < currTime) {
      localStorage.removeItem("token");
      toast.error("Session expired! Please login again.", {
        position: "top-right",
        autoClose: 3000,
      });
      return <Navigate to="/" replace />;
    }

    // Token is valid, render children
    return children;
  } catch (err) {
    console.error("Token validation failed", err);
    localStorage.removeItem("token");
    toast.error("Authentication failed! Please login again.", {
      position: "top-right",
      autoClose: 3000,
    });
    return <Navigate to="/" replace />;
  }
}

export default ProtectedRoutes;
