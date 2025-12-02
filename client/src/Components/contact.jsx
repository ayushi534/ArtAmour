// src/Pages/ContactPage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4 text-center text-gray-600">
        You can reach us at hello@artamour.com or call +91 98765 43210.
        

      </p>
      
      {/* Link to Home */}
      <Link
        to="/"
        className="mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      >
        Back to Home
      </Link>
    </div>
  );
}


