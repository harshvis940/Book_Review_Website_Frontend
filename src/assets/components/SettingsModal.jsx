import React from "react";
import { CiUser } from "react-icons/ci";
import { FiSettings } from "react-icons/fi";
import { MdHelpOutline } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

function SettingsModal({ handleClick }) {
  const data = [
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

  return (
    <div className="fixed z-50 inset-0 bg-heading2 shadow-md w-70 h-80 left-285 top-20">
      {data.map((val, key) => (
        <div
          key={key}
          className="flex items-center p-2 hover:bg-zinc-200 cursor-pointer"
        >
          {iconMap[val.text]}
          <h2>{val.text}</h2>
        </div>
      ))}
    </div>
  );
}

export default SettingsModal;
