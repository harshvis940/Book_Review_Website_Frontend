import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { API_BASE_URL } from "../../../static/DefaultExports";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function AddAuthorModal({ onClose, refreshAuthors }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // Store the actual file
  const [imagePreview, setImagePreview] = useState(""); // For preview URL
  const [loading, setLoading] = useState(false);
  const [showImageSelector, setShowImageSelector] = useState(false);

  const handleImageSelect = (imageFile, previewUrl) => {
    setSelectedImage(imageFile);
    setImagePreview(previewUrl);
    setShowImageSelector(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    if (!email.trim()) {
      alert("Email is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("description", description.trim());
      formData.append("bio", bio.trim());
      formData.append("email", email.trim());

      if (selectedImage) {
        formData.append("imageUrl", selectedImage);
      }

      const response = await fetch(`${API_BASE_URL}/author/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error(data.message);
      }
      const result = await response.json();

      if (refreshAuthors) {
        setTimeout(() => {
          refreshAuthors();
        }, 1500);
      }
      toast.success("Author added successfully!");

      setName("");
      setDescription("");
      setBio("");
      setEmail("");
      setSelectedImage(null);
      setImagePreview("");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Error adding author:");
      toast.error(error.message || "Failed to add author. Please try again.");
      setTimeout(() => {
        onClose();
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-200 opacity-100 fixed inset-0 z-50 h-200 w-100 rounded-lg self-center justify-self-center">
      <div
        className="bg-white absolute right-2 top-2 rounded-full hover:cursor-pointer"
        onClick={onClose}
      >
        <IoIosClose size={30} />
      </div>
      <div className="flex flex-col gap-y-10 mt-20 px-5">
        <TextField
          id="outlined-name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          id="outlined-desc"
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          id="outlined-bio"
          label="Bio"
          variant="outlined"
          multiline
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <TextField
          id="outlined-email"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Image Selector Square */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Author Image
          </label>
          <div
            className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition-colors"
            onClick={() => setShowImageSelector(true)}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Selected author"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-center text-gray-500">
                <div className="text-2xl mb-2">📷</div>
                <div className="text-xs">Click to select image</div>
              </div>
            )}
          </div>
        </div>

        <button
          className="border-1 rounded-md p-2 border-blue-500"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "SAVE AUTHOR"}
        </button>
      </div>
      {showImageSelector && (
        <ImageSelectorModal
          onClose={() => setShowImageSelector(false)}
          onImageSelect={handleImageSelect}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

function ImageSelectorModal({ onClose, onImageSelect }) {
  const [uploading, setUploading] = useState(false);

  const sampleImages = [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
  ];

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    onImageSelect(file, previewUrl);
  };

  const handleSampleImageSelect = async (imageUrl) => {
    setUploading(true);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const fileName = `sample-image-${Date.now()}.jpg`;
      const file = new File([blob], fileName, { type: blob.type });

      onImageSelect(file, imageUrl);
    } catch (error) {
      console.error("Error downloading sample image:", error);
      alert("Failed to select sample image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-black bg-opacity-50 fixed inset-0 z-60 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Select Author Image</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoIosClose size={24} />
          </button>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Upload from your device:</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-gray-600 mb-3">Or choose from samples:</p>
          <div className="grid grid-cols-3 gap-2">
            {sampleImages.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Sample ${index + 1}`}
                className="w-full h-20 object-cover rounded cursor-pointer border-2 border-transparent hover:border-blue-500"
                onClick={() => handleSampleImageSelect(url)}
              />
            ))}
          </div>
          {uploading && (
            <p className="text-sm text-blue-600 mt-2">Processing image...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddAuthorModal;
