// src/pages/ProductsByCategory.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import API from "../utils/api";
import ProductCard from "../components/product/productCard"; // your product card component

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ProductsByCategory() {
  const { slug } = useParams(); // if using slug route
  const query = useQuery();
  const categoryId = query.get("category"); // if using query param
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        // Choose API depending on what you send (id or slug)
        const endpoint = categoryId
          ? `/products/categoryId/${categoryId}`
          : slug
          ? `/products?categorySlug=${slug}`
          : "/products";

        const res = await API.get(endpoint);
        if (!mounted) return;
        setProducts(res.data?.data || []);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load products"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchProducts();
    return () => (mounted = false);
  }, [categoryId, slug]);

  if (loading)
    return <div className="py-10 text-center">Loading products...</div>;
  if (error)
    return <div className="py-10 text-center text-red-500">{error}</div>;

  if (!products.length)
    return (
      <div className="py-10 text-center">
        No products found in this category.
      </div>
    );

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
