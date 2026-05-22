
import { Link, useLocation } from "react-router-dom";

// ================= ICONS =================

const DashboardIcon = () => (
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
      d="M3 9.75L12 4l9 5.75V20a1 1 0 01-1 1h-5.25v-6h-5.5v6H4a1 1 0 01-1-1V9.75z"
    />
  </svg>
);

const ProductsIcon = () => (
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
      d="M20 7L12 3 4 7m16 0v10l-8 4m8-4-8-4m0 8-8-4V7m8 4V3"
    />
  </svg>
);

const AIIcon = () => (
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
      d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"
    />
  </svg>
);

// ================= NAV ITEMS =================

const navItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: <DashboardIcon />,
  },
  {
    label: "Products",
    path: "/products",
    icon: <ProductsIcon />,
  },
  {
    label: "AI Tools",
    path: "/ai-tools",
    icon: <AIIcon />,
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
    <aside
      className="
      fixed
      top-0
      left-0
      bottom-0
      w-56
      z-50
      bg-[#081225]/90
      backdrop-blur-xl
      border-r
      border-white/10
      flex
      flex-col
      "
    >
      {/* LOGO */}
      <div
        className="
        h-16
        border-b
        border-white/10
        flex
        items-center
        px-6
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
            w-10
            h-10
            rounded-xl
            bg-gradient-to-br
            from-blue-500
            to-indigo-600
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
            <h1 className="text-lg font-bold text-white">
              SmartStore
              <span className="text-blue-400">
                {" "}AI
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="flex-1 overflow-y-auto py-6">
        <p
          className="
          px-6
          mb-4
          text-xs
          font-semibold
          tracking-[0.2em]
          uppercase
          text-gray-500
          "
        >
          Navigation
        </p>

        <nav className="space-y-2 px-3">
          {navItems.map((item) => {
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
flex
items - center
gap - 3
px - 4
py - 3
rounded - 2xl
text - sm
font - medium
transition - all
duration - 300
                  
                  ${
    active
        ? `
                        bg-blue-600/20
                        border
                        border-blue-500/20
                        text-blue-400
                        shadow-lg
                        shadow-blue-500/10
                      `
        : `
                        text-gray-400
                        hover:bg-white/5
                        hover:text-white
                      `
}
`}
              >
                {item.icon}

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* FOOTER */}
      <div
        className="
        border-t
        border-white/10
        p-5
        "
      >
        <div
          className="
          bg-white/5
          border
          border-white/10
          rounded-2xl
          p-4
          "
        >
          <p className="text-xs text-gray-400 mb-1">
            SmartStore AI
          </p>

          <h3 className="text-sm font-semibold text-white">
            Version 1.0.0
          </h3>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

