import { useState } from "react";
import api from "../api/axios";

const AITools = () => {
  // DESCRIPTION TOOL
  const [descForm, setDescForm] = useState({
    productName: "",
    category: "",
    price: "",
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
  });

  const [captionOutput, setCaptionOutput] = useState("");
  const [captionLoading, setCaptionLoading] = useState(false);

  // COPY STATES
  const [copiedStates, setCopiedStates] = useState({
    desc: false,
    tags: false,
    caption: false,
  });

  // COPY FUNCTION
  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);

    setCopiedStates((prev) => ({
      ...prev,
      [key]: true,
    }));

    setTimeout(() => {
      setCopiedStates((prev) => ({
        ...prev,
        [key]: false,
      }));
    }, 2000);
  };

  // GENERATE DESCRIPTION
  const generateDescription = async () => {
    try {
      setDescLoading(true);

      const { data } = await api.post(
        "/ai/generate-description",
        descForm
      );

      setDescOutput(data.description);
    } catch (error) {
      console.error(error);
    } finally {
      setDescLoading(false);
    }
  };

  // GENERATE TAGS
  const generateTags = async () => {
    try {
      setTagsLoading(true);

      const { data } = await api.post(
        "/ai/generate-tags",
        tagsForm
      );

      setTagsOutput(data.tags || []);
    } catch (error) {
      console.error(error);
    } finally {
      setTagsLoading(false);
    }
  };

  // GENERATE CAPTION
  const generateCaption = async () => {
    try {
      setCaptionLoading(true);

      const { data } = await api.post(
        "/ai/marketing-caption",
        captionForm
      );

      setCaptionOutput(data.caption);
    } catch (error) {
      console.error(error);
    } finally {
      setCaptionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          AI Tools
        </h1>

        <p className="text-gray-400 mt-2">
          Generate content for your
          products using GPT-4
        </p>
      </div>

      <div className="space-y-6">
        {/* DESCRIPTION GENERATOR */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              📝 Description Generator
            </h2>

            <span className="bg-blue-500/20 text-blue-300 text-xs px-3 py-1 rounded-full">
              GPT-4
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Product Name"
              value={descForm.productName}
              onChange={(e) =>
                setDescForm({
                  ...descForm,
                  productName:
                    e.target.value,
                })
              }
              className="bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Category"
              value={descForm.category}
              onChange={(e) =>
                setDescForm({
                  ...descForm,
                  category:
                    e.target.value,
                })
              }
              className="bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Price"
              value={descForm.price}
              onChange={(e) =>
                setDescForm({
                  ...descForm,
                  price:
                    e.target.value,
                })
              }
              className="bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={
              generateDescription
            }
            disabled={descLoading}
            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-xl text-sm font-medium"
          >
            {descLoading
              ? "Generating..."
              : "✨ Generate Description"}
          </button>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm text-gray-400">
                Generated Description
              </h3>

              {descOutput && (
                <button
                  onClick={() =>
                    copyToClipboard(
                      descOutput,
                      "desc"
                    )
                  }
                  className="text-xs bg-[#1F2937] hover:bg-[#273449] px-3 py-1 rounded-lg"
                >
                  {copiedStates.desc
                    ? "Copied! ✓"
                    : "Copy"}
                </button>
              )}
            </div>

            {descOutput ? (
              <div className="bg-[#0F172A] border border-white/10 rounded-xl p-4 text-sm leading-relaxed text-gray-300">
                {descOutput}
              </div>
            ) : (
              <div className="border border-dashed border-white/10 bg-[#0F172A] rounded-xl p-6 text-center text-gray-500 text-sm">
                Output will appear here...
              </div>
            )}
          </div>
        </div>

        {/* SEO TAG GENERATOR */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              🏷 SEO Tag Generator
            </h2>

            <span className="bg-blue-500/20 text-blue-300 text-xs px-3 py-1 rounded-full">
              GPT-4
            </span>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Product Name"
              value={
                tagsForm.productName
              }
              onChange={(e) =>
                setTagsForm({
                  ...tagsForm,
                  productName:
                    e.target.value,
                })
              }
              className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              rows="3"
              placeholder="Product Description"
              value={
                tagsForm.description
              }
              onChange={(e) =>
                setTagsForm({
                  ...tagsForm,
                  description:
                    e.target.value,
                })
              }
              className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={generateTags}
              disabled={tagsLoading}
              className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-xl text-sm font-medium"
            >
              {tagsLoading
                ? "Generating..."
                : "✨ Generate Tags"}
            </button>
          </div>

          <div className="mt-6">
            {tagsOutput.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm text-gray-400">
                    Generated Tags
                  </h3>

                  <button
                    onClick={() =>
                      copyToClipboard(
                        tagsOutput.join(
                          ", "
                        ),
                        "tags"
                      )
                    }
                    className="text-xs bg-[#1F2937] hover:bg-[#273449] px-3 py-1 rounded-lg"
                  >
                    {copiedStates.tags
                      ? "Copied! ✓"
                      : "Copy All"}
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tagsOutput.map(
                    (tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-full px-3 py-1 text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    )
                  )}
                </div>
              </>
            ) : (
              <div className="border border-dashed border-white/10 bg-[#0F172A] rounded-xl p-6 text-center text-gray-500 text-sm">
                Output will appear here...
              </div>
            )}
          </div>
        </div>

        {/* CAPTION GENERATOR */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              📣 Marketing Caption
            </h2>

            <span className="bg-blue-500/20 text-blue-300 text-xs px-3 py-1 rounded-full">
              GPT-4
            </span>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Product Name"
              value={
                captionForm.productName
              }
              onChange={(e) =>
                setCaptionForm({
                  ...captionForm,
                  productName:
                    e.target.value,
                })
              }
              className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              rows="3"
              placeholder="Product Description"
              value={
                captionForm.description
              }
              onChange={(e) =>
                setCaptionForm({
                  ...captionForm,
                  description:
                    e.target.value,
                })
              }
              className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={
                generateCaption
              }
              disabled={
                captionLoading
              }
              className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-xl text-sm font-medium"
            >
              {captionLoading
                ? "Generating..."
                : "✨ Generate Caption"}
            </button>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm text-gray-400">
                Generated Caption
              </h3>

              {captionOutput && (
                <button
                  onClick={() =>
                    copyToClipboard(
                      captionOutput,
                      "caption"
                    )
                  }
                  className="text-xs bg-[#1F2937] hover:bg-[#273449] px-3 py-1 rounded-lg"
                >
                  {copiedStates.caption
                    ? "Copied! ✓"
                    : "Copy"}
                </button>
              )}
            </div>

            {captionOutput ? (
              <div className="bg-blue-500/10 border-l-4 border-blue-500 rounded-r-xl p-4 italic text-gray-300">
                "{captionOutput}"
              </div>
            ) : (
              <div className="border border-dashed border-white/10 bg-[#0F172A] rounded-xl p-6 text-center text-gray-500 text-sm">
                Output will appear here...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITools;