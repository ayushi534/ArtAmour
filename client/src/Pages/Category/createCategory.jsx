// src/components/CategoryForm.jsx
import React, { useState, useEffect } from "react";
import API from "../../Api"; // <-- adjust path if your API helper path different

export default function CategoryForm({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    parent: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  // auto-generate slug from name (only when slug empty)
  useEffect(() => {
    if (form.name && !form.slugTouched) {
      const s = form.name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");
      setForm((p) => ({ ...p, slug: s }));
    }
    // eslint-disable-next-line
  }, [form.name]);

  function handleChange(e) {
    const { name, value } = e.target;
    // mark slugTouched when user modifies slug manually
    if (name === "slug") setForm((p) => ({ ...p, slug: value, slugTouched: true }));
    else setForm((p) => ({ ...p, [name]: value }));
  }

  function handleFileChange(e) {
    const f = e.target.files && e.target.files[0];
    setImageFile(f || null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg(null);

    if (!form.name || !form.slug) {
      setMsg({ type: "error", text: "Name and slug required" });
      return;
    }

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("slug", form.slug);
    fd.append("description", form.description || "");
    if (form.parent) fd.append("parent", form.parent);
    if (imageFile) fd.append("image", imageFile); // matches upload.single('image') on backend

    try {
      setLoading(true);
      const res = await API.post("/categories", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg({ type: "success", text: "Category created" });
      // reset form
      setForm({ name: "", slug: "", description: "", parent: "" });
      setImageFile(null);
      setForm((p) => ({ ...p, slugTouched: false }));

      // optional callback to parent to refresh list
      if (onCreated) onCreated(res.data?.category || res.data);

    } catch (err) {
      console.error("Category create error:", err);
      setMsg({
        type: "error",
        text: err.response?.data?.message || err.message || "Create failed",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create Category</h2>

      {msg && (
        <div
          className={`mb-4 p-2 rounded ${msg.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
        >
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
            placeholder="e.g. Paintings"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Slug *</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
            placeholder="e.g. paintings"
          />
          <small className="text-gray-500">Auto-generated from name unless edited.</small>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={3}
            placeholder="Optional description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Parent Category (ID)</label>
          <input
            name="parent"
            value={form.parent}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="optional parent id"
          />
          <small className="text-gray-500 block">Better: replace with a dropdown of categories (optional enhancement).</small>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
          {imageFile && <div className="mt-2 text-sm">{imageFile.name}</div>}
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="bg-Brown text-Beige px-4 py-2 rounded disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
}
