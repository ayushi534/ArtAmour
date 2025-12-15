import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./productCard";

export default function Products() {
  const [products, setProducts] = useState([]);

  // filters
  const [category, setCategory] = useState("");
  const [categoryItem, setCategoryItem] = useState("");
  const [color, setColor] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);

  const [searchParams] = useSearchParams();

  // category id jo CategoryCards se aayi
  useEffect(() => {
    const catFromURL = searchParams.get("category");
    if (catFromURL) setCategory(catFromURL);
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [category, categoryItem, color, maxPrice]);

  async function fetchProducts() {
    const res = await axios.get("http://localhost:5555/api/products", {
      params: {
        category,
        categoryItem,
        color,
        maxPrice,
      },
    });
    setProducts(res.data.products || res.data);
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      
      {/* LEFT FILTER PANEL */}
      <div className="col-span-12 md:col-span-3 bg-[#EFDFBD] p-4 rounded-xl">
        <h3 className="text-xl mb-4 text-[#4E342E] font-semibold">
          Filters
        </h3>

        {/* CATEGORY */}
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-3 p-2 rounded"
        >
          <option value="">Category</option>
          {/* yaha dynamic categories aa sakti hain */}
        </select>

        {/* PRODUCT TYPE / SUBCATEGORY */}
        <select
          onChange={(e) => setCategoryItem(e.target.value)}
          className="w-full mb-3 p-2 rounded"
        >
          <option value="">Product Type</option>
        </select>

        {/* COLOR */}
        <select
          onChange={(e) => setColor(e.target.value)}
          className="w-full mb-3 p-2 rounded"
        >
          <option value="">Color</option>
          <option value="brown">Brown</option>
          <option value="beige">Beige</option>
          <option value="gold">Gold</option>
        </select>

        {/* PRICE */}
        <label className="text-sm text-[#4E342E]">
          Max Price: ₹{maxPrice}
        </label>
        <input
          type="range"
          min="0"
          max="10000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full"
        />
      </div>

      {/* PRODUCTS GRID */}
      <div className="col-span-12 md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>

    </div>
  );
}
