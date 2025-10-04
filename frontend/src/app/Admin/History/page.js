'use client';

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function History() {
  const [historyData, setHistoryData] = useState([
    { id: "#1001", customer: "John Doe", item: "Cappuccino", amount: 45, date: "2025-10-03", status: "Completed" },
    { id: "#1002", customer: "Jane Smith", item: "Latte", amount: 30, date: "2025-10-02", status: "Pending" },
    { id: "#1003", customer: "Alice Wong", item: "Espresso", amount: 25, date: "2025-09-30", status: "Completed" },
  ]);

  // Summary ข้อมูล
  const totalOrders = historyData.length;
  const completedOrders = historyData.filter(h => h.status === "Completed").length;
  const pendingOrders = historyData.filter(h => h.status === "Pending").length;
  const canceledOrders = historyData.filter(h => h.status === "Canceled").length;
  const totalAmount = historyData.reduce((sum, h) => sum + h.amount, 0);

  useEffect(() => {
    // fetchHistoryData().then(data => setHistoryData(data));
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">ประวัติการทำรายการ</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="bg-white rounded-2xl shadow p-4 text-center">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl font-bold text-gray-900">{totalOrders}</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-2xl shadow p-4 text-center">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completed</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl font-bold text-green-600">{completedOrders}</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-2xl shadow p-4 text-center">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl font-bold text-yellow-600">{pendingOrders}</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-2xl shadow p-4 text-center">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Canceled</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl font-bold text-red-600">{canceledOrders}</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-2xl shadow p-4 text-center">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Amount</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl font-bold text-blue-700">{totalAmount} ฿</div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="bg-white rounded-2xl shadow p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-gray-700 font-medium">รายการล่าสุด</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table className="text-sm text-gray-700">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>รายการ</TableHead>
                <TableHead>จำนวนเงิน</TableHead>
                <TableHead>วันที่</TableHead>
                <TableHead>สถานะ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historyData.map((h) => (
                <TableRow key={h.id} className="hover:bg-gray-50">
                  <TableCell>{h.id}</TableCell>
                  <TableCell>{h.customer}</TableCell>
                  <TableCell>{h.item}</TableCell>
                  <TableCell>{h.amount}</TableCell>
                  <TableCell>{h.date}</TableCell>
                  <TableCell className={
                    h.status === "Completed" ? "text-green-600" :
                    h.status === "Pending" ? "text-yellow-600" : "text-red-600"
                  }>
                    {h.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
