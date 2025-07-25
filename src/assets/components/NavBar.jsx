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
    btnText === "admin"
      ? navigate("/admin", { replace: true })
      : navigate("/dashboard", { replace: true });
  };
  return (
    <>
      <div className="bg-zinc-100 flex flex-row justify-between h-20">
        <div className="w-100 py-7 px-20 items-center">
          <h1 className="text-xl justify-self-start font-roboto">Book Store</h1>
        </div>

        <div className="w-150 flex flex-row justify-center items-center gap-5">
          <Button onClick={handleAdminClick} variant="outlined">
            Switch to {btnText === "Reader" ? "Reader" : "Admin"}
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
