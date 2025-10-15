import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminNavbar from "./AdminNav";
import AdminSidebar from "./AdminSidebar";
import ProductManager from "./ProductManager";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-Cream">
      {/* Sidebar on the left */}
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar at the top */}
        <AdminNavbar />

        {/* Page content area for routes */}
        <main className="p-6">
          <Routes>
            <Route path="/product" element={<ProductManager />} />
            {/* You can add more admin routes here later */}
            {/* <Route path="/orders" element={<OrdersPage />} /> */}
            {/* <Route path="/reports" element={<ReportsPage />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
