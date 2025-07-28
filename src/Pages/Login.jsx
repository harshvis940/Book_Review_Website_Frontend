import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleCheck = () => {
    setShowPassword((prev) => !prev);
    console.log(toString(showPassword));
    console.log(email);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Frontend validations
    if (!email || !password) {
      toast.error("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format.");
      return;
    }

    setLoading(true);
    try {
      const loginData = { email, password };
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("role", data.data.role);
      localStorage.setItem("userId", data.data.id);
      toast.success("Login successful!");
      data.data.role === "ADMIN"
        ? setTimeout(() => navigate("/admin"), 1500)
        : setTimeout(() => navigate("/dashboard"), 1500); // Navigate after toast
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-100 min-h-screen flex justify-center items-center flex-col">
      <div className="bg-white h-170 w-170 shadow-md rounded-md">
        <h1 className="text-3xl text-center mt-10">Login</h1>
        <form className="flex flex-col  p-7">
          <label htmlFor="" className="mb-1">
            Email
          </label>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            slotProps={{ htmlInput: { type: "email" } }}
            value={email}
            onChange={(val) => setEmail(val.target.value)}
          />

          <label htmlFor="" className="mb-1 mt-5">
            Password
          </label>
          <TextField
            slotProps={{
              htmlInput: { type: showPassword ? "text" : "password" },
            }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(val) => setPassword(val.target.value)}
          />

          <div className="w-fit justify-self-right mt-2">
            <label htmlFor="" className="">
              <input type="checkbox" onClick={handleCheck} className="mr-2" />
              Show Password
            </label>
          </div>

          <button
            onClick={onSubmit}
            type="submit"
            className="bg-blue-400 mt-5 p-2 rounded-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mb-6">
          New here?{" "}
          <Link to="/register" className="text-blue-200 hover:underline">
            Go to Register page
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
