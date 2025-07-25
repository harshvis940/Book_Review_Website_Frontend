import React, { useEffect, useRef, useState } from "react";
import NavBar from "../assets/components/NavBar";
import Button from "@mui/material/Button";
import { API_BASE_URL } from "../static/DefaultExports";

function ProfilePage() {
  const [visible, setVisible] = useState(false);
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const [editingData, setEditingData] = useState({ ...formData });

  const [loading, setLoading] = useState(false);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_BASE_URL}/getUser?id=${localStorage.getItem("userID")}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserDetails = async (e) => {
    if (image) {
      console.log(image);
    }
    e.preventDefault();
    console.log(formData);
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    console.log("Clicked");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  });

  const handleImageUploadClick = () => {
    fileRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError("Image not selected");
      alert("Image not selected");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Image type not allowed");
      return;
    }

    setError("");
    setImage(file);
    setPreview(URL.createObjectURL(file));
    return;
  };

  return (
    <div
      className={`min-h-screen transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      } bg-zinc-100`}
    >
      <NavBar />
      <h1 className="mx-20 my-10 text-xl font-bold animate-pulse">
        Edit Profile
      </h1>
      <div className="mx-20 bg-white rounded-lg">
        <h2 className="px-10 py-3 text-lg font-semibold text-gray-500">
          Profile picture
        </h2>
        <div className="flex flex-row">
          <input
            type="file"
            className="hidden"
            ref={fileRef}
            accept="Image/*"
            onChange={handleImageChange}
          />
          {preview ? (
            <img
              src={preview}
              alt=""
              className="w-60 h-60 rounded-full mx-10 transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div
              className="border-2 mx-10 border-dashed border-gray-400 transition-colors duration-500 hover:border-blue-300"
              onClick={handleImageUploadClick}
            >
              <img
                src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                alt=""
                className="w-60 h-60 rounded-full"
              />
            </div>
          )}

          <div className="flex flex-col">
            <h1 className="text-md font-semibold">Upload picture</h1>
            <h5 className="text-md text-gray-600">
              profile picture should be 300x300
            </h5>

            <div className="mt-5 flex gap-5">
              <Button variant="outlined" onClick={handleImageUploadClick}>
                Upload a picture
              </Button>
              {/* <Button variant="outlined">Take a picture</Button> */}
            </div>
          </div>
        </div>

        <div>
          <h1 className="px-10 py-3">Information</h1>
          <form action="" className=" flex flex-col px-10 py-3">
            <label htmlFor="name">Name</label>
            <input
              className="border-1 border-gray-400 rounded-md w-100 px-5 py-2 mb-3"
              type="text"
              value={formData.name}
              onChange={handleValueChange}
              id="name"
              name="name"
            />

            <label htmlFor="address">Address</label>
            <input
              className="border-1 border-gray-400 rounded-md w-100 px-5 py-2 mb-3"
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleValueChange}
            />

            <label htmlFor="country">Country</label>
            <input
              className="border-1 border-gray-400 rounded-md w-100 px-5 py-2 mb-3"
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleValueChange}
            />

            <label htmlFor="password">Change password</label>
            <input
              type="password"
              className="border-1 border-gray-400 rounded-md w-100 px-5 py-2 mb-3"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleValueChange}
            />

            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              className="border-1 border-gray-400 rounded-md w-100 px-5 py-2 mb-3"
              value={formData.confirmPassword}
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleValueChange}
            />

            <div className="flex justify-between mb-5">
              <button
                className="bg-green-300 px-10 py-2 rounded-md"
                type="submit"
                onClick={updateUserDetails}
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
