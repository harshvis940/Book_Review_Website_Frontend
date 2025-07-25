import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import { getImageSrc } from "../../../static/DefaultExports";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { SlOptionsVertical } from "react-icons/sl";
import { SlLike, SlDislike } from "react-icons/sl";

function BookDetail() {
  const location = useLocation();
  const book = location.state?.book;
  const [isInReadingList, setIsInReadingList] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [reviewInteractions, setReviewInteractions] = useState({});
  const [replyStates, setReplyStates] = useState({});
  const [replyTexts, setReplyTexts] = useState({});

  console.log(book);

  const handleAddToReadingList = () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("user not prese");
      // return;
    }

    const readingListKey = `readingList_${userId}`;
    const existingList = JSON.parse(
      localStorage.getItem(readingListKey) || "[]"
    );

    if (isInReadingList) {
      // Remove from reading list
      const updatedList = existingList.filter((item) => item.id !== book.id);
      localStorage.setItem(readingListKey, JSON.stringify(updatedList));
      setIsInReadingList(false);
      setSnackbarMessage("Removed from reading list");
      setSnackbarSeverity("info");
    } else {
      // Add to reading list
      const bookToAdd = {
        id: book.id,
        title: book.title,
        authors: book.authors,
        coverImageURL: book.coverImageURL,
        genres: book.genres,
        addedAt: new Date().toISOString(),
      };
      existingList.push(bookToAdd);
      localStorage.setItem(readingListKey, JSON.stringify(existingList));
      setIsInReadingList(true);
      setSnackbarMessage("Added to reading list!");
      setSnackbarSeverity("success");
    }
  };

  useEffect(() => {
    // Check if book is already in reading list
    const userId = localStorage.getItem("userId");
    if (userId && book?.id) {
      const readingList = JSON.parse(
        localStorage.getItem(`readingList_${userId}`) || "[]"
      );
      setIsInReadingList(readingList.some((item) => item.id === book.id));
    }
  }, [book]);

  useEffect(() => {
    const bookId = book?.id;
    if (bookId) {
      const savedReviews = localStorage.getItem(`reviews_${bookId}`);
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      } else {
        // Default reviews
        const defaultReviews = [
          {
            id: 1,
            name: "Bisola",
            rating: 5,
            stars: "⭐️⭐️⭐️⭐️⭐️",
            reviews:
              "This book completely changed my perspective! The writing style is engaging and the concepts are presented in a very accessible way. I couldn't put it down once I started reading.",
            userId: "user1",
            timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            likes: 12,
            dislikes: 2,
            likedBy: [],
            dislikedBy: [],
          },
          {
            id: 2,
            name: "John Smith",
            rating: 4,
            stars: "⭐️⭐️⭐️⭐️",
            reviews:
              "Great book with valuable insights. Some parts were a bit repetitive, but overall a solid read. Would recommend to anyone interested in the topic.",
            userId: "user2",
            timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            likes: 8,
            dislikes: 1,
            likedBy: [],
            dislikedBy: [],
          },
          {
            id: 3,
            name: "Sarah Wilson",
            rating: 5,
            stars: "⭐️⭐️⭐️⭐️⭐️",
            reviews:
              "Absolutely loved this book! The author's expertise really shows through. Each chapter builds upon the previous one perfectly. This is definitely going on my favorites list.",
            userId: "user3",
            timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
            likes: 15,
            dislikes: 0,
            likedBy: [],
            dislikedBy: [],
          },
        ];
        setReviews(defaultReviews);
        localStorage.setItem(
          `reviews_${bookId}`,
          JSON.stringify(defaultReviews)
        );
      }
    }
  }, [book]);

  const review = [
    {
      name: "Bisola",
      stars: "⭐️⭐️⭐️⭐️⭐️",
      reviews:
        "fsffsafsasafffsffasfafsafasfiuasyfaysfuiysiauyfaisufyyasufiaysuifuyisauysfaiusyfasiufsfuyiasyuiaysfuyiasfuiysfasfaiyusfuyisfayuisfuiyafsy",
    },
    {
      name: "Bisola",
      stars: "⭐️⭐️⭐️⭐️⭐️",
      reviews:
        "fsffsafsasafffsffasfafsafasfiuasyfaysfuiysiauyfaisufyyasufiaysuifuyisauysfaiusyfasiufsfuyiasyuiaysfuyiasfuiysfasfaiyusfuyisfayuisfuiyafsy",
    },
    {
      name: "Bisola",
      stars: "⭐️⭐️⭐️⭐️⭐️",
      reviews:
        "fsffsafsasafffsffasfafsafasfiuasyfaysfuiysiauyfaisufyyasufiaysuifuyisauysfaiusyfasiufsfuyiasyuiaysfuyiasfuiysfasfaiyusfuyisfayuisfuiyafsy",
    },
    {
      name: "Bisola",
      stars: "⭐️⭐️⭐️⭐️⭐️",
      reviews:
        "fsffsafsasafffsffasfafsafasfiuasyfaysfuiysiauyfaisufyyasufiaysuifuyisauysfaiusyfasiufsfuyiasyuiaysfuyiasfuiysfasfaiyusfuyisfayuisfuiyafsy",
    },
    {
      name: "Bisola",
      stars: "⭐️⭐️⭐️⭐️⭐️",
      reviews:
        "fsffsafsasafffsffasfafsafasfiuasyfaysfuiysiauyfaisufyyasufiaysuifuyisauysfaiusyfasiufsfuyiasyuiaysfuyiasfuiysfasfaiyusfuyisfayuisfuiyafsy",
    },
    {
      name: "Bisola",
      stars: "⭐️⭐️⭐️⭐️⭐️",
      reviews:
        "fsffsafsasafffsffasfafsafasfiuasyfaysfuiysiauyfaisufyyasufiaysuifuyisauysfaiusyfasiufsfuyiasyuiaysfuyiasfuiysfasfaiyusfuyisfayuisfuiyafsy",
    },
    {
      name: "Bisola",
      stars: "⭐️⭐️⭐️⭐️⭐️",
      reviews:
        "fsffsafsasafffsffasfafsafasfiuasyfaysfuiysiauyfaisufyyasufiaysuifuyisauysfaiusyfasiufsfuyiasyuiaysfuyiasfuiysfasfaiyusfuyisfayuisfuiyafsy",
    },
  ];

  const bookDescription = [
    {
      Format: "Paper Black",
    },
    {
      ISBN: book.isbn,
    },
    {
      Pages: "580",
    },
    {
      "Reading Time": "2 Hours",
    },
    {
      Dimension: "243x120nm",
    },
    {
      Published: book.publicationYear,
    },
    {
      Genre: book.genres,
    },
  ];

  const handleLikeDislike = (reviewIndex, action) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login to like/dislike reviews");
      return;
    }

    setReviewInteractions((prev) => {
      const current = prev[reviewIndex] || { liked: false, disliked: false };
      const newState = { ...prev };

      if (action === "like") {
        if (current.liked) {
          // Remove like
          newState[reviewIndex] = { liked: false, disliked: current.disliked };
        } else {
          // Add like, remove dislike if exists
          newState[reviewIndex] = { liked: true, disliked: false };
        }
      } else if (action === "dislike") {
        if (current.disliked) {
          // Remove dislike
          newState[reviewIndex] = { liked: current.liked, disliked: false };
        } else {
          // Add dislike, remove like if exists
          newState[reviewIndex] = { liked: false, disliked: true };
        }
      }

      return newState;
    });
  };

  return (
    <>
      {/* Custom scrollbar styles */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 5px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background:rgb(222, 222, 223);
            border-radius: 4px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background:rgb(103, 103, 103);
          }

          .reading-list-btn {
            transition: all 0.3s ease;
          }

          .reading-list-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }

          .review-card {
            transition: all 0.2s ease;
          }

          .review-card:hover {
            background-color: #f8f9fa;
          }

          .like-btn, .dislike-btn {
            transition: all 0.2s ease;
          }

          .like-btn:hover {
            background-color: #e3f2fd;
          }

          .dislike-btn:hover {
            background-color: #ffebee;
          }

        `}
      </style>

      <div className="h-screen grid grid-cols-[40%_60%]">
        {/* Left: Book Image (40%) - Fixed */}
        <div className="flex bg-white p-10 h-screen sticky top-0">
          <img
            src={getImageSrc(book?.coverImageURL)}
            alt="Book"
            className="w-full object-contain"
          />
        </div>

        {/* Right: Book Details (60%) - Scrollable */}
        <div className=" w-full flex flex-col h-screen overflow-y-auto overflow-x-hidden custom-scrollbar">
          <div className="mt-10">
            <h1 className="text-4xl font-bold mb-6 px-5">{book.title}</h1>
            <p className="text-xl mb-2 px-5">Author: {book.authors}</p>
            <p className="text-xl mb-2 px-5">Genre: {book.genres}</p>
            <p className="text-xl mb-2 px-5">Price: ₹499</p>
            <p className="text-xl mb-6 px-5">Rating: ⭐⭐⭐⭐☆</p>
            <p id="demo-radio-buttons-group-label" className="px-5">
              Choose prefered format
            </p>
          </div>

          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Paperbook"
            name="radio-buttons-group"
            className="flex flex-col px-5"
          >
            <FormControlLabel
              value="Paperbook"
              control={<Radio />}
              label="Paperbook"
            />
            <FormControlLabel value="Ebook" control={<Radio />} label="Ebook" />
          </RadioGroup>
          <div className="w-150 mt-5 flex flex-row gap-5 px-5">
            <Button variant="contained">Buy Now</Button>
            <Button variant="outlined">Add to cart</Button>
            <Button
              variant="outlined"
              startIcon={
                isInReadingList ? <BookmarkIcon /> : <BookmarkBorderIcon />
              }
              onClick={handleAddToReadingList}
              className="reading-list-btn"
              sx={{
                borderColor: isInReadingList
                  ? "#1976d2"
                  : "rgba(0, 0, 0, 0.23)",
                color: isInReadingList ? "#1976d2" : "rgba(0, 0, 0, 0.87)",
                "&:hover": {
                  borderColor: "#1976d2",
                  backgroundColor: isInReadingList
                    ? "rgba(25, 118, 210, 0.08)"
                    : "transparent",
                },
              }}
            >
              {isInReadingList ? "In Reading List" : "Add to Reading List"}
            </Button>
          </div>

          <p className="mt-10 text-xl px-5">Book summary</p>
          <p className="mt-3 px-5 text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
            vitae adipisci reprehenderit omnis hic quo fugiat ipsa ipsam enim
            maxime id commodi dolor earum perferendis blanditiis quasi nostrum
            ex, laudantium deserunt unde libero explicabo? Placeat, blanditiis
            praesentium omnis amet porro inventore. Amet aperiam ipsa voluptatum
            nostrum vel iure, eaque deserunt accusantium dolores velit
            laboriosam impedit ea sunt autem odio! Omnis totam iusto, eius ipsam
            saepe labore molestias veniam qui ipsum, veritatis dolore nihil
            rerum repellat, asperiores corporis ratione quos. Ab nesciunt
            nostrum, eum minus possimus eaque animi et doloremque earum harum
            magnam ut minima. Sequi placeat optio dolores, nisi architecto quod!
            Doloremque, cum quibusdam beatae quae tenetur ullam odit molestiae,
            sunt, corrupti odio earum quas? Amet eaque a explicabo nesciunt
            quam. Deleniti voluptatibus aliquid sint ipsa ab consequuntur,
            voluptatum, voluptates a dignissimos voluptatem totam ea ipsam earum
            architecto assumenda laborum inventore eius porro cumque vel impedit
            eveniet nihil rerum molestias. Soluta quod vitae sint omnis beatae
            architecto, consectetur voluptates explicabo aperiam eum fugiat
            fugit, aspernatur tenetur laboriosam magni amet, aliquam quidem iure
            dicta natus dolorum repudiandae laborum! Obcaecati voluptatibus sed
            ratione reprehenderit odio placeat eum eligendi adipisci saepe,
            cumque debitis et numquam cupiditate iure dicta nemo magni!
            Doloribus, distinctio id.
            {book.summary}
          </p>

          <p className="mt-10 text-xl font-semibold px-5">Book Description</p>
          <div className="mt-3 space-y-2 px-5">
            {bookDescription.map((item, index) => {
              const [key, value] = Object.entries(item)[0];
              return (
                <div key={index} className="text-lg">
                  <p>
                    <strong>{key}:</strong> {value}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-zinc-100 mt-2 px-5 py-3">
            <p className="text-xl font-bold">Reviews</p>
            <p className="mb-3 text-sm">
              See what people think about Tile of the book
            </p>

            <div className="flex flex-row gap-3">
              <p>4.0</p>
              <p>⭐️⭐️⭐️⭐️⭐️</p>
            </div>
            <p>40 reviews/28 ratings</p>
            <p className="mt-3">What would you rate this book</p>
            <p>⭐️⭐️⭐️⭐️⭐️</p>

            <p className="mt-3">Tell us what do you think</p>
            <textarea
              className="border-1 w-100 p-3 rounded-md"
              name=""
              id=""
              placeholder="Write review"
            ></textarea>
            <div className="bg-white w-30 p-3 text-center rounded-md">
              <p className="hover:cursor-pointer">Post</p>
            </div>
            <div className=" px-4 py-3">
              {review.map((val, key) => {
                const currentInteraction = reviewInteractions[key] || {
                  liked: false,
                  disliked: false,
                };
                return (
                  <div className="flex ">
                    <div className="m-auto">
                      <SlOptionsVertical />
                    </div>
                    <div
                      key={key}
                      className="flex gap-4 mb-4 p-4 bg-white rounded-md shadow-sm w-190"
                    >
                      {/* Placeholder for avatar or icon */}
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-white">
                        {val.name[0]}
                      </div>

                      {/* Review content */}
                      <div className="flex flex-col flex-1 overflow-hidden">
                        <p className="font-semibold">{val.name}</p>
                        <p className="text-yellow-500">{val.stars}</p>
                        <p className="text-gray-700 break-words whitespace-pre-wrap">
                          {val.reviews}
                        </p>
                        <div className="text-xs mt-5 flex gap-5 items-center">
                          <SlLike
                            className="hover:cursor-pointer transition-colors duration-200"
                            size={15}
                            fill={
                              currentInteraction.liked ? "#22c55e" : "#1976d2"
                            }
                            style={{
                              color: currentInteraction.liked
                                ? "#22c55e"
                                : "#1976d2",
                              opacity: currentInteraction.liked ? 1 : 0.7,
                            }}
                            onClick={() => handleLikeDislike(key, "like")}
                          />
                          <SlDislike
                            className="hover:cursor-pointer transition-colors duration-200"
                            size={15}
                            fill={
                              currentInteraction.disliked
                                ? "#ef4444"
                                : "#1976d2"
                            }
                            style={{
                              color: currentInteraction.disliked
                                ? "#ef4444"
                                : "#1976d2",
                              opacity: currentInteraction.disliked ? 1 : 0.7,
                            }}
                            onClick={() => handleLikeDislike(key, "dislike")}
                          />
                          <h1
                            className="hover:cursor-pointer hover:text-blue-600 transition-colors duration-200"
                            onClick={() => handleReplyClick(key)}
                          >
                            Reply
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookDetail;
