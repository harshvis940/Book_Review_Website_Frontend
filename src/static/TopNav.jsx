import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { to: "/dashboard", label: "Home" },
    { to: "/explore", label: "Explore" },
    { to: "/goals", label: "Goals" },
    { to: "/profile", label: "Profile" },
    { to: "logout", label: "Logout", isLogout: true },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = (e) => {
    e.preventDefault();

    // Create a custom confirmation toast
    const confirmLogout = () => {
      toast.dismiss(); // Dismiss all toasts

      toast.info("Logging out...", {
        position: "top-right",
        autoClose: 1500,
      });

      setTimeout(() => {
        // Clear all stored data
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        sessionStorage.clear();

        toast.success("Logged out successfully!", {
          position: "top-right",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/", { replace: true });
        }, 500);
      }, 1000);
    };

    // Show confirmation toast with custom buttons
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

  return (
    <nav className="bg-zinc-100 shadow-md">
      <div className="max-w-7xl px-6">
        <ul className="flex justify-start gap-8 py-4 px-10">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.isLogout ? (
                <button
                  onClick={handleLogout}
                  className={`
                    px-4  rounded-lg font-medium text-sm transition-all duration-200 ease-in-out
                    text-gray-700 hover:text-red-600 hover:bg-red-50 cursor-pointer
                  `}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  to={item.to}
                  className={`
                    px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ease-in-out
                    ${
                      isActive(item.to)
                        ? "text-black underline transform -translate-y-0.5"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }
                  `}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default TopNav;
