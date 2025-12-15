import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5555/api", 
  withCredentials: true,
});

// optional: attach token if you store under 'adminToken' or 'token'
API.interceptors.request.use((config) => {
  // prefer adminToken if admin endpoints use it
  const token = localStorage.getItem("adminToken") || localStorage.getItem("token") || sessionStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
