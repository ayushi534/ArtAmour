// frontend/src/pages/admin/AdminProductsList.jsx
import React, { useEffect, useState } from "react";
import {
  fetchPendingProducts,
  approveProductApi,
  rejectProductApi
} from "../../Api/productApi";
import { useNavigate } from "react-router-dom";

export default function AdminProductsList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rejecting, setRejecting] = useState({}); // { [id]: true }
  const [rejectNotes, setRejectNotes] = useState({}); // temporary notes keyed by id
  const navigate = useNavigate();

  async function load(pageNum = 1) {
    try {
      setLoading(true);
      const res = await fetchPendingProducts(pageNum, limit);
      setProducts(res.products || []);
      setTotal(res.total || 0);
      setPage(res.page || pageNum);
    } catch (err) {
      console.error("Load pending products:", err);
      alert(err?.response?.data?.message || err?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(1);
    // eslint-disable-next-line
  }, []);

  async function handleApprove(id) {
    if (!window.confirm("Confirm approve this product?")) return;
    try {
      await approveProductApi(id);
      setProducts(p => p.filter(x => x._id !== id));
      setTotal(t => Math.max(0, t - 1));
      alert("Product approved and published.");
    } catch (err) {
      alert(err?.response?.data?.message || err?.message || "Approve failed");
    }
  }

  async function handleReject(id) {
    const note = (rejectNotes[id] || "").trim();
    if (!note) return alert("Please type rejection reason.");
    try {
      setRejecting(s => ({ ...s, [id]: true }));
      await rejectProductApi(id, note);
      setProducts(p => p.filter(x => x._id !== id));
      setTotal(t => Math.max(0, t - 1));
      alert("Product rejected.");
    } catch (err) {
      alert(err?.response?.data?.message || err?.message || "Reject failed");
    } finally {
      setRejecting(s => ({ ...s, [id]: false }));
    }
  }

  function openDetail(id) {
    navigate(`/admin/products/${id}`); // admin product detail route you might have
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#4E342E]">Pending Product Reviews</h1>
        <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
      </div>

      {loading ? (
        <div className="py-20 text-center">Loading pending products…</div>
      ) : products.length === 0 ? (
        <div className="py-10 text-center text-gray-600">No pending products.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <div key={p._id} className="bg-white rounded-lg shadow p-4 flex flex-col">
                <div className="h-44 w-full bg-gray-100 rounded overflow-hidden mb-3">
                  <img
                    src={(p.images && p.images[0]) || "/assets/default-product.png"}
                    alt={p.name}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="font-semibold text-lg text-[#4E342E]">{p.name}</h2>
                  <p className="text-sm text-gray-600 my-2 line-clamp-3">{p.description || "—"}</p>

                  <div className="text-sm text-gray-700 font-bold mb-2">₹ {p.price}</div>
                  <div className="text-xs text-gray-500 mb-2">
                    Seller: {p.seller?.shopName || p.seller?.name || "—"}
                  </div>

                  <div className="text-xs text-gray-500 mb-2">
                    Category: {p.category?.name || "—"} {p.subcategory ? ` / ${p.subcategory.name}` : ""}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex gap-2">
                    <button onClick={() => openDetail(p._id)} className="flex-1 px-3 py-2 bg-[#4E342E] text-white rounded">View</button>
                    <button onClick={() => handleApprove(p._id)} className="px-3 py-2 bg-green-600 text-white rounded">Approve</button>
                  </div>

                  <div className="mt-3">
                    <textarea
                      placeholder="Rejection reason (required to reject)"
                      value={rejectNotes[p._id] || ""}
                      onChange={e => setRejectNotes(s => ({ ...s, [p._id]: e.target.value }))}
                      className="w-full border rounded p-2 text-sm"
                      rows={3}
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-xs text-gray-500">Provide a clear reason so seller can fix</div>
                      <button
                        onClick={() => handleReject(p._id)}
                        disabled={rejecting[p._id]}
                        className="px-3 py-2 bg-red-600 text-white rounded"
                      >
                        {rejecting[p._id] ? "Rejecting..." : "Reject"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">Total pending: {total}</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => load(Math.max(1, page - 1))}
                disabled={page <= 1}
                className="px-3 py-1 bg-white border rounded text-sm"
              >
                Prev
              </button>
              <div className="px-3 py-1 bg-white border rounded text-sm">{page}</div>
              <button
                onClick={() => load(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
                className="px-3 py-1 bg-white border rounded text-sm"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
