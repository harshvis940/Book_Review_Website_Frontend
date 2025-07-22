import React from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate("/dashboard");
  };

  return (
    <div className="bg-secondary min-h-screen flex justify-center items-center flex-col">
      <div className="bg-heading1 h-170 w-170 shadow-md rounded-md">
        <h1 className="text-3xl text-center mt-10">Register</h1>
        <form className="flex flex-col  p-7">
          <label htmlFor="" className="mb-1">
            Username
          </label>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            slotProps={{ htmlInput: { type: "text" } }}
          />

          <label htmlFor="" className="mb-1 mt-5">
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
            slotProps={{ htmlInput: { type: "password" } }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />

          <div className="w-fit justify-self-right mt-2">
            <label htmlFor="" className="">
              <input type="checkbox" className="mr-2" />
              Show Password
            </label>
          </div>

          <button
            onClick={onSubmit}
            className="bg-primary mt-5 p-2 rounded-md"
            type="submit"
          >
            Register
          </button>
        </form>

        <p className="text-center mb-6">
          Already a member?{" "}
          <Link to="/" className="text-blue-200 hover:underline">
            Go to Login page
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
