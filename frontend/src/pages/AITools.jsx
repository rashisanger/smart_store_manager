import { useState } from "react";
import api from "../api/axios";

// ================= SVG ICONS =================
const SparklesIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const CopyIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
  </svg>
);

const TagIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M6 20a1 1 0 01-1-1v-8.5a1 1 0 01.293-.707l7.5-7.5a1 1 0 011.414 0l8.5 8.5a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-.707.293H6z" />
  </svg>
);

const TextIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const SocialIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 10.742l5.263-2.632m0 5.263l-5.263-2.632M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AITools = () => {
  // NAVIGATION TABS: desc | tags | social
  const [activeTab, setActiveTab] = useState("desc");

  // TOAST STATE
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // DESCRIPTION TOOL
  const [descForm, setDescForm] = useState({
    productName: "",
    category: "",
    price: "",
    tone: "luxury",
  });
  const [descOutput, setDescOutput] = useState("");
  const [descLoading, setDescLoading] = useState(false);

  // TAGS TOOL
  const [tagsForm, setTagsForm] = useState({
    productName: "",
    description: "",
  });
  const [tagsOutput, setTagsOutput] = useState([]);
  const [tagsLoading, setTagsLoading] = useState(false);

  // CAPTION TOOL
  const [captionForm, setCaptionForm] = useState({
    productName: "",
    description: "",
    tone: "luxury",
  });
  const [captionOutput, setCaptionOutput] = useState("");
  const [captionLoading, setCaptionLoading] = useState(false);

  // GENERATE DESCRIPTION
  const generateDescription = async () => {
    if (!descForm.productName || !descForm.category) {
      return triggerToast("Name and category are required!");
    }
    try {
      setDescLoading(true);
      const { data } = await api.post("/ai/generate-description", descForm);
      setDescOutput(data.description);
      triggerToast("✨ Description successfully generated!");
    } catch (error) {
      // Fallback
      setDescOutput(
        `${descForm.productName} is an elite choice in our ${descForm.category} catalog. Meticulously designed for individuals seeking pure performance and outstanding longevity. Experience unparalleled value at only $${descForm.price || "0.00"} today.`
      );
      triggerToast("Generative server unreachable. Using custom fallback.");
    } finally {
      setDescLoading(false);
    }
  };

  // GENERATE TAGS
  const generateTags = async () => {
    if (!tagsForm.productName) {
      return triggerToast("Product name is required!");
    }
    try {
      setTagsLoading(true);
      const { data } = await api.post("/ai/generate-tags", tagsForm);
      setTagsOutput(data.tags || []);
      triggerToast("✨ Curated 8 SEO Tags!");
    } catch (error) {
      const parsedTags = [
        tagsForm.productName.toLowerCase().replace(/\s+/g, ""),
        "smartbuy",
        "topgrade",
        "ecommerce",
        "featured",
        "moderndeals",
        "onsale",
        "premium",
      ];
      setTagsOutput(parsedTags);
      triggerToast("Fallback keywords generated.");
    } finally {
      setTagsLoading(false);
    }
  };

  // GENERATE CAPTION
  const generateCaption = async () => {
    if (!captionForm.productName || !captionForm.description) {
      return triggerToast("Name and description are required!");
    }
    try {
      setCaptionLoading(true);
      const { data } = await api.post("/ai/marketing-caption", captionForm);
      setCaptionOutput(data.caption);
      triggerToast("✨ Caption crafted successfully!");
    } catch (error) {
      setCaptionOutput(
        `💥 Step up your standards with our brand-new ${captionForm.productName}! Engineered to satisfy, designed to inspire. Act now and experience high-performance values! #Exclusive #BestSellers`
      );
      triggerToast("Fallback marketing caption generated.");
    } finally {
      setCaptionLoading(false);
    }
  };

  // COPY FUNCTION
  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    triggerToast("Copied to clipboard!");
  };

  return (
    <div className="space-y-6 relative">
      {/* TOAST PANEL */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0c1a30] border border-blue-500/30 text-blue-400 px-4 py-3 rounded-xl shadow-2xl text-sm font-semibold tracking-wide flex items-center gap-2 animate-slide-in-right">
          <span>✨</span> {toastMessage}
        </div>
      )}

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white font-outfit">
          AI Creative Studio
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Orchestrate e-commerce copy, metadata, and marketing templates from a single panel.
        </p>
      </div>

      {/* HORIZONTAL HUB SWITCHER */}
      <div className="flex bg-white/5 border border-white/5 p-1 rounded-2xl max-w-md">
        <button
          onClick={() => setActiveTab("desc")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition duration-200
            ${activeTab === "desc" ? "bg-blue-600 text-white shadow-md shadow-blue-500/10" : "text-gray-400 hover:text-white"}`}
        >
          <TextIcon /> Copywriter
        </button>
        <button
          onClick={() => setActiveTab("tags")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition duration-200
            ${activeTab === "tags" ? "bg-blue-600 text-white shadow-md shadow-blue-500/10" : "text-gray-400 hover:text-white"}`}
        >
          <TagIcon /> SEO Keywords
        </button>
        <button
          onClick={() => setActiveTab("social")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition duration-200
            ${activeTab === "social" ? "bg-blue-600 text-white shadow-md shadow-blue-500/10" : "text-gray-400 hover:text-white"}`}
        >
          <SocialIcon /> Social Campaign
        </button>
      </div>

      {/* MAIN WRAPPER PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        {/* INPUT FORM SIDE */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-base font-bold text-white font-outfit">Prompt Inputs</h3>
            <span className="bg-blue-500/15 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
              Llama-3.1
            </span>
          </div>

          {/* DYNAMIC FORM VIEWS */}
          {activeTab === "desc" && (
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. HydroFlask Pro"
                  value={descForm.productName}
                  onChange={(e) => setDescForm({ ...descForm, productName: e.target.value })}
                  className="w-full bg-[#0a1224] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Accessories"
                  value={descForm.category}
                  onChange={(e) => setDescForm({ ...descForm, category: e.target.value })}
                  className="w-full bg-[#0a1224] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Price ($)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={descForm.price}
                    onChange={(e) => setDescForm({ ...descForm, price: e.target.value })}
                    className="w-full bg-[#0a1224] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Copy Tone</label>
                  <select
                    value={descForm.tone}
                    onChange={(e) => setDescForm({ ...descForm, tone: e.target.value })}
                    className="w-full bg-[#0a1224] border border-white/10 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 cursor-pointer"
                  >
                    <option value="luxury">Luxury / Bold</option>
                    <option value="playful">Playful / Friendly</option>
                    <option value="professional">Professional</option>
                    <option value="minimalist">Minimalist</option>
                  </select>
                </div>
              </div>
              <button
                onClick={generateDescription}
                disabled={descLoading}
                className="glow-btn w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl transition duration-300 text-sm shadow-md"
              >
                {descLoading ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <SparklesIcon className="w-4 h-4" />
                )}
                Generate Product Copy
              </button>
            </div>
          )}

          {activeTab === "tags" && (
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ergonomic Desk Chair"
                  value={tagsForm.productName}
                  onChange={(e) => setTagsForm({ ...tagsForm, productName: e.target.value })}
                  className="w-full bg-[#0a1224] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Product Description</label>
                <textarea
                  rows="4"
                  placeholder="Paste product info to analyze tags..."
                  value={tagsForm.description}
                  onChange={(e) => setTagsForm({ ...tagsForm, description: e.target.value })}
                  className="w-full bg-[#0a1224] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 leading-relaxed"
                />
              </div>
              <button
                onClick={generateTags}
                disabled={tagsLoading}
                className="glow-btn w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl transition duration-300 text-sm shadow-md"
              >
                {tagsLoading ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <SparklesIcon className="w-4 h-4" />
                )}
                Extract Keyword Tags
              </button>
            </div>
          )}

          {activeTab === "social" && (
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. HydroFlask Pro"
                  value={captionForm.productName}
                  onChange={(e) => setCaptionForm({ ...captionForm, productName: e.target.value })}
                  className="w-full bg-[#0a1224] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Product Description</label>
                <textarea
                  rows="4"
                  placeholder="Describe your product to craft campaigns..."
                  value={captionForm.description}
                  onChange={(e) => setCaptionForm({ ...captionForm, description: e.target.value })}
                  className="w-full bg-[#0a1224] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 leading-relaxed"
                />
              </div>
              <button
                onClick={generateCaption}
                disabled={captionLoading}
                className="glow-btn w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl transition duration-300 text-sm shadow-md"
              >
                {captionLoading ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <SparklesIcon className="w-4 h-4" />
                )}
                Draft Social Caption
              </button>
            </div>
          )}
        </div>

        {/* OUTPUT SUITE SIDE */}
        <div className="lg:col-span-3 glass-panel p-6 rounded-3xl space-y-6 self-stretch">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-base font-bold text-white font-outfit">AI Outputs</h3>
            {activeTab === "desc" && descOutput && (
              <button
                onClick={() => copyToClipboard(descOutput)}
                className="text-xs bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 px-3 py-1.5 rounded-lg transition-all"
              >
                Copy Content
              </button>
            )}
            {activeTab === "tags" && tagsOutput.length > 0 && (
              <button
                onClick={() => copyToClipboard(tagsOutput.join(", "))}
                className="text-xs bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 px-3 py-1.5 rounded-lg transition-all"
              >
                Copy All Tags
              </button>
            )}
            {activeTab === "social" && captionOutput && (
              <button
                onClick={() => copyToClipboard(captionOutput)}
                className="text-xs bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 px-3 py-1.5 rounded-lg transition-all"
              >
                Copy Caption
              </button>
            )}
          </div>

          {/* DYNAMIC OUTPUT WRAPPER */}
          <div className="flex-1 flex flex-col justify-center min-h-[300px]">
            {activeTab === "desc" && (
              <div className="space-y-4">
                {descOutput ? (
                  <div className="bg-[#040812] border border-white/5 rounded-2xl p-6 text-sm text-gray-300 leading-relaxed font-normal shadow-inner">
                    {descOutput}
                  </div>
                ) : (
                  <div className="border border-dashed border-white/10 rounded-2xl p-12 text-center text-gray-500 text-sm max-w-sm mx-auto flex flex-col items-center gap-3">
                    <span className="text-2xl">📝</span>
                    <p>Enter descriptive inputs and click "Generate Product Copy" to prompt copy suggestions.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "tags" && (
              <div className="space-y-4">
                {tagsOutput.length > 0 ? (
                  <div className="bg-[#040812] border border-white/5 rounded-2xl p-6 space-y-4 shadow-inner">
                    <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Target SEO Metadata</p>
                    <div className="flex flex-wrap gap-2.5">
                      {tagsOutput.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-full px-3.5 py-1 text-xs font-semibold shadow-sm animate-scale-up"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="border border-dashed border-white/10 rounded-2xl p-12 text-center text-gray-500 text-sm max-w-sm mx-auto flex flex-col items-center gap-3">
                    <span className="text-2xl">🏷</span>
                    <p>Provide product details on the left and query search analytics to compile SEO tags.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "social" && (
              <div className="space-y-6">
                {captionOutput ? (
                  <div className="space-y-4">
                    {/* Caption Block */}
                    <div className="bg-blue-500/5 border-l-4 border-blue-500 rounded-r-2xl p-6 italic text-sm text-gray-300 leading-relaxed shadow-sm">
                      "{captionOutput}"
                    </div>

                    {/* Social Frame Mockup */}
                    <div className="bg-[#040812] border border-white/5 rounded-2xl p-5 space-y-4">
                      <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Platform Feeds Preview</p>

                      {/* Instagram Preivew */}
                      <div className="bg-[#0e1628] border border-white/5 rounded-xl p-4 space-y-3 shadow-md">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-500 flex items-center justify-center font-bold text-white text-xs">S</div>
                            <div>
                              <h5 className="text-xs font-bold text-white">smartstore_ai</h5>
                              <p className="text-[9px] text-gray-500 font-normal">Sponsored</p>
                            </div>
                          </div>
                          <span className="text-gray-500 text-xs">•••</span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed font-normal">{captionOutput}</p>
                      </div>

                      {/* Twitter Feed preview */}
                      <div className="bg-[#0e1628] border border-white/5 rounded-xl p-4 space-y-2 shadow-md">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-xs">S</div>
                          <div>
                            <h5 className="text-xs font-bold text-white">SmartStore AI <span className="text-gray-500 font-normal">@smartstore_ai</span></h5>
                          </div>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed font-normal">{captionOutput}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border border-dashed border-white/10 rounded-2xl p-12 text-center text-gray-500 text-sm max-w-sm mx-auto flex flex-col items-center gap-3">
                    <span className="text-2xl">📣</span>
                    <p>Enter descriptions on the left to orchestrate strategic marketing copy options.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITools;
