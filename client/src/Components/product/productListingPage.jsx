import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLiveProducts();
  }, []);

  const fetchLiveProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/public/products"
      );
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Live Products</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((item) => (
          <div
            key={item._id}
            style={{
              width: "250px",
              border: "1px solid #ddd",
              padding: "10px",
            }}
          >
            <img
              src={item.product.images?.[0]}
              alt={item.product.name}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />

            <h4>{item.product.name}</h4>

            <p>Brand: {item.product.brand}</p>

            <p>
              Price: ₹
              {item.discountPercent > 0
                ? item.price -
                  (item.price * item.discountPercent) / 100
                : item.price}
            </p>

            {item.discountPercent > 0 && (
              <p style={{ color: "green" }}>
                {item.discountPercent}% OFF
              </p>
            )}

            <p>Seller: {item.seller.name}</p>

            <button style={{ width: "100%", marginTop: "10px" }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
