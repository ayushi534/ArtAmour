import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Pencil,
  Trash2,
  House,
  ShoppingBag,
  Notebook,
  LogOut,
} from "lucide-react";

 const colors = {
  darkCream: "#E5D3B3",
  brown: "#5C4033",
  beige: "#F5F5DC",
 };
// ---------------------------------------------------------
// 🏠 MAIN DASHBOARD COMPONENT
// ---------------------------------------------------------
const Dashboard = () => {
  return (
    <div className="min-h-screen flex font-sans bg-[${colors.beige}]">
      <Sidebar />
      <main className="flex-1 ml-64 bg-[${colors.beige}]">
        <Header />
        <ProductListing />
      </main>
    </div>
  );
};

// ---------------------------------------------------------
// 🎯 SIDEBAR COMPONENT
// ---------------------------------------------------------
const Sidebar = () => {
  return (
    <div
      className="w-64 bg-[${colors.darkCream}] text-[${colors.brown}] fixed h-full px-4 py-4 shadow-lg"
      style={{ backgroundColor: colors.darkCream, color: colors.brown }}
    >
      <h1 className="text-2xl font-bold mb-6">ArtAmour Admin</h1>
      <ul className="font-semibold">
        <li className="mb-3 hover:bg-[${colors.beige}] rounded-lg py-2 px-3 transition">
          <a href="#" className="flex items-center">
            <House className="w-5 h-5 mr-2" /> Dashboard
          </a>
        </li>
        <li className="mb-3 hover:bg-[${colors.beige}] rounded-lg py-2 px-3 transition">
          <a href="#" className="flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2" /> Products
          </a>
        </li>
        <li className="mb-3 hover:bg-[${colors.beige}] rounded-lg py-2 px-3 transition">
          <a href="#" className="flex items-center">
            <Notebook className="w-5 h-5 mr-2" /> Reports
          </a>
        </li>
        <li className="mt-8 hover:bg-[${colors.beige}] rounded-lg py-2 px-3 transition text-red-600">
          <a href="#" className="flex items-center">
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

// ---------------------------------------------------------
// 🌸 HEADER COMPONENT
// ---------------------------------------------------------
const Header = () => {
  return (
    <header
      className="bg-[${colors.darkCream}] text-[${colors.brown}] px-6 py-4 shadow-md flex justify-between items-center"
      style={{ backgroundColor: colors.darkCream, color: colors.brown }}
    >
      <h1 className="text-2xl font-bold">Welcome, Admin 🎨</h1>
      <p className="text-sm">Manage all ArtAmour Products</p>
    </header>
  );
};

// ---------------------------------------------------------
// 🛍️ PRODUCT LISTING (CRUD OPERATIONS)
// ---------------------------------------------------------
const ProductListing = () => {
  const [products, setProducts] = useState(() => {
    // Load from localStorage initially
    const stored = localStorage.getItem("artamourProducts");
    return stored ? JSON.parse(stored) : [];
  });
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    size: "",
    color: "",
    image: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("artamourProducts", JSON.stringify(products));
  }, [products]);

  // Handle adding/updating product
  const handleAddOrUpdate = () => {
    if (!newProduct.title.trim()) return alert("Please enter a product title.");

    if (editingIndex !== null) {
      // Edit mode
      const updated = [...products];
      updated[editingIndex] = newProduct;
      setProducts(updated);
      setEditingIndex(null);
    } else {
      // Add mode
      setProducts([...products, newProduct]);
    }

    // Reset form
    setNewProduct({ title: "", description: "", size: "", color: "", image: "" });
  };

  // Handle delete
  const handleDelete = (index) => {
    if (window.confirm("Delete this product?")) {
      const updated = products.filter((_, i) => i !== index);
      setProducts(updated);
    }
  };

  // Handle edit
  const handleEdit = (index) => {
    setNewProduct(products[index]);
    setEditingIndex(index);
  };

  return (
    <div className="p-6">
      {/* Add / Edit Product Form */}
      <div
        className="bg-white p-4 rounded-xl shadow-md mb-8"
        style={{ border: `2px solid ${colors.darkCream}` }}
      >
        <h2 className="text-xl font-bold text-[${colors.brown}] mb-3">
          {editingIndex !== null ? "Edit Product" : "Add New Product"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 rounded"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-2 rounded"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Size"
            className="border p-2 rounded"
            value={newProduct.size}
            onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
          />
          <input
            type="text"
            placeholder="Color"
            className="border p-2 rounded"
            value={newProduct.color}
            onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            className="border p-2 rounded col-span-full"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          />
        </div>

        <button
          onClick={handleAddOrUpdate}
          className="mt-4 flex items-center bg-[${colors.brown}] text-white px-4 py-2 rounded hover:opacity-90"
          style={{ backgroundColor: colors.brown }}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          {editingIndex !== null ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <p className="text-gray-600">No products added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col"
              style={{ border: `1px solid ${colors.darkCream}` }}
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h3 className="text-lg font-bold text-[${colors.brown}]">{product.title}</h3>
              <p className="text-sm text-gray-700 mb-1">{product.description}</p>
              <p className="text-sm text-gray-500">Size: {product.size}</p>
              <p className="text-sm text-gray-500 mb-2">Color: {product.color}</p>

              <div className="mt-auto flex gap-3">
                <button
                  onClick={() => handleEdit(index)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                >
                  <Pencil className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

