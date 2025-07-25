import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../assets/components/NavBar";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { motion, AnimatePresence } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { getImageSrc } from "../static/DefaultExports";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Button } from "@mui/material";

function Goals() {
  const [readingList, setReadingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReadingList();
  }, []);

  const fetchReadingList = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const list = JSON.parse(
        localStorage.getItem(`readingList_${userId}`) || "[]"
      );
      setReadingList(list);
    }
    setLoading(false);
  };

  const handleBookClick = (book) => {
    navigate(`/book/${book.id}`, { state: { book } });
  };

  const handleRemoveFromList = (bookId, e) => {
    e.stopPropagation(); // Prevent card click
    const userId = localStorage.getItem("userId");
    if (userId) {
      const updatedList = readingList.filter((book) => book.id !== bookId);
      localStorage.setItem(
        `readingList_${userId}`,
        JSON.stringify(updatedList)
      );
      setReadingList(updatedList);
    }
  };

  const handleToggleRead = (bookId, e) => {
    e.stopPropagation(); // Prevent card click
    const updatedList = readingList.map((book) =>
      book.id === bookId ? { ...book, isRead: !book.isRead } : book
    );
    const userId = localStorage.getItem("userId");
    localStorage.setItem(`readingList_${userId}`, JSON.stringify(updatedList));
    setReadingList(updatedList);
  };

  const completedBooks = readingList.filter((book) => book.isRead).length;
  const totalBooks = readingList.length;
  const progressPercentage =
    totalBooks > 0 ? (completedBooks / totalBooks) * 100 : 0;

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="flex justify-center items-center h-screen bg-zinc-200">
          <div className="text-xl">Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="bg-zinc-200 min-h-screen">
        {/* Header Section */}
        <div className="bg-white shadow-sm px-20 py-8">
          <h1 className="text-3xl font-bold mb-4">My Reading Goals </h1>
          <div className="flex items-center justify-between max-w-4xl">
            <div>
              <p className="text-lg text-gray-600">
                Track your reading journey
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {completedBooks} of {totalBooks} books completed
              </p>
            </div>

            {/* Progress Circle */}
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="rgb(229, 231, 235)"
                  strokeWidth="12"
                  fill="none"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                  animate={{
                    strokeDashoffset:
                      2 * Math.PI * 56 * (1 - progressPercentage / 100),
                  }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="px-20 py-10">
          {readingList.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-16 text-center"
            >
              <BookmarkBorderIcon sx={{ fontSize: 64, color: "#9CA3AF" }} />
              <h2 className="text-2xl font-semibold mt-4 mb-2">
                No books in your reading list
              </h2>
              <p className="text-gray-600">
                Start exploring and add books to track your reading goals!
              </p>
              <Button
                variant="contained"
                onClick={() => navigate("/explore")}
                className="mt-6"
              >
                Explore Books
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {readingList.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all ${
                      book.isRead ? "ring-2 ring-green-400" : ""
                    }`}
                    onClick={() => handleBookClick(book)}
                  >
                    <div className="relative">
                      <img
                        src={getImageSrc(book.coverImageURL)}
                        alt={book.title}
                        className="w-full h-80 object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://s3.ap-south-1.amazonaws.com/storage.commonfolks.in/docs/products/images_full/the-power-of-your-subconscious-mind-pen-bird_FrontImage_335.gif";
                        }}
                      />

                      {/* Overlay for completed books */}
                      {book.isRead && (
                        <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center">
                          <CheckCircleIcon
                            sx={{ fontSize: 64, color: "white" }}
                          />
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Tooltip
                          title={
                            book.isRead ? "Mark as unread" : "Mark as read"
                          }
                        >
                          <IconButton
                            onClick={(e) => handleToggleRead(book.id, e)}
                            sx={{
                              backgroundColor: "white",
                              "&:hover": { backgroundColor: "#f3f4f6" },
                            }}
                          >
                            {book.isRead ? (
                              <CheckCircleIcon color="success" />
                            ) : (
                              <RadioButtonUncheckedIcon />
                            )}
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Remove from reading list">
                          <IconButton
                            onClick={(e) => handleRemoveFromList(book.id, e)}
                            sx={{
                              backgroundColor: "white",
                              "&:hover": { backgroundColor: "#fee2e2" },
                            }}
                          >
                            <DeleteIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                        {book.title || "Title Not Available"}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {book.authors || "Unknown Author"}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                          Added {new Date(book.addedAt).toLocaleDateString()}
                        </p>
                        {book.isRead && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Stats Section */}
        {readingList.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white mx-20 mb-10 p-8 rounded-lg shadow-sm"
          >
            <h2 className="text-2xl font-bold mb-6">Reading Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">{totalBooks}</p>
                <p className="text-gray-600 mt-2">Total Books</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-3xl font-bold text-green-600">
                  {completedBooks}
                </p>
                <p className="text-gray-600 mt-2">Completed</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-3xl font-bold text-orange-600">
                  {totalBooks - completedBooks}
                </p>
                <p className="text-gray-600 mt-2">In Progress</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <style>
        {`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}
      </style>
    </>
  );
}

export default Goals;
