import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API, { addToCart, addToWishlist } from "../../utils/api";
import { Heart } from "lucide-react";
import { useCartWishlist } from "../../context/cartWishlistContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { refreshCounts } = useCartWishlist(); // ✅ valid usage
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    await addToCart(product._id);
    refreshCounts();
    alert("Added to cart!");
  };

  const handleAddToWishlist = async () => {
    await addToWishlist(product._id);
    refreshCounts();
    alert("Added to wishlist!");
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="min-h-screen bg-Beige px-6 py-16 flex gap-10">
      <div className="flex-1">
        {product.images?.map((img, idx) => (
          <img key={idx} src={img} alt={product.name} className="rounded-xl mb-4" />
        ))}
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-Brown">{product.name}</h1>
          <button onClick={handleAddToWishlist} className="text-red-500">
            <Heart size={24} />
          </button>
        </div>

        <p className="text-gray-600">{product.description}</p>
        <p className="text-xl font-bold text-Brown">₹{product.price}</p>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            className="bg-Brown text-Beige px-6 py-3 rounded-lg hover:bg-Redwood"
          >
            Add to Cart
          </button>
          <button className="bg-Redwood text-Beige px-6 py-3 rounded-lg hover:bg-Brown">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
