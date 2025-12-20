import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";

export default function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function loadProducts() {
    try {
      setLoading(true);
      const res = await API.get("/seller/products/me");
      setProducts(res.data.products || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

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
        <div>No products yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="p-4 bg-white rounded shadow"
            >
              {/* Product Image */}
              <img
                src={
                  p.product?.images?.[0] ||
                  "/assets/default-product.png"
                }
                alt={p.product?.name}
                className="w-full h-44 object-cover rounded mb-3"
              />

              <h2 className="text-lg font-semibold">
                {p.product?.name}
              </h2>

              {/* STATUS BADGE */}
              <p className="text-sm mt-1">
                Status:{" "}
                <span
                  className={
                    p.status === "approved"
                      ? "text-green-600"
                      : p.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }
                >
                  {p.status.toUpperCase()}
                </span>
              </p>

              <div className="mt-2 font-bold">₹ {p.price}</div>

              {/* 🔴 REJECTION REASON */}
              {p.status === "rejected" && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                  <p className="text-sm font-semibold text-red-700">
                    Rejected by Admin
                  </p>
                  <p className="text-sm text-red-600">
                    Reason: {p.adminNote}
                  </p>
                </div>
              )}

              {/* ACTIONS */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() =>
                    navigate(`/seller/products/edit/${p._id}`)
                  }
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>

                {p.status !== "approved" && (
                  <button
                    onClick={() =>
                      navigate(`/seller/products/edit/${p._id}`)
                    }
                    className="px-3 py-1 bg-orange-500 text-white rounded"
                  >
                    Fix & Resubmit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



