import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5555", // backend base
  timeout: 15000,
});

// attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // make sure login saves this key
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;

