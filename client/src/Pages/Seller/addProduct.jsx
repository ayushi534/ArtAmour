// src/Pages/Seller/AddProduct.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../Components/productform";
import { createProduct } from "../../Api/productApi";

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(payload) {
    try {
      setLoading(true);
      const res = await createProduct(payload);
      alert(res.message || "Product created");
      navigate("/seller/products");
    } catch (err) {
      console.error("Create product error:", err);
      // err may be axios response object or custom; handle both shapes:
      const msg = err?.message || err?.data?.message || JSON.stringify(err);
      alert(msg || "Create failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Add New Product</h1>
      <ProductForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}



