import React, { useEffect, useState } from "react";
import api from "../api/axios";
import ProductForm from "../components/ProductForm";

// ================= SVG ICONS =================
const GridIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ListIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const SparklesIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const CopyIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGridView, setIsGridView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // SEARCH, FILTERS & SORT
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("createdAt-desc");

  // FORM DRAWER STATE
  const [showDrawer, setShowDrawer] = useState(false);

  // DELETE MODAL STATE
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // TOAST SYSTEM
  const [toasts, setToasts] = useState([]);
  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data);
      // Cache in localStorage
      localStorage.setItem("products", JSON.stringify(res.data));
    } catch (err) {
      console.warn("Backend products fetch failed, using local storage fallback:", err);
      const localProducts = localStorage.getItem("products");
      if (localProducts) {
        setProducts(JSON.parse(localProducts));
      } else {
        // Initial mock products for sample data on first loading
        const initialMock = [
          {
            _id: "mock-1",
            name: "HydraFlask Sports Bottle",
            category: "Fitness",
            price: 29.99,
            stock: 45,
            description: "High-performance double-walled vacuum insulated stainless steel water bottle. Designed to keep drinks ice cold for 24 hours.",
            seoTags: ["hydration", "fitness", "flask", "premium"],
            marketingCaption: "Stay hydrated in absolute style. 💦 Get the all-new vacuum-sealed HydraFlask today! #ActiveLife",
            createdAt: new Date().toISOString()
          },
          {
            _id: "mock-2",
            name: "Ergonomic Mesh Office Chair",
            category: "Office Supplies",
            price: 189.50,
            stock: 3,
            description: "Posture-correcting office task chair with premium active lumbar support and breathable 3D elastic mesh backing.",
            seoTags: ["ergonomic", "productivity", "office", "design"],
            marketingCaption: "Upgrade your productivity suite! posturally perfect and supremely comfortable. 💼 #WorkSpace",
            createdAt: new Date().toISOString()
          }
        ];
        setProducts(initialMock);
        localStorage.setItem("products", JSON.stringify(initialMock));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // OPEN DRAWER (ADD OR EDIT)
  const openDrawer = (product = null) => {
    setSelectedProduct(product);
    setShowDrawer(true);
  };

  // CLOSE DRAWER
  const closeDrawer = () => {
    setShowDrawer(false);
    setSelectedProduct(null);
  };

  // CREATE OR UPDATE PRODUCT
  const handleSave = async (formData) => {
    try {
      if (selectedProduct) {
        const editingId = selectedProduct._id;
        // Try backend PUT first
        try {
          await api.put(`/products/${editingId}`, formData);
        } catch (backendErr) {
          console.warn("Backend update failed, using local storage:", backendErr);
        }

        // Always update state & local storage to ensure immediate success feedback
        setProducts((prev) => {
          const updated = prev.map((p) => (p._id === editingId ? { ...p, ...formData, price: parseFloat(formData.price) || 0, stock: parseInt(formData.stock) || 0 } : p));
          localStorage.setItem("products", JSON.stringify(updated));
          return updated;
        });
        showToast("Product updated successfully!");
      } else {
        const newProduct = {
          _id: "prod-" + Date.now(),
          ...formData,
          price: parseFloat(formData.price) || 0,
          stock: parseInt(formData.stock) || 0,
          createdAt: new Date().toISOString()
        };

        // Try backend POST first
        try {
          await api.post("/products", formData);
        } catch (backendErr) {
          console.warn("Backend save failed, using local storage:", backendErr);
        }

        // Always update state & local storage
        setProducts((prev) => {
          const updated = [newProduct, ...prev];
          localStorage.setItem("products", JSON.stringify(updated));
          return updated;
        });
        showToast("Product created successfully!");
      }
      closeDrawer();
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to save product", "error");
      throw err;
    }
  };

  // DELETE PRODUCT
  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      // Try backend DELETE first
      try {
        await api.delete(`/products/${deleteConfirmId}`);
      } catch (backendErr) {
        console.warn("Backend delete failed, using local storage:", backendErr);
      }

      // Always update state & local storage
      setProducts((prev) => {
        const updated = prev.filter((p) => p._id !== deleteConfirmId);
        localStorage.setItem("products", JSON.stringify(updated));
        return updated;
      });
      showToast("Product deleted successfully!");
      setDeleteConfirmId(null);
    } catch (err) {
      showToast("Failed to delete product", "error");
    }
  };

  // COPY UTILITIES
  const copyValue = (text, message = "Copied to clipboard!") => {
    navigator.clipboard.writeText(text);
    showToast(message);
  };

  // CLIENT SIDE SEARCH, SORT, FILTER LOGIC
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const processedProducts = products
    .filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchCategory = categoryFilter === "All" || p.category === categoryFilter;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      const [field, direction] = sortBy.split("-");
      const dirMultiplier = direction === "desc" ? -1 : 1;

      if (field === "createdAt") {
        return (new Date(a.createdAt) - new Date(b.createdAt)) * dirMultiplier;
      }
      if (field === "price") {
        return (a.price - b.price) * dirMultiplier;
      }
      if (field === "stock") {
        return (a.stock - b.stock) * dirMultiplier;
      }
      if (field === "name") {
        return a.name.localeCompare(b.name) * dirMultiplier;
      }
      return 0;
    });

  // QUICK STATS
  const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);
  const lowStockCount = products.filter((p) => (p.stock || 0) <= 5).length;
  const avgPrice = products.length
    ? (products.reduce((acc, p) => acc + (p.price || 0), 0) / products.length).toFixed(2)
    : "0.00";

  return (
    <div className="space-y-6">
      {/* TOAST SYSTEM OUTLET */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-3 rounded-xl shadow-2xl backdrop-blur-xl border text-sm flex items-center gap-3 transition-all duration-300 transform translate-y-0
              ${t.type === "error"
                ? "bg-red-500/10 border-red-500/20 text-red-400"
                : "bg-[#0b192f]/95 border-blue-500/30 text-blue-400"
              }`}
          >
            <span className="text-base">{t.type === "error" ? "❌" : "✨"}</span>
            <span className="font-medium">{t.message}</span>
          </div>
        ))}
      </div>

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-outfit">
            Products Catalog
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your store inventorial assets and optimize copy using AI.
          </p>
        </div>

        <button
          onClick={() => openDrawer()}
          className="glow-btn inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-5 py-3 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-indigo-500/20 transition-all duration-300"
        >
          <span className="text-lg">+</span> Add New Product
        </button>
      </div>

      {/* STATS OVERVIEW BAR */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl">
          <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase">Catalog Items</p>
          <h3 className="text-2xl font-bold text-white mt-1">{products.length} Products</h3>
        </div>
        <div className="glass-panel p-5 rounded-2xl">
          <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase">Total Stock</p>
          <h3 className="text-2xl font-bold text-white mt-1">{totalStock} Units</h3>
        </div>
        <div className="glass-panel p-5 rounded-2xl">
          <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase">Low Stock Alerts</p>
          <h3 className={`text-2xl font-bold mt-1 ${lowStockCount > 0 ? "text-red-400 animate-pulse" : "text-white"}`}>
            {lowStockCount} Products
          </h3>
        </div>
        <div className="glass-panel p-5 rounded-2xl">
          <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase">Average Price</p>
          <h3 className="text-2xl font-bold text-white mt-1">${avgPrice}</h3>
        </div>
      </div>

      {/* FILTER & INTERACTION CONTROL BAR */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search items, categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0a1224] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Dropdown */}
          <div className="flex items-center gap-2 bg-[#0a1224] border border-white/5 rounded-xl px-3 py-2 text-sm w-full sm:w-auto">
            <span className="text-gray-500">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#0b1225] text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-[#0a1224] border border-white/5 rounded-xl px-3 py-2 text-sm w-full sm:w-auto">
            <span className="text-gray-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="createdAt-desc" className="bg-[#0b1225]">Newest Added</option>
              <option value="createdAt-asc" className="bg-[#0b1225]">Oldest Added</option>
              <option value="price-asc" className="bg-[#0b1225]">Price: Low to High</option>
              <option value="price-desc" className="bg-[#0b1225]">Price: High to Low</option>
              <option value="stock-desc" className="bg-[#0b1225]">Stock: High to Low</option>
              <option value="stock-asc" className="bg-[#0b1225]">Stock: Low to High</option>
              <option value="name-asc" className="bg-[#0b1225]">Name: A-Z</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex bg-[#0a1224] border border-white/5 rounded-xl p-1">
            <button
              onClick={() => setIsGridView(false)}
              className={`p-1.5 rounded-lg transition ${!isGridView ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "text-gray-500 hover:text-white"
                }`}
              title="List View"
            >
              <ListIcon />
            </button>
            <button
              onClick={() => setIsGridView(true)}
              className={`p-1.5 rounded-lg transition ${isGridView ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "text-gray-500 hover:text-white"
                }`}
              title="Grid Cards"
            >
              <GridIcon />
            </button>
          </div>
        </div>
      </div>

      {/* CATALOG DATA OUTLET */}
      {loading ? (
        <div className="glass-panel p-12 rounded-2xl flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm tracking-wide">Syncing product inventory...</p>
        </div>
      ) : processedProducts.length === 0 ? (
        <div className="glass-panel p-16 rounded-2xl text-center space-y-4">
          <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-inner shadow-blue-500/15">
            📦
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">No products found</h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">
              Your catalog is currently empty or doesn't match the selected filters. Click "+ Add New Product" to start building your AI-enhanced inventory.
            </p>
          </div>
          <button
            onClick={() => openDrawer()}
            className="inline-flex bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600 hover:text-white hover:border-transparent text-blue-400 text-xs font-semibold px-4 py-2.5 rounded-xl transition duration-300"
          >
            Create First Product
          </button>
        </div>
      ) : !isGridView ? (
        /* TABLE LIST VIEW */
        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-gray-400 text-xs font-semibold uppercase tracking-wider bg-[#0a1224]/50">
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock Status</th>
                  <th className="px-6 py-4">AI Features</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {processedProducts.map((p) => {
                  const hasAIContent = p.description || p.marketingCaption || (p.seoTags && p.seoTags.length > 0);
                  const isLowStock = (p.stock || 0) <= 5;

                  return (
                    <tr key={p._id} className="hover:bg-white/5 transition-all group">
                      <td className="px-6 py-4 font-semibold text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold font-outfit shadow-sm">
                            {p.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="block truncate max-w-xs">{p.name}</span>
                            {p.description && (
                              <span className="block text-xs text-gray-500 font-normal truncate max-w-xs mt-0.5">
                                {p.description}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium uppercase tracking-wide">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-blue-400">${p.price}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${isLowStock ? "bg-red-500 animate-ping" : "bg-emerald-500"}`}></span>
                          <span className={`font-semibold ${isLowStock ? "text-red-400" : "text-emerald-400"}`}>
                            {p.stock} units
                          </span>
                          {isLowStock && <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/20 font-bold uppercase tracking-wider ml-1">Low</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1.5">
                          {hasAIContent ? (
                            <>
                              {p.description && (
                                <span className="w-6 h-6 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold shadow-sm" title="Has AI Description">✍</span>
                              )}
                              {p.seoTags && p.seoTags.length > 0 && (
                                <span className="w-6 h-6 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shadow-sm" title="Has SEO Tags">🏷</span>
                              )}
                              {p.marketingCaption && (
                                <span className="w-6 h-6 rounded bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center text-xs font-bold shadow-sm" title="Has Marketing Caption">📣</span>
                              )}
                            </>
                          ) : (
                            <span className="text-gray-600 text-xs italic">No AI Copy</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition">
                          <button
                            onClick={() => openDrawer(p)}
                            className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-transparent transition"
                            title="Edit / Run AI"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(p._id)}
                            className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-600 hover:text-white hover:border-transparent transition"
                            title="Delete Item"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID CARD VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {processedProducts.map((p) => {
            const hasAIContent = p.description || p.marketingCaption || (p.seoTags && p.seoTags.length > 0);
            const isLowStock = (p.stock || 0) <= 5;

            return (
              <div
                key={p._id}
                className="glass-panel rounded-2xl overflow-hidden glass-panel-hover flex flex-col group relative"
              >
                {/* Image Mockup placeholder */}
                <div className="h-40 bg-[#0a1224]/80 border-b border-white/5 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020817] to-transparent opacity-80 z-0"></div>
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-wider shadow">
                      {p.category}
                    </span>
                  </div>

                  {isLowStock && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-2 py-0.5 rounded bg-red-500 text-white text-[9px] font-extrabold uppercase tracking-widest shadow animate-pulse">
                        Low Stock
                      </span>
                    </div>
                  )}

                  {/* Visual Art Box */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-indigo-500/30 border border-blue-500/20 shadow-lg flex items-center justify-center text-2xl font-bold font-outfit text-white group-hover:scale-110 transition duration-300">
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-white text-base truncate font-outfit" title={p.name}>
                        {p.name}
                      </h3>
                      <span className="text-base font-extrabold text-blue-400">${p.price}</span>
                    </div>

                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 min-h-[2.5rem]">
                      {p.description || "No product copy generated. Access the AI suite to draft descriptions, tags, and marketing caption."}
                    </p>
                  </div>

                  {/* AI Status */}
                  <div className="flex flex-wrap gap-1.5 py-1">
                    {p.seoTags &&
                      p.seoTags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-500/10 border border-blue-500/10 text-blue-300 rounded-full px-2 py-0.5 text-[10px] font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    {p.seoTags && p.seoTags.length > 3 && (
                      <span className="text-[10px] text-gray-500 self-center">+{p.seoTags.length - 3}</span>
                    )}
                  </div>

                  {/* Card Actions Footer */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-3.5 mt-auto">
                    <span className="text-xs text-gray-500">
                      Stock: <span className={`font-semibold ${isLowStock ? "text-red-400" : "text-emerald-400"}`}>{p.stock} units</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openDrawer(p)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-500/15 text-blue-400 hover:bg-blue-500 hover:text-white transition duration-200"
                      >
                        Edit / AI
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(p._id)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/10 hover:bg-red-600 hover:text-white transition"
                        title="Delete"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= SLIDE-OUT AI COMMAND DRAWER ================= */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay background */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300" onClick={closeDrawer}></div>

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <ProductForm
              product={selectedProduct}
              onSave={handleSave}
              onCancel={closeDrawer}
              showToast={showToast}
            />
          </div>
        </div>
      )}

      {/* ================= GORGEOUS DELETE CONFIRMATION MODAL ================= */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setDeleteConfirmId(null)}></div>
          <div className="relative bg-[#0b1225] border border-red-500/20 text-white p-7 rounded-2xl w-[420px] shadow-2xl space-y-6 animate-scale-up">
            <div className="flex items-center gap-4 text-red-400">
              <span className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center text-2xl font-bold">⚠️</span>
              <div>
                <h3 className="text-lg font-bold font-outfit text-white">Purge product record?</h3>
                <p className="text-xs text-gray-500 mt-0.5">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed font-normal">
              You are about to delete this product from the inventory database. This will also purge its generated AI copies, SEO keywords, and social captions.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl transition text-sm shadow-lg shadow-red-500/10"
              >
                Delete Product
              </button>
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 bg-[#1e293b] border border-white/10 hover:bg-slate-700 text-white font-semibold py-2.5 rounded-xl transition text-sm"
              >
                Keep Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
