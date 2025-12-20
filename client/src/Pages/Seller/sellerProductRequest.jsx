import React, { useState } from "react";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function SellerProductRequest() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    priceSuggestion: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.category) {
      return alert("Product name and category are required");
    }

    try {
      setLoading(true);

      await API.post("/seller/request-product", {
        ...form,
        priceSuggestion: Number(form.priceSuggestion),
      });

      alert("Product request sent to admin");
      navigate("/seller/products");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        Request New Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="subCategory"
          placeholder="Sub Category"
          value={form.subCategory}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="priceSuggestion"
          placeholder="Suggested Price"
          value={form.priceSuggestion}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Submitting..." : "Send Request"}
        </button>
      </form>
    </div>
  );
}
