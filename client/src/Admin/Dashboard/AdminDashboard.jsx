// AdminDashboard.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminNavbar from "./AdminNav";
import AdminSidebar from "./AdminSidebar";
import ProductManager from "./ProductManager";
// Import placeholder components for other pages
const DashboardHome = () => <h2>Welcome to Admin Dashboard</h2>;
const Orders = () => <h2>Orders Page</h2>;
const Reports = () => <h2>Reports Page</h2>;

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-Cream">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminNavbar />

        {/* Route outlet */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="orders" element={<Orders />} />
            <Route path="reports" element={<Reports />} />
            {/* Optional: 404 for unmatched paths */}
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
