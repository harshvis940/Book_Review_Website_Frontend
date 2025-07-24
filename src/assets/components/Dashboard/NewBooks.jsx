import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NewBooks() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Dummy data in case books is empty or API fails
  const dummyData = [
    {
      id: "dummy-1",
      title: "The Great Adventure",
      authors: ["John Doe"],
      coverImageUrl:
        "https://m.media-amazon.com/images/I/61kRkfsIMUL._UF1000,1000_QL80_.jpg",
      ratings: [4.5],
    },
    {
      id: "dummy-2",
      title: "Mystery of the Lost City",
      authors: ["Jane Smith"],
      coverImageUrl:
        "https://m.media-amazon.com/images/I/61kRkfsIMUL._UF1000,1000_QL80_.jpg",
      ratings: [4.2],
    },
    {
      id: "dummy-3",
      title: "Science Fiction Dreams",
      authors: ["Robert Johnson"],
      coverImageUrl:
        "https://m.media-amazon.com/images/I/61kRkfsIMUL._UF1000,1000_QL80_.jpg",
      ratings: [4.8],
    },
    {
      id: "dummy-4",
      title: "The Last Kingdom",
      authors: ["Emily Brown"],
      coverImageUrl:
        "https://m.media-amazon.com/images/I/61kRkfsIMUL._UF1000,1000_QL80_.jpg",
      ratings: [4.3],
    },
    {
      id: "dummy-5",
      title: "Journey to Tomorrow",
      authors: ["Michael Davis"],
      coverImageUrl:
        "https://m.media-amazon.com/images/I/61kRkfsIMUL._UF1000,1000_QL80_.jpg",
      ratings: [4.6],
    },
    {
      id: "dummy-6",
      title: "The Hidden Truth",
      authors: ["Sarah Wilson"],
      coverImageUrl:
        "https://m.media-amazon.com/images/I/61kRkfsIMUL._UF1000,1000_QL80_.jpg",
      ratings: [4.1],
    },
  ];

  const fetchNewlyAddedBook = async () => {
    try {
      const res = await fetch("http://localhost:8080/book/getNewlyAdded", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        const response = await res.json();
        console.log("Fetched books:", response);
        // Extract the data array from the response object
        setBooks(response.data || []);
      }
    } catch (err) {
      console.log("Error fetching books:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewlyAddedBook();
  }, []);

  // Helper function to process image URL
  const getImageSrc = (coverImageUrl) => {
    if (!coverImageUrl) {
      return "https://m.media-amazon.com/images/I/61kRkfsIMUL._UF1000,1000_QL80_.jpg";
    }

    // Check if it's already a complete URL (http/https)
    if (
      coverImageUrl.startsWith("http://") ||
      coverImageUrl.startsWith("https://")
    ) {
      return coverImageUrl;
    }

    // Check if it's already a data URL
    if (coverImageUrl.startsWith("data:image")) {
      return coverImageUrl;
    }

    // If it's just a base64 string, add the data URL prefix
    // Assuming it's a JPEG, but you can change this based on your image format
    return `data:image/jpeg;base64,${coverImageUrl}`;
  };

  const handleBookClick = (book) => {
    navigate("/bookDetail", { state: { book } });
  };

  const data = !isLoading && books && books.length > 0 ? books : dummyData;

  return (
    <div className=" mx-20 my-5 ">
      <h1 className="text-bold">Newly Added Books</h1>

      <div className="grid grid-cols-3 gap-10">
        {data.map((book, key) => (
          <div
            key={book.id}
            className=" h-20 border-b-1 border-gray-400 w-95 px-2 py-2 mt-2 flex flex-row gap-5 hover:cursor-pointer"
            onClick={() => handleBookClick(book)}
          >
            <img
              src={getImageSrc(book.coverImageURL)}
              className="w-20 h-full object-center"
              alt={book.title}
              onError={(e) => {
                // Fallback image if base64 fails to load
                e.target.src =
                  "https://m.media-amazon.com/images/I/61kRkfsIMUL._UF1000,1000_QL80_.jpg";
              }}
            />
            <div className="flex flex-col">
              <h1>{book.title || "Title Not Available"}</h1>
              <h1>
                {book.authors && book.authors.length > 0
                  ? book.authors.join(", ")
                  : "Unknown Author"}
              </h1>
              <h1>
                {book.ratings && book.ratings.length > 0
                  ? `${book.ratings[0]} Stars`
                  : "No ratings yet"}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewBooks;
