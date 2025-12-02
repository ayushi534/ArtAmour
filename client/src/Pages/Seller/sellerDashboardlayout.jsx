// src/Pages/Seller/SellerDashboardLayout.jsx
import React, { useState } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, Bell } from "lucide-react";
import SellerSidebar from "../../Pages/Seller/sellerSidebar";
import Avatar from "../../Components/avatar"; 

export default function SellerDashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("sellerToken"); // if you used separate key
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#EFDFBD] flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <SellerSidebar />
      </div>

      {/* Mobile slide-over */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-[#4E342E] text-white p-5 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img src="/assets/logo.png" alt="logo" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-bold">ArtAmour</div>
                  <div className="text-xs opacity-80">Seller Panel</div>
                </div>
              </div>

              <button onClick={() => setIsSidebarOpen(false)} className="p-2" aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* you can reuse SellerSidebar inside mobile too */}
            <SellerSidebar />
            <div className="mt-auto">
              <button onClick={handleLogout} className="w-full bg-[#EAD5AE] text-[#4E342E] px-3 py-2 rounded-lg font-semibold mt-4">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main column */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white shadow-sm px-4 md:px-8 h-16">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded-md hover:bg-[#EFDFBD]" onClick={() => setIsSidebarOpen(true)} aria-label="Open menu">
              <Menu className="w-6 h-6 text-[#4E342E]" />
            </button>

            <h1 className="text-xl font-semibold text-[#4E342E]">Seller Dashboard</h1>

            <nav className="hidden sm:flex items-center gap-2 text-sm text-gray-500 ml-4">
              <Link to="/seller" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Dashboard</span>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <div className="relative">
                <input type="text" placeholder="Search products..." className="px-3 py-2 rounded-md border border-[#E2B787] focus:outline-none bg-white" />
                <Search className="absolute right-2 top-2 w-4 h-4 text-gray-400" />
              </div>

              <button className="p-2 rounded-md hover:bg-[#EFDFBD]" aria-label="Notifications">
                <Bell className="w-5 h-5 text-[#4E342E]" />
              </button>

              <div className="flex items-center gap-3">
                <Avatar src="/assets/default-seller.png" alt="seller" size={36} />
                <div className="hidden sm:block text-sm">
                  <div className="font-medium text-[#4E342E]">Seller Name</div>
                  <div className="text-xs text-gray-500">Pro Seller</div>
                </div>
              </div>
            </div>

            <button onClick={handleLogout} className="hidden md:inline-block bg-[#EAD5AE] hover:bg-[#C9A14A] text-[#4E342E] px-3 py-2 rounded-md font-semibold">
              Logout
            </button>
          </div>
        </header>

        <main className="p-6 md:p-8 overflow-auto">
          <div className="max-w-[1200px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
