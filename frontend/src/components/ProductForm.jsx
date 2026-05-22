
import { useEffect, useState } from "react";

import api from "../api/axios";

const ProductForm = ({
  product,
  onSave,
  onClose,
}) => {
  // ================= FORM STATE =================

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    seoTags: [],
    marketingCaption: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [aiLoading, setAiLoading] =
    useState({
      description: false,
      tags: false,
      caption: false,
    });

  // ================= PREFILL =================

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
        description:
          product.description || "",
        seoTags: product.seoTags || [],
        marketingCaption:
          product.marketingCaption || "",
      });
    }
  }, [product]);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= AI DESCRIPTION =================

  const handleGenerateDescription =
    async () => {
      if (
        !form.name ||
        !form.category ||
        !form.price
      ) {
        return setError(
          "Name, category and price are required."
        );
      }

      try {
        setError("");

        setAiLoading((prev) => ({
          ...prev,
          description: true,
        }));

        const { data } = await api.post(
          "/ai/generate-description",
          {
            productName: form.name,
            category: form.category,
            price: form.price,
          }
        );

        setForm((prev) => ({
          ...prev,
          description: data.description,
        }));
      } catch (err) {
        setError(
          "Failed to generate description"
        );
      } finally {
        setAiLoading((prev) => ({
          ...prev,
          description: false,
        }));
      }
    };

  // ================= AI TAGS =================

  const handleGenerateTags =
    async () => {
      if (!form.name || !form.description) {
        return setError(
          "Name and description required."
        );
      }

      try {
        setError("");

        setAiLoading((prev) => ({
          ...prev,
          tags: true,
        }));

        const { data } = await api.post(
          "/ai/generate-tags",
          {
            productName: form.name,
            description: form.description,
          }
        );

        setForm((prev) => ({
          ...prev,
          seoTags: data.tags,
        }));
      } catch (err) {
        setError("Failed to generate tags");
      } finally {
        setAiLoading((prev) => ({
          ...prev,
          tags: false,
        }));
      }
    };

  // ================= AI CAPTION =================

  const handleGenerateCaption =
    async () => {
      try {
        setError("");

        setAiLoading((prev) => ({
          ...prev,
          caption: true,
        }));

        const { data } = await api.post(
          "/ai/marketing-caption",
          {
            productName: form.name,
            description: form.description,
          }
        );

        setForm((prev) => ({
          ...prev,
          marketingCaption:
            data.caption,
        }));
      } catch (err) {
        setError(
          "Failed to generate caption"
        );
      } finally {
        setAiLoading((prev) => ({
          ...prev,
          caption: false,
        }));
      }
    };

  // ================= SAVE =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let response;

      if (product) {
        response = await api.put(
          `/ products / ${ product._id } `,
          form
        );
      } else {
        response = await api.post(
          "/products",
          form
        );
      }

      onSave(response.data);

      onClose();
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to save product"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      bg-black/70
      backdrop-blur-sm
      flex
      items-center
      justify-center
      p-4
      "
    >
      <div
        className="
        w-full
        max-w-3xl
        max-h-[90vh]
        overflow-y-auto
        rounded-3xl
        border
        border-white/10
        bg-[#0F172A]
        shadow-2xl
        "
      >
        {/* HEADER */}
        <div
          className="
          flex
          items-center
          justify-between
          px-8
          py-6
          border-b
          border-white/10
          "
        >
          <div>
            <h2 className="text-2xl font-bold text-white">
              {product
                ? "Edit Product"
                : "Add Product"}
            </h2>

            <p className="text-gray-400 mt-1">
              AI-powered product management
            </p>
          </div>

          <button
            onClick={onClose}
            className="
            w-10
            h-10
            rounded-xl
            bg-white/5
            hover:bg-white/10
            text-gray-400
            hover:text-white
            transition
            "
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-7"
        >
          {/* ERROR */}
          {error && (
            <div
              className="
              bg-red-500/10
              border
              border-red-500/20
              text-red-400
              px-4
              py-3
              rounded-2xl
              "
            >
              {error}
            </div>
          )}

          {/* ROW 1 */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="iPhone 15"
                className="
                w-full
                bg-white/5
                border
                border-white/10
                rounded-2xl
                px-4
                py-3
                text-white
                placeholder-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                "
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Electronics"
                className="
                w-full
                bg-white/5
                border
                border-white/10
                rounded-2xl
                px-4
                py-3
                text-white
                placeholder-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                "
              />
            </div>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="999"
                className="
                w-full
                bg-white/5
                border
                border-white/10
                rounded-2xl
                px-4
                py-3
                text-white
                placeholder-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                "
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="50"
                className="
                w-full
                bg-white/5
                border
                border-white/10
                rounded-2xl
                px-4
                py-3
                text-white
                placeholder-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                "
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm text-gray-300">
                Description
              </label>

              <button
                type="button"
                onClick={
                  handleGenerateDescription
                }
                className="
                px-4
                py-2
                rounded-xl
                bg-blue-500/10
                border
                border-blue-500/20
                text-blue-400
                text-sm
                hover:bg-blue-500
                hover:text-white
                transition
                "
              >
                {aiLoading.description
                  ? "Generating..."
                  : "✨ Generate"}
              </button>
            </div>

            <textarea
              rows="4"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="
              w-full
              bg-white/5
              border
              border-white/10
              rounded-2xl
              px-4
              py-3
              text-white
              placeholder-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />
          </div>

          {/* SEO TAGS */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm text-gray-300">
                SEO Tags
              </label>

              <button
                type="button"
                onClick={handleGenerateTags}
                className="
                px-4
                py-2
                rounded-xl
                bg-purple-500/10
                border
                border-purple-500/20
                text-purple-400
                text-sm
                hover:bg-purple-500
                hover:text-white
                transition
                "
              >
                {aiLoading.tags
                  ? "Generating..."
                  : "✨ Generate"}
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {form.seoTags.length ? (
                form.seoTags.map(
                  (tag, index) => (
                    <span
                      key={index}
                      className="
                    px-4
                    py-2
                    rounded-full
                    bg-blue-500/10
                    border
                    border-blue-500/20
                    text-blue-400
                    text-sm
                    "
                    >
                      #{tag}
                    </span>
                  )
                )
              ) : (
                <p className="text-gray-500 text-sm">
                  No tags generated yet
                </p>
              )}
            </div>
          </div>

          {/* CAPTION */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm text-gray-300">
                Marketing Caption
              </label>

              <button
                type="button"
                onClick={
                  handleGenerateCaption
                }
                className="
                px-4
                py-2
                rounded-xl
                bg-pink-500/10
                border
                border-pink-500/20
                text-pink-400
                text-sm
                hover:bg-pink-500
                hover:text-white
                transition
                "
              >
                {aiLoading.caption
                  ? "Generating..."
                  : "✨ Generate"}
              </button>
            </div>

            <textarea
              rows="3"
              name="marketingCaption"
              value={
                form.marketingCaption
              }
              onChange={handleChange}
              className="
              w-full
              bg-white/5
              border
              border-white/10
              rounded-2xl
              px-4
              py-3
              text-white
              placeholder-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="
              px-5
              py-3
              rounded-2xl
              border
              border-white/10
              text-gray-300
              hover:bg-white/5
              transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
              px-6
              py-3
              rounded-2xl
              bg-blue-600
              hover:bg-blue-500
              text-white
              font-semibold
              transition-all
              duration-300
              hover:scale-105
              shadow-lg
              shadow-blue-500/30
              "
            >
              {loading
                ? "Saving..."
                : product
                ? "Update Product"
                : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

