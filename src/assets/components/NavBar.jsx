import React, { useState } from "react";
import Button from "@mui/material/Button";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import TopNav from "../../static/TopNav";
import SettingsModal from "./SettingsModal";
import { useNavigate } from "react-router-dom";
function NavBar({ btnText, admin }) {
  const [settings, setSettingsModal] = useState(false);
  const navigate = useNavigate();
  const handleSettingsClick = () => {
    console.log("Clicked");
    setSettingsModal((prev) => !prev);
  };

  const handleAdminClick = () => {
    console.log("Done");
    navigate("/admin", { replace: true });
  };
  return (
    <>
      <div className="bg-zinc-100 shadow:md flex flex-row justify-between h-20 justify-items-stretch bg-white">
        <div className="w-100 py-7 px-20 items-center">
          <h1 className="text-xl justify-self-start">Book Store</h1>
        </div>
        {/* 
        <div className="w-full flex items-center">
          <input
            className="w-full h-10 border-1 rounded-lg px-2"
            type="search"
            placeholder="Search for books"
          />
        </div> */}

        <div className="w-full flex flex-row justify-center items-center gap-5">
          <Button onClick={handleAdminClick} variant="outlined">
            Switch to {btnText === "Reader" ? "Reader" : "Writer"}
          </Button>
          {!admin && <CiShoppingCart size={30} />}

          {!admin && <IoIosNotificationsOutline size={30} />}
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

      {settings && (
        <SettingsModal admin={admin} handleClick={handleSettingsClick} />
      )}
    </>
  );
}

export default NavBar;
