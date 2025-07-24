import React from "react";
import { motion } from "framer-motion";

function BookCard({ index }) {
  return (
    <motion.div
      className="bg-zinc-100 px-10 py-5 w-80 h-110 self-center rounded-lg overflow-hidden shadow-md 
                    transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-zinc-200"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay: index * 0.05,
        ease: "easeOut",
      }}
    >
      <img
        src="https://m.media-amazon.com/images/I/61B0Z0Buu6L._SY522_.jpg"
        alt=""
        className="w-full h-70 object-contain rounded-md "
      />
      <div className="text-center space-y-2 mt-2">
        <p>Title</p>
        <p>Author</p>
        <p>Stars</p>
        <p>Price</p>
      </div>
    </motion.div>
  );
}

export default BookCard;
