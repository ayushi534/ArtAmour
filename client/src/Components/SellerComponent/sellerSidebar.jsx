import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Store,
  LogOut,
} from "lucide-react";

export default function SellerSidebar() {
  return (
    <aside className="w-64 bg-[#4E342E] text-[#ffebd6] p-6 flex flex-col">
      <h1 className="text-2xl font-serif font-bold text-[#D4AF37] mb-10 tracking-wide">
        Art Amour
      </h1>

      <nav className="space-y-3 flex-1">
        <NavItem to="/seller/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
        <NavItem to="/seller/products" icon={<Package size={18} />} label="My Products" />
        <NavItem to="/seller/product-manager" icon={<Store size={18} />} label="Product Manager" />
      </nav>

      <button className="flex items-center gap-2 mt-8 text-[#E2B787] hover:text-white transition">
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
        `flex items-center gap-3 px-4 py-2 rounded-lg transition
        ${isActive
          ? "bg-[#9A665B] text-white"
          : "hover:bg-[#9A665B]/70"}`
      }
    >
      {icon}
      <span className="font-medium">{label}</span>
    </NavLink>
  );
}
