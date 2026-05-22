import { Link, useLocation } from "react-router-dom";

// ================= ICONS =================
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9.75L12 4l9 5.75V20a1 1 0 01-1 1h-5.25v-6h-5.5v6H4a1 1 0 01-1-1V9.75z" />
  </svg>
);

const ProductsIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7L12 3 4 7m16 0v10l-8 4m8-4-8-4m0 8-8-4V7m8 4V3" />
  </svg>
);

const AIIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
  </svg>
);

// ================= NAV ITEMS =================
const navItems = [
  { label: "Dashboard", path: "/", icon: <DashboardIcon /> },
  { label: "Products Catalog", path: "/products", icon: <ProductsIcon /> },
  { label: "AI Creative Studio", path: "/ai-tools", icon: <AIIcon /> },
];

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <aside className="fixed top-0 left-0 h-screen w-56 bg-[#060c18] border-r border-white/5 flex flex-col z-50 shadow-xl shadow-black/40">

      {/* LOGO */}
      <div className="h-16 flex items-center px-6 border-b border-white/5 bg-[#070e1b]/45">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow shadow-blue-500/20 text-sm">
            S
          </div>
          <span className="text-white font-extrabold text-sm tracking-wide font-outfit">
            SmartStore <span className="text-blue-400">AI</span>
          </span>
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition duration-300 border uppercase tracking-wider
                ${active
                  ? "bg-blue-600/10 text-blue-400 border-blue-500/25 shadow-md shadow-blue-500/5 font-extrabold"
                  : "text-gray-500 border-transparent hover:bg-white/5 hover:text-white"
                }`}
            >
              <span className={`transition duration-300 ${active ? "text-blue-400 scale-105" : "text-gray-500 group-hover:text-white"}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="p-5 border-t border-white/5 bg-[#070e1b]/20 flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">SmartStore AI</div>
          <div className="text-[10px] text-gray-400 font-bold">Stable Release</div>
        </div>
        <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold">v1.0.0</span>
      </div>
    </aside>
  );
};

export default Sidebar;
