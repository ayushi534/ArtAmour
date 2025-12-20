// src/utils/api.js
import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: "http://localhost:5555/api",
  withCredentials: true,
});

// Attach tokens automatically based on URL prefix
API.interceptors.request.use((config) => {
  const url = config.url || "";
  let token = null;

  // ADMIN
  if (url.startsWith("/admin")) {
    token = localStorage.getItem("adminToken");
  }
  // SELLER
  else if (url.startsWith("/seller")) {
    token = localStorage.getItem("sellerToken");
  }
  // USER (cart, wishlist, orders, user profile)
  else {
    token = localStorage.getItem("token");
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// ----- Cart API -----
export const addToCart = async (productId, quantity = 1) => {
  return API.post("/cart/add", { productId, quantity });
};

// ----- Wishlist API -----
export const addToWishlist = async (productId) => {
  return API.post("/wishlist/add", { productId });
};

// ----- Navbar Counts -----
export const getCartCount = async () => API.get("/cart/count");
export const getWishlistCount = async () => API.get("/wishlist/count");

export default API;




