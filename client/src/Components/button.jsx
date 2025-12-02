// src/components/ui/Button.jsx
import React from "react";

/**
 * Simple themed Button for ArtAmour
 * Props:
 *  - children: button text / nodes
 *  - variant: 'primary' | 'ghost' (default: 'primary')
 *  - className: additional tailwind classes
 *  - ...props: onClick, type, etc.
 */
export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base = "inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition";
  const variants = {
    primary: "bg-[#4E342E] text-white hover:bg-[#9A665B]",
    ghost: "bg-transparent border border-[#E2B787] text-[#4E342E] hover:bg-[#EFDFBD]",
  };

  const cls = `${base} ${variants[variant] ?? variants.primary} ${className}`;

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
