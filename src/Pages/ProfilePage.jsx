import React from "react";
import NavBar from "../assets/components/NavBar";
import Button from "@mui/material/Button";

function ProfilePage() {
  return (
    <div className="min-h-screen bg-zinc-100">
      <NavBar />
      <h1 className="mx-20 my-5">Edit Profile</h1>
      <div className="mx-20 bg-white rounded-lg">
        <h2 className="px-10 py-3">Profile picture</h2>
        <div className="flex flex-row">
          <img
            src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            alt=""
            className="w-45 h-50 rounded-full"
          />

          <div className="flex flex-col">
            <h1>Upload picture</h1>
            <h5>profile picture should be 300x300</h5>

            <div className="mt-5 flex gap-5">
              <Button variant="outlined">Upload a picture</Button>
              <Button variant="outlined">Take a picture</Button>
            </div>
          </div>
        </div>

        <div>
          <h1 className="px-10 py-3">Information</h1>
          <form action="" className=" flex flex-col px-10 py-3">
            <label htmlFor="">Name</label>
            <input
              className="border-1 border-gray-400 rounded-md w-100 px-10 py-2 mb-3"
              type="text"
            />

            <label htmlFor="">Address</label>
            <input
              className="border-1 border-gray-400 rounded-md w-100 px-10 py-2 mb-3"
              type="text"
            />

            <label htmlFor="">Country</label>
            <input
              className="border-1 border-gray-400 rounded-md w-100 px-10 py-2 mb-3"
              type="text"
            />

            <label htmlFor="">Change password</label>
            <input
              type="password"
              className="border-1 border-gray-400 rounded-md w-100 px-10 py-2 mb-3"
            />

            <label htmlFor="">Confirm password</label>
            <input
              type="password"
              className="border-1 border-gray-400 rounded-md w-100 px-10 py-2 mb-3"
            />

            <div className="flex justify-between mb-5">
              <button
                className="bg-green-300 px-10 py-2 rounded-md"
                type="submit"
              >
                Save
              </button>
              <button className="bg-red-400 px-10 py-2 rounded-md">
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
