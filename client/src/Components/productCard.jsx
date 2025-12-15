 // src/components/ProductCard.jsx
import React from "react";
export default function ProductCard({ product }) {
  return (
//     <div className="border rounded shadow-sm p-4">
//       <img src={product.images?.[0] || "/images/placeholder.jpg"} alt={product.name} className="w-full h-48 object-cover mb-3 rounded" />
//       <h3 className="font-semibold">{product.name}</h3>
//       <p className="text-sm text-gray-600">₹{product.price}</p>
//       <button className="mt-2 px-3 py-1 bg-Brown text-Beige rounded">View</button>
//     </div>
//   );
// }
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
