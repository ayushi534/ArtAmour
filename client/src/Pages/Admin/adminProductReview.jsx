// frontend/src/pages/admin/AdminProductReview.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductForAdmin, approveProductApi, rejectProductApi } from "../../Api/productApi";

export default function AdminProductReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rejectNote, setRejectNote] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchProductForAdmin(id);
        setProduct(res.product);
      } catch (err) {
        alert(err?.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function handleApprove() {
    if (!window.confirm("Approve this product?")) return;
    try {
      await approveProductApi(id);
      alert("Approved");
      navigate("/admin/products");
    } catch (err) {
      alert(err?.response?.data?.message || err?.message || "Approve failed");
    }
  }

  async function handleReject() {
    if (!rejectNote.trim()) return alert("Please add rejection reason");
    try {
      await rejectProductApi(id, rejectNote);
      alert("Rejected");
      navigate("/admin/products");
    } catch (err) {
      alert(err?.response?.data?.message || err?.message || "Reject failed");
    }
  }

  if (loading) return <div>Loading…</div>;
  if (!product) return <div>Not found</div>;

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Review Product</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          {(product.images && product.images.length) ? (
            <img src={product.images[0]} alt={product.name} className="w-full h-72 object-cover rounded" />
          ) : <div className="w-full h-72 bg-gray-100 rounded flex items-center justify-center">No image</div>}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="font-bold">₹ {product.price}</p>
          <p className="text-sm text-gray-500">Seller: {product.seller?.shopName || product.seller?.name}</p>
          <p className="text-sm text-gray-500">Category: {product.category?.name} / {product.subcategory?.name || "—"}</p>

          <div className="mt-4 flex gap-3">
            <button onClick={handleApprove} className="px-4 py-2 bg-green-600 text-white rounded">Approve</button>
            <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })} className="px-4 py-2 bg-yellow-600 text-white rounded">Add Note & Reject</button>
          </div>

          <div className="mt-4">
            <label className="block mb-1">Rejection reason / note</label>
            <textarea value={rejectNote} onChange={e => setRejectNote(e.target.value)} className="w-full border rounded p-2" rows={4} />
            <div className="mt-2">
              <button onClick={handleReject} className="px-4 py-2 bg-red-600 text-white rounded">Reject Product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
