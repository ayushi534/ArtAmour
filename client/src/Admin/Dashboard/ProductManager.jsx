import React, { useState } from "react";
import { PlusCircle, Pencil, Trash } from "lucide-react";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    size: "",
    color: "",
    image: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  // Add or Update product
  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (editingIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editingIndex] = formData;
      setProducts(updatedProducts);
      setEditingIndex(null);
    } else {
      setProducts([...products, formData]);
    }

    // Reset form
    setFormData({
      title: "",
      description: "",
      size: "",
      color: "",
      image: "",
    });
  };

  // Edit product
  const handleEdit = (index) => {
    setFormData(products[index]);
    setEditingIndex(index);
  };

  // Delete product
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="p-8 bg-Cream min-h-screen text-Brown">
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>

      {/* Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-yellow-50 p-6 rounded-2xl shadow-md mb-8">
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="border p-2 rounded-md w-full"
            required
          />

          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="Size (e.g. inch, cm )"
            className="border p-2 rounded-md w-full"
          />

          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Color Selection (e.g. Red, Blue)"
            className="border p-2 rounded-md w-full"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="border p-2 rounded-md w-full "
            rows="3"
            required>
            </textarea>

          {/* ✅ Image Upload Section */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Product Image
            </label>

            {/* Upload from device */}
            <button
              type="button"
              onClick={() => document.getElementById("imageUpload").click()}
              className="bg-Brown text-Cream px-4 py-2 rounded-md hover:bg-Redwood transition">
              Choose Image from Your Device
            </button>

            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* ✅ OR Image URL input 
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Or paste an image URL (e.g. https://example.com/photo.jpg)"
              className="border p-2 rounded-md w-full mt-3"
            />*/}

            {/* ✅ Preview */}
            {formData.image && (
              <div className="mt-3">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md border"/>
              </div>
            )}
          </div>
        </div> {/* ✅ Correctly closed this div */}

        {/* ✅ Submit button */}
        <button
          type="submit"
          className="mt-6 flex items-center gap-2 bg-Brown text-Cream px-4 py-2 rounded-lg hover:bg-Redwood transition" >
          <PlusCircle size={18} />
          {editingIndex !== null ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p className="text-Redwood">No products added yet.</p>
        ) : (
          products.map((product, index) => (
            <div
              key={index}
              className="bg-yellow-50 p-4 rounded-2xl shadow-md flex flex-col justify-between">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded-md mb-3"/>
              )}
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="text-sm text-Brown">{product.description}</p>
              <p className="text-sm">
                <strong>Size:</strong> {product.size || "—"}
              </p>
              <p className="text-sm">
                <strong>Color:</strong> {product.color || "—"}
              </p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(index)}
                  className="flex items-center gap-1 bg-Brown text-Beige px-3 py-1 rounded-md hover:bg-Redwood">
                  <Pencil size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-400">
                  <Trash size={16} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductManager;
