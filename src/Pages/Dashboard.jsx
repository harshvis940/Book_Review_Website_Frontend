import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import NavBar from "../assets/components/NavBar";
import Button from "@mui/material/Button";
import Recommended from "../assets/components/Dashboard/Recommended";
import PopularBooks from "../assets/components/Dashboard/PopularBooks";
import BestSellingBooks from "../assets/components/Dashboard/BestSellingBooks";
import NewBooks from "../assets/components/Dashboard/NewBooks";
import { useEffect, useState } from "react";

function Dashboard() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);
  return (
    <div
      className={`min-h-screen transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <NavBar btnText={"admin"} />
      <Recommended />
      {/* <PopularBooks /> */}
      <BestSellingBooks />
      <NewBooks />
    </div>
  );
}

export default Dashboard;
