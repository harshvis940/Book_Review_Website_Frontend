import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL } from "../../../static/DefaultExports";

function AddBookModal({ onClose, genres, authors }) {
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]); // Fixed typo here
  console.log(authors);

  const [formData, setformData] = useState({
    title: "",
    author: "",
    img: "",
    isbn: "",
    publication: "",
    summary: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Max file size is 5MB.");
      return;
    }

    setError("");
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleImageClick = () => {
    fileRef.current?.click();
  };

  const handleSaveBook = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Please select an image for the book.");
      return;
    }

    const bookData = new FormData();

    bookData.append("title", formData.title);
    bookData.append("summary", formData.summary);
    bookData.append("isbn", formData.isbn);
    bookData.append("publicationYear", formData.publication);
    bookData.append("coverImage", image);

    selectedGenres.forEach((id) => bookData.append("genres", id));
    selectedAuthors.forEach((id) => bookData.append("authors", id));

    console.log("=== FormData Contents ===");
    for (let [key, value] of bookData.entries()) {
      console.log(key, value);
    }
    console.log("=== End FormData ===");

    console.log("Form Data:", formData);
    console.log("Selected Genres:", selectedGenres);
    console.log("Selected Authors:", selectedAuthors);
    console.log("Image:", image);
    console.log(bookData);

    try {
      setUploading(true);
      const res = await fetch(`${API_BASE_URL}/book/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: bookData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save book");
      }

      const data = await res.json();
      console.log("Book saved successfully:", data);
      toast.success("Book saved successfully");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong while saving the book.");
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-4/5 h-4/5 max-w-6xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
        >
          <IoClose size={24} className="text-gray-600" />
        </button>

        <div className="grid grid-cols-[40%_60%] h-full">
          {/* Left side - Image Upload */}
          <div className="p-6 flex flex-col items-center justify-center bg-gray-50 rounded-l-lg">
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileRef}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {/* Image display area */}
            <div
              onClick={handleImageClick}
              className="w-full h-80 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-gray-100 transition-all"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">Click to select image</p>
                  <p className="text-gray-400 text-xs mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              )}
            </div>

            {/* Error message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          {/* Right side - Form */}
          <div className="p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Add New Book
            </h2>

            <form className="flex flex-col gap-5" onSubmit={handleSaveBook}>
              <TextField
                id="title"
                name="title"
                label="Title"
                variant="outlined"
                fullWidth
                value={formData.title}
                onChange={handleInputChange}
                required
              />

              {/* Authors Multi-Select */}
              <div>
                <InputLabel id="author-label">Authors</InputLabel>
                <Select
                  labelId="author-label"
                  id="author"
                  multiple
                  value={selectedAuthors} // Fixed typo
                  onChange={(e) => setSelectedAuthors(e.target.value)} // Fixed typo
                  fullWidth
                  renderValue={(selected) =>
                    authors // Fixed: was using genres instead of authors
                      ?.filter((author) => selected.includes(author.id))
                      .map((author) => author.name)
                      .join(", ") || ""
                  }
                >
                  {authors?.map((author) => (
                    <MenuItem key={author.id} value={author.id}>
                      {author.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              {/* Genres Multi-Select */}
              <div>
                <InputLabel id="genre-label">Genres</InputLabel>
                <Select
                  labelId="genre-label"
                  id="genre"
                  multiple
                  value={selectedGenres}
                  onChange={(e) => setSelectedGenres(e.target.value)}
                  fullWidth
                  renderValue={(selected) =>
                    genres
                      ?.filter((genre) => selected.includes(genre.id))
                      .map((genre) => genre.name)
                      .join(", ") || ""
                  }
                >
                  {genres?.map((genre) => (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <TextField
                id="summary"
                name="summary"
                label="Summary"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={formData.summary}
                onChange={handleInputChange}
                required
              />

              <TextField
                id="publication"
                name="publication"
                type="number"
                label="Publication Year"
                variant="outlined"
                fullWidth
                value={formData.publication}
                onChange={handleInputChange}
                required
              />

              <TextField
                id="isbn"
                name="isbn"
                label="ISBN Number"
                variant="outlined"
                fullWidth
                value={formData.isbn}
                onChange={handleInputChange}
                required
              />

              <div className="flex gap-3 mt-6">
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={uploading}
                >
                  {uploading ? "Saving..." : "Save Book"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={onClose}
                  size="large"
                  disabled={uploading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBookModal;
