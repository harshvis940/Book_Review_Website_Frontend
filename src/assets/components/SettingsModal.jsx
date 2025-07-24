import React from "react";
import { CiUser } from "react-icons/ci";
import { FiSettings } from "react-icons/fi";
import { MdHelpOutline } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function SettingsModal({ admin }) {
  const navigate = useNavigate();

  // Show all options if not admin, only "Logout" if admin
  const data = admin
    ? [{ text: "Logout" }]
    : [
        { text: "Edit Profile" },
        { text: "Settings" },
        { text: "Help" },
        { text: "Logout" },
      ];

  const iconMap = {
    "Edit Profile": <CiUser className="mr-2" />,
    Settings: <FiSettings className="mr-2" />,
    Help: <MdHelpOutline className="mr-2" />,
    Logout: <FiLogOut className="mr-2" />,
  };

  const navigateMap = {
    "Edit Profile": "/profile",
    Settings: "/settings",
    Help: "/help",
    Logout: "/logout", // You can also handle logout logic here
  };

  const handleClick = (e) => {
    const label = e.currentTarget.getAttribute("data-label");
    if (label === "Logout") {
      // Optionally clear token here
      localStorage.removeItem("token");
    }
    navigate(navigateMap[label]);
  };

  return (
    <div className="fixed z-50 inset-0 bg-heading2 shadow-md w-70 h-80 left-285 top-20">
      {data.map((item) => (
        <div
          key={item.text}
          onClick={handleClick}
          data-label={item.text}
          className="flex items-center p-2 hover:bg-zinc-200 cursor-pointer"
        >
          {iconMap[item.text]}
          <h2>{item.text}</h2>
        </div>
      ))}
    </div>
  );
}

export default SettingsModal;
