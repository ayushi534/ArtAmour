import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  MapPin,
  Heart,
  User,
  Package,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCartWishlist } from "../../src/context/cartWishlistContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, wishlistCount } = useCartWishlist();

  return (
    <nav className="bg-Beige text-Brown shadow-lg py-4 px-8 flex justify-between items-center font-sans">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Link to="/">
          <img
            src="/assets/logo.png"
            alt="ArtAmour Logo"
            className="h-10 w-10 rounded-full border-2 border-Brown"
          />
        </Link>
        <Link to="/" className="text-2xl font-bold tracking-wider">
          ArtAmour
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 text-lg">
        <Link to="/" className="hover:text-Redwood">Home</Link>
        <Link to="/collections" className="hover:text-Redwood">Collections</Link>
        <Link to="/contact" className="hover:text-Redwood">Contact</Link>
        <Link to="/signup" className="hover:text-Redwood transition">Signup</Link>
        <Link to="/signin" className="hover:text-Redwood transition">Signin</Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="hidden md:flex items-center bg-yellow-50 rounded-full px-4 py-2">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none px-2 text-sm w-36"
          />
        </div>

        {/* Seller */}
        <Link to="/seller/login" className="flex flex-col items-center hover:text-Redwood">
          <User size={22} />
          <span className="text-xs">Seller</span>
        </Link>

        {/* Orders */}
        <Link to="/orders" className="flex flex-col items-center hover:text-Redwood">
          <Package size={22} />
          <span className="text-xs">Orders</span>
        </Link>

        {/* Cart */}
        <Link to="/cart" className="relative flex flex-col items-center hover:text-Redwood">
          <ShoppingCart size={22} />
          <span className="text-xs">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Wishlist */}
        <Link to="/wishlist" className="relative flex flex-col items-center hover:text-Redwood">
          <Heart size={22} />
          <span className="text-xs">Wishlist</span>
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* Location */}
        <Link to="/location" className="flex flex-col items-center hover:text-Redwood">
          <MapPin size={22} />
          <span className="text-xs">Location</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md hover:bg-Cream"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 right-6 bg-yellow-50 shadow-lg rounded-lg p-4 flex flex-col gap-3 z-50 min-w-[180px]">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/collections" onClick={() => setIsOpen(false)}>Collections</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/signup" onClick={() => setIsOpen(false)}>Signup</Link>
          <Link to="/signin" onClick={() => setIsOpen(false)}>Signin</Link>
          <Link to="/seller/login" onClick={() => setIsOpen(false)}>Seller Login</Link>
          <Link to="/admin/login" className="font-semibold">Admin</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;



