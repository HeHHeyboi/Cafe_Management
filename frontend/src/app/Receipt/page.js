'use client';

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// --------------------------
// ตัวอย่างข้อมูลสมมติของบิล
// --------------------------
const sampleBill = {
  bill_id: "#001", // เลขที่บิล
  created_at: "2025-10-04 14:35:22", // วันที่และเวลาที่ออกบิล
  customer_name: "วีรภัทร แก้วคำลา", // ชื่อลูกค้าที่สั่ง
};

// --------------------------
// ตัวอย่างรายการสั่งซื้อ
// --------------------------
const sampleOrders = [
  { menu_name: "Cappuccino", amount: 1, size: "Medium", type: "Hot", total_price: 45 },
  { menu_name: "Latte", amount: 2, size: "Large", type: "Iced", total_price: 140 }, // 70x2
  { menu_name: "Espresso", amount: 3, size: "Small", type: "Hot", total_price: 90 }, // 30x3
  { menu_name: "Mocha", amount: 1, size: "Medium", type: "Hot", total_price: 40 },
  { menu_name: "Green Tea Latte", amount: 2, size: "Large", type: "Frappe", total_price: 160 }, // 80x2
  { menu_name: "Americano", amount: 1, size: "Large", type: "Iced", total_price: 50 },
  { menu_name: "Caramel Macchiato", amount: 1, size: "Medium", type: "Hot", total_price: 65 },
  { menu_name: "Thai Milk Tea", amount: 2, size: "Large", type: "Iced", total_price: 120 }, // 60x2
  { menu_name: "Chocolate", amount: 1, size: "Medium", type: "Frappe", total_price: 70 },
];

// --------------------------
// หน้า SlipPage (แสดงบิล/ใบเสร็จ)
// --------------------------
export default function SlipPage() {
  // ✅ คำนวณราคารวม (Subtotal)
  const subtotal = sampleOrders.reduce((sum, item) => sum + item.total_price, 0);

  // ✅ คำนวณภาษีมูลค่าเพิ่ม (VAT 7%)
  const vat = subtotal * 0.07;

  // ✅ คำนวณราคารวมสุทธิ (Subtotal + VAT)
  const grandTotal = subtotal + vat; 
  
  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      
      {/* กล่องหลักสำหรับสลิป */}
      <Card className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 space-y-4">
        
        {/* ส่วนหัวสลิป */}
        <CardHeader className="p-0">
          <CardTitle className="text-2xl font-bold text-gray-800 text-center">
            Cafe Management System
          </CardTitle>
        </CardHeader>

        {/* ข้อมูลบิล เช่น Bill ID, Customer, Date */}
        <CardContent className="p-0 mb-4">
          <div className="text-gray-700 space-y-1 text-sm">
            <div><span className="font-semibold">Bill ID:</span> {sampleBill.bill_id}</div>
            <div><span className="font-semibold">Customer:</span> {sampleBill.customer_name}</div>
            <div><span className="font-semibold">Date:</span> {sampleBill.created_at}</div>
          </div>
        </CardContent>

        {/* ตารางแสดงรายละเอียดออเดอร์แต่ละรายการ */}
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-300 text-left bg-gray-50">
                <th className="py-2 px-2">Item</th>
                <th className="py-2 px-2">Size</th>
                <th className="py-2 px-2">Type</th>
                <th className="py-2 px-2 text-right">Qty</th>
                <th className="py-2 px-2 text-right">Price (บาท)</th>
              </tr>
            </thead>
            <tbody>
              {sampleOrders.map((order, idx) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="py-2 px-2">{order.menu_name}</td>
                  <td className="py-2 px-2">{order.size}</td>
                  <td className="py-2 px-2">{order.type}</td>
                  <td className="py-2 px-2 text-right">{order.amount}</td>
                  <td className="py-2 px-2 text-right">{order.total_price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>

        {/* สรุปราคา Subtotal / VAT / Total */}
        <CardContent className="p-0 space-y-1 text-right">
          <div className="text-gray-700 text-sm">Subtotal: {subtotal.toFixed(2)} บาท</div>
          <div className="text-gray-700 text-sm">VAT 7%: {vat.toFixed(2)} บาท</div>
          <div className="text-gray-800 font-bold text-lg">Total: {grandTotal.toFixed(2)} บาท</div>
        </CardContent>

      </Card>
    </div>
  );
}
