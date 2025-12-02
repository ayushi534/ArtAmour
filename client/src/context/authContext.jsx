// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import API from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      // explicitly add Authorization when fetching profile
      const res = await API.get("/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data.user || null);
    } else {
      // try cookie-based fallback
      const res = await API.get("/api/user/profile");
      setUser(res.data.user || null);
    }
  } catch (err) {
    setUser(null);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const logout = async () => {
    try {
      await API.post("/api/user/logout"); // optional: create this route on backend (you already have logout logic in controller)
    } catch (err) {
      // ignore
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

