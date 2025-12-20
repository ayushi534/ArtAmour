// src/Pages/Collections.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API, { addToCart, addToWishlist } from "../utils/api";
import { Heart, ShoppingCart } from "lucide-react";
import { useCartWishlist } from "../../src/context/cartWishlistContext";

const Collections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshCounts } = useCartWishlist(); // ✅ INSIDE COMPONENT

  useEffect(() => {
    fetchApprovedProducts();
  }, []);

  const fetchApprovedProducts = async () => {
    try {
      const res = await API.get("/products/approved");
      const productsArray = Array.isArray(res.data)
        ? res.data
        : res.data.products;

      const mappedProducts = productsArray.map((item) => ({
        id: item._id,
        name: item.product?.name || "No Name",
        description: item.product?.description || "No Description",
        price: item.product?.price || 0,
        discount: item.product?.discount || 0,
        images: item.product?.images || [],
        sellerName: item.seller?.name || "Unknown Seller",
      }));

      setProducts(mappedProducts);
    } catch (error) {
      console.error("Error fetching approved products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
      refreshCounts(); // ✅ updates navbar
      alert("Product added to cart!");
    } catch {
      alert("Failed to add to cart");
    }
  };

  const handleAddToWishlist = async (productId) => {
    try {
      await addToWishlist(productId);
      refreshCounts(); // ✅ updates navbar
      alert("Product added to wishlist!");
    } catch {
      alert("Failed to add to wishlist");
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-Beige px-6 py-16">
      <h1 className="text-4xl font-bold text-Brown text-center mb-12">
        Explore Collections
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition relative"
          >
            <button
              className="absolute top-3 right-3 text-red-500 z-10"
              onClick={() => handleAddToWishlist(product.id)}
            >
              <Heart size={20} />
            </button>

            <Link to={`/product/${product.id}`}>
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="h-60 w-full object-cover rounded-t-xl"
              />
            </Link>

            <div className="p-4">
              <h3 className="font-semibold text-lg text-Brown">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>

              <div className="flex justify-between mt-2">
                <p className="font-bold text-Brown">₹{product.price}</p>
                {product.discount > 0 && (
                  <span className="text-sm text-red-500">
                    {product.discount}% Off
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-500 mt-1">
                Seller: {product.sellerName}
              </p>

              <button
                onClick={() => handleAddToCart(product.id)}
                className="mt-3 w-full bg-Brown text-Beige py-2 rounded-lg hover:bg-Redwood"
              >
                <ShoppingCart size={18} className="inline mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;




