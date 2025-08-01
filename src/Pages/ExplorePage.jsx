import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../assets/components/NavBar";
import BookCard from "../assets/components/Admin/BookCard";
import { API_BASE_URL, getImageSrc } from "../static/DefaultExports";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import {
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  Select,
  Chip,
  Box,
  Slider,
  Typography,
  Button,
  Collapse,
} from "@mui/material";

function ExplorePage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [visible, setVisile] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisile(true), 100);
  }, []);

  const fetchAllBooks = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/book/getAll`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setBooks(data.data || []);
        setFilteredBooks(data.data || []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  useEffect(() => {
    let filtered = [...books];

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (book) =>
          book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (Array.isArray(book.authors)
            ? book.authors.some((author) =>
                author.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : book.authors
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase())) ||
          (Array.isArray(book.genres)
            ? book.genres.some((genre) =>
                genre.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : book.genres?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredBooks(filtered);
  }, [books, searchQuery]);

  const handleBookClick = (book) => {
    navigate(`/bookDetail/`, { state: { book } });
  };

  return (
    <div
      className={`transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <NavBar />

      <div className="bg-white shadow-sm border-b">
        <div className="px-20 py-6">
          <div className="flex gap-4 items-center mb-4">
            <TextField
              fullWidth
              placeholder="Search books by title, author, or genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="text-gray-400" />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSearchQuery("")}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#f9fafb",
                  "&:hover fieldset": {
                    borderColor: "#d1d5db",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3b82f6",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="px-20 py-4 bg-gray-50">
        <p className="text-sm text-gray-600">
          Showing {filteredBooks.length} of {books.length} books
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      <div className="bg-zinc-200 flex flex-wrap gap-13 px-20 py-10">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="h-fit w-70 bg-white border-1 border-gray-400 rounded-lg shadow-xs overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleBookClick(book)}
            >
              <img
                src={getImageSrc(book.coverImageUrl)}
                alt={book.title}
                className="w-60 h-80 mt-3 object-center rounded-lg shadow-md z-10 flex justify-self-center"
                onError={(e) => {
                  e.target.src =
                    "https://s3.ap-south-1.amazonaws.com/storage.commonfolks.in/docs/products/images_full/the-power-of-your-subconscious-mind-pen-bird_FrontImage_335.gif";
                }}
              />
              <div className="text-sm text-center space-y-1 mt-2 mb-2">
                <h2 className="font-medium">
                  {book.title || "Title Not Available"}
                </h2>
                <h2 className="text-gray-600">
                  {book.authors && book.authors.length > 0
                    ? book.authors.join(", ")
                    : "Unknown Author"}
                </h2>
                <h2 className="text-green-600 font-semibold">
                  {book.price ? `₹${book.price}` : "Price Not Available"}
                </h2>
                <h2 className="text-yellow-600">
                  {book.ratings && book.ratings.length > 0
                    ? `${book.ratings[0]} Stars`
                    : "No ratings"}
                </h2>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center py-20">
            <div className="text-gray-500">
              <SearchIcon sx={{ fontSize: 64, opacity: 0.5 }} />
              <h2 className="text-xl font-semibold mt-4">No books found</h2>
              <p className="mt-2">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExplorePage;
