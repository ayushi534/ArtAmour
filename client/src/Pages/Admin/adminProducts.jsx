import { Check, X } from "lucide-react";

export default function AdminProducts() {
  return (
    <div className="bg-[#ffebd6] rounded shadow p-6">
      <h2 className="text-xl font-semibold text-[#4E342E] mb-4">
        Seller Product Approvals
      </h2>

      <table className="w-full border">
        <thead className="bg-[#E2B787]">
          <tr>
            <th className="p-2">Product</th>
            <th>Seller</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-t">
            <td className="p-2">Handmade Vase</td>
            <td>Ruchita Arts</td>
            <td>₹1200</td>
            <td className="text-[#C9A14A]">Pending</td>
            <td className="flex gap-2 p-2">
              <button className="text-green-700">
                <Check />
              </button>
              <button className="text-red-700">
                <X />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
