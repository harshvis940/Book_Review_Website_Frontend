import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [showPassword, setShowPassword] = useState(false);

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

  const handleRegister = async (e) => {
    e.preventDefault(); // prevent page reload

    console.log("Registering:", formData);
    // Send POST request to backend if needed
    // const res = await fetch('http://127.0.0.1:8000/api/register', { ... });

    navigate("/dashboard");
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
            Register
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
    </div>
  );
}

export default Register;
