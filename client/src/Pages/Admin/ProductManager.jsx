import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import {
  CheckCircle,
  XCircle,
  Clock,
  Store,
  IndianRupee
} from "lucide-react";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  const fetchSellerProducts = async () => {
    try {
      const res = await API.get("/admin/seller-products");
      setProducts(res.data.sellerproducts || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load seller products");
    } finally {
      setLoading(false);
    }
  };

  const approveProduct = async (id) => {
    await API.put(`/admin/seller-products/${id}/approve`);
    fetchSellerProducts();
  };

  const rejectProduct = async (id) => {
    await API.put(`/admin/seller-products/${id}/reject`);
    fetchSellerProducts();
  };

  if (loading) {
    return <p className="text-center mt-20">Loading products...</p>;
  }

  return (
    <div className="p-10 bg-[#ffebd6] min-h-screen">
      <h1 className="text-3xl font-bold text-[#4E342E] mb-8">
        Product Manager
      </h1>

      <div className="grid gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white border border-[#C6A664] rounded-xl p-6 shadow"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-[#4E342E]">
                  {p.product?.name}
                </h2>

                <p className="text-sm text-gray-600">
                  Seller: <b>{p.seller?.shopName}</b>

                </p>

                <p className="flex items-center gap-1 text-[#b84300]">
                  <IndianRupee size={16} /> {p.price}
                </p>

                <p className="text-sm">
                  Stock: <b>{p.stock}</b>
                </p>

                <StatusBadge status={p.status} />
              </div>

              {p.status === "pending" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => approveProduct(p._id)}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded"
                  >
                    <CheckCircle size={18} /> Approve
                  </button>

                  <button
                    onClick={() => rejectProduct(p._id)}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded"
                  >
                    <XCircle size={18} /> Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  if (status === "approved") {
    return (
      <span className="inline-flex items-center gap-1 text-green-700">
        <CheckCircle size={16} /> Approved
      </span>
    );
  }
  if (status === "rejected") {
    return (
      <span className="inline-flex items-center gap-1 text-red-600">
        <XCircle size={16} /> Rejected
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-yellow-700">
      <Clock size={16} /> Pending
    </span>
  );
}