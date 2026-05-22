import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // USER INITIALS
  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "AD";
  };

  return (
    <header
      className="
      fixed
      top-0
      left-56
      right-0
      h-16
      z-40
      border-b
      border-white/5
      bg-[#020817]/65
      backdrop-blur-xl
      flex
      items-center
      justify-between
      px-8
      shadow-sm
      "
    >
      {/* LEFT BRAND CORNER IN NAVBAR */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-[#0a1224] border border-white/5 px-3 py-1 rounded-full text-xs text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          <span>Admin Portal</span>
        </div>
      </div>

      {/* RIGHT CONTROLS */}
      <div className="flex items-center gap-5">

        {/* USER PROFILE INFO PANEL */}
        <div
          className="
          flex
          items-center
          gap-3
          bg-white/5
          border
          border-white/5
          px-3
          py-1.5
          rounded-2xl
          "
        >
          {/* AVATAR GAUGE */}
          <div
            className="
            w-9
            h-9
            rounded-xl
            bg-gradient-to-tr
            from-blue-500
            to-indigo-600
            flex
            items-center
            justify-center
            text-white
            font-bold
            text-xs
            shadow-md
            shadow-blue-500/10
            "
          >
            {getInitials(user?.name)}
          </div>

          {/* PROFILE TEXT */}
          <div className="leading-tight">
            <h3 className="text-xs font-bold text-white font-outfit">
              {user?.name || "Admin Manager"}
            </h3>
            <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
              {user?.role || "Administrator"}
            </p>
          </div>
        </div>

        {/* LOGOUT SECURE ACTION */}
        <button
          onClick={handleLogout}
          className="
          px-4
          py-2
          rounded-xl
          bg-red-500/10
          border
          border-red-500/10
          text-red-400
          hover:bg-red-500
          hover:text-white
          transition-all
          duration-300
          text-xs
          font-bold
          shadow-sm
          "
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Navbar;
