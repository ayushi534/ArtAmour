import API from "./axiosInstance";
export const fetchAllProducts = () => API.get("/api/products").then(r => r.data);
export const fetchMyProducts  = () => API.get("/api/products/seller/me").then(r => r.data);
export const fetchProductById = (id) => API.get(`/api/products/${id}`).then(r => r.data);
export const createProduct = (payload) => API.post("/api/products", payload).then(r => r.data);
export const updateProduct = (id, payload) => API.put(`/api/products/${id}`, payload).then(r => r.data);
export const deleteProductApi = (id) => API.delete(`/api/products/${id}`).then(r => r.data);
