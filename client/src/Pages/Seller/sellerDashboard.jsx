// src/Pages/Seller/sellerDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function SellerDashboard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Welcome, Seller</h1>
        <Link to="/seller/products/new" className="px-4 py-2 bg-[#4E342E] text-white rounded">+ Add Product</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Total Products</div>
          <div className="text-2xl font-semibold">—</div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Pending Orders</div>
          <div className="text-2xl font-semibold">—</div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Revenue</div>
          <div className="text-2xl font-semibold">—</div>
        </div>
      </div>
    </div>
  );
}

