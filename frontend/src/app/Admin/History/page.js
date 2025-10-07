'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "../../../components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "../../../components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "../../../components/ui/select";

export default function HistoryPage() {
  const [groupedOrders, setGroupedOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter / summary state
  const [selectedStatusSummary, setSelectedStatusSummary] = useState("All"); // (ถ้ามี status ภายหลัง)
  const [selectedProductSummary, setSelectedProductSummary] = useState(""); // เมนูที่เลือกสรุป

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // สำหรับ filter / search / sort (ถ้าต้องการ)
  const [searchTerm, setSearchTerm] = useState("");
  const [itemFilter, setItemFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState("bill_id");
  const [sortAsc, setSortAsc] = useState(true);

  // ดึงข้อมูล API และจัดกลุ่ม
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order`);
  //       const data = res.data;

  //       // กลุ่มตาม bill_id
  //       const groups = {};
  //       data.forEach(order => {
  //         const {
  //           bill_id,
  //           menu_name,
  //           amount,
  //           size,
  //           type,
  //           total_price,
  //         } = order;

  //         if (!groups[bill_id]) {
  //           groups[bill_id] = {
  //             bill_id,
  //             items: [],
  //             total_price: 0,
  //           };
  //         }
  //         groups[bill_id].items.push({
  //           menu_name,
  //           amount,
  //           size,
  //           type,
  //           total_price,
  //         });
  //         groups[bill_id].total_price += total_price;
  //       });

  //       const groupedList = Object.values(groups);
  //       setGroupedOrders(groupedList);

  //       // ตั้งค่า default สำหรับ selectedProductSummary ถ้ายังไม่ตั้ง
  //       if (groupedList.length > 0) {
  //         const allMenus = Array.from(new Set(
  //           groupedList.flatMap(g => g.items.map(i => i.menu_name))
  //         ));
  //         if (allMenus.length > 0 && selectedProductSummary === "") {
  //           setSelectedProductSummary(allMenus[0]);
  //         }
  //       }

  //       setLoading(false);
  //     } catch (err) {
  //       console.error("Error fetching order data:", err);
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrders();
  // }, []);
  // 1) useEffect ดึง order ข้อมูล
useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order`);
      const data = res.data;

      const groups = {};
      data.forEach(order => {
        const { bill_id, menu_name, amount, size, type, total_price } = order;

        if (!groups[bill_id]) {
          groups[bill_id] = {
            bill_id,
            items: [],
            total_price: 0,
          };
        }
        groups[bill_id].items.push({ menu_name, amount, size, type, total_price });
        groups[bill_id].total_price += total_price;
      });

      setGroupedOrders(Object.values(groups));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching order data:", err);
      setLoading(false);
    }
  };

  fetchOrders();
}, []);

// 2) useEffect สำหรับ set default selected product
useEffect(() => {
  if (groupedOrders.length > 0 && selectedProductSummary === "") {
    const allMenus = Array.from(
      new Set(groupedOrders.flatMap(g => g.items.map(i => i.menu_name)))
    ).filter(menu => menu !== ""); // ป้องกันค่าว่าง

    if (allMenus.length > 0) {
      setSelectedProductSummary(allMenus[0]);
    }
  }
}, [groupedOrders, selectedProductSummary]);

  if (loading) {
    return <div className="p-10 text-center text-gray-600">Loading orders...</div>;
  }

  // ─── Pagination calculations ───
  const totalPages = Math.ceil(groupedOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = groupedOrders.slice(indexOfFirstItem, indexOfLastItem);

  // ─── สรุปภาพรวม ───
  const totalOrders = groupedOrders.length;
  const totalAmount = groupedOrders.reduce((sum, g) => sum + g.total_price, 0);

  // สรุปเฉพาะ product ที่เลือก
  const productOrders = groupedOrders.filter(g =>
    g.items.some(i => i.menu_name === selectedProductSummary)
  );

  const productQty = productOrders.reduce((sum, g) => {
    return sum + g.items.filter(i => i.menu_name === selectedProductSummary)
                       .reduce((ss, it) => ss + it.amount, 0);
  }, 0);

  const productAmount = productOrders.reduce((sum, g) => {
    const amtForThisMenu = g.items
      .filter(i => i.menu_name === selectedProductSummary)
      .reduce((ss, it) => ss + it.total_price, 0);
    return sum + amtForThisMenu;
  }, 0);

  // รายชื่อเมนูทั้งหมดสำหรับ select
  const allMenus = Array.from(new Set(
    groupedOrders.flatMap(g => g.items.map(i => i.menu_name))
  ));
  const sortedMenus = allMenus.sort((a, b) => a.localeCompare(b));

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Order History</h1>

      {/* Summary */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Orders Summary */}
        <Card className="flex-1 bg-white rounded-2xl shadow p-4 hover:shadow-md transition">
          <CardHeader className="p-0 mb-2 flex flex-col items-center space-y-2">
            <CardTitle className="text-sm font-medium text-gray-500">Orders Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col items-center space-y-2">
            <div className="text-2xl font-bold text-gray-900">{totalOrders} Orders</div>
            <div className="text-blue-700 font-semibold">{totalAmount.toFixed(2)} บาท</div>
          </CardContent>
        </Card>

        {/* Product Summary */}
        <Card className="flex-1 bg-white rounded-2xl shadow p-4 hover:shadow-md transition">
          <CardHeader className="p-0 mb-2 flex flex-col items-center space-y-2">
            <CardTitle className="text-sm font-medium text-gray-500">Product Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col items-center space-y-2">
            <div className="text-2xl font-bold text-gray-900">{productQty} pcs</div>
            <div className="text-blue-700 font-semibold">{productAmount.toFixed(2)} บาท</div>

            <Select value={selectedProductSummary} onValueChange={val => setSelectedProductSummary(val)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Product" />
              </SelectTrigger>
              <SelectContent className="max-h-40 overflow-y-auto">
                {sortedMenus
  .filter(menu => menu !== "")
  .map(menu => (
    <SelectItem key={menu} value={menu}>{menu}</SelectItem>
  ))}

              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Table of orders */}
      <Card className="bg-white rounded-2xl shadow p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-gray-700 font-medium">Orders Detail</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="text-sm text-gray-700">
            <TableHeader>
              <TableRow className="bg-gray-100 text-center">
                <TableHead>Bill ID</TableHead>
                <TableHead>Menu Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Total Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.map(g => (
                <React.Fragment key={g.bill_id}>
                  {g.items.map((it, idx) => (
                    <TableRow key={`${g.bill_id}-${idx}`} className="text-left hover:bg-gray-50">
                      <TableCell className="text-left">{idx === 0 ? g.bill_id : ""}</TableCell>
                      <TableCell className="text-left">{it.menu_name}</TableCell>
                      <TableCell className="text-left">{it.amount}</TableCell>
                      <TableCell className="text-left uppercase">{it.size ?? "-"}</TableCell>
                      <TableCell className="text-left">{it.type ?? "-"}</TableCell>
                      <TableCell className="text-left">{it.total_price.toFixed(2)} บาท</TableCell>
                    </TableRow>
                  ))}
                  {/* summary row per bill */}
                  <TableRow className="bg-gray-100 text-left font-semibold">
                    <TableCell colSpan={5}>Bill Total:</TableCell>
                    <TableCell>{g.total_price.toFixed(2)} บาท</TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center space-x-2 mt-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 rounded ${
                  pageNum === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
