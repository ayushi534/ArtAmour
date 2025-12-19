import React from "react";
import { Link } from "react-router-dom";

export default function SellerProductManager() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Product Manager</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white shadow rounded">
          <h2 className="text-lg font-semibold mb-2">
            Add Existing Product
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Choose from master catalog and start selling
          </p>
          <Link
            to="/seller/products/new"
            className="inline-block px-4 py-2 bg-black text-white rounded"
          >
            Select Product
          </Link>
        </div>

        <div className="p-6 bg-white shadow rounded">
          <h2 className="text-lg font-semibold mb-2">
            Request New Product
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Can't find your product? Request admin to add it.
          </p>
          <Link
            to="/seller/product-request"
            className="inline-block px-4 py-2 border border-black rounded"
          >
            Request Product
          </Link>
        </div>
      </div>
    </div>
  );
}


