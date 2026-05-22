import { Link, useLocation } from "react-router-dom";

// ================= ICONS =================

const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeWidth={2} d="M3 9.75L12 4l9 5.75V20a1 1 0 01-1 1h-5.25v-6h-5.5v6H4a1 1 0 01-1-1V9.75z" />
  </svg>
);

const ProductsIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeWidth={2} d="M20 7L12 3 4 7m16 0v10l-8 4m8-4-8-4m0 8-8-4V7m8 4V3" />
  </svg>
);

const AIIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeWidth={2} d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
  </svg>
);

// ================= NAV ITEMS =================

const navItems = [
  { label: "Dashboard", path: "/", icon: <DashboardIcon /> },
  { label: "Products", path: "/products", icon: <ProductsIcon /> },
  { label: "AI Tools", path: "/ai-tools", icon: <AIIcon /> },
];

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <aside className="fixed top-0 left-0 h-screen w-56 bg-[#081225] border-r border-white/10 flex flex-col z-50">

      {/* LOGO */}
      <div className="h-16 flex items-center px-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold">
            S
          </div>
          <span className="text-white font-semibold">
            SmartStore <span className="text-blue-400">AI</span>
          </span>
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 py-5 space-y-2">
        {navItems.map((item) => {
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                ${active
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-white/10">
        <div className="text-xs text-gray-400">SmartStore AI</div>
        <div className="text-sm text-white font-semibold">v1.0.0</div>
      </div>
    </aside>
  );
};

export default Sidebar;