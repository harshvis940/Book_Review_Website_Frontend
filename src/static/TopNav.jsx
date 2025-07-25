import { Link, useLocation } from "react-router-dom";

function TopNav() {
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", label: "Home" },
    { to: "/explore", label: "Explore" },
    { to: "/goals", label: "Goals" },
    { to: "/profile", label: "Profile" },
    { to: "/", label: "Login" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-zinc-100 shadow-md">
      <div className="max-w-7xl px-6">
        <ul className="flex justify-start gap-8 py-4 px-10">
          {navItems.map((item) => (
            <li key={item.to}>
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
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default TopNav;
