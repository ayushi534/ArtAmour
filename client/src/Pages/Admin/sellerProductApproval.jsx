import { useEffect, useState } from "react";
import API from "../../utils/api";

export default function SellerProductApproval() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const res = await API.get("/admin/seller-products?status=pending");
      setProducts(res.data.sellerProducts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const updateStatus = async (id, status) => {
  try {
    const url =
      status === "approved"
        ? `/admin/seller-products/${id}/approve`
        : `/admin/seller-products/${id}/reject`;

    const payload =
      status === "rejected"
        ? { note: "Not matching guidelines" }
        : {};

    const res = await API.put(url, payload);

    alert(res.data.message);
    fetchPending();
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Update failed");
  }  
  };


  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#4E342E] mb-6">
        Seller Product Approvals
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-[#EFDFBD] text-[#4E342E]">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th>Seller</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Discount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3 font-medium">
                  {item.product?.name}
                </td>
                <td>{item.seller?.name}</td>
                <td>₹{item.price}</td>
                <td>{item.stock}</td>
                <td>{item.discountPercent}%</td>

                <td className="space-x-2">
                  <button
                    onClick={() => updateStatus(item._id, "approved")}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(item._id, "rejected")}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No pending approvals
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
