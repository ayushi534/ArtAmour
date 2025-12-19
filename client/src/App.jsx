// src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Landingpage from "./components/Landingpage";
import ProductsCategory from "./Pages/productsCategory";
import Pagenotfound from "./Pages/Pagenotfound";

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
import SellerProductApproval from "./Pages/Admin/sellerProductApproval";
// Admin
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminRegister from "./Pages/Admin/adminRegister"
import AdminLogin from './Pages/Admin/adminLogin';
import ProductManager from "./Pages/Admin/ProductManager";
import ProtectedRoute from './components/protectedRoute';
import AdminLayout from "./Pages/Admin/adminLayout";
import AdminAddProduct from "./Pages/Admin/adminAddProduct";


//products
import ProductsPage from "./Pages/Product/productPage";



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

          {/* add other seller routes here (orders, profile, etc) */}
        </Route>

        {/*product category*/}
        {/*<Route path="/products" element={<ProductsCategory />} />*/}
        <Route path="/category/:slug" element={<ProductsCategory />} />
        <Route path="/products" element={<ProductsPage />} /> 
        
        {/* Admin area */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="product-manager" element={<ProductManager/>} />
            <Route path="seller-products" element={<SellerProductApproval />} />
          </Route>
        </Route>
      
        {/* Admin product manager (if separate route) */}
        <Route path="/admin/products" element={<AdminAddProduct />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
      

        

        {/* 404 */}
        <Route path="*" element={<Pagenotfound />} />
      </Routes>

      {!hideNavigation && <Footer />}
    </>
  );
}



