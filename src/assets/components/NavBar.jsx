import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import TopNav from "../../static/TopNav";
import SettingsModal from "./SettingsModal";
import { useNavigate } from "react-router-dom";

function NavBar({ btnText, admin }) {
  const [settings, setSettingsModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    setSettingsModal((prev) => !prev);
  };

  const handleAdminClick = () => {
    btnText === "admin"
      ? navigate("/admin", { replace: true })
      : navigate("/dashboard", { replace: true });
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/notifications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  // useEffect(() => {
  //   if (!admin) fetchNotifications(); // Reader fetches notifications

  //   const interval = setInterval(() => {
  //     if (!admin) fetchNotifications();
  //   }, 15000); // poll every 15s

  //   return () => clearInterval(interval);
  // }, [admin]);

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <>
      <div className="bg-zinc-100 flex flex-row justify-between h-20 px-6 shadow-sm relative z-20">
        <div className="w-100 py-7">
          <h1 className="text-xl font-roboto">Book Store</h1>
        </div>

        <div className="flex flex-row justify-center items-center gap-5">
          <Button onClick={handleAdminClick} variant="outlined">
            Switch to {btnText === "Reader" ? "Reader" : "Admin"}
          </Button>

          {!admin && <CiShoppingCart size={30} />}

          {/* Reader sees notification icon */}
          {!admin && (
            <div className="relative">
              <IoIosNotificationsOutline
                size={30}
                className="cursor-pointer"
                onClick={toggleNotifications}
              />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1.5 text-xs">
                  {notifications.length}
                </span>
              )}

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded-md z-30 p-2">
                  <h4 className="font-semibold text-sm mb-2">Notifications</h4>
                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-500">No notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className="border-b last:border-b-0 py-2 text-sm"
                      >
                        📘 {n.message}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          <div
            className="flex flex-row justify-center items-center gap-2 cursor-pointer"
            onClick={handleSettingsClick}
          >
            <CiUser size={40} className="bg-gray-200 rounded-full px-2" />
            <h3>User 1</h3>
            <IoChevronDown size={30} />
          </div>
        </div>
      </div>

      <TopNav />

      {settings && (
        <SettingsModal admin={admin} handleClick={handleSettingsClick} />
      )}
    </>
  );
}

export default NavBar;
