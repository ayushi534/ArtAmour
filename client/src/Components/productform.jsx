// src/Components/ProductForm.jsx
import React, { useState, useEffect, useRef } from "react";
import ProductCategoryPicker from "./productCategoryPicker";

export default function ProductForm({ onSubmit, loading = false, initial = {} }) {

  const [form, setForm] = useState({
    name: initial.name || "",
    price: initial.price || "",
    description: initial.description || "",
    stock: initial.stock || 0,
    category: initial.category || "",
    subcategory: initial.subcategory || "",
  });

  // 🔹 Images state
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const lastInitialRef = useRef(JSON.stringify(form));

  useEffect(() => {
    const snapshot = JSON.stringify({
      name: initial.name || "",
      price: initial.price || "",
      description: initial.description || "",
      stock: initial.stock || 0,
      category: initial.category || "",
      subcategory: initial.subcategory || "",
    });

    if (snapshot !== lastInitialRef.current) {
      lastInitialRef.current = snapshot;
      setForm(JSON.parse(snapshot));
    }
  }, [initial]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleCategoryChange({ category, subcategory }) {
    setForm((p) => {
      if (p.category === category && p.subcategory === subcategory) return p;
      return { ...p, category: category || "", subcategory: subcategory || "" };
    });
  }

  // 🔹 Image selection handler
  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    setImages(files);

    // preview urls
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreviews(previewUrls);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) return alert("Please enter product name");
    if (!form.category) return alert("Please select a category");

    // 🔹 IMPORTANT: FormData for Multer
    const formData = new FormData();

    formData.append("name", form.name.trim());
    formData.append("price", Number(form.price || 0));
    formData.append("description", form.description || "");
    formData.append("stock", Number(form.stock || 0));
    formData.append("category", form.category);
    if (form.subcategory) {
      formData.append("subcategory", form.subcategory);
    }

    images.forEach((img) => {
      formData.append("images", img);
    });

    await onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Product Name */}
      <div>
        <label className="block mb-1">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>

      {/* Price */}
      <div>
        <label className="block mb-1">Price</label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>

      {/* Stock */}
      <div>
        <label className="block mb-1">Stock</label>
        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      {/* Category Picker */}
      <div>
        <label className="block mb-1">Category</label>
        <ProductCategoryPicker
          value={{ category: form.category, subcategory: form.subcategory }}
          onChange={handleCategoryChange}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      {/* 🔥 IMAGE UPLOAD SECTION */}
      <div>
        <label className="block mb-1">Product Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />

        {/* Preview */}
        {previews.length > 0 && (
          <div className="flex gap-3 mt-2 flex-wrap">
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="preview"
                className="w-20 h-20 object-cover rounded border"
              />
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>

    </form>
  );
}






