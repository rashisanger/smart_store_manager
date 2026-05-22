import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-10.5z"
        />
      </svg>
    ),
  },

  {
    label: "Products",
    path: "/products",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 7L12 3 4 7m16 0v10l-8 4m8-14l-8 4m-8-4v10l8 4m0-10v10"
        />
      </svg>
    ),
  },

  {
    label: "AI Tools",
    path: "/ai-tools",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3zm6 12l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9L18 15zM6 15l.9 2.1L9 18l-2.1.9L6 21l-.9-2.1L3 18l2.1-.9L6 15z"
        />
      </svg>
    ),
  },
];

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <aside className="fixed top-16 left-0 bottom-0 w-64 bg-[#111827]/95 backdrop-blur-md border-r border-[#1F2937] flex flex-col justify-between z-40">
      <div>
        <div className="px-6 py-5">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
            Navigation
          </p>
        </div>

        <nav className="px-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items - center gap - 3 px - 4 py - 3 rounded - 2xl mb - 2 transition - all duration - 200 text - sm font - medium ${
    isActive(item.path)
        ? "bg-blue-600 text-white shadow-lg"
        : "text-gray-400 hover:bg-[#1F2937] hover:text-white"
} `}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="px-6 py-5 border-t border-[#1F2937]">
        <p className="text-xs text-gray-500">
          SmartStore AI v1.0.0
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;

