import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import BookCard from "./BookCard";
import AddBookModal from "./AddBookModal";
import AddGenreModal from "../Modals/AddGenreModal";
import { API_BASE_URL } from "../../../static/DefaultExports";
import AddAuthorModal from "../Modals/AddAuthorModal";

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isAddGenreModalOpen, setIsGenreModalOpen] = useState(false);
  const [isAddAuthorModalOpen, setIsAddAuthorModalOpen] = useState(false);
  const [genre, setGenre] = useState([]);
  const [authors, setAuthors] = useState([]);

  const data = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1,
  ];

  const FetchAllBooks = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/getAllBooks", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        const data = res.json();
        setBooks(...data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllGenre = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/genre/getAll`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Genre: ", data);
        setGenre(data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllAuthors = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/author/getAll`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Authors: ", data.data);
        setAuthors(data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllGenre();
    fetchAllAuthors();
  }, []);

  const handleAddBook = async () => {
    setIsAddBookModalOpen((prev) => !prev);
    console.log("clicked");
  };

  return (
    <>
      <NavBar btnText={"Reader"} admin={true} />
      {loading ? (
        <div className="fixed bg-zinc-200 min-h-screen min-w-screen flex justify-center items-center">
          <p className="text-2xl ">Hold on!! Fetching 📚</p>
        </div>
      ) : (
        <div>
          <p
            onClick={handleAddBook}
            className="bg-red-200 px-15 py-5 mx-15 mt-5 text-center text-2xl rounded-lg shadow-md hover:bg-red-300 cursor-pointer"
          >
            Add New Book
          </p>

          <div className="flex justify-between">
            <p
              className="mx-15 mt-3 bg-heading3 w-fit px-5 py-3 rounded-lg hover:cursor-pointer"
              onClick={() => setIsGenreModalOpen((prev) => !prev)}
            >
              Add Genre
            </p>
            <p
              className="mx-15 mt-3 bg-heading3 w-fit px-5 py-3 rounded-lg hover:cursor-pointer"
              onClick={() => setIsAddAuthorModalOpen((prev) => !prev)}
            >
              Add Author
            </p>
          </div>

          <div className="flex flex-wrap gap-5 justify-center py-10">
            {data.map((val, key) => (
              <BookCard index={key} />
            ))}
          </div>
        </div>
      )}
      {isAddBookModalOpen && (
        <AddBookModal
          onClose={() => {
            setIsAddBookModalOpen((prev) => !prev);
          }}
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
    </>
  );
}

export default AdminDashboard;
