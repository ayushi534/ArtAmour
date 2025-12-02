// src/Components/ProductForm.jsx
import React, { useEffect, useState } from "react";

export default function ProductForm({
  initialValues = null,
  onSubmit,
  loading = false,
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    mrp: "",
    category: "",
    image: "",
    quantity: 1,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.name || "",
        description: initialValues.description || "",
        price: initialValues.price ?? "",
        mrp: initialValues.mrp ?? "",
        // if initialValues.category is an object, try to normalize to id string
        category:
          initialValues.category && typeof initialValues.category === "object"
            ? initialValues.category._id || ""
            : initialValues.category ?? "",
        image: initialValues.image ?? "",
        quantity: initialValues.quantity ?? 1,
      });
    }
  }, [initialValues]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setError(null);
  }

  // helper: check 24-char hex ObjectId
  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(String(id));

  async function submit(e) {
    e.preventDefault();

    // Basic client-side validation
    if (!form.name?.trim()) {
      setError("Product name is required.");
      return;
    }
    if (form.price === "" || isNaN(Number(form.price))) {
      setError("Please enter a valid price.");
      return;
    }
    if (form.category && !isValidObjectId(form.category)) {
      setError("Category must be a valid id (24 hex characters) or left empty.");
      return;
    }

    const payload = {
      ...form,
      price: form.price === "" ? undefined : Number(form.price),
      mrp: form.mrp === "" ? undefined : Number(form.mrp),
      quantity: form.quantity === "" ? 1 : Number(form.quantity),
      // send category undefined if empty string so backend won't try to cast it
      category: form.category === "" ? undefined : form.category,
    };

    // call parent onSubmit and pass payload
    onSubmit(payload);
  }

  return (
    <form onSubmit={submit} className="space-y-3 p-4 bg-white rounded shadow">
      {error && (
        <div className="p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product name"
        className="input"
        required
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="input"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="input"
          required
        />
        <input
          name="mrp"
          value={form.mrp}
          onChange={handleChange}
          placeholder="MRP (optional)"
          className="input"
        />
      </div>

      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category id (optional — 24 hex chars)"
        className="input"
      />

      <input
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Image URL (optional)"
        className="input"
      />

      <input
        name="quantity"
        value={form.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        className="input"
        type="number"
        min="1"
      />

      <div className="flex gap-3">
        <button
          disabled={loading}
          className="px-4 py-2 bg-[#4E342E] text-white rounded"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>

        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

