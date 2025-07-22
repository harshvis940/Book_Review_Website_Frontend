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
    "https://m.media-amazon.com/images/I/61kRkfsIMUL._UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/61kRkfsIMUL._UF1000,1000_QL80_.jpg",
  ];

  return (
    <div className=" mx-20 my-5 ">
      <h1 className="text-bold">Newly Added Books</h1>

      <div className="grid grid-cols-3 gap-10">
        {data.map((val, key) => (
          <div className=" h-20 border-b-1 border-gray-400 w-95 px-2 py-2 mt-2 flex flex-row gap-5">
            <img src={val} className="w-20 h-full object-center" />
            <div className="flex flex-col">
              <h1>Tile Text</h1>
              <h1>Author Text</h1>
              <h1>Stars</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewBooks;
