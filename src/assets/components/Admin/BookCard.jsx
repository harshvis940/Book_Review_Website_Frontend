import React from "react";
import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";

function BookCard({ index, book }) {
  console.log(book);
  const navigate = useNavigate();
  const handleBookClick = () => {
    console.log("Here");
    navigate("/bookDetail", { state: { book: book } });
  };
  return (
    <motion.div
      className="bg-zinc-100 px-10 py-5 w-55 h-80 self-center rounded-lg overflow-hidden shadow-md 
                    transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-zinc-200"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      onClick={handleBookClick}
    >
      <img
        src="https://m.media-amazon.com/images/I/61B0Z0Buu6L._SY522_.jpg"
        alt=""
        className="w-full h-40 object-contain rounded-md "
      />
      <div className="text-center space-y-2 mt-2">
        <p>{book.title}</p>
        <p>{book.authors.map((val, key) => val + " ")}</p>
      </div>
    </motion.div>
  );
}

export default BookCard;
