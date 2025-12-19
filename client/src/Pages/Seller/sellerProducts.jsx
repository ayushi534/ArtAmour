import React, { useEffect, useState } from "react";
import { fetchMyProducts, deleteProductApi } from "../../Api/productApi";
import { Link, useNavigate } from "react-router-dom";

export default function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function loadProducts() {
    try {
      setLoading(true);
      const res = await fetchMyProducts();
      setProducts(res.products || []);
    } catch (err) {
      console.error("Load products error:", err);
      alert(err?.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProductApi(id);
      setProducts((prev) => prev.filter((x) => x._id !== id));
    } catch (err) {
      console.error("Delete product error:", err);
      alert(err?.response?.data?.message || "Delete failed");
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Products</h1>
        <Link
          to="/seller/products/new"
          className="px-4 py-2 bg-[#4E342E] text-white rounded"
        >
          + Add Product
        </Link>
      </div>

      {loading ? (
        <div>Loading…</div>
      ) : products.length === 0 ? (
        <div>No products yet. Add one!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((p) => (
            <div key={p._id} className="p-4 bg-white rounded shadow">
              
              {/* ✅ IMAGE FIX HERE */}
              <img
                src={p.images?.[0] || "/assets/default-product.png"}
                alt={p.name}
                className="w-full h-44 object-cover rounded mb-3"
              />

              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-gray-600">{p.description}</p>

              <div className="flex items-center justify-between mt-3">
                <div className="font-bold">₹ {p.price}</div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/seller/products/edit/${p._id}`)
                    }
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


