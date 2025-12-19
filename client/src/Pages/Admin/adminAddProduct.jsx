import React, { useEffect, useState } from "react";
import API from "../../utils/api";

export default function AdminAddProduct() {
  const [allCategories, setAllCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    slug: "",
    description: "",
    brand: "Art Armour",
    category: "",
    subCategory: "",
    images: [], 
  });

  const [newCategory, setNewCategory] = useState({ name: "", slug: "" });
  const [newSubCategory, setNewSubCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await API.get("/categories");
    const data = res.data?.categories || [];
    setAllCategories(data);
    setCategories(data.filter(c => !c.parent));
  };


  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    setProduct({ ...product, category: catId, subCategory: "" });
    setSubCategories(allCategories.filter(c => c.parent === catId));
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, images: Array.from(e.target.files) });
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", product.name);
      //formData.append("slug", product.slug);
      formData.append("description", product.description);
      //formData.append("brand", product.brand);
      formData.append("category", product.category);
      formData.append("subCategory", product.subCategory);

      product.images.forEach((file) => {
        formData.append("images", file);
      });

      await API.post("/admin/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product added successfully");

      setProduct({
        name: "",
        //slug: "",
        description: "",
        //brand: "Art Armour",
        category: "",
        subCategory: "",
        images: [],
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async () => {
    await API.post("/categories", newCategory);
    setNewCategory({ name: "", slug: "" });
    fetchCategories();
  };

  const createSubCategory = async () => {
    await API.post("/categories", {
      name: newSubCategory,
      slug: newSubCategory.toLowerCase().replace(/\s+/g, "-"),
      parent: product.category,
    });
    setNewSubCategory("");
    fetchCategories();
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12 bg-[#ffebd6] min-h-screen">

      {/* ADD PRODUCT */}
      <form onSubmit={submitProduct}
        className="bg-[#EAD5AE] border border-[#C6A664] rounded-xl p-8 space-y-5 shadow">

        <h2 className="text-2xl font-semibold text-[#4E342E]">
          Add Product (Master Catalog)
        </h2>

        <input name="name" placeholder="Product Name"
          value={product.name} onChange={handleChange} required
          className="w-full border p-3 rounded" />

        {/* <input name="slug" placeholder="Slug"
          value={product.slug} onChange={handleChange} required
          className="w-full border p-3 rounded" /> */}

        <textarea name="description" placeholder="Description"
          value={product.description} onChange={handleChange}
          className="w-full border p-3 rounded" />

        <select value={product.category}
          onChange={handleCategoryChange}
          className="w-full border p-3 rounded" required>
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <select value={product.subCategory}
          onChange={e => setProduct({ ...product, subCategory: e.target.value })}
          className="w-full border p-3 rounded">
          <option value="">Select SubCategory</option>
          {subCategories.map(s => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-3 rounded bg-white"
        />

        <button type="submit"
          className="w-full bg-[#4E342E] text-[#D4AF37] py-3 rounded">
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>

      <div className="bg-white border border-[#C6A664] rounded-xl p-6 space-y-4 shadow">
        <h2 className="text-xl font-semibold text-[#4E342E]">
          Create Category
        </h2>

        <input
          placeholder="Category Name"
          value={newCategory.name}
          onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
          className="w-full border border-[#C6A664] p-3 rounded"
        />

        {/* <input
          placeholder="Category Slug (optional)"
          value={newCategory.slug}
          onChange={e => setNewCategory({ ...newCategory, slug: e.target.value })}
          className="w-full border border-[#C6A664] p-3 rounded"
        /> */}

        <button
          onClick={createCategory}
          className="bg-[#D4AF37] text-[#4E342E] px-6 py-2 rounded font-medium"
        >
          Create Category
        </button>
      </div>

  
      <div className="bg-white border border-[#C6A664] rounded-xl p-6 space-y-4 shadow">
        <h2 className="text-xl font-semibold text-[#4E342E]">
          Create SubCategory
        </h2>

        <input
          placeholder="SubCategory Name"
          value={newSubCategory}
          onChange={e => setNewSubCategory(e.target.value)}
          className="w-full border border-[#C6A664] p-3 rounded"
        />

        <button
          onClick={createSubCategory}
          className="bg-[#b84300] text-white px-6 py-2 rounded font-medium"
        >
          Add SubCategory
        </button>
      </div>
    </div>
  );
}
    

      
