import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5555/api",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const url = config.url || "";

  let token = null;

  // ADMIN APIs
  if (url.startsWith("/admin")) {
    token = localStorage.getItem("adminToken");
  }

  // SELLER APIs
  else if (url.startsWith("/seller")) {
    token = localStorage.getItem("sellerToken");
  }

  // USER APIs
  else if (url.startsWith("/user")) {
    token = localStorage.getItem("token");
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;



