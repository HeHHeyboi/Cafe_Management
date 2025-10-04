'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
// UI Components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// Icons
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export default function HistoryPage() {

  // --------------------------
  // Mock Data: ตัวอย่าง order history
  // --------------------------
  const [historyData] = useState([
    { id: "#1001", customer: "John Doe", item: ["Cappuccino"], amount: 45, date: "2025-10-03", status: "Completed" },
    { id: "#1002", customer: "Jane Smith", item: ["Latte", "Espresso","Latte", "Espresso","Latte", "Espresso"], amount: 30, date: "2025-10-02", status: "Pending" },
    { id: "#1003", customer: "Alice Wong", item: ["Espresso"], amount: 25, date: "2025-09-30", status: "Completed" },
    { id: "#1004", customer: "Bob Marley", item: ["Mocha", "Latte"], amount: 50, date: "2025-10-01", status: "Canceled" },
    { id: "#1005", customer: "Chris Brown", item: ["Latte"], amount: 35, date: "2025-10-03", status: "Completed" },
  ]);

  // --------------------------
  // Menu Items
  // --------------------------
  const menuItems = ["Cappuccino", "Latte", "Espresso", "Mocha", "Americano", "Macchiato", "Flat White"];
  const sortedItems = menuItems.sort((a,b) => a.localeCompare(b));

  // --------------------------
  // Dropdown State
  // --------------------------
  const [selectedStatusSummary, setSelectedStatusSummary] = useState("All"); // All, Completed, Pending, Canceled
  const [selectedProductSummary, setSelectedProductSummary] = useState("Cappuccino");

  // --------------------------
  // Calculate summary
  // --------------------------
  const totalOrders = selectedStatusSummary === "All" ? historyData.length : historyData.filter(h => h.status === selectedStatusSummary).length;
  const totalAmount = historyData
    .filter(h => selectedStatusSummary === "All" || h.status === selectedStatusSummary)
    .reduce((sum,h) => sum + h.amount, 0);

  // Product summary: total qty and amount
  const productOrders = historyData.filter(h => h.item.includes(selectedProductSummary));
  const productQty = productOrders.reduce((sum,h) => sum + h.item.filter(i=>i===selectedProductSummary).length, 0);
  const productAmount = productOrders.reduce((sum,h) => {
    const qty = h.item.filter(i=>i===selectedProductSummary).length;
    return sum + (h.amount * qty / h.item.length); // แบ่ง amount ตาม qty ของ item
  },0);

  // --------------------------
  // Pagination
  // --------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const handleNextPage = () => { if(currentPage < totalFilteredPages) setCurrentPage(currentPage + 1); };
  const handlePrevPage = () => { if(currentPage > 1) setCurrentPage(currentPage - 1); };

  // --------------------------
  // Filter / Search / Sort State
  // --------------------------
  const [searchCustomer, setSearchCustomer] = useState("");
  const [itemFilter, setItemFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState("id");
  const [sortAsc, setSortAsc] = useState(false);

  // --------------------------
  // Filter + Search + Sort
  // --------------------------
  const filteredHistory = historyData
    .filter(h =>
      (itemFilter === "All" || h.item.includes(itemFilter)) &&
      (statusFilter === "All" || h.status === statusFilter) &&
      h.customer.toLowerCase().includes(searchCustomer.toLowerCase())
    )
    .sort((a, b) => {
      if(sortField === "id") return sortAsc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
      if(sortField === "amount") return sortAsc ? a.amount - b.amount : b.amount - a.amount;
      if(sortField === "date") return sortAsc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
      return 0;
    });

  const currentPageHistory = filteredHistory.slice(indexOfFirst, indexOfLast);
  const totalFilteredPages = Math.ceil(filteredHistory.length / rowsPerPage);

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">Order History</h1>

      {/* Summary Cards */}
        <div className="flex flex-col md:flex-row gap-6">
        {/* Status Summary Card */}
        <Card className="bg-white rounded-2xl shadow p-4 text-center hover:shadow-md transition flex-1">
          <CardHeader className="p-0 mb-2 flex flex-col items-center space-y-2">
            <CardTitle className="text-sm font-medium text-gray-500">Orders Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col items-center space-y-2">
            {/* ค่าที่สรุป */}
            <div className="text-2xl font-bold text-gray-900">{totalOrders} Orders</div>
            <div className="text-blue-700 font-semibold mt-1">{totalAmount.toFixed(2)} บาท</div>

            {/* ฟิลเตอร์ */}
            <Select value={selectedStatusSummary} onValueChange={val => setSelectedStatusSummary(val)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Product Summary Card */}
        <Card className="bg-white rounded-2xl shadow p-4 text-center hover:shadow-md transition flex-1">
          <CardHeader className="p-0 mb-2 flex flex-col items-center space-y-2">
            <CardTitle className="text-sm font-medium text-gray-500">Product Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col items-center space-y-2">
            {/* ค่าที่สรุป */}
            <div className="text-2xl font-bold text-gray-900">{productQty} pcs</div>
            <div className="text-blue-700 font-semibold mt-1">{productAmount.toFixed(2)} บาท</div>

            {/* ฟิลเตอร์ */}
            <Select value={selectedProductSummary} onValueChange={val => setSelectedProductSummary(val)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Product" />
              </SelectTrigger>
              <SelectContent className="max-h-40 overflow-y-auto">
                {sortedItems.map(item => (
                  <SelectItem key={item} value={item}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Table + Filter */}
      <Card className="bg-white rounded-2xl shadow p-6">
        {/* Header + Filter */}
        <CardHeader className="p-0 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
          <CardTitle className="text-gray-700 font-medium">All Orders</CardTitle>
          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="text"
              placeholder="Search by customer..."
              value={searchCustomer}
              onChange={e => { setSearchCustomer(e.target.value); setCurrentPage(1); }}
              className="w-52 px-3 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <Select value={itemFilter} onValueChange={val => { setItemFilter(val); setCurrentPage(1); }}>
              <SelectTrigger>
                <SelectValue placeholder="Select Item" />
              </SelectTrigger>
              <SelectContent className="max-h-40 overflow-y-auto">
                <SelectItem value="All">All Products</SelectItem>
                {sortedItems.map(item => (
                  <SelectItem key={item} value={item}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={val => { setStatusFilter(val); setCurrentPage(1); }}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        {/* Table */}
        <CardContent className="p-0">
          <Table className="text-sm text-gray-700">
            <TableHeader>
              <TableRow className="bg-gray-100 text-center">
                <TableHead className="cursor-pointer" onClick={() => { setSortField("id"); setSortAsc(!sortAsc); }}>
                  <div className="flex items-center justify-center gap-1 text-center">
                    ID {sortAsc && sortField==="id" ? <ChevronUpIcon className="w-4 h-4"/> : <ChevronDownIcon className="w-4 h-4"/>}
                  </div>
                </TableHead>
                <TableHead className="text-center">Customer</TableHead>
                <TableHead className="text-center">Product</TableHead>
                <TableHead className="cursor-pointer" onClick={() => { setSortField("amount"); setSortAsc(!sortAsc); }}>
                  <div className="flex items-center justify-center gap-1 text-center">
                    Amount (บาท) {sortAsc && sortField==="amount" ? <ChevronUpIcon className="w-4 h-4"/> : <ChevronDownIcon className="w-4 h-4"/>}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => { setSortField("date"); setSortAsc(!sortAsc); }}>
                  <div className="flex items-center justify-center gap-1 text-center">
                    Date {sortAsc && sortField==="date" ? <ChevronUpIcon className="w-4 h-4"/> : <ChevronDownIcon className="w-4 h-4"/>}
                  </div>
                </TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Receipt</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentPageHistory.map(h => (
                <TableRow key={h.id} className="hover:bg-gray-50 text-center">
                  <TableCell>{h.id}</TableCell>
                  <TableCell>{h.customer}</TableCell>
                  <TableCell className="max-w-[120px] break-words whitespace-normal">{h.item.join(", ")}</TableCell>  
                  <TableCell>{h.amount} บาท</TableCell>
                  <TableCell>{h.date}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      h.status==="Completed" ? "bg-green-200 text-green-800" :
                      h.status==="Pending" ? "bg-yellow-200 text-yellow-800" :
                      "bg-red-200 text-red-800"
                    }`}>{h.status}</span>
                  </TableCell>
                  <TableCell>
                    <Link href={`/Receipt/${h.id}`} target="_blank">
                      <button className="px-3 py-1 bg-gray-700 hover:bg-gray-800 text-white rounded-sm text-sm transition">
                        View
                      </button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-8">
            <button onClick={handlePrevPage} disabled={currentPage===1} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded disabled:opacity-50">Prev</button>
            <span className="text-gray-600">Page {currentPage} of {totalFilteredPages}</span>
            <button onClick={handleNextPage} disabled={currentPage===totalFilteredPages} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded disabled:opacity-50">Next</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
