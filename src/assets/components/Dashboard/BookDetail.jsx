import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import { API_BASE_URL, getImageSrc } from "../../../static/DefaultExports";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { SlOptionsVertical } from "react-icons/sl";
import { SlLike, SlDislike } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../Redux/cartSlice";
import NavBar from "../NavBar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { addToList, removeFromList } from "../../Redux/readingListSlice";

function BookDetail() {
  const location = useLocation();
  const book = location.state?.book;
  const [isInReadingList, setIsInReadingList] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const [reviewInteractions, setReviewInteractions] = useState({});
  const [replyStates, setReplyStates] = useState({});
  const [replyTexts, setReplyTexts] = useState({});
  const [allBooks, setBooks] = useState([]);
  const dispatch = useDispatch();
  const readingListBooks = useSelector((state) => state.list.books);
  const cartBooks = useSelector((state) => state.cart.items);
  const [isAdded, setIsAdded] = useState(false);

  console.log(readingListBooks);
  // Fetch reviews from API
  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/review/get?id=${book.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.data && Array.isArray(data.data)) {
          setReviews(data.data);
        }
      } else {
        console.error("Failed to fetch reviews");
        // Use dummy data as fallback
        setDummyReviews();
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setDummyReviews();
    }
  };

  const setDummyReviews = () => {
    const dummyReviews = [
      {
        id: 1,
        userId: "user1",
        userName: "Bisola",
        rating: 5,
        reviewText:
          "This book completely changed my perspective! The writing style is engaging and the concepts are presented in a very accessible way. I couldn't put it down once I started reading.",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        likes: 12,
        dislikes: 2,
        replies: [
          {
            id: 1,
            userId: "user2",
            userName: "John",
            replyText: "I completely agree! This book is amazing.",
            createdAt: new Date(Date.now() - 43200000).toISOString(),
          },
        ],
      },
      {
        id: 2,
        userId: "user2",
        userName: "John Smith",
        rating: 4,
        reviewText:
          "Great book with valuable insights. Some parts were a bit repetitive, but overall a solid read. Would recommend to anyone interested in the topic.",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        likes: 8,
        dislikes: 1,
        replies: [],
      },
      {
        id: 3,
        userId: "user3",
        userName: "Sarah Wilson",
        rating: 5,
        reviewText:
          "Absolutely loved this book! The author's expertise really shows through. Each chapter builds upon the previous one perfectly. This is definitely going on my favorites list.",
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        likes: 15,
        dislikes: 0,
        replies: [],
      },
    ];
    setReviews(dummyReviews);
  };

  //Submit Book Review
  const handleSubmitReview = async () => {
    if (!newReviewText.trim() || userRating === 0) {
      toast.error("Please provide both rating and review text");
      return;
    }

    setIsSubmittingReview(true);
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const reviewData = {
        bookId: book.id,
        userId: userId,
        value: userRating,
        content: newReviewText.trim(),
      };

      const response = await fetch("http://localhost:8080/review/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success("Review submitted successfully!");
        setNewReviewText("");
        setUserRating(0);
        fetchReviews();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Error submitting review");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleReplySubmit = async (reviewId, reviewIndex) => {
    console.log(reviewId);
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please login to reply");
      return;
    }

    const replyText = replyTexts[reviewIndex];
    if (!replyText || !replyText.trim()) {
      toast.error("Please write a reply");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const replyData = {
        reviewId: reviewId,
        userId: userId,
        content: replyText.trim(),
        parentCommentId: reviewId,
        bookId: book.id,
      };
      console.log(replyData);
      const response = await fetch(`${API_BASE_URL}/comment/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(replyData),
      });

      if (response.ok) {
        toast.success("Reply posted successfully!");
        // Clear reply text and close reply box
        setReplyTexts((prev) => ({
          ...prev,
          [reviewIndex]: "",
        }));
        setReplyStates((prev) => ({
          ...prev,
          [reviewIndex]: false,
        }));
        // Refresh reviews to show new reply
        fetchReviews();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to post reply");
      }
    } catch (error) {
      console.error("Error posting reply:", error);
      toast.error("Error posting reply");
    }
  };

  const handleLikeDislike = async (reviewId, reviewIndex, action) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please login to like/dislike reviews");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/review/${action}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewId: reviewId,
          userId: userId,
        }),
      });

      if (response.ok) {
        setReviewInteractions((prev) => {
          const current = prev[reviewIndex] || {
            liked: false,
            disliked: false,
          };
          const newState = { ...prev };

          if (action === "like") {
            if (current.liked) {
              newState[reviewIndex] = {
                liked: false,
                disliked: current.disliked,
              };
            } else {
              newState[reviewIndex] = { liked: true, disliked: false };
            }
          } else if (action === "dislike") {
            if (current.disliked) {
              newState[reviewIndex] = { liked: current.liked, disliked: false };
            } else {
              newState[reviewIndex] = { liked: false, disliked: true };
            }
          }

          return newState;
        });
        // Refresh reviews to get updated counts
        fetchReviews();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || `Failed to ${action} review`);
      }
    } catch (error) {
      console.error(`Error ${action}ing review:`, error);
      toast.error(`Error ${action}ing review`);
    }
  };

  const handleAddToCart = () => {
    try {
      dispatch(addToCart(book));
      toast.success("Book added to cart!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: "🛒",
      });
    } catch (err) {
      toast.error("Error adding book to cart");
    }
  };

  const isInCart = cartBooks.some((item) => item.id === book?.id);

  const handleBuyNow = () => {
    dispatch(addToCart(book));
    navigate("/cart");
  };

  const checkBookAdded = (allBooksObj) => {
    setBooks(allBooksObj);
    const existing = allBooksObj.filter((item) => book.id === item.id);
    if (existing.length > 0) {
      setIsAdded(true);
    }
  };

  const handleAddToReadingList = () => {
    if (isAdded) {
      dispatch(removeFromList(book));
      setIsAdded(false);
      toast.success("Book removed successfully!");
    } else {
      try {
        dispatch(addToList(book));
        toast.success("Book added successfully!");
      } catch (err) {
        toast.error("Error adding book");
      }
    }
  };

  const handleReplyClick = (reviewIndex) => {
    setReplyStates((prev) => ({
      ...prev,
      [reviewIndex]: !prev[reviewIndex],
    }));
  };

  const handleReplyTextChange = (reviewIndex, text) => {
    setReplyTexts((prev) => ({
      ...prev,
      [reviewIndex]: text,
    }));
  };

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Generate star rating display
  const getStarDisplay = (rating) => {
    return "⭐".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  // Calculate average rating
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  useEffect(() => {
    checkBookAdded(readingListBooks);
  }, [readingListBooks]);

  useEffect(() => {
    if (book?.id) {
      fetchReviews();
    }
  }, [book]);

  const bookDescription = [
    { Format: "Paper Back" },
    { ISBN: book?.isbn || "N/A" },
    { Pages: "580" },
    { "Reading Time": "2 Hours" },
    { Dimension: "243x120mm" },
    { Published: book?.publicationYear || "N/A" },
    {
      Genre: Array.isArray(book?.genres)
        ? book.genres.join(", ")
        : book?.genres || "N/A",
    },
  ];

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
      <NavBar />
      <div className="h-screen grid grid-cols-[40%_60%]">
        {/* Left: Book Image (40%) - Fixed */}
        <div className="flex bg-white p-10 h-screen sticky top-0">
          <img
            src={getImageSrc(book?.coverImageUrl)}
            alt="Book"
            className="w-full object-contain"
          />
        </div>

        {/* Right: Book Details (60%) - Scrollable */}
        <div className="w-full flex flex-col h-screen overflow-y-auto overflow-x-hidden custom-scrollbar">
          <div className="mt-10">
            <h1 className="text-4xl font-bold mb-6 px-5">{book?.title}</h1>
            <p className="text-xl mb-2 px-5">
              Author:{" "}
              {Array.isArray(book?.authors)
                ? book.authors.join(", ")
                : book?.authors || "Unknown"}
            </p>
            <p className="text-xl mb-2 px-5">
              Genre:{" "}
              {Array.isArray(book?.genres)
                ? book.genres.join(", ")
                : book?.genres || "N/A"}
            </p>
            <p className="text-xl mb-2 px-5">Price: ₹499</p>
            <p className="text-xl mb-6 px-5">
              Rating:{" "}
              {getStarDisplay(book?.averageRating || calculateAverageRating())}(
              {calculateAverageRating()})
            </p>
            <p id="demo-radio-buttons-group-label" className="px-5">
              Choose preferred format
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
            <Button onClick={handleBuyNow} variant="contained">
              Buy Now
            </Button>
            <Button
              variant="outlined"
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              {isInCart ? "In Cart" : "Add to Cart"}
            </Button>
            <Button
              variant="outlined"
              startIcon={isAdded ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              onClick={handleAddToReadingList}
              className="reading-list-btn"
              sx={{
                borderColor: isAdded ? "#1976d2" : "rgba(0, 0, 0, 0.23)",
                color: isAdded ? "#1976d2" : "rgba(0, 0, 0, 0.87)",
                "&:hover": {
                  borderColor: "#1976d2",
                  backgroundColor: isAdded
                    ? "rgba(25, 118, 210, 0.08)"
                    : "transparent",
                },
              }}
            >
              {isAdded ? "In Reading List" : "Add to Reading List"}
            </Button>
          </div>

          <p className="mt-10 text-xl px-5">Book summary</p>
          <p className="mt-3 px-5 text-justify">
            {book?.summary || "No summary available for this book."}
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
              See what people think about {book?.title}
            </p>

            <div className="flex flex-row gap-3">
              <p>{calculateAverageRating()}</p>
              <p>{getStarDisplay(calculateAverageRating())}</p>
            </div>
            <p>{reviews.length} reviews</p>

            {/* Add Review Section */}
            <div className="mt-6 bg-white p-4 rounded-md">
              <p className="text-lg font-semibold mb-3">Write a Review</p>

              <div className="mb-3">
                <p className="mb-2">Rate this book:</p>
                <Rating
                  name="user-rating"
                  value={userRating}
                  onChange={(event, newValue) => {
                    setUserRating(newValue);
                  }}
                  size="large"
                />
              </div>

              <div className="mb-3">
                <p className="mb-2">Your Review:</p>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  rows="4"
                  placeholder="Share your thoughts about this book..."
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                />
              </div>

              <Button
                variant="contained"
                onClick={handleSubmitReview}
                disabled={
                  isSubmittingReview ||
                  !newReviewText.trim() ||
                  userRating === 0
                }
                className="bg-blue-500 hover:bg-blue-600"
              >
                {isSubmittingReview ? "Submitting..." : "Submit Review"}
              </Button>
            </div>

            {/* Reviews List */}
            <div className="px-4 py-3">
              {reviews.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No reviews yet. Be the first to review this book!</p>
                </div>
              ) : (
                reviews.map((review, index) => {
                  const currentInteraction = reviewInteractions[index] || {
                    liked: false,
                    disliked: false,
                  };
                  return (
                    <div key={review.reviewId} className="mb-6">
                      <div className="flex">
                        <div className="m-auto">
                          <SlOptionsVertical />
                        </div>
                        <div className="flex gap-4 mb-4 p-4 bg-white rounded-md shadow-sm w-190 review-card">
                          {/* User Avatar */}
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
                            {(review.username || review.userId || "U")
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          {/* Review content */}
                          <div className="flex flex-col flex-1 overflow-hidden">
                            <div className="flex justify-between items-start mb-2">
                              <p className="font-semibold">
                                {review.username || "Anonymous"}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDate(review.createdAt)}
                              </p>
                            </div>

                            <div className="flex items-center mb-2">
                              <Rating
                                value={review.rating}
                                readOnly
                                size="small"
                              />
                              <span className="ml-2 text-sm text-gray-600">
                                ({review.rating}/5)
                              </span>
                            </div>

                            <p className="text-gray-700 break-words whitespace-pre-wrap mb-3">
                              {review.reviewText}
                            </p>

                            {/* Like/Dislike/Reply buttons */}
                            <div className="flex gap-5 items-center text-xs">
                              <div className="flex items-center gap-1">
                                <SlLike
                                  className="hover:cursor-pointer transition-colors duration-200 like-btn p-1 rounded"
                                  size={15}
                                  fill={
                                    currentInteraction.liked
                                      ? "#22c55e"
                                      : "#6b7280"
                                  }
                                  style={{
                                    color: currentInteraction.liked
                                      ? "#22c55e"
                                      : "#6b7280",
                                  }}
                                  onClick={() =>
                                    handleLikeDislike(
                                      review.reviewId,
                                      index,
                                      "like"
                                    )
                                  }
                                />
                                <span className="text-gray-600">
                                  {review.likes || 0}
                                </span>
                              </div>

                              <div className="flex items-center gap-1">
                                <SlDislike
                                  className="hover:cursor-pointer transition-colors duration-200 dislike-btn p-1 rounded"
                                  size={15}
                                  fill={
                                    currentInteraction.disliked
                                      ? "#ef4444"
                                      : "#6b7280"
                                  }
                                  style={{
                                    color: currentInteraction.disliked
                                      ? "#ef4444"
                                      : "#6b7280",
                                  }}
                                  onClick={() =>
                                    handleLikeDislike(
                                      review.reviewId,
                                      index,
                                      "dislike"
                                    )
                                  }
                                />
                                <span className="text-gray-600">
                                  {review.dislikes || 0}
                                </span>
                              </div>

                              <button
                                className="hover:cursor-pointer hover:text-blue-600 transition-colors duration-200 text-gray-600"
                                onClick={() => handleReplyClick(index)}
                              >
                                Reply ({review.replies?.length || 0})
                              </button>
                            </div>

                            {/* Show existing replies */}
                            {review.replies && review.replies.length > 0 && (
                              <div className="mt-3 pl-4 border-l-2 border-gray-200">
                                {review.replies.map((reply, replyIndex) => (
                                  <div
                                    key={reply.id}
                                    className="mb-2 p-2 bg-gray-50 rounded"
                                  >
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-xs font-bold text-white">
                                        {(reply.userName || reply.userId || "U")
                                          .charAt(0)
                                          .toUpperCase()}
                                      </div>
                                      <span className="text-sm font-medium">
                                        {reply.userName || "Anonymous"}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        {formatDate(reply.createdAt)}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-700 pl-8">
                                      {reply.replyText}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Reply box */}
                      {replyStates[index] && (
                        <div className="reply-box ml-16 mr-4 bg-gray-50 p-4 rounded-md border-l-4 border-blue-400 mt-2">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                              {(localStorage.getItem("userName") || "U")
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <textarea
                                className="w-full border border-gray-300 rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                rows="3"
                                placeholder={`Reply to ${
                                  review.userName || "this review"
                                }...`}
                                value={replyTexts[index] || ""}
                                onChange={(e) =>
                                  handleReplyTextChange(index, e.target.value)
                                }
                              />
                              <div className="flex gap-2 mt-2">
                                <button
                                  className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
                                  onClick={() =>
                                    handleReplySubmit(review.reviewId, index)
                                  }
                                  disabled={!(replyTexts[index] || "").trim()}
                                >
                                  Post Reply
                                </button>
                                <button
                                  className="px-4 py-2 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400 transition-colors duration-200"
                                  onClick={() => handleReplyClick(index)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default BookDetail;
