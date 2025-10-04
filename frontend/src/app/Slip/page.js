'use client';

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";


// --------------------------
// ตัวอย่างข้อมูลสมมติ
// --------------------------
const sampleBill = {
  bill_id: "#001",
  created_at: new Date(),
  total: 185.0,
};

const sampleOrders = [
  { menu_name: "Cappuccino", amount: 1, size: "Medium", type: "Hot", total_price: 45 },
  { menu_name: "Latte", amount: 2, size: "Large", type: "Cold", total_price: 70 },
  { menu_name: "Espresso", amount: 1, size: "Small", type: "Hot", total_price: 30 },
  { menu_name: "Mocha", amount: 1, size: "Medium", type: "Hot", total_price: 40 },
];

// --------------------------
// หน้า SlipPage
// --------------------------
export default function SlipPage() {

  // ฟังก์ชัน format วันที่
const formatDate = (date) => {
  return date.toLocaleString("th-TH", { 
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit"
  });
}


  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      
      {/* Card สลิป */}
      <Card className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 space-y-4">
        
        {/* Header */}
        <CardHeader className="p-0">
          <CardTitle className="text-xl font-bold text-gray-800 text-center">Cafe Management</CardTitle>
        </CardHeader>

        {/* Bill Info */}
        <CardContent className="p-0">
          <div className="text-gray-700 space-y-1 text-sm">
            <div><span className="font-semibold">Bill ID:</span> {sampleBill.bill_id}</div>
            <div><span className="font-semibold">Date:</span> {formatDate(sampleBill.created_at)}</div>
          </div>
        </CardContent>

        {/* Orders Table */}
        <CardContent className="p-0">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-300 text-left">
                <th className="py-2">Item</th>
                <th className="py-2">Size</th>
                <th className="py-2">Type</th>
                <th className="py-2 text-right">Qty</th>
                <th className="py-2 text-right">Price (฿)</th>
              </tr>
            </thead>
            <tbody>
              {sampleOrders.map((order, idx) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="py-2">{order.menu_name}</td>
                  <td className="py-2">{order.size}</td>
                  <td className="py-2">{order.type}</td>
                  <td className="py-2 text-right">{order.amount}</td>
                  <td className="py-2 text-right">{order.total_price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>

        {/* Total */}
        <CardContent className="p-0 flex justify-end">
          <div className="text-gray-800 font-bold text-lg">Total: {sampleBill.total.toFixed(2)} ฿</div>
        </CardContent>

        {/* ปุ่ม Print / Back */}
        <CardContent className="p-0 mt-4 flex justify-end">
          <Link href="/Admin/History" passHref>
            <button className="px-4 py-2 bg-blue-700 text-white hover:bg-blue-800 rounded transition">
              Back
            </button>
          </Link>
        </CardContent>

      </Card>
    </div>
  );
}
