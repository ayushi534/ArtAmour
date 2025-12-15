import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminPendingProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchPending();
  }, []);

  async function fetchPending() {
    const res = await axios.get("http://localhost:5555/api/admin/products/pending");
    setProducts(res.data.products);
  }

  async function approve(id) {
    await axios.put(`http://localhost:5555/api/admin/products/${id}/approve`);
    fetchPending();
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-6">Pending Products</h2>

      {products.map(p => (
        <div key={p._id} className="border p-4 mb-4 rounded">
          <h3>{p.name}</h3>
          <p>Seller: {p.seller?.email}</p>
          <p>Category: {p.category?.name}</p>

          <button
            onClick={() => approve(p._id)}
            className="bg-green-600 text-white px-4 py-1 rounded mt-2"
          >
            Approve
          </button>
        </div>
      ))}
    </div>
  );
}
