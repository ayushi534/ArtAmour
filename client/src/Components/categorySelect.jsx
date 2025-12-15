import React from "react";
import useCategories from "../hooks/useCategories";

export default function CategorySelect({ value, onChange, includeEmpty = true }) {
  const { categories, loading } = useCategories({ onlyActive: true });

  return (
    <select value={value || ""} onChange={(e) => onChange(e.target.value)} disabled={loading}>
      {includeEmpty && <option value="">-- Select Category --</option>}
      {categories.map((c) => (
        <option value={c._id} key={c._id}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
