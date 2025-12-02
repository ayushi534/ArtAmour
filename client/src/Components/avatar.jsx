// src/components/ui/Avatar.jsx
import React from "react";

export default function Avatar({ src, name = "S", size = 40 }) {
  return (
    <div
      className="rounded-full bg-[#EAD5AE] text-[#4E342E] flex items-center justify-center font-semibold border border-[#4E342E]"
      style={{ width: size, height: size }}
    >
      {src ? (
        <img
          src={src}
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        name.charAt(0).toUpperCase()
      )}
    </div>
  );
}
