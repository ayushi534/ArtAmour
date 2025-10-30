import React, { useState } from "react";
import { Search } from "lucide-react";

// 🔹 Dummy data to search from (you can later replace it with real data)
const sampleData = [
  { id: 1, name: "Handmade Painting", type: "Product" },
  { id: 2, name: "Wood Sculpture", type: "Product" },
  { id: 3, name: "Clay Artwork", type: "Product" },
  { id: 4, name: "Ayushi Patel", type: "User" },
  { id: 5, name: "Ravi Sharma", type: "User" },
  { id: 6, name: "Metal Craft", type: "Product" },
];

const AdminNav = ({ toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // 🔍 Handle search input changes (auto-readable search)
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredData([]);
    } else {
      const results = sampleData.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredData(results);
    }
  };

  return (
    <nav className="bg-Brown px-6 py-4 flex justify-between items-center shadow-md top-0 right-64 left-0 relative">
      {/* Left Section - Logo */}
      <div className="flex items-center text-xl">
       
        <span className="text-Beige font-semibold tracking-wide">Welcome Admin</span>
      </div>

      {/* Right Section - Search Bar */}
      <div className="relative w-full max-w-sm md:max-w-md">
        <div className="flex items-center bg-yellow-50 text-Brown rounded-full px-4 py-2 shadow-md">
          <Search className="h-5 w-5 text-Redwood" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search users or products..."
            className="bg-transparent outline-none px-3 text-sm w-full"
          />
        </div>

        {/* 🔹 Auto-readable Results Dropdown */}
        {filteredData.length > 0 && (
          <ul className="absolute top-12 left-0 w-full bg-white rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
            {filteredData.map((item) => (
              <li
                key={item.id}
                className="px-4 py-2 hover:bg-yellow-100 flex justify-between items-center cursor-pointer"
              >
                <span className="text-Brown font-medium">{item.name}</span>
                <span className="text-sm text-Redwood italic">{item.type}</span>
              </li>
            ))}
          </ul>
        )}

        {/* If no matches and user typed something */}
        {searchTerm && filteredData.length === 0 && (
          <div className="absolute top-12 left-0 w-full bg-white rounded-xl shadow-lg z-50 p-3 text-Brown italic text-sm">
            No matches found.
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNav;



