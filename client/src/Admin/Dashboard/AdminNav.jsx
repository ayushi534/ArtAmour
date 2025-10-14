import React, { useState } from "react";
//import { Link } from "react-router-dom";
import {Search,ChevronDown,Filter} from "lucide-react";

const AdminNavbar = () => {
  const [filter, setFilter] = useState("All");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <nav className="bg-DarkCream text-Brown px-6 py-4 flex flex-wrap justify-between items-center shadow-lg gap-4">
      {/* Left Section - Logo */}
      <div className="flex items-center gap-2">
        
        <h1 className="text-2xl font-bold tracking-wide">ArtAmour Admin</h1>
      </div>

      {/* Center Section - Search Bar + Filter */}
      <div className="flex items-center gap-3 bg-yellow-50 text-gray-900 rounded-full px-4 py-2 shadow-inner w-full md:w-auto">
        <Search className="h-5 w-5 text-" />
        <input
          type="text"
          placeholder={`Search ${filter.toLowerCase()}...`}
          className="bg-transparent outline-none px-2 text-sm w-full md:w-48"
        />

        {/* Filter Dropdown */}
        <div className="flex items-center border-l border-gray-300 pl-3">
          <Filter className="h-4 w-4 text-Brown mr-1" />
          <select
            value={filter}
            onChange={handleFilterChange}
            className="bg-transparent text-Brown text-sm outline-none cursor-pointer"
          >
            <option value="All">All</option>
            <option value="Users">Users</option>
            <option value="Products">Products</option>
            <option value="Orders">Orders</option>
            <option value="Reports">Reports</option>
          </select>
          <ChevronDown className="h-4 w-4 text-Brown ml-1" />
        </div>
      </div>

      {/* Right Section - Navigation Links + Logout */}
      
    </nav>
  );
};

export default AdminNavbar;


