import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../../../static/DefaultExports";

function AddAdminModal({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "ADMIN",
  });
  const [loading, setLoading] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { username, email, password } = formData;

    if (!username.trim() || !email.trim() || !password.trim()) {
      toast.error("All fields are required!");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address!");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return false;
    }

    return true;
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Admin created successfully!");
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        toast.error(data.message || "Failed to create admin!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-zinc-200 bg-opacity-100 flex justify-center items-center z-50 "
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-lg w-96 max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold">Add New Admin</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleCreateAdmin} className="p-6">
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1"
            >
              Username
            </label>
            <TextField
              fullWidth
              size="small"
              name="username"
              label="Username"
              variant="outlined"
              value={formData.username}
              onChange={handleDataChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <TextField
              fullWidth
              size="small"
              name="email"
              label="Email"
              variant="outlined"
              type="email"
              value={formData.email}
              onChange={handleDataChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <TextField
              fullWidth
              size="small"
              name="password"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleDataChange}
              required
            />
          </div>

          {/* Show Password Checkbox */}
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                onChange={handleShowPassword}
                className="mr-2"
              />
              <span className="text-sm">Show Password</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Admin"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddAdminModal;
