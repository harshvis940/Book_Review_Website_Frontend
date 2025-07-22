import React from "react";

function NewBooks() {
  const data = [
    "https://m.media-amazon.com/images/I/61kRkfsIMUL._UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/61kRkfsIMUL._UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/61kRkfsIMUL._UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/61kRkfsIMUL._UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/61kRkfsIMUL._UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/61kRkfsIMUL._UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/61kRkfsIMUL._UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/61kRkfsIMUL._UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/61kRkfsIMUL._UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/61kRkfsIMUL._UF1000,1000_QL80_.jpg",
  ];

  return (
    <div className=" mx-20 my-5 bg-red-200 ">
      <h1>Newly Added Books</h1>

      <div className="grid grid-cols-3 gap-0">
        {data.map((val, key) => (
          <div className="bg-zinc-100 h-20 border-1 w-100">
            <img src={val} className="w-20 h-full object-center" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewBooks;
