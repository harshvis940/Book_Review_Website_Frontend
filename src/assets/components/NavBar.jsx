import React, { useState } from "react";
import Button from "@mui/material/Button";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import TopNav from "../../static/TopNav";
import SettingsModal from "./SettingsModal";
function NavBar() {
  const [settings, setSettingsModal] = useState(false);
  const handleSettingsClick = () => {
    console.log("Clicked");
    setSettingsModal((prev) => !prev);
  };
  return (
    <>
      <div className="bg-zinc-100 shadow:md flex flex-row justify-evenly h-20 justify-items-stretch bg-white">
        <div className="w-100 py-7 px-20 items-center">
          <h1 className="text-xl justify-self-start">Book Store</h1>
        </div>

        <div className="w-full flex items-center">
          <input
            className="w-full h-10 border-1 rounded-lg px-2"
            type="search"
            placeholder="Search for books"
          />
        </div>

        <div className="w-full flex flex-row justify-center items-center gap-5">
          <Button variant="outlined">Switch to writer</Button>
          <CiShoppingCart size={30} />
          <IoIosNotificationsOutline size={30} />
          <div
            className="flex flex-row justify-center items-center gap-2"
            onClick={handleSettingsClick}
          >
            <CiUser size={40} className="bg-gray-200 rounded-full px-2" />
            <h3>User 1</h3>
            <IoChevronDown size={30} />
          </div>
        </div>
      </div>

      <div className="">
        <TopNav />
      </div>

      {settings && <SettingsModal handleClick={handleSettingsClick} />}
    </>
  );
}

export default NavBar;
