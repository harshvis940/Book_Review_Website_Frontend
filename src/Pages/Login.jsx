import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleCheck = () => {
    setShowPassword((prev) => !prev);
    console.log(toString(showPassword));
  };
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
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
            Login
          </button>
        </form>

        <p className="text-center mb-6">
          New here?{" "}
          <Link to="/register" className="text-blue-200 hover:underline">
            Go to Register page
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
