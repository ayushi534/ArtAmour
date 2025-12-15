import React, { useState } from "react";
import API from "../../Api"; // path adjust karo

const AddCategory = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();   // ✅ YAHAN
    fd.append("name", name);
    fd.append("slug", slug);
    if (image) fd.append("image", image);

    try {
      setLoading(true);
      await API.post("/categories", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Category created successfully ✅");
      setName("");
      setSlug("");
      setImage(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Category create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Category</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 border"
          required
        />

        <input
          type="text"
          placeholder="slug (optional)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full mb-3 p-2 border"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}   // ✅ FILE YAHAN
          className="w-full mb-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-Brown text-Beige px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
