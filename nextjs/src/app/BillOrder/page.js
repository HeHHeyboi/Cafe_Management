// app/BillOrder/page.js
"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function BillOrderPage() {

  // Dummy Data (Replace with API calls later)
  const [bill, setBill] = useState({
    bill_id: "12345",
    total: 513.00,
    pay_date: "2023-10-27",
    user_id: "user123",
    giveaway_id: null,
  });
  const [billItems, setBillItems] = useState([
    {
      id: 1,
      menu: { name: "ESPRESSO เอสเพรสโซ", menu_type: "เครื่องดื่ม", type: "ร้อน" },
      price: 45.00,
      quantity: 1,
    },
    {
      id: 2,
      menu: { name: "ESPRESSO เอสเพรสโซ", menu_type: "เครื่องดื่ม", type: "เย็น" },
      price: 70.00,
      quantity: 1,
    },
    {
      id: 3,
      menu: { name: "AMERICANO อเมริกาโน่", menu_type: "เครื่องดื่ม", type: "ร้อน" },
      price: 50.00,
      quantity: 1,
    },
    {
      id: 4,
      menu: {
        name: "HONEY TOAST ฮันนี่โทสต์ (ไอศกรีม 2 สกู๊ป วิปครีม)",
        menu_type: "ของหวาน",
        type: null,
      },
      price: 169.00,
      quantity: 1,
    },
    {
      id: 5,
      menu: {
        name: "THAI TEA TOAST ชาไทยโทสต์ (ไอศกรีม 1 สกู๊ป วิปครีม)",
        menu_type: "ของหวาน",
        type: null,
      },
      price: 179.00,
      quantity: 1,
    },
  ]);

  const [loading, setLoading] = useState(false);  // Set to false initially since we have dummy data
  const [error, setError] = useState(null);


  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-red-500">Error: {error}</div>
    );
  }

  if (!bill) { // Handle case where bill is null
    return <div className="container mx-auto p-4">Bill not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bill Details (ID: {bill.bill_id})</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Menu Item</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {billItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.menu.name}</TableCell>
                <TableCell>
                  {item.menu.menu_type} {item.menu.type ? `(${item.menu.type})` : ""}
                </TableCell>
                <TableCell>{item.price.toFixed(2)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{(item.price * item.quantity).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Separator className="my-4" />
        <div className="mt-4">
          <p className="text-lg font-bold">Total Price: {bill.total.toFixed(2)}</p>
        </div>

        <div className="mt-4">
          <p>
            <strong>Payment Date:</strong> {bill.pay_date}
          </p>
        </div>

        <div className="mt-4 flex justify-end space-x-4">
          <Link href="/menu">
            <Button variant="outline">Add New Order</Button>
          </Link>
            {/* <Button variant="default">Print</Button> */}
        </div>
      </div>
    </div>
  );
}