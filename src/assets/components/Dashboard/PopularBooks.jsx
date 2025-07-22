import React from "react";

function PopularBooks() {
  const data = [1, 2, 3, 4, 5, 6];

  return (
    <div className=" mx-20 my-5 overflow-hidden rounded-lg">
      <div className="flex justify-between">
        <h2>Popular Now</h2>
        <h4>View all {">"}</h4>
      </div>

      <div className="mt-5 bg-white flex flex-row gap-5 flex-wrap">
        {data.map((val) => (
          <div className="h-fit w-100 bg-white border-1 border-gray-400 rounded-lg shadow-xs overflow-hidden">
            <img
              src="https://s3.ap-south-1.amazonaws.com/storage.commonfolks.in/docs/products/images_full/the-power-of-your-subconscious-mind-pen-bird_FrontImage_335.gif"
              alt=""
              className="w-90 h-80 mt-3 object-center rounded-lg shadow-md z-10 flex justify-self-center"
            />
            <div className="text-sm text-center space-y-1 mt-2 mb-2">
              <h2>Title</h2>
              <h2>Author</h2>
              <h2>Price</h2>
              <h2>Stars</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularBooks;
