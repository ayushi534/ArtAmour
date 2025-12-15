import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5555/api",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const url = config.url || "";

  let token = null;

  // USER APIs
  if (url.startsWith("/user")) {
    token = localStorage.getItem("token");
  }

  // SELLER APIs
  else if (url.startsWith("/products") || url.startsWith("/seller")) {
    token = localStorage.getItem("sellerToken");
  }

  // ADMIN APIs
  else if (url.startsWith("/admin")) {
    token = localStorage.getItem("adminToken");
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;




