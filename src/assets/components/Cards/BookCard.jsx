import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../static/DefaultExports";

function BookCard({ book }) {
  console.log(book);
  return (
    <div
      key={book.id}
      className="h-fit w-70 bg-white border-1 border-gray-400 rounded-lg shadow-xs overflow-hidden"
      onClick={() => handleBookClick(book)}
    >
      <img
        src={getImageSrc(book.coverImageURL)}
        alt={book.title}
        className="w-60 h-80 mt-3 object-center rounded-lg shadow-md z-10 flex justify-self-center"
        onError={(e) => {
          // Fallback image if base64 fails to load
          e.target.src =
            "https://s3.ap-south-1.amazonaws.com/storage.commonfolks.in/docs/products/images_full/the-power-of-your-subconscious-mind-pen-bird_FrontImage_335.gif";
        }}
      />
      <div className="text-sm text-center space-y-1 mt-2 mb-2">
        <h2>{book.title || "Title Not Available"}</h2>
        <h2>
          {book.authors && book.authors.length > 0
            ? book.authors.join(", ")
            : "Unknown Author"}
        </h2>
        <h2>{book.price ? `₹${book.price}` : "Price Not Available"}</h2>
        <h2>
          {book.ratings && book.ratings.length > 0
            ? `${book.ratings[0]} Stars`
            : "No ratings"}
        </h2>
      </div>
    </div>
  );
}

export default BookCard;
