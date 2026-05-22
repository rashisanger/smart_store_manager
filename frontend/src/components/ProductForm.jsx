import React, { useState, useEffect } from "react";
import api from "../api/axios";

// ================= SVG ICONS =================
const SparklesIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const ProductForm = ({ product = null, onSave, onCancel, showToast }) => {
  const [activeTab, setActiveTab] = useState("general"); // general | ai-copy | seo
  const [loading, setLoading] = useState(false);

  // FORM MODEL
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    seoTags: [],
    marketingCaption: "",
  });

  // AI INTERACTIVE PARAMETERS
  const [aiTone, setAiTone] = useState("luxury");
  const [aiAudience, setAiAudience] = useState("General");
  const [aiLoading, setAiLoading] = useState({
    desc: false,
    tags: false,
    caption: false,
  });

  // PRE-FILL IF EDITING
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
        description: product.description || "",
        seoTags: product.seoTags || [],
        marketingCaption: product.marketingCaption || "",
      });
    } else {
      setForm({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        seoTags: [],
        marketingCaption: "",
      });
    }
    setActiveTab("general");
  }, [product]);

  // SEO Health Score Calculator
  const calculateSEOScore = () => {
    let score = 0;
    if (form.name) score += 15;
    if (form.category) score += 10;
    if (parseFloat(form.price) > 0) score += 15;
    if (form.description && form.description.length > 50) score += 20;
    if (form.marketingCaption) score += 20;
    if (form.seoTags && form.seoTags.length >= 4) score += 20;
    return score;
  };

  // SUBMIT HANDLER
  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!form.name || !form.category || !form.price) {
      return showToast("Please fill in required fields", "error");
    }

    setLoading(true);
    try {
      await onSave(form);
    } catch (err) {
      console.error("Save product failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ================= AI ACTION GENERATION =================
  const handleGenerateDescription = async () => {
    if (!form.name || !form.category) {
      return showToast("Product Name & Category are required for AI copy!", "error");
    }
    try {
      setAiLoading((prev) => ({ ...prev, desc: true }));
      const { data } = await api.post("/ai/generate-description", {
        productName: form.name,
        category: form.category,
        price: form.price || 0,
        tone: aiTone,
        audience: aiAudience,
      });
      setForm((prev) => ({ ...prev, description: data.description }));
      showToast("AI description generated successfully!");
    } catch (err) {
      showToast("AI Generation failed. Using fallback copywriting...", "error");
      setForm((prev) => ({
        ...prev,
        description: `${form.name} is a high-performance ${form.category} built with pristine precision. Specifically selected to optimize efficiency and guarantee stellar results. Incredible quality and premium benefits designed for modern workflows.`,
      }));
    } finally {
      setAiLoading((prev) => ({ ...prev, desc: false }));
    }
  };

  const handleGenerateCaption = async () => {
    if (!form.name || !form.description) {
      return showToast("Description is required to draft captions!", "error");
    }
    try {
      setAiLoading((prev) => ({ ...prev, caption: true }));
      const { data } = await api.post("/ai/marketing-caption", {
        productName: form.name,
        description: form.description,
        tone: aiTone,
      });
      setForm((prev) => ({ ...prev, marketingCaption: data.caption }));
      showToast("AI marketing caption drafted!");
    } catch (err) {
      showToast("AI Generation failed. Restoring fallback caption...", "error");
      setForm((prev) => ({
        ...prev,
        marketingCaption: `🚀 Elevate your life with the brand-new ${form.name}! Designed to perfection and engineered to deliver top results. Get yours now! #Exclusive #ShopLocal`,
      }));
    } finally {
      setAiLoading((prev) => ({ ...prev, caption: false }));
    }
  };

  const handleGenerateTags = async () => {
    if (!form.name) return showToast("Product name is required for tag analysis!", "error");
    try {
      setAiLoading((prev) => ({ ...prev, tags: true }));
      const { data } = await api.post("/ai/generate-tags", {
        productName: form.name,
        description: form.description || "",
      });
      setForm((prev) => ({ ...prev, seoTags: data.tags || [] }));
      showToast("SEO tags curated!");
    } catch (err) {
      showToast("AI Generation failed. Appending default tags...", "error");
      const defaultTags = [
        form.category.toLowerCase(),
        "premium",
        form.name.toLowerCase().replace(/\s+/g, ""),
        "ecommerce",
        "smartstore",
        "innovative",
        "bestseller",
        "deals",
      ];
      setForm((prev) => ({ ...prev, seoTags: defaultTags }));
    } finally {
      setAiLoading((prev) => ({ ...prev, tags: false }));
    }
  };

  const handleAddTag = (tag) => {
    const trimmed = tag.trim().replace(/^#/, "");
    if (trimmed && !form.seoTags.includes(trimmed)) {
      setForm((prev) => ({ ...prev, seoTags: [...prev.seoTags, trimmed] }));
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      seoTags: prev.seoTags.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  return (
    <div className="w-screen max-w-xl bg-[#090f1e]/98 border-l border-white/10 shadow-2xl relative flex flex-col h-full animate-slide-in-right">
      {/* Drawer Header */}
      <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#0a1224]">
        <div>
          <h2 className="text-xl font-bold text-white font-outfit">
            {product ? "Modify Product Suite" : "Add Product Hub"}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {product ? "Update details & orchestrate AI assets." : "Create a baseline product structure."}
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition"
        >
          ✕
        </button>
      </div>

      {/* TABS SELECTOR */}
      <div className="flex border-b border-white/5 bg-[#0a1224]/50 px-6 py-2">
        <button
          onClick={() => setActiveTab("general")}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition ${activeTab === "general"
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-gray-500 hover:text-white"
            }`}
        >
          📦 General Info
        </button>
        <button
          onClick={() => setActiveTab("ai-copy")}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition flex items-center gap-1.5 ${activeTab === "ai-copy"
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-gray-500 hover:text-white"
            }`}
        >
          <SparklesIcon className="w-3.5 h-3.5" /> AI Copywriter
        </button>
        <button
          onClick={() => setActiveTab("seo")}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition ${activeTab === "seo"
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-gray-500 hover:text-white"
            }`}
        >
          🏷 SEO & Tags
        </button>
      </div>

      {/* Drawer Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* 1. GENERAL TAB */}
        {activeTab === "general" && (
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. HydroGlow Water Bottle"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full bg-[#0a1224] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Sports & Fitness"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
                className="w-full bg-[#0a1224] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50"
              />
            </div>

            {/* Price and Stock Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                  className="w-full bg-[#0a1224] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className="w-full bg-[#0a1224] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50"
                />
              </div>
            </div>

            {/* Dynamic SEO Health Progress Indicator */}
            <div className="glass-panel p-4 rounded-xl bg-blue-500/5 border-blue-500/10 flex items-center justify-between mt-6">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Dynamic SEO Rating</h4>
                <p className="text-xs text-gray-500 max-w-[280px]">
                  Complete product copy and trigger AI analytics to reach 100%.
                </p>
              </div>

              {/* circular progress */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.05)" strokeWidth="4" fill="transparent" />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#3B82F6"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={175.92}
                    strokeDashoffset={175.92 - (175.92 * calculateSEOScore()) / 100}
                    className="transition-all duration-500"
                  />
                </svg>
                <span className="absolute text-xs font-extrabold text-white">{calculateSEOScore()}%</span>
              </div>
            </div>
          </div>
        )}

        {/* 2. AI COPYWRITER TAB */}
        {activeTab === "ai-copy" && (
          <div className="space-y-6">
            {/* Prompt Customizer Section */}
            <div className="bg-[#0a1224] border border-white/5 p-4 rounded-xl space-y-4">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <SparklesIcon className="w-3.5 h-3.5" /> AI Engine Configuration
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Tone of Voice
                  </label>
                  <select
                    value={aiTone}
                    onChange={(e) => setAiTone(e.target.value)}
                    className="w-full bg-[#121b2d] border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="luxury">Luxury / Premium</option>
                    <option value="playful">Playful / Casual</option>
                    <option value="bold">Bold / Assertive</option>
                    <option value="professional">Professional / Technical</option>
                    <option value="minimalist">Minimalist / Direct</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Gen Z, Professionals"
                    value={aiAudience}
                    onChange={(e) => setAiAudience(e.target.value)}
                    className="w-full bg-[#121b2d] border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>
              </div>
            </div>

            {/* AI Description Panel */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  AI Product Description
                </label>
                <button
                  type="button"
                  onClick={handleGenerateDescription}
                  disabled={aiLoading.desc}
                  className="glow-btn inline-flex items-center gap-1 bg-purple-500/10 border border-purple-500/20 hover:bg-purple-600 hover:text-white hover:border-transparent text-purple-400 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                >
                  {aiLoading.desc ? (
                    <div className="w-3.5 h-3.5 border-2 border-purple-400/20 border-t-purple-400 rounded-full animate-spin"></div>
                  ) : (
                    <SparklesIcon className="w-3.5 h-3.5" />
                  )}
                  Generate Description
                </button>
              </div>

              <textarea
                rows="4"
                placeholder="Write descriptions or trigger the AI copy generator above..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-[#0a1224] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 leading-relaxed"
              />
            </div>

            {/* AI Marketing Caption Panel */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  AI Social Caption
                </label>
                <button
                  type="button"
                  onClick={handleGenerateCaption}
                  disabled={aiLoading.caption}
                  className="glow-btn inline-flex items-center gap-1 bg-pink-500/10 border border-pink-500/20 hover:bg-pink-600 hover:text-white hover:border-transparent text-pink-400 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                >
                  {aiLoading.caption ? (
                    <div className="w-3.5 h-3.5 border-2 border-pink-400/20 border-t-pink-400 rounded-full animate-spin"></div>
                  ) : (
                    <SparklesIcon className="w-3.5 h-3.5" />
                  )}
                  Draft Caption
                </button>
              </div>

              <textarea
                rows="2"
                placeholder="Social marketing copy..."
                value={form.marketingCaption}
                onChange={(e) => setForm({ ...form, marketingCaption: e.target.value })}
                className="w-full bg-[#0a1224] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 italic"
              />

              {/* SOCIAL MEDIA PREVIEW CONTAINER */}
              {form.marketingCaption && (
                <div className="mt-4 border border-white/5 bg-[#070b14] rounded-xl p-4 space-y-3">
                  <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">
                    ✨ Real-time Social Feeds Mockup
                  </p>

                  {/* Instagram Preview */}
                  <div className="bg-[#0e1628] border border-white/5 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-500 flex items-center justify-center text-[10px] font-extrabold text-white">S</div>
                      <span className="text-xs font-bold text-white">yourstore</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed font-normal">{form.marketingCaption}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. SEO TAB */}
        {activeTab === "seo" && (
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Search Keyword Tags
                </label>
                <button
                  type="button"
                  onClick={handleGenerateTags}
                  disabled={aiLoading.tags}
                  className="glow-btn inline-flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-600 hover:text-white hover:border-transparent text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                >
                  {aiLoading.tags ? (
                    <div className="w-3.5 h-3.5 border-2 border-blue-400/20 border-t-blue-400 rounded-full animate-spin"></div>
                  ) : (
                    <SparklesIcon className="w-3.5 h-3.5" />
                  )}
                  Curate SEO Tags
                </button>
              </div>

              {/* Input tag entry */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add custom tag (press Enter)"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag(e.target.value);
                      e.target.value = "";
                    }
                  }}
                  className="flex-1 bg-[#0a1224] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.target.previousSibling;
                    handleAddTag(input.value);
                    input.value = "";
                  }}
                  className="bg-[#1e293b] border border-white/10 hover:bg-slate-700 text-white px-4 rounded-xl text-xs font-bold transition"
                >
                  Add
                </button>
              </div>

              {/* Render tag pills */}
              <div className="mt-4 space-y-2">
                <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">Active Tags ({form.seoTags.length})</p>
                {form.seoTags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {form.seoTags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1.5 shadow-sm"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(index)}
                          className="text-[9px] hover:text-red-400 ml-0.5 text-blue-400 font-bold focus:outline-none"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-600 italic">No SEO keyword tags currently curated.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Drawer Actions Footer */}
      <div className="px-6 py-4 border-t border-white/10 flex gap-3 bg-[#0a1224]">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 rounded-xl transition duration-300 shadow-md shadow-blue-500/10 disabled:opacity-50 text-sm flex items-center justify-center gap-2"
        >
          {loading && <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>}
          {product ? "Save Modifications" : "Save Product Assets"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-[#1e293b] border border-white/10 hover:bg-slate-700 text-white font-semibold px-5 py-3 rounded-xl transition text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
