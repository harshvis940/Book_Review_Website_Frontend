export const API_BASE_URL = "http://localhost:8080";

export const getImageSrc = (coverImageUrl) => {
  if (!coverImageUrl) {
    return "https://s3.ap-south-1.amazonaws.com/storage.commonfolks.in/docs/products/images_full/the-power-of-your-subconscious-mind-pen-bird_FrontImage_335.gif";
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
  return `data:image/jpeg;base64,${coverImageUrl}`;
};

// Generate star rating display
export const getStarDisplay = (rating = 3) => {
  return "⭐".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
};

// Calculate average rating
export const calculateAverageRating = (reviews) => {
  console.log(reviews);
  if (reviews.length === 0) return 0;
  const sum = reviews.ratings.reduce((acc, review) => acc + review?.ratings, 0);
  return (sum / reviews.length).toFixed(1);
};
