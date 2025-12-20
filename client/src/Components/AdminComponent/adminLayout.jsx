import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "../AdminComponent/adminSidebar";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="bg-[#EAD5AE] min-h-screen">
      
      {/* SIDEBAR */}
      <div className="fixed left-0 top-0 h-full z-40">
        <AdminSidebar
          collapsed={collapsed}
          toggle={() => setCollapsed(!collapsed)}
        />
      </div>

      {/* MAIN CONTENT */}
      <main
        className={`transition-all duration-300 p-6
        ${collapsed ? "ml-20" : "ml-64"}`}
      >
        <Outlet />
      </main>
    </div>
  );
}


