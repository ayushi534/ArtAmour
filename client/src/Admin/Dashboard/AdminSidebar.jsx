import React, { useState } from "react";
import {
  House,
  ShoppingBag,
  LogOut,
  Menu,
  ChevronLeft,
  ShoppingCart,
  Notebook,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-Brown text-DarkCream min-h-screen p-4 flex flex-col transition-all duration-300 shadow-lg`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          {isOpen && <h1 className="text-xl font-bold">ArtAmour</h1>}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-DarkCream hover:text-Cream transition"
        >
          {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menu Items (No .map used) */}
      <nav className="flex-1">
        {/* Home */}
        <Link
          to="/admin/home"
          className={`flex items-center gap-3 py-3 px-4 rounded-lg mb-2 transition-all duration-200 ${
            location.pathname === "/admin/home"
              ? "bg-yellow-400 text-DarkCream font-semibold"
              : "hover:bg-Redwood text-DarkCream"
          }`}
        >
          <House size={20} />
          {isOpen && <span>Home</span>}
        </Link>

        {/* Orders */}
        <Link
          to="/admin/orders"
          className={`flex items-center gap-3 py-3 px-4 rounded-lg mb-2 transition-all duration-200 ${
            location.pathname === "/admin/orders"
              ? "bg-yellow-400 text-DarkCream font-semibold"
              : "hover:bg-Redwood text-DarkCream"
          }`}
        >
          <ShoppingCart size={20} />
          {isOpen && <span>Orders</span>}
        </Link>

        {/* Products */}
        <Link
          to="/product"
          className={`flex items-center gap-3 py-3 px-4 rounded-lg mb-2 transition-all duration-200 ${
            location.pathname === "/admin/products"
              ? "bg-yellow-400 text-DarkCream font-semibold"
              : "hover:bg-Redwood text-DarkCream"
          }`}
        >
          <ShoppingBag size={20} />
          {isOpen && <span>Products</span>}
        </Link>

        {/* Reports */}
        <Link
          to="/admin/reports"
          className={`flex items-center gap-3 py-3 px-4 rounded-lg mb-2 transition-all duration-200 ${
            location.pathname === "/admin/reports"
              ? "bg-yellow-400 text-DarkCream font-semibold"
              : "hover:bg-Redwood text-DarkCream"
          }`}
        >
          <Notebook size={20} />
          {isOpen && <span>Reports</span>}
        </Link>
      </nav>

      {/* Logout Button */}
      <button className="flex items-center gap-3 bg-DarkCream text-Brown font-semibold px-4 py-2 rounded-lg mt-auto hover:bg-Cream transition">
        <LogOut size={20} /> {isOpen && "Logout"}
      </button>
    </div>
  );
};

export default AdminSidebar;
