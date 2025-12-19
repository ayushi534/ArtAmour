// src/Api/productApi.js
import API from "../utils/api";



// ✅ CREATE PRODUCT (SELLER)
export const createProduct = (payload) =>
  API.post("/products", payload).then((r) => r.data);

// ✅ FETCH LOGGED-IN SELLER PRODUCTS
export const fetchMyProducts = async () => {
  const res = await API.get("/seller/products/me");
  return res.data;
};

// ✅ UPDATE PRODUCT (SELLER OWNER)
export const updateProduct = (id, payload) =>
  API.put(`/products/${id}`, payload).then((r) => r.data);

// ✅ DELETE PRODUCT (SELLER OWNER)
export const deleteProductApi = (id) =>
  API.delete(`/products/${id}`).then((r) => r.data);



// ✅ PUBLIC PRODUCT BY ID
export const fetchProductById = (id) =>
  API.get(`/products/${id}`).then((r) => r.data);

// ✅ PUBLIC PRODUCTS (category / slug / filters)
export const fetchProducts = (query = "") =>
  API.get(`/products${query}`).then((r) => r.data);



// export const fetchPendingProducts = (page = 1, limit = 30) =>
//   API.get(
//     `/admin/products?status=pending&page=${page}&limit=${limit}`
//   ).then((r) => r.data);

// export const fetchProductForAdmin = (id) =>
//   API.get(`/admin/products/${id}`).then((r) => r.data);

// export const approveProductApi = (id) =>
//   API.put(`/admin/products/${id}/approve`).then((r) => r.data);

// export const rejectProductApi = (id, note) =>
//   API.put(`/admin/products/${id}/reject`, { note }).then((r) => r.data);


