// src/utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  timeout: 15000,
  withCredentials: false,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || localStorage.getItem("sellerToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err?.response?.data || err)
);

export default API;


