import API from "../utils/api";

export const userRegister = (data) => API.post("/user/register", data);
export const userLogin = (data) => API.post("/user/login", data);
export const getUserProfile = () => API.get("/user/profile");

