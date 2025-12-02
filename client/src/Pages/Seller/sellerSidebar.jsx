// src/components/ui/SellerSidebar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Package, Settings, ChevronDown, Plus } from "lucide-react";
import { fetchMyProducts } from "../../Api/productApi"; // path adjust if needed

export default function SellerSidebar() {
  const [openProducts, setOpenProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // fetch seller products once when sidebar mounts
    (async () => {
      try {
        setLoading(true);
        const res = await fetchMyProducts();
        setProducts(res.products || []);
      } catch (err) {
        setError(err?.response?.data?.message || err?.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const menuItems = [
    { title: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/seller/dashboard" },
    // Products handled separately so we can show submenu
    { title: "Orders", icon: <ShoppingBag size={18} />, path: "/seller/orders" },
    { title: "Settings", icon: <Settings size={18} />, path: "/seller/settings" },
  ];

  return (
    <aside className="h-screen w-64 bg-[#4E342E] text-[#EAD5AE] flex flex-col shadow-lg">
      <div className="p-6 text-2xl font-bold border-b border-[#EAD5AE]/30">
        ArtAmour Seller
      </div>

      <nav className="flex-1 p-4 space-y-2" aria-label="Seller menu">
        <NavLink
          to="/seller/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive ? "bg-[#EAD5AE] text-[#4E342E] font-semibold" : "hover:bg-[#EAD5AE]/20"
            }`
          }
        >
          <span>{<LayoutDashboard size={18} />}</span>
          <span>Dashboard</span>
        </NavLink>

        {/* Products collapsible item */}
        <div>
          <button
            onClick={() => setOpenProducts((s) => !s)}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg hover:bg-[#EAD5AE]/20"
            aria-expanded={openProducts}
          >
            <div className="flex items-center gap-3">
              <Package size={18} />
              <span>Products</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Add Product shortcut */}
              <Link
                to="/seller/products/new"
                className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded bg-[#EAD5AE] text-[#4E342E] text-sm font-medium"
                title="Add product"
                onClick={(e) => { /* do nothing - just link */ }}
              >
                <Plus size={14} />
                <span className="hidden md:inline">Add</span>
              </Link>

              <ChevronDown
                size={16}
                className={`transform transition-transform ${openProducts ? "rotate-180" : ""}`}
              />
            </div>
          </button>

          {/* Submenu: product links */}
          {openProducts && (
            <div className="mt-2 ml-2 space-y-2">
              {loading && <div className="px-4 py-2 text-sm text-[#EAD5AE]/80">Loading…</div>}
              {error && <div className="px-4 py-2 text-sm text-red-300">{error}</div>}

              {!loading && products.length === 0 && (
                <div className="px-4 py-2 text-sm text-[#EAD5AE]/80">
                  No products yet. <Link to="/seller/products/new" className="underline">Add one</Link>.
                </div>
              )}

              {!loading &&
                products.slice(0, 8).map((p) => (
                  <NavLink
                    key={p._id}
                    to={`/seller/products/edit/${p._id}`}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition ${
                        isActive ? "bg-[#EAD5AE] text-[#4E342E] font-semibold" : "hover:bg-[#EAD5AE]/10"
                      }`
                    }
                    title={p.name}
                  >
                    <img
                      src={p.image || "/assets/default-product.png"}
                      alt={p.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <span className="truncate max-w-[140px]">{p.name}</span>
                  </NavLink>
                ))}

              {/* optional "See all" link */}
              {products.length > 8 && (
                <Link
                  to="/seller/products"
                  className="block px-3 py-2 text-sm text-[#EAD5AE]/90 hover:underline"
                >
                  See all products ({products.length})
                </Link>
              )}
            </div>
          )}
        </div>

        {/* rest menu items */}
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive ? "bg-[#EAD5AE] text-[#4E342E] font-semibold" : "hover:bg-[#EAD5AE]/20"
              }`
            }
          >
            {item.icon}
            {item.title}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

