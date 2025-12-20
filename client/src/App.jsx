// src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Landingpage from "./components/Landingpage";
import ProductsCategory from "./Pages/productsCategory";
import Pagenotfound from "./Pages/Pagenotfound";
import Collections from "./Pages/collections";

// Auth / user pages
import Signin from "./Pages/User/Signin";
import Signup from "./Pages/User/Signup";

// Seller pages & layout
import SellerLogin from "./Pages/Seller/sellerLogin";
import SellerSignup from "./Pages/Seller/sellerSignup";
import SellerLayout from "./Pages/Seller/dashboard/selleLayout"; 
import SellerDashboard from "./Pages/Seller/dashboard/sellerDashboard"; 
import SellerProducts from "./Pages/Seller/sellerProducts"; 
import SellerAddProduct from "./Pages/Seller/addProduct"; 
import EditProduct from "./Pages/Seller/editProduct"; 
import SellerProductManager from "./Pages/Seller/sellerProductManager"
import SellerProductRequest from "./Pages/Seller/sellerProductRequest"

// Admin
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminRegister from "./Pages/Admin/adminRegister"
import AdminLogin from './Pages/Admin/adminLogin';
import ProductManager from "./Pages/Admin/ProductManager";
import ProtectedRoute from './components/protectedRoute';
import AdminLayout from "./Pages/Admin/adminLayout";
import AdminAddProduct from "./Pages/Admin/adminAddProduct";
import AdminProductRequests from "./Pages/Admin/AdminProductRequests";


//products
import ProductsPage from "./Pages/Product/productPage";
import ProductDetail from "./Pages/Product/productDetail";



// Other components/pages

import ContactPage from "./components/contact"; 

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
        <Route path="/collections" element={<Collections />} />
        

        {/* Seller auth (separate, not nested under layout) */}
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/signup" element={<SellerSignup />} />

        {/* Seller area (uses SellerDashboardLayout with its own header/sidebar) */}
        <Route path="/seller" element={<SellerLayout />}>
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="products" element={<SellerProducts />} />
          <Route path="product-manager" element={<SellerProductManager/>}/>
          <Route path="products/new" element={<SellerAddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="/seller/product-request"element={<SellerProductRequest />}/>
          
        </Route>

        {/*product category*/}
        {/*<Route path="/products" element={<ProductsCategory />} />*/}
        <Route path="/category/:slug" element={<ProductsCategory />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        
        {/* Admin area */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

       {/* 🔐 PROTECTED ADMIN ROUTES */}
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="product-requests" element={<AdminProductRequests />} />
            <Route path="product-manager" element={<ProductManager />} />
            <Route path="products" element={<AdminAddProduct />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<Pagenotfound />} />
      </Routes>

      {!hideNavigation && <Footer />}
    </>
  );
}



