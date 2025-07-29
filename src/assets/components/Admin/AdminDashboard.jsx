import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import BookCard from "./BookCard";
import AddBookModal from "./AddBookModal";
import AddGenreModal from "../Modals/AddGenreModal";
import { API_BASE_URL } from "../../../static/DefaultExports";
import AddAuthorModal from "../Modals/AddAuthorModal";
import AddAdminModal from "../Modals/AddAdminModal";

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isAddGenreModalOpen, setIsGenreModalOpen] = useState(false);
  const [isAddAuthorModalOpen, setIsAddAuthorModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [genre, setGenre] = useState([]);
  const [authors, setAuthors] = useState([]);

  const FetchAllBooks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/book/getAll`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setBooks(data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllGenre = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/genre/getAll`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setGenre(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllAuthors = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/author/getAll`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const response = await res.json();
      if (response && response.data && Array.isArray(response.data)) {
        setAuthors(response.data);
      } else {
        setAuthors([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    FetchAllBooks();
    fetchAllGenre();
    fetchAllAuthors();
  }, []);

  const handleAddBook = () => {
    setIsAddBookModalOpen((prev) => !prev);
  };

  const actionButtons = [
    {
      title: "Add Genre",
      icon: "📚",
      onClick: () => setIsGenreModalOpen((prev) => !prev),
      bgColor: "bg-gradient-to-r from-blue-400 to-blue-600",
      hoverColor: "hover:from-blue-500 hover:to-blue-700",
    },
    {
      title: "Add Author",
      icon: "✍️",
      onClick: () => setIsAddAuthorModalOpen((prev) => !prev),
      bgColor: "bg-gradient-to-r from-green-400 to-green-600",
      hoverColor: "hover:from-green-500 hover:to-green-700",
    },
    {
      title: "Add Admin",
      icon: "👤",
      onClick: () => setIsAdminModalOpen((prev) => !prev),
      bgColor: "bg-gradient-to-r from-purple-400 to-purple-600",
      hoverColor: "hover:from-purple-500 hover:to-purple-700",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <NavBar btnText={"Reader"} admin={true} />
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-2xl text-gray-600 font-medium">
              Hold on!! Fetching 📚
            </p>
            <p className="text-gray-500 mt-2">Loading your library...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar btnText={"Reader"} admin={true} />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your library books, authors, genres, and administrators
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-2xl">📚</span>
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Total Books</p>
                <p className="text-2xl font-bold text-gray-800">
                  {books.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-2xl">✍️</span>
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Total Authors</p>
                <p className="text-2xl font-bold text-gray-800">
                  {authors.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <span className="text-2xl">🏷️</span>
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Total Genres</p>
                <p className="text-2xl font-bold text-gray-800">
                  {genre.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Book Button */}
        <div className="mb-8">
          <button
            onClick={handleAddBook}
            className="w-full bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3"
          >
            <span className="text-2xl">➕</span>
            <span className="text-xl">Add New Book</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {actionButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`${button.bgColor} ${button.hoverColor} text-white font-semibold py-4 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3`}
            >
              <span className="text-xl">{button.icon}</span>
              <span>{button.title}</span>
            </button>
          ))}
        </div>

        {/* Books Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Library Books</h2>
            <div className="flex items-center space-x-2 text-gray-500">
              <span className="text-sm">Total:</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {books.length}
              </span>
            </div>
          </div>

          {books.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No books available
              </h3>
              <p className="text-gray-500 mb-6">
                Start building your library by adding your first book
              </p>
              <button
                onClick={handleAddBook}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Add Your First Book
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {books.map((book, index) => (
                <BookCard key={book.id || index} book={book} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {isAdminModalOpen && (
        <AddAdminModal onClose={() => setIsAdminModalOpen((prev) => !prev)} />
      )}
      {isAddBookModalOpen && (
        <AddBookModal
          onClose={() => setIsAddBookModalOpen((prev) => !prev)}
          genres={genre}
          authors={authors}
        />
      )}
      {isAddGenreModalOpen && (
        <AddGenreModal
          onClose={() => setIsGenreModalOpen((prev) => !prev)}
          refreshGenres={fetchAllGenre}
        />
      )}
      {isAddAuthorModalOpen && (
        <AddAuthorModal
          onClose={() => setIsAddAuthorModalOpen((prev) => !prev)}
          refreshAuthors={fetchAllAuthors}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
