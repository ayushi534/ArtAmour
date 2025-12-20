import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  Store,
  LogOut,
  ClipboardList,
  Menu,
} from "lucide-react";

export default function AdminSidebar({ collapsed, toggle }) {
  return (
    <aside
      className={`h-screen bg-[#4E342E] text-[#ffebd6] transition-all duration-300
      ${collapsed ? "w-20" : "w-64"} p-4`}
    >
      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-8">
        {!collapsed && (
          <h1 className="text-xl font-bold text-[#D4AF37]">Art Amour</h1>
        )}
        <button onClick={toggle}>
          <Menu />
        </button>
      </div>

      <nav className="space-y-2">
        <NavItem
          to="/admin/dashboard"
          icon={<LayoutDashboard />}
          label="Dashboard"
          collapsed={collapsed}
        />
        <NavItem
          to="/admin/products"
          icon={<Package />}
          label="Products"
          collapsed={collapsed}
        />
        <NavItem
          to="/admin/product-manager"
          icon={<Package />}
          label="Product Manager"
          collapsed={collapsed}
        />
        <NavItem
          to="/admin/product-requests"
          icon={<ClipboardList />}
          label="Product Requests"
          collapsed={collapsed}
        />
        <NavItem
          to="/admin/sellers"
          icon={<Store />}
          label="Sellers"
          collapsed={collapsed}
        />
        <NavItem
          to="/admin/users"
          icon={<Users />}
          label="Users"
          collapsed={collapsed}
        />
      </nav>

      <button className="flex items-center gap-3 mt-10 text-[#E2B787] hover:text-white">
        <LogOut size={18} />
        {!collapsed && "Logout"}
      </button>
    </aside>
  );
}

function NavItem({ to, icon, label, collapsed }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-2 rounded
        ${isActive ? "bg-[#9A665B] text-white" : "hover:bg-[#9A665B]"}`
      }
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}
