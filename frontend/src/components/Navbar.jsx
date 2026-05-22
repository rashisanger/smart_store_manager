
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
      .slice(0, 2);
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
      border-white/10
      bg-[#081225]/80
      backdrop-blur-xl
      flex
      items-center
      justify-between
      px-8
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <div
          className="
          w-10
          h-10
          rounded-xl
          bg-gradient-to-br
          from-blue-500
          to-blue-700
          flex
          items-center
          justify-center
          shadow-lg
          shadow-blue-500/30
          "
        >
          <span className="text-white font-bold text-lg">
            S
          </span>
        </div>

        <div>
          <h1 className="text-lg font-bold text-white tracking-wide">
            SmartStore
            <span className="text-blue-400">
              {" "}AI
            </span>
          </h1>

          <p className="text-xs text-gray-400">
            AI Commerce Dashboard
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        {/* USER INFO */}
        <div
          className="
          flex
          items-center
          gap-3
          bg-white/5
          border
          border-white/10
          px-4
          py-2
          rounded-2xl
          "
        >
          {/* AVATAR */}
          <div
            className="
            w-11
            h-11
            rounded-full
            bg-gradient-to-br
            from-blue-500
            to-indigo-600
            flex
            items-center
            justify-center
            text-white
            font-bold
            shadow-lg
            shadow-blue-500/30
            "
          >
            {getInitials(user?.name)}
          </div>

          {/* NAME */}
          <div className="leading-tight">
            <h3 className="text-sm font-semibold text-white">
              {user?.name || "Admin User"}
            </h3>

            <p className="text-xs text-gray-400">
              Administrator
            </p>
          </div>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="
          px-4
          py-2
          rounded-xl
          bg-red-500/10
          border
          border-red-500/20
          text-red-400
          hover:bg-red-500
          hover:text-white
          transition-all
          duration-300
          hover:scale-105
          "
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
