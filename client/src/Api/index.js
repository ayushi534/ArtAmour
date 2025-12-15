// src/Api/index.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5555/api', 
  withCredentials: true,
});

// optional: automatically attach admin token if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;


