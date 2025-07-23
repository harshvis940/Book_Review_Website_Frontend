import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registration successful!");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error(data.message || "Registration failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-zinc-100 min-h-screen flex justify-center items-center flex-col">
      <div className="bg-white h-170 w-170 shadow-md rounded-md">
        <h1 className="text-3xl text-center mt-10">Register</h1>
        <form onSubmit={handleRegister} className="flex flex-col p-7">
          {/* Username */}
          <label htmlFor="username" className="mb-1">
            Username
          </label>
          <TextField
            className="w-full"
            name="username"
            label="Username"
            variant="outlined"
            value={formData.username}
            onChange={handleDataChange}
          />

          {/* Email */}
          <label htmlFor="email" className="mb-1 mt-5">
            Email
          </label>
          <TextField
            className="w-full"
            name="email"
            label="Email"
            variant="outlined"
            type="email"
            value={formData.email}
            onChange={handleDataChange}
          />

          {/* Password */}
          <label htmlFor="password" className="mb-1 mt-5">
            Password
          </label>
          <TextField
            name="password"
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleDataChange}
          />

          {/* Role */}
          <InputLabel id="role-label" className="mb-1 mt-5">
            Role
          </InputLabel>
          <FormControl fullWidth>
            <Select
              labelId="role-label"
              name="role"
              value={formData.role}
              onChange={handleDataChange}
            >
              <MenuItem value={"USER"}>User</MenuItem>
              <MenuItem value={"MODERATOR"}>Moderator</MenuItem>
            </Select>
          </FormControl>

          {/* Show Password Checkbox */}
          <div className="w-fit mt-2">
            <label>
              <input
                type="checkbox"
                onChange={handleShowPassword}
                className="mr-2"
              />
              Show Password
            </label>
          </div>

          {/* Submit Button */}
          <button
            className="bg-blue-400 mt-5 p-2 rounded-md text-white"
            type="submit"
          >
            {loading ? "Registering" : "Register"}
          </button>
        </form>

        {/* Link to Login */}
        <p className="text-center mb-6">
          Already a member?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Go to Login page
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
