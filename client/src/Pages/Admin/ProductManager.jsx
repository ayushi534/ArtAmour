import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { CheckCircle, XCircle, Eye } from "lucide-react";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectNote, setRejectNote] = useState({});
  const [viewProduct, setViewProduct] = useState(null);

  useEffect(() => {
    loadPending();
  }, []);

  async function loadPending() {
    try {
      const res = await API.get("/admin/seller-products?status=pending");
      setProducts(res.data.sellerProducts || []);
    } catch (err) {
      alert("Failed to load pending products");
    } finally {
      setLoading(false);
    }
  }

  async function approve(id) {
    if (!window.confirm("Approve this seller product?")) return;
    await API.put(`/admin/seller-products/${id}/approve`);
    loadPending();
  }

  async function reject(id) {
    if (!rejectNote[id]) {
      return alert("Rejection reason required");
    }
    await API.put(`/admin/seller-products/${id}/reject`, {
      note: rejectNote[id],
    });
    loadPending();
  }

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-8 bg-[#ffebd6] min-h-screen">
      <h1 className="text-3xl font-bold text-[#4E342E] mb-6">
        Admin Product Manager
      </h1>

      {/* Pending Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Pending Seller Product Requests
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500">No pending requests</p>
        ) : (
          <div className="space-y-4">
            {products.map((p) => (
              <div
                key={p._id}
                className="border rounded-lg p-4 flex justify-between"
              >
                <div>
                  <h3 className="font-semibold">{p.product?.name}</h3>
                  <p className="text-sm text-gray-600">
                    Seller: {p.seller?.shopName}
                  </p>
                  <p className="text-sm">Price: ₹{p.price}</p>
                  <p className="text-sm">Stock: {p.stock}</p>
                </div>

                <div className="w-1/3">
                  <textarea
                    placeholder="Rejection note (required)"
                    className="w-full border rounded p-2 text-sm"
                    value={rejectNote[p._id] || ""}
                    onChange={(e) =>
                      setRejectNote((s) => ({
                        ...s,
                        [p._id]: e.target.value,
                      }))
                    }
                  />

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setViewProduct(p)}
                      className="flex-1 flex items-center justify-center gap-1 bg-gray-200 px-3 py-2 rounded"
                    >
                      <Eye size={16} /> View
                    </button>

                    <button
                      onClick={() => approve(p._id)}
                      className="flex-1 bg-green-600 text-white px-3 py-2 rounded"
                    >
                      <CheckCircle size={16} /> Approve
                    </button>

                    <button
                      onClick={() => reject(p._id)}
                      className="flex-1 bg-red-600 text-white px-3 py-2 rounded"
                    >
                      <XCircle size={16} /> Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Modal */}
      {viewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-semibold mb-2">
              {viewProduct.product?.name}
            </h2>
            <p className="text-sm mb-2">
              Seller: {viewProduct.seller?.shopName}
            </p>
            <p className="text-sm">Price: ₹{viewProduct.price}</p>
            <p className="text-sm">Stock: {viewProduct.stock}</p>

            <button
              onClick={() => setViewProduct(null)}
              className="mt-4 bg-[#4E342E] text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
