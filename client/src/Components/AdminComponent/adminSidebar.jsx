import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  Store,
  LogOut,
} from "lucide-react";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-[#4E342E] text-[#ffebd6] p-6">
      <h1 className="text-2xl font-bold text-[#D4AF37] mb-8">
        Art Amour
      </h1>

      <nav className="space-y-4">
        <NavItem to="/admin/dashboard" icon={<LayoutDashboard />} label="Dashboard" />
        <NavItem to="/admin/products" icon={<Package />} label="Products" />
        <NavItem to="/admin/product-manager" icon={<Package />} label="Product Manager" />
        <NavItem to="/admin/sellers" icon={<Store />} label="Sellers" />
        <NavItem to="/admin/users" icon={<Users />} label="Users" />
      </nav>

      <button className="flex items-center gap-2 mt-10 text-[#E2B787] hover:text-white">
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-2 rounded 
         ${isActive ? "bg-[#9A665B] text-white" : "hover:bg-[#9A665B]"}`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}

