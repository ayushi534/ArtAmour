import React from "react";

const SellerNavbar = ({ onLogout }) => {
  return (
    <div className="w-full bg-white p-4 shadow flex justify-between items-center">
      <h2 className="text-xl font-semibold">Seller Dashboard</h2>
      <button
        onClick={() => onLogout && onLogout()}
        aria-label="Logout"
        className="px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default SellerNavbar;

