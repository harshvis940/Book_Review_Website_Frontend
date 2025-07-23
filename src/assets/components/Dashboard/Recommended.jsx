import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
function Recommended() {
  const images = [
    "https://m.media-amazon.com/images/I/81BE7eeKzAL._UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/610mObHZ-JL.jpg",
    "https://www.jaicobooks.com/wp-content/uploads/2022/12/j-2775-the-power-of-your-subconscious-mind-joseph-murphy.jpg",
  ];

  const navigate = useNavigate();

  const handleBookClick = (img) => {
    navigate("/bookDetail", { state: { img } });
  };

  return (
    <div className="bg-red-200 mx-20 my-5 h-100 overflow-hidden rounded-lg">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        //   navigation
        pagination={{ clickable: true }}
        speed={1000}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="rounded-lg shadow-md"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            {/* <h3 className="text-lg fixed ml-10 mt-5">Recommended for you</h3> */}
            <div
              onClick={() => handleBookClick(img)}
              className="flex justify-center rounded-md overflow-hidden mt-10"
            >
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-100 rounded-lg h-100  overflow-hidden object-contain rounded-lg"
              />

              <div className="flex flex-col gap-5">
                <h1>Title text</h1>
                <h1>Author text</h1>
                <h1>Price Rs</h1>
                <h1>stars</h1>
                <h1>Genre</h1>
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
