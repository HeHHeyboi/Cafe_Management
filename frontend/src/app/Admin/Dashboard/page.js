'use client';

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AdminDashboardPage() {
  const [range, setRange] = useState("30d"); // Default 30 วัน

  // Mock Data
  const users = 780;
  const ordersToday = 125;
  const revenueThisMonth = 8790;
  const topProduct = { name: "Cappuccino", sold: 340 };
  const lowStock = 3;

  const latestOrders = [
    { id: "#1023", customer: "John Doe", total: 45, status: "Completed" },
    { id: "#1024", customer: "Jane Smith", total: 30, status: "Pending" },
    { id: "#1025", customer: "Alice Wong", total: 25, status: "Cancelled" },
  ];

  const topProducts = [
    { product: "Cappuccino", sold: 340, revenue: 1020 },
    { product: "Latte", sold: 280, revenue: 840 },
    { product: "Espresso", sold: 150, revenue: 450 },
  ];

  // Revenue Chart Data ตามช่วงเวลา
  const ranges = {
    "7d": {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      data: [500, 700, 800, 600, 750, 900, 650],
    },
    "30d": {
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000) + 500),
    },
    "3m": {
      labels: ["July", "August", "September"],
      data: [8500, 9200, 8800],
    },
  };

  const selectedRange = ranges[range];

  const barData = {
    labels: selectedRange.labels,
    datasets: [
      {
        label: "Revenue",
        data: selectedRange.data,
        backgroundColor: "#FFA000", 
        borderRadius: 8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { display: false } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="space-y-10 p-8 bg-gray-50 min-h-screen">
      {/* Cards Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {[
          { title: "Users", value: users, sub: "All time" },
          { title: "Orders Today", value: ordersToday, sub: "Completed / Pending" },
          { title: "Revenue This Month", value: `$${revenueThisMonth.toLocaleString()}`, sub: "Compared to last month" },
          { title: "Top Product", value: topProduct.name, sub: `Units sold: ${topProduct.sold}` },
          { title: "Low Stock Items", value: lowStock, sub: "Needs restock" },
        ].map((card, i) => (
          <Card key={i} className="bg-white rounded-2xl shadow hover:shadow-md transition p-4">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-sm text-gray-500 font-medium">{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-2xl font-bold text-gray-900">{card.value}</div>
              <div className="text-xs text-gray-400">{card.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
        <Card className="bg-white rounded-2xl shadow p-6">
        <CardHeader className="flex justify-between items-center p-0 mb-4">
            <CardTitle className="text-gray-700 font-medium">Revenue</CardTitle>
            <Select onValueChange={(val) => setRange(val)} defaultValue={range}>
            <SelectTrigger className="w-32">
                <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="3m">Last 3 months</SelectItem>
            </SelectContent>
            </Select>
        </CardHeader>
        <CardContent className="p-0">
            <div className="w-full h-72">
            <Bar data={barData} options={{
                ...barOptions,
                maintainAspectRatio: false, // ให้เต็มกรอบ
            }} />
            </div>
        </CardContent>
        </Card>

      {/* Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Latest Orders */}
        <Card className="bg-white rounded-2xl shadow p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-gray-700 font-medium">Latest Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table className="text-sm text-gray-700">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestOrders.map(order => (
                  <TableRow key={order.id} className="hover:bg-gray-50">
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>${order.total}</TableCell>
                    <TableCell className={
                      order.status === "Completed" ? "text-green-600" :
                      order.status === "Pending" ? "text-yellow-600" : "text-red-600"
                    }>
                      {order.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="bg-white rounded-2xl shadow p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-gray-700 font-medium">Top Products</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table className="text-sm text-gray-700">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Product</TableHead>
                  <TableHead>Sold</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map(item => (
                  <TableRow key={item.product} className="hover:bg-gray-50">
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.sold}</TableCell>
                    <TableCell>${item.revenue.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
