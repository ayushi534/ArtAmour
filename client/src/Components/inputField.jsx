import React from "react";

export default function InputField({ label, type, name, value, onChange, icon: Icon }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-[#4E342E]">
        {label}
      </label>

      <div className="flex items-center border rounded-md px-3 py-2 bg-[#FFEBd6]">
        {Icon && <Icon size={18} className="text-[#9A665B] mr-2" />}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-sm"
          required
        />
      </div>
    </div>
  );
}
