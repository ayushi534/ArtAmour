// src/Components/ProductCategoryPicker.jsx
import React, { useEffect, useState, useRef } from "react";
import useCategories from "../../hooks/useCategories";

export default function ProductCategoryPicker({ value = {}, onChange }) {
  const { categories, loading } = useCategories();
  const [parent, setParent] = useState(value.category || "");
  const [child, setChild] = useState(value.subcategory || "");
  const prevEmitRef = useRef({ parent: "", child: "" });

  // Sync local state when incoming prop 'value' changes (but avoid loops)
  useEffect(() => {
    if (value) {
      if (value.category && value.category !== parent) setParent(value.category);
      if (value.subcategory && value.subcategory !== child) setChild(value.subcategory);
      // if value clears fields
      if (!value.category && parent) setParent("");
      if (!value.subcategory && child) setChild("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.category, value?.subcategory]);

  // When parent changes and child is no longer valid, reset child
  useEffect(() => {
    const p = categories.find((c) => String(c._id) === String(parent));
    if (p) {
      const childIds = (p.children || []).map((x) => String(x._id));
      if (child && !childIds.includes(String(child))) {
        setChild("");
      }
    } else {
      // parent cleared -> clear child
      if (child) setChild("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parent, categories]);

  // Emit onChange only when values actually change (prevent infinite loop)
  useEffect(() => {
    const prev = prevEmitRef.current;
    if (prev.parent !== parent || prev.child !== child) {
      prevEmitRef.current = { parent, child };
      onChange && onChange({ category: parent || "", subcategory: child || "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parent, child, onChange]);

  if (loading) return <div>Loading categories…</div>;

  return (
    <div className="space-y-2">
      <div>
        <label className="block text-sm font-medium">Category</label>
        <select
          value={parent}
          onChange={(e) => setParent(e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">-- Select Category --</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Sub-category</label>
        {parent ? (
          (() => {
            const p = categories.find((c) => String(c._id) === String(parent));
            if (!p || !p.children || p.children.length === 0) {
              return <div className="text-xs text-gray-500">No sub-categories</div>;
            }
            return (
              <select
                value={child}
                onChange={(e) => setChild(e.target.value)}
                className="w-full border rounded px-2 py-1"
              >
                <option value="">-- Select Subcategory --</option>
                {p.children.map((ch) => (
                  <option key={ch._id} value={ch._id}>
                    {ch.name}
                  </option>
                ))}
              </select>
            );
          })()
        ) : (
          <div className="text-xs text-gray-500">Select a category first</div>
        )}
      </div>
    </div>
  );
}

