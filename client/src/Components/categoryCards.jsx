// src/components/CategoryCards.jsx
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const localImages = {
  candle: "/images/candle.jpg",
  handcraft: "/images/handcraft.jpg",
  painting: "/images/painting.jpg",
  pottery: "/images/pottery.jpg",
};

export default function CategoryCards() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function fetchCategories() {
      try {
        setLoading(true);

        const res = await axios.get("http://localhost:5555/api/categories");
        if (!mounted) return;

        const all = res?.data?.data || [];
        const wantedSlugs = ["candle", "handcraft", "painting", "pottery"];

        const finalCategories = wantedSlugs.map((slug) => {
          const bySlug = all.find(
            (c) => (c.slug || "").toLowerCase() === slug
          );
          const byName = all.find(
            (c) => (c.name || "").toLowerCase().includes(slug)
          );

          const cat = bySlug || byName;

          if (cat) {
            return {
              _id: cat._id,
              name: cat.name,                 // ✅ category name added
              slug: cat.slug || slug,
              image: cat.image || localImages[slug],
              raw: cat,
            };
          }

          // placeholder (UI same rahega)
          return {
            _id: `placeholder-${slug}`,
            name: slug.charAt(0).toUpperCase() + slug.slice(1), // ✅ name added
            slug,
            image: localImages[slug],
            raw: null,
          };
        });

        setCategories(finalCategories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load categories"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchCategories();
    return () => (mounted = false);
  }, []);

  function handleCardClick(item) {
      navigate(`/products?category=${item.slug}`);  
  }

  if (loading) {
    return <div className="text-center py-10">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {categories.map((item) => (
        <Cards
          key={item._id}
          item={item}          // ✅ item.name ab available hai
          onClick={handleCardClick}
        />
      ))}
    </div>
  );
}

