import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminComponent/adminSidebar";
import AdminHeader from "../../components/AdminComponent/adminHeader";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#EFDFBD]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Right side */}
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
