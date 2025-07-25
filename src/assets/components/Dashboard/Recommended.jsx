import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Recommended() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dummy data in case books is empty or API fails
  const dummyData = [
    {
      id: "dummy-1",
      title: "Rich Dad Poor Dad",
      authors: ["Robert Kiyosaki"],
      coverImageUrl:
        "https://m.media-amazon.com/images/I/81BE7eeKzAL._UF1000,1000_QL80_.jpg",
      price: 399,
      ratings: [4.5],
      genres: ["Finance", "Self-Help"],
    },
    {
      id: "dummy-2",
      title: "The Psychology of Money",
      authors: ["Morgan Housel"],
      coverImageUrl: "https://m.media-amazon.com/images/I/610mObHZ-JL.jpg",
      price: 450,
      ratings: [4.7],
      genres: ["Finance", "Psychology"],
    },
    {
      id: "dummy-3",
      title: "The Power of Your Subconscious Mind",
      authors: ["Joseph Murphy"],
      coverImageUrl:
        "https://www.jaicobooks.com/wp-content/uploads/2022/12/j-2775-the-power-of-your-subconscious-mind-joseph-murphy.jpg",
      price: 299,
      ratings: [4.6],
      genres: ["Self-Help", "Psychology"],
    },
  ];

  const navigate = useNavigate();

  const fetchRecommendedBooks = async () => {
    try {
      const res = await fetch("http://localhost:8080/book/getRecommended", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        const response = await res.json();
        console.log("Fetched recommended books:", response);
        // Extract the data array from the response object
        setBooks(response.data || []);
      }
    } catch (err) {
      console.log("Error fetching recommended books:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendedBooks();
  }, []);

  const getImageSrc = (coverImageUrl) => {
    if (!coverImageUrl) {
      return "https://m.media-amazon.com/images/I/81BE7eeKzAL._UF1000,1000_QL80_.jpg";
    }

    if (
      coverImageUrl.startsWith("http://") ||
      coverImageUrl.startsWith("https://")
    ) {
      return coverImageUrl;
    }

    if (coverImageUrl.startsWith("data:image")) {
      return coverImageUrl;
    }

    return `data:image/jpeg;base64,${coverImageUrl}`;
  };

  const handleBookClick = (book) => {
    navigate("/bookDetail", { state: { book } });
  };

  // Use actual data if available and loaded, otherwise use dummy data
  const data = !isLoading && books && books.length > 0 ? books : dummyData;

  return (
    <div className="bg-zinc-100 mx-20 my-5 h-100 shadow-md overflow-hidden rounded-lg">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        //   navigation
        // pagination={{ clickable: true }}
        speed={1000}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="rounded-lg shadow-md"
      >
        {data.map((book, index) => (
          <SwiperSlide key={book.id}>
            {/* <h3 className="text-lg fixed ml-10 mt-5">Recommended for you</h3> */}
            <div
              onClick={() => handleBookClick(book)}
              className="flex justify-center rounded-md overflow-hidden mt-10"
            >
              <img
                src={getImageSrc(book.coverImageURL)}
                alt={book.title}
                className="w-100 rounded-lg h-90 overflow-hidden object-contain rounded-lg"
                onError={(e) => {
                  // Fallback image if base64 fails to load
                  e.target.src =
                    "https://m.media-amazon.com/images/I/81BE7eeKzAL._UF1000,1000_QL80_.jpg";
                }}
              />

              <div className="flex flex-col gap-3">
                <h1 className="text-lg font-bold text-gray-800">
                  {book.title || "Title Not Available"}
                </h1>
                <h1 className="text-black font-bold">
                  By{" "}
                  {book.authors && book.authors.length > 0
                    ? book.authors.join(", ")
                    : "Unknown Author"}
                </h1>
                <h1>
                  {book.price
                    ? `Price: Rs ${book.price}`
                    : "Price Not Available"}
                </h1>
                <h1>
                  {book.ratings && book.ratings.length > 0
                    ? `⭐️⭐️⭐️⭐️⭐️ `
                    : "No ratings"}
                </h1>
                <h1>
                  {book.genres && book.genres.length > 0
                    ? book.genres.join(", ")
                    : "No genre specified"}
                </h1>
                <Button variant="contained">Buy Now</Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Recommended;
