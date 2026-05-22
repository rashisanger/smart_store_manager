import React, { useEffect, useState } from "react";
import api from "../api/axios";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const [showForm, setShowForm] = useState(false);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products"); // ✅ FIXED
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // CREATE PRODUCT
  const handleCreate = async () => {
    try {
      await api.post("/products", form);
      setForm({ name: "", category: "", price: "", stock: "" });
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 px-4 py-2 rounded-lg"
        >
          + Add Product
        </button>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="bg-black/60 fixed inset-0 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-xl w-[400px]">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>

            <input
              placeholder="Name"
              className="border w-full p-2 mb-2"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Category"
              className="border w-full p-2 mb-2"
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />

            <input
              placeholder="Price"
              className="border w-full p-2 mb-2"
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />

            <input
              placeholder="Stock"
              className="border w-full p-2 mb-4"
              onChange={(e) =>
                setForm({ ...form, stock: e.target.value })
              }
            />

            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TABLE */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white/10 p-4 rounded-xl">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-300">
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t border-white/10">
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>${p.price}</td>
                  <td>{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;