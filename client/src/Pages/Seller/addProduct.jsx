import React, { useEffect, useState } from "react";
import API from "../../utils/api";

export default function SellerAddProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    productId: "",
    price: "",
    stock: "",
    discountPercent: 0,
  });

  useEffect(() => {
    fetchMasterProducts();
  }, []);

  const fetchMasterProducts = async () => {
    const res = await API.get("/products"); // MASTER PRODUCTS
    setProducts(res.data.products || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await API.post("/seller/products", {
        productId: form.productId,
        price: Number(form.price),
        stock: Number(form.stock),
        discountPercent: Number(form.discountPercent),
      });

      alert("Product sent for admin approval");

      setForm({
        productId: "",
        price: "",
        stock: "",
        discountPercent: 0,
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Add Product for Sale</h2>

      <form onSubmit={submitHandler} className="space-y-4">
        {/* MASTER PRODUCT */}
        <select
          name="productId"
          value={form.productId}
          onChange={handleChange}
          required
          className="w-full border p-2"
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full border p-2"
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
          className="w-full border p-2"
        />

        <input
          name="discountPercent"
          type="number"
          placeholder="Discount %"
          value={form.discountPercent}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <button disabled={loading} className="w-full bg-black text-white py-2">
          {loading ? "Submitting..." : "Submit for Approval"}
        </button>
      </form>
    </div>
  );
}







