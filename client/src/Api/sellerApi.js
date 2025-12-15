import API from "../utils/api";

export const sellerSignup = (data) => API.post("/seller/signup", data);
export const sellerLogin = (data) => API.post("/seller/login", data);
export const getSellerProfile = () => API.get("/seller/profile");

