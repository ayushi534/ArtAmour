import React, { useState } from "react";
import { Search, ShoppingCart, MapPin, Heart, User, Package, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-Beige text-Brown shadow-lg py-4 px-8 flex justify-between items-center font-sans">
      {/* Left Section - Logo */}
      <div className="flex items-center gap-3">
        <img
          src="/assets/logo.png"
          alt="ArtAmour Logo"
          className="h-10 w-10 rounded-full border-2 border-Brown"
        />
        <h1 className="text-2xl font-bold tracking-wider text-Brown">ArtAmour</h1>
      </div>

      {/* Center Section - Menu */}
      <div className="hidden md:flex gap-8 text-lg">
        <Link to="/" href="#" className="hover:text-Redwood transition">Home</Link>
        <a href="#" className="hover:text-Redwood transition">Dashboard</a>
        <a href="#" className="hover:text-Redwood transition">Contact</a>
        <Link to="/Signup" className="hover:text-Redwood transition">Signup</Link>
        <Link to="/Signin" className="hover:text-Redwood transition">Signin</Link>
      </div>

      {/* Right Section - Search + Icons */}
      <div className="flex items-center gap-5">

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-yellow-50 text-Brown rounded-full px-6 py-2">
          <Search className="h-6 w-6 text-Brown" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none px-2 text-sm w-28 md:w-40"
          />
        </div>

        {/* Icons */}

        <a href="#" className="hover:text-Redwood transition flex flex-col items-center">
          <User className="h-6 w-6" />
          <span className="text-xs">User</span>
        </a>
        <a href="#" className="hover:text-Redwood transition flex flex-col items-center">
          <Package className="h-6 w-6" />
          <span className="text-xs">Orders</span>
        </a>
        <a href="#" className="hover:text-Redwood transition flex flex-col items-center">
          <ShoppingCart className="h-6 w-6" />
          <span className="text-xs">Cart</span>
        </a>
        <a href="#" className="hover:text-Redwood transition flex flex-col items-center">
          <Heart className="h-6 w-6" />
          <span className="text-xs">Wishlist</span>
        </a>
        <a href="#" className="hover:text-Redwood transition flex flex-col items-center">
          <MapPin className="h-6 w-6" />
          <span className="text-xs">Location</span>
        </a>

        {/* Mobile Menu Button */}
        <div className="md:hidden relative">
          <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-Cream">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {isOpen && (
            <div className="absolute right-0 top-12 bg-yellow-50 shadow-lg rounded-lg p-4 flex flex-col gap-4 z-50">
              <div className="flex items-center bg-Beige text-Brown rounded-full px-4 py-2">
                <Search className="h-5 w-5 text-Brown" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none px-2 text-sm w-32"
                />   
            </div>
              <Link to="/Signup" className="hover:text-Redwood transition">Signup</Link>
              <Link to="/Signin" className="hover:text-Redwood transition">Signin</Link>
              <Link to="/Landingpage" href="#" className="hover:text-Redwood transition">Home</Link>
              <a href="#" className="hover:text-Redwood transition">Dashboard</a>
              <a href="#" className="hover:text-Redwood transition">Contact</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


