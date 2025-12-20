// src/context/CartWishlistContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getCartCount, getWishlistCount } from "../utils/api";

const CartWishlistContext = createContext();

export const useCartWishlist = () => useContext(CartWishlistContext);

export const CartWishlistProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Fetch counts from backend
  const fetchCounts = async () => {
    try {
      const cartRes = await getCartCount();
      const wishlistRes = await getWishlistCount();

      setCartCount(cartRes.data.count || 0);
      setWishlistCount(wishlistRes.data.count || 0);
    } catch (err) {
      console.error("Error fetching counts:", err);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  // Functions to update counts locally
  const updateCartCount = (value) => setCartCount(value);
  const updateWishlistCount = (value) => setWishlistCount(value);

  return (
    <CartWishlistContext.Provider
      value={{
        cartCount,
        wishlistCount,
        updateCartCount,
        updateWishlistCount,
        refreshCounts: fetchCounts,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
};
