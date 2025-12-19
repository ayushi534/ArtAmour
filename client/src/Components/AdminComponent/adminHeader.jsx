import { Bell, UserCircle } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="flex justify-between items-center bg-[#EAD5AE] px-6 py-4 shadow">
      <h2 className="text-xl font-semibold text-[#4E342E]">
        Admin Panel
      </h2>

      <div className="flex items-center gap-4">
        <Bell className="text-[#4E342E]" />
        <UserCircle className="text-[#4E342E]" />
      </div>
    </header>
  );
}

