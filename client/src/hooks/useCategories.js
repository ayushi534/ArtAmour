// frontend/src/hooks/useCategories.js
import { useEffect, useState } from "react";
import API from "../utils/api";

export default function useCategories({ onlyActive = true } = {}) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchTree() {
      try {
        setLoading(true);
        const res = await API.get("/categories"); // your controller returns all categories
        let data = res.data?.categories || res.data?.data || res.data;
        if (!Array.isArray(data)) data = res.data?.categories || [];
        // Build tree: parents with children
        const parents = data.filter(c => !c.parent);
        const children = data.filter(c => c.parent);
        const map = {};
        children.forEach(ch => {
          const key = String(ch.parent);
          map[key] = map[key] || [];
          map[key].push(ch);
        });
        const tree = parents.map(p => ({ ...p, children: map[String(p._id)] || [] }));
        if (mounted) setCategories(tree);
      } catch (err) {
        console.error("useCategories failed:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchTree();
    return () => (mounted = false);
  }, [onlyActive]);

  return { categories, loading };
}

