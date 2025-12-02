// src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Navigation from "./Components/Navigation";
import Footer from "./Components/Footer";
import Landingpage from "./Components/Landingpage";
import Pagenotfound from "./Pages/Pagenotfound";

// Auth / user pages
import Signin from "./Pages/User/Signin";
import Signup from "./Pages/User/Signup";

// Seller pages & layout
import SellerLogin from "./Pages/Seller/sellerLogin";
import SellerSignup from "./Pages/Seller/sellerSignup";
import SellerDashboardLayout from "./Pages/Seller/SellerDashboardLayout"; 
import SellerDashboard from "./Pages/Seller/sellerDashboard"; 
import SellerProducts from "./Pages/Seller/sellerProducts"; 
import AddProduct from "./pages/seller/AddProduct"; 
import EditProduct from "./Pages/Seller/editProduct"; 

// Admin
import AdminDashboard from "./Admin/Dashboard/AdminDashboard";
import ProductManager from "./Admin/Dashboard/ProductManager";

// Other components/pages

import ContactPage from "./Components/contact"; 

export default function App() {
  const location = useLocation();
  const path = location.pathname || "";

  // hide top navigation on auth pages and on admin / seller sections
  const hideNavigation =
    path === "/signup" ||
    path === "/signin" ||
    path.startsWith("/admin") ||
    path.startsWith("/seller");

  return (
    <>
      {!hideNavigation && <Navbar />}
      {!hideNavigation && <Navigation />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Landingpage />} />
        <Route path="/Landingpage" element={<Landingpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/contact" element={<ContactPage />} />
        

        {/* Seller auth (separate, not nested under layout) */}
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/signup" element={<SellerSignup />} />

        {/* Seller area (uses SellerDashboardLayout with its own header/sidebar) */}
        <Route path="/seller" element={<SellerDashboardLayout />}>
          <Route index element={<SellerDashboard />} />
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="products" element={<SellerProducts />} />
          <Route path="products/new" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          {/* add other seller routes here (orders, profile, etc) */}
        </Route>

        {/* Admin area */}
        <Route path="/admin/*" element={<AdminDashboard />} />

        {/* Admin product manager (if separate route) */}
        <Route path="/admin/products" element={<ProductManager />} />

        {/* 404 */}
        <Route path="*" element={<Pagenotfound />} />
      </Routes>

      {!hideNavigation && <Footer />}
    </>
  );
}



