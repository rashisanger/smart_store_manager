
import { useEffect, useState } from "react";

import api from "../api/axios";

import ProductForm from "../components/ProductForm";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState(null);

  // ================= FETCH PRODUCTS =================

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/products");

      setProducts(data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/ products / ${ id } `);

      setProducts((prev) =>
        prev.filter((p) => p._id !== id)
      );
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  // ================= SAVE =================

  const handleSave = (savedProduct) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p._id === savedProduct._id
            ? savedProduct
            : p
        )
      );
    } else {
      setProducts((prev) => [
        savedProduct,
        ...prev,
      ]);
    }

    setShowModal(false);

    setEditingProduct(null);
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <div className="h-10 w-52 bg-white/10 rounded-xl animate-pulse"></div>

            <div className="h-4 w-72 bg-white/10 rounded mt-3 animate-pulse"></div>
          </div>

          <div className="h-12 w-40 bg-white/10 rounded-xl animate-pulse"></div>
        </div>

        {/* TABLE */}
        <div
          className="
          bg-white/5
          border
          border-white/10
          rounded-3xl
          overflow-hidden
          backdrop-blur-xl
          "
        >
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="
              flex
              items-center
              justify-between
              px-6
              py-6
              border-b
              border-white/5
              animate-pulse
              "
            >
              <div className="h-5 w-40 bg-white/10 rounded"></div>

              <div className="h-5 w-24 bg-white/10 rounded"></div>

              <div className="h-5 w-20 bg-white/10 rounded"></div>

              <div className="h-5 w-16 bg-white/10 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ================= UI =================

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Products
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your AI-powered products
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);

            setShowModal(true);
          }}
          className="
          px-5
          py-3
          rounded-2xl
          bg-blue-600
          hover:bg-blue-500
          transition-all
          duration-300
          hover:scale-105
          shadow-lg
          shadow-blue-500/30
          text-white
          font-semibold
          "
        >
          + Add Product
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div
          className="
          bg-red-500/10
          border
          border-red-500/20
          text-red-400
          px-5
          py-4
          rounded-2xl
          "
        >
          {error}
        </div>
      )}

      {/* EMPTY STATE */}
      {!products.length ? (
        <div
          className="
          flex
          flex-col
          items-center
          justify-center
          py-28
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          "
        >
          <div className="text-7xl mb-6">
            📦
          </div>

          <h2 className="text-3xl font-bold text-white mb-3">
            No products yet
          </h2>

          <p className="text-gray-400 text-lg">
            Add your first AI-powered product now.
          </p>
        </div>
      ) : (
        <div
          className="
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          "
        >
          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* HEADER */}
              <thead
                className="
                bg-white/5
                border-b
                border-white/10
                "
              >
                <tr>
                  {[
                    "Name",
                    "Category",
                    "Price",
                    "Stock",
                    "Description",
                    "Actions",
                  ].map((head) => (
                    <th
                      key={head}
                      className="
                      px-6
                      py-4
                      text-left
                      text-xs
                      uppercase
                      tracking-wider
                      text-gray-400
                      font-semibold
                      "
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="
                    border-b
                    border-white/5
                    hover:bg-white/5
                    transition
                    "
                  >
                    {/* NAME */}
                    <td className="px-6 py-5">
                      <div>
                        <h3 className="font-semibold text-white">
                          {product.name}
                        </h3>
                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td className="px-6 py-5">
                      <span
                        className="
                        px-3
                        py-1
                        rounded-full
                        bg-blue-500/10
                        border
                        border-blue-500/20
                        text-blue-400
                        text-xs
                        font-medium
                        "
                      >
                        {product.category}
                      </span>
                    </td>

                    {/* PRICE */}
                    <td className="px-6 py-5 text-white font-medium">
                      ${product.price}
                    </td>

                    {/* STOCK */}
                    <td className="px-6 py-5">
                      <span
                        className={`
px - 3
py - 1
rounded - full
text - xs
font - semibold
border
                          
                          ${
  product.stock <= 5
    ? `
                                bg-red-500/10
                                border-red-500/20
                                text-red-400
                              `
    : `
                                bg-green-500/10
                                border-green-500/20
                                text-green-400
                              `
}
`}
                      >
                        {product.stock} in stock
                      </span>
                    </td>

                    {/* DESCRIPTION */}
                    <td className="px-6 py-5 text-gray-400 max-w-xs truncate">
                      {product.description?.slice(
                        0,
                        50
                      ) || "No description"}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            setEditingProduct(
                              product
                            );

                            setShowModal(true);
                          }}
                          className="
                          px-4
                          py-2
                          rounded-xl
                          border
                          border-blue-500/20
                          bg-blue-500/10
                          text-blue-400
                          hover:bg-blue-500
                          hover:text-white
                          transition-all
                          duration-300
                          "
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              product._id
                            )
                          }
                          className="
                          px-4
                          py-2
                          rounded-xl
                          border
                          border-red-500/20
                          bg-red-500/10
                          text-red-400
                          hover:bg-red-500
                          hover:text-white
                          transition-all
                          duration-300
                          "
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);

            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default Products;

