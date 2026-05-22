
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#111827]/95 backdrop-blur-md border-b border-[#1F2937] z-50 flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center">
        <h1 className="text-2xl font-bold tracking-wide text-white">
          SmartStore
          <span className="text-blue-400"> AI</span>
        </h1>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold shadow-lg">
            {getInitials(user?.name)}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white">
              {user?.name || "User"}
            </p>

            <p className="text-xs text-gray-400">
              {user?.role || "Admin"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-[#1F2937] hover:bg-[#374151] text-gray-300 hover:text-white text-sm font-medium transition-all duration-200 border border-[#2A3547]"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;

