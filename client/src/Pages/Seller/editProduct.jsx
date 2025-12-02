import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../Components/productform";
import { fetchProductById, updateProduct } from "../../Api/productApi";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingInit, setLoadingInit] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchProductById(id);
        setInitial(res.product);
      } catch (err) {
        alert(err.message || "Failed to load");
      } finally {
        setLoadingInit(false);
      }
    })();
  }, [id]);

  async function handleSubmit(payload) {
    try {
      setLoading(true);
      const res = await updateProduct(id, payload);
      alert(res.message || "Updated");
      navigate("/seller/products");
    } catch (err) {
      alert(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  }

  if (loadingInit) return <div>Loading product…</div>;
  if (!initial) return <div>Product not found</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Edit Product</h1>
      <ProductForm initialValues={initial} onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}

