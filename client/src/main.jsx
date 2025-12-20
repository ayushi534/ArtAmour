// src/main.jsx (unified)
import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { CartWishlistProvider } from "./context/cartWishlistContext.jsx";
import "./index.css";


const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartWishlistProvider>
          <App />
        </CartWishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);



