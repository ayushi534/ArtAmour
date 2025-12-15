import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../../utils/api";

export default function Products() {
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    // ✅ category slug coming from URL
    const categorySlug = params.get("category");

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        let url = "/products";

        if (categorySlug) {
          url += `?categorySlug=${categorySlug}`;
        }

        const res = await API.get(url);

        setProducts(res.data.products || []);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message ||
          err.message ||
          "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [location.search]);

  if (loading) return <div className="text-center py-12">Loading products...</div>;
  if (error) return <div className="text-center text-red-500 py-12">{error}</div>;
  if (!products.length)
    return <div className="text-center py-12">No products found</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p._id} className="border rounded-lg shadow-sm">
            <img
              src={p.images?.[0] || "/images/placeholder.jpg"}
              alt={p.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-sm text-gray-600">
                {p.category?.name}
              </p>
              <div className="mt-2 font-bold">₹{p.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
