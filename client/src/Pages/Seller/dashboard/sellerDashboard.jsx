import { Link } from "react-router-dom";

export default function SellerDashboard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-[#4E342E]">
          Seller Dashboard
        </h1>

        <Link
          to="/seller/products/new"
          className="px-5 py-2 bg-[#4E342E] text-white rounded-lg hover:bg-[#3B2924] transition"
        >
          + Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Products" value="—" />
        <StatCard title="Pending Orders" value="—" />
        <StatCard title="Revenue" value="—" />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="p-5 bg-white rounded-xl shadow-sm border border-[#EFDFBD]">
      <div className="text-sm text-gray-500 mb-1">{title}</div>
      <div className="text-2xl font-semibold text-[#4E342E]">{value}</div>
    </div>
  );
}

