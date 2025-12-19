// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import API from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
  try {
    const userToken = localStorage.getItem("token");
    const sellerToken = localStorage.getItem("sellerToken");

   
    if (sellerToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    if (userToken) {
      const res = await API.get("/user/profile");
      setUser(res.data.user || null);
    } else {
      setUser(null);
    }
  } catch (err) {
    setUser(null);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadUser();
   
  }, []);

  const logout = async () => {
    try {
      await API.post("user/logout"); 
    } catch (err) {
     
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, loadUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

