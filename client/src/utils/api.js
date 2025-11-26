import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/", // "/" works when proxy is set; else "http://localhost:5555"
  withCredentials: true, // important when backend uses cookies
});

// attach token manually if you store JWT in localStorage instead of cookie
API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
