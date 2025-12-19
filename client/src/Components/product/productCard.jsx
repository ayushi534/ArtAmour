 // src/components/ProductCard.jsx
import React from "react";
export default function ProductCard({ product }) {
  return (

<div className="bg-[#ffebd6] p-4 rounded-xl shadow-md">
  <img src={product.images[0]} className="h-48 w-full rounded-lg"/>

  <h3 className="text-[#4E342E] font-bold">{product.name}</h3>
  <p className="text-sm">{product.description}</p>

  <div className="flex gap-2">
    <span className="line-through">₹{product.mrp}</span>
    <span className="text-[#b84300] font-bold">
      ₹{product.sellingPrice}
    </span>
    <span className="text-green-600">{product.discount}% OFF</span>
  </div>

  <div className="flex justify-between mt-3">
    <button onClick={()=>addToCart(product._id)}>Add to Cart</button>
    <button onClick={()=>addWishlist(product._id)}>♡</button>
    <button onClick={()=>navigate("/payment")}>Buy</button>
  </div>
</div>

 );
}
