import React from "react";
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-Brown text-Cream py-12 font-sans">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* 📍 Contact Us Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-Gold">Contact Us</h2>
          <p className="flex items-start gap-2 text-Beige">
            <MapPin size={18} /> 123 Art Street, Creative City, Madhya Pradesh, India
          </p>
          <p className="flex items-center gap-2 mt-2 text-Beige">
            <Phone size={18} /> +91 98765 43210
          </p>
          <p className="flex items-center gap-2 mt-2 text-Beige">
            <Mail size={18} /> support@artamour.com
          </p>
        </div>

        {/* 🧭 Information Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-Gold">Information</h2>
          <ul className="space-y-2 text-Beige">
            <li><a href="#" className="hover:text-Gold">About Us</a></li>
            <li><a href="#" className="hover:text-Gold">Contact Us</a></li>
            <li><a href="#" className="hover:text-Gold">Terms of Use</a></li>
            <li><a href="#" className="hover:text-Gold">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-Gold">Help</a></li>
          </ul>
        </div>

        {/* 👥 Customer Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-Gold">Customer</h2>
          <ul className="space-y-2 text-Beige">
            <li><a href="#" className="hover:text-Gold">Create Account</a></li>
            <li><a href="#" className="hover:text-Gold">Your Cart</a></li>
            <li><a href="#" className="hover:text-Gold">Return & Cancellation Policy</a></li>
            <li><a href="#" className="hover:text-Gold">Shipping & Packing</a></li>
            <li><a href="#" className="hover:text-Gold">FAQ</a></li>
            <li><a href="#" className="hover:text-Gold">Payment Options</a></li>
          </ul>
        </div>

        {/* 🎨 Artist Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-Gold">Artist</h2>
          <ul className="space-y-2 text-Beige">
            <li><a href="#" className="hover:text-Gold">Become a Seller</a></li>
            <li><a href="#" className="hover:text-Gold">Login to Your Account</a></li>
          </ul>
        </div>

      </div>

      {/* 🔗 Social Icons + Copyright */}
      <div className="border-t border-Redwood mt-10 pt-6 text-center">
        <div className="flex justify-center gap-6 mb-4">
          <a href="#" className="hover:text-Gold"><Facebook /></a>
          <a href="#" className="hover:text-Gold"><Instagram /></a>
          <a href="#" className="hover:text-Gold"><Twitter /></a>
          <a href="#" className="hover:text-Gold"><Youtube /></a>
        </div>
        <p className="text-Cream text-sm">
          &copy; {new Date().getFullYear()} ArtAmour. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;




