import axios from "axios";
import API from "./index";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5555",
  withCredentials: true
});

// Add token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});



export const registerAdmin = (data) => api.post('/admin/auth/register', data);
export const loginAdmin = (data) => api.post('/api/admin/login', data);
export const logoutAdmin = () => api.post('/admin/auth/logout');
export default api;
