import { useEffect, useState } from "react";
import { PackageCheck, Store, Users , ShoppingBag } from "lucide-react";
import API from "../../utils/api"

export default function AdminDashboard() {
  const [stats , setStats] = useState(null);

  useEffect(() =>{
    API.get("/admin/dashboard-stats")
    .then(res => setStats(res.data))
    .catch(err => console.error(err));
  }, []);

  if (!stats){
    return <p className="text-Brown">Loading dashboard...</p>
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard 
      icon={<PackageCheck />} 
      title="Total Products" 
      value={stats.totalProducts} />

      <StatCard 
      icon={<Store />} 
      title="Active Sellers" 
      value={stats.activeSellers} />

      <StatCard 
      icon={<Users />} 
      title="Users" 
      alue={stats.users} />

      <StatCard 
      icon={<ShoppingBag />} 
      title="Orders" 
      value={stats.orders || 0} />

    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-[#ffebd6] border border-[#C6A664] p-6 rounded-lg shadow">
      <div className="flex items-center gap-3 text-[#4E342E]">
        {icon}
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-[#b84300] mt-4">
        {value}
      </p>
    </div>
  );
}

