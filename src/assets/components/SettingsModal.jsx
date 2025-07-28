import React from "react";
import { CiUser } from "react-icons/ci";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { MdHelpOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SettingsModal({ admin }) {
  const navigate = useNavigate();

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
  };

  const handleLogout = () => {
    const confirmLogout = () => {
      toast.dismiss(); // Dismiss confirmation toast

      // Show logging out message
      toast.info("Logging out...", {
        position: "top-right",
        autoClose: 1000,
      });

      setTimeout(() => {
        // Clear storage
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        sessionStorage.clear();

        // Show success and navigate
        toast.success("Logged out successfully!", {
          position: "top-right",
          autoClose: 1500,
        });

        setTimeout(() => {
          navigate("/", { replace: true });
        }, 500);
      }, 500);
    };

    // Show confirmation toast
    toast.warn(
      <div>
        <p className="mb-2">Are you sure you want to logout?</p>
        <div className="flex gap-2">
          <button
            onClick={confirmLogout}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
          >
            Yes, Logout
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        closeButton: false,
      }
    );
  };

  const handleClick = (e) => {
    const label = e.currentTarget.getAttribute("data-label");

    if (label === "Logout") {
      handleLogout();
      return;
    }

    const path = navigateMap[label];
    if (typeof path === "string") {
      navigate(path);
    }
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
