import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BestSellingBooks() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Dummy data in case books is empty or API fails
  const dummyData = [
    {
      id: "dummy-1",
      title: "The Power of Mind",
      authors: ["Joseph Murphy"],
      coverImageUrl:
        "https://s3.ap-south-1.amazonaws.com/storage.commonfolks.in/docs/products/images_full/the-power-of-your-subconscious-mind-pen-bird_FrontImage_335.gif",
      price: 299,
      ratings: [4.5],
    },
    {
      id: "dummy-2",
      title: "Think and Grow Rich",
      authors: ["Napoleon Hill"],
      coverImageUrl:
        "https://s3.ap-south-1.amazonaws.com/storage.commonfolks.in/docs/products/images_full/the-power-of-your-subconscious-mind-pen-bird_FrontImage_335.gif",
      price: 350,
      ratings: [4.8],
    },
    {
      id: "dummy-3",
      title: "The Alchemist",
      authors: ["Paulo Coelho"],
      coverImageUrl:
        "https://s3.ap-south-1.amazonaws.com/storage.commonfolks.in/docs/products/images_full/the-power-of-your-subconscious-mind-pen-bird_FrontImage_335.gif",
      price: 450,
      ratings: [4.7],
    },
    {
      id: "dummy-4",
      title: "Atomic Habits",
      authors: ["James Clear"],
      coverImageUrl:
        "https://s3.ap-south-1.amazonaws.com/storage.commonfolks.in/docs/products/images_full/the-power-of-your-subconscious-mind-pen-bird_FrontImage_335.gif",
      price: 599,
      ratings: [4.9],
    },
    {
      id: "dummy-5",
      title: "The 7 Habits",
      authors: ["Stephen Covey"],
      coverImageUrl:
        "https://s3.ap-south-1.amazonaws.com/storage.commonfolks.in/docs/products/images_full/the-power-of-your-subconscious-mind-pen-bird_FrontImage_335.gif",
      price: 399,
      ratings: [4.6],
    },
    {
      id: "dummy-6",
      title: "Rich Dad Poor Dad",
      authors: ["Robert Kiyosaki"],
      coverImageUrl:
        "https://s3.ap-south-1.amazonaws.com/storage.commonfolks.in/docs/products/images_full/the-power-of-your-subconscious-mind-pen-bird_FrontImage_335.gif",
      price: 475,
      ratings: [4.4],
    },
  ];

  const fetchBestSellingBooks = async () => {
    try {
      const res = await fetch("http://localhost:8080/book/getBestSeller", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      try {
        const text = await res.text();
        console.log(text);
        const response = await res.json();
        console.log(res);
        if (response && response.data && Array.isArray(response.data)) {
          // Filter out any books with incomplete/invalid image data
          const validBooks = response.data.filter((book) => {
            if (!book.coverImageURL) return true; // Allow books without images
            // Check if base64 is complete (basic validation)
            return book.coverImageURL.length > 100; // Adjust this threshold
          });

          setBooks(validBooks);
        } else {
          setBooks([]);
        }
      } catch (parseError) {
        console.error("JSON Parse Error - Response too large or malformed");
        setBooks([]); // Will use dummy data
      }
    } catch (error) {
      console.error("Network Error:", error);
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchBestSellingBooks();
    console.log(books);
  }, []);

  const getImageSrc = (coverImageURL) => {
    if (!coverImageURL) {
      return "https://s3.ap-south-1.amazonaws.com/storage.commonfolks.in/docs/products/images_full/the-power-of-your-subconscious-mind-pen-bird_FrontImage_335.gif";
    }

    // Check if it's already a complete URL
    if (
      coverImageURL.startsWith("http://") ||
      coverImageURL.startsWith("https://")
    ) {
      return coverImageURL;
    }

    // Check if it's already a data URL
    if (coverImageURL.startsWith("data:image")) {
      return coverImageURL;
    }

    // Validate base64 string (basic check)
    if (coverImageURL.length < 100) {
      console.warn("Base64 string seems incomplete, using fallback");
      return "https://s3.ap-south-1.amazonaws.com/storage.commonfolks.in/docs/products/images_full/the-power-of-your-subconscious-mind-pen-bird_FrontImage_335.gif";
    }

    // If it's a base64 string, add the data URL prefix
    return `data:image/jpeg;base64,${coverImageURL}`;
  };

  const handleBookClick = (book) => {
    navigate("/bookDetail", { state: { book } });
  };

  const handleViewAllBooks = () => {
    navigate("/explore");
  };
  // Use actual data if available and loaded, otherwise use dummy data
  const data = !isLoading && books && books.length > 0 ? books : dummyData;

  return (
    <div className=" mx-20 my-5 overflow-hidden rounded-lg">
      <div className="flex justify-between">
        <h2 className="font-bold text-lg ">Bestselling Books</h2>
        <h4 onClick={handleViewAllBooks} className="hover:cursor-pointer">
          View all {">"}
        </h4>
      </div>

      <div className="mt-5 bg-white flex flex-row gap-13 flex-wrap">
        {data.map((book) => (
          <div
            key={book.id}
            className="h-fit w-70 bg-white border-1 border-gray-400 rounded-md shadow-xs overflow-hidden"
            onClick={() => handleBookClick(book)}
          >
            <img
              src={getImageSrc(book.coverImageURL)}
              alt={book.title}
              className="w-60 h-80 mt-3 object-center ` shadow-md z-10 flex justify-self-center"
              onError={(e) => {
                // Fallback image if base64 fails to load
                e.target.src =
                  "https://s3.ap-south-1.amazonaws.com/storage.commonfolks.in/docs/products/images_full/the-power-of-your-subconscious-mind-pen-bird_FrontImage_335.gif";
              }}
            />
            <div className="text-sm text-center space-y-1 mt-2 mb-2">
              <h2 className="text-lg font-bold">
                {book.title || "Title Not Available"}
              </h2>
              <h2 className="font-semibold">
                {book.authors && book.authors.length > 0
                  ? book.authors.join(", ")
                  : "Unknown Author"}
              </h2>
              <h2>{book.price ? `₹${book.price}` : "Price Not Available"}</h2>
              <h2>
                {book.ratings && book.ratings.length > 0
                  ? `${book.ratings[0]} ratings`
                  : "No ratings"}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSellingBooks;
