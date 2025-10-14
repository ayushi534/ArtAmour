import React from "react";
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-yellow-950 text-DarkCream py-12 font-sans">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* 📍 Contact Us Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-Gold">Contact Us</h2>
          <p className="flex items-start gap-2 text-gray-300">
            <MapPin size={18} /> 123 Art Street, Creative City, Madhya Pradesh, India
          </p>
          <p className="flex items-center gap-2 mt-2 text-gray-300">
            <Phone size={18} /> +91 98765 43210
          </p>
          <p className="flex items-center gap-2 mt-2 text-gray-300">
            <Mail size={18} /> support@artamour.com
          </p>
        </div>

        {/* 🧭 Information Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-Gold">Information</h2>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-yellow-400">About Us</a></li>
            <li><a href="#" className="hover:text-yellow-400">Contact Us</a></li>
            <li><a href="#" className="hover:text-yellow-400">Terms of Use</a></li>
            <li><a href="#" className="hover:text-yellow-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-yellow-400">Help</a></li>
          </ul>
        </div>

        {/* 👥 Customer Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-Gold">Customer</h2>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-yellow-400">Create Account</a></li>
            <li><a href="#" className="hover:text-yellow-400">Your Cart</a></li>
            <li><a href="#" className="hover:text-yellow-400">Return & Cancellation Policy</a></li>
            <li><a href="#" className="hover:text-yellow-400">Shipping & Packing</a></li>
            <li><a href="#" className="hover:text-yellow-400">FAQ</a></li>
            <li><a href="#" className="hover:text-yellow-400">Payment Options</a></li>
          </ul>
        </div>

        {/* 🎨 Artist Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-Gold">Artist</h2>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-yellow-400">Become a Seller</a></li>
            <li><a href="#" className="hover:text-yellow-400">Login to Your Account</a></li>
          </ul>
        </div>

      </div>

      {/* 🔗 Social Icons + Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center">
        <div className="flex justify-center gap-6 mb-4">
          <a href="#" className="hover:text-yellow-400"><Facebook /></a>
          <a href="#" className="hover:text-yellow-400"><Instagram /></a>
          <a href="#" className="hover:text-yellow-400"><Twitter /></a>
          <a href="#" className="hover:text-yellow-400"><Youtube /></a>
        </div>
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} ArtAmour. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;




