import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import NavBar from "../assets/components/NavBar";
import Button from "@mui/material/Button";
import Recommended from "../assets/components/Dashboard/Recommended";
import PopularBooks from "../assets/components/Dashboard/PopularBooks";
import BestSellingBooks from "../assets/components/Dashboard/BestSellingBooks";
import NewBooks from "../assets/components/Dashboard/NewBooks";

function Dashboard() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Recommended />
      {/* <PopularBooks /> */}
      <BestSellingBooks />
      <NewBooks />
    </div>
  );
}

export default Dashboard;
