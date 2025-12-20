import React, { useEffect, useState } from "react";
import API from "../../utils/api";

export default function AdminProductRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    try {
      const res = await API.get("/admin/product-requests");
      setRequests(res.data.requests || []);
    } catch (err) {
      alert("Failed to load product requests");
    } finally {
      setLoading(false);
    }
  }

  async function approve(id) {
    await API.put(`/admin/product-requests/${id}/approve`);
    fetchRequests();
  }

  async function reject(id) {
    if (!note.trim()) {
      alert("Rejection note is required");
      return;
    }
    await API.put(`/admin/product-requests/${id}/reject`, { note });
    setSelected(null);
    setNote("");
    fetchRequests();
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-Cream p-6 rounded">
      <h1 className="text-2xl font-bold mb-6">
        Seller Product Requests
      </h1>

      {/* LIST */}
      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-[#EFDFBD] p-4 rounded border border-Tan"
          >
            <div className="flex justify-between items-start">
              <div>
                <p><b>Product:</b> {req.name}</p>
                <p><b>Category:</b> {req.category}</p>
                <p><b>Seller:</b> {req.seller?.name}</p>
                <p>
                  <b>Status:</b>{" "}
                  <span className="capitalize">{req.status}</span>
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelected(req)}
                  className="bg-[#4E342E] text-white px-3 py-1 rounded"
                >
                  View
                </button>

                {req.status === "pending" && (
                  <>
                    <button
                      onClick={() => approve(req._id)}
                      className="bg-BurntGold text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => setSelected(req)}
                      className="bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-Brown/40 flex items-center justify-center z-50">
          <div className="bg-yellow-50 p-6 rounded w-[420px] max-h-[90vh] overflow-y-auto">
            
            <h2 className="text-xl font-bold mb-2">
              {selected.name}
            </h2>

            <p className="text-sm mb-1">
              <b>Category:</b> {selected.category}
            </p>

            <p className="text-sm mb-3">
              <b>Description:</b>{" "}
              {selected.description || "No description provided"}
            </p>

            <p className="text-sm mt-2">
              <b>Seller:</b> {selected.seller?.name}
            </p>

            {selected.status === "pending" && (
              <textarea
                placeholder="Rejection note (required)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full border p-2 mt-3"
              />
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setSelected(null);
                  setNote("");
                }}
                className="px-3 py-1 border bg-Gold"
              >
                Close
              </button>

              {selected.status === "pending" && (
                <button
                  onClick={() => reject(selected._id)}
                  className="bg-red-700 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

