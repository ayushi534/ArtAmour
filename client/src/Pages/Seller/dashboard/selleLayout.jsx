import { Outlet } from "react-router-dom";
import SellerSidebar from "../../../components/SellerComponent/sellerSidebar";
import SellerHeader from "../../../components/SellerComponent/sellerHeader";

export default function SellerLayout() {
  return (
    <div className="flex min-h-screen bg-[#EFDFBD]">
      <SellerSidebar />

      <div className="flex-1 flex flex-col">
        <SellerHeader />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
