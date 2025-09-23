// app/admin/order/page.js
'use client';

import React, { useState } from 'react';
// import Image from "next/image"; // <--- ไม่ใช้แล้ว
import Link from "next/link";
import { Coffee, Milk, CupSoda, Cake, UtensilsCrossed, Grid, Plus } from "lucide-react";
import clsx from 'clsx';

import BillPrint from '../components/BillPrint';

const menuCategories = [
  { title: "All", icon: Grid },
  { title: "Coffee", icon: Coffee },
  { title: "Juice", icon: CupSoda },
  { title: "Milk", icon: Milk },
  { title: "Snack", icon: UtensilsCrossed },
  { title: "Dessert", icon: Cake },
];

const allMenuItems = [
  // เปลี่ยน image url เป็นแค่ string เพื่อไม่ต้องกังวลเรื่อง config
  { id: 'm1', name: "Latte", category: "Coffee", price: 60, image: "#f0f0f0" }, // ใช้สีแทน URL ชั่วคราว
  { id: 'm2', name: "Cappuccino", category: "Coffee", price: 65, image: "#d0d0d0" },
  { id: 'm3', name: "Orange Juice", category: "Juice", price: 45, image: "#f0f0c0" },
  { id: 'm4', name: "Milk Tea", category: "Milk", price: 50, image: "#e0e0e0" },
  { id: 'm5', name: "Croissant", category: "Snack", price: 40, image: "#c0f0f0" },
  { id: 'm6', name: "Cheesecake", category: "Dessert", price: 80, image: "#f0d0f0" },
  { id: 'm7', name: "Espresso", category: "Coffee", price: 50, image: "#a0a0a0" },
  { id: 'm8', name: "Apple Pie", category: "Dessert", price: 70, image: "#f0b0b0" },
  { id: 'm9', name: "Sandwich", category: "Snack", price: 60, image: "#b0f0b0" },
];


export default function AdminOrderPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentBillItems, setCurrentBillItems] = useState([]);

  const filteredMenuItems =
    selectedCategory === "All"
      ? allMenuItems
      : allMenuItems.filter((item) => item.category === selectedCategory);

  const handleAddItemToBill = (menuItem) => {
    setCurrentBillItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === menuItem.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...menuItem, quantity: 1 }];
      }
    });
  };

  const handleUpdateItemQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(id);
      return;
    }
    setCurrentBillItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCurrentBillItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleClearBill = () => {
    setCurrentBillItems([]);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100 font-sans">
      {/* ===== ส่วนซ้าย: Menu Order ===== */}
      <div className="w-3/5 bg-white shadow-lg overflow-hidden border-r border-gray-200 flex flex-col">
        <div className="flex-shrink-0 p-6 pb-2 border-b border-gray-200 bg-white z-10">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Menu Order</h1>
            <Link href="/Admin/AddNewMenu" passHref>
              <button className="px-4 py-2 bg-amber-700 text-white rounded-xl hover:bg-amber-800 transition shadow">
                Add New Menu
              </button>
            </Link>
          </div>

          {/* ปุ่มเลือกหมวดหมู่ */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {menuCategories.map((item) => {
              const Icon = item.icon;
              const isActive = selectedCategory === item.title;
              return (
                <button
                  key={item.title}
                  onClick={() => setSelectedCategory(item.title)}
                  className={clsx(
                    "flex flex-col items-center justify-center rounded-xl py-3 px-2 shadow-sm transition-colors",
                    isActive
                      ? "bg-amber-700 text-white"
                      : "bg-gray-50 text-gray-700 hover:bg-amber-100 hover:text-amber-800"
                  )}
                >
                  <Icon className="h-6 w-6 mb-1" />
                  <span className="text-sm font-medium">{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* แสดงเมนู Mock (ที่กรองแล้ว) */}
        <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMenuItems.map((item) => (
              <div
                key={item.id}
                className="relative border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden
                           flex flex-col hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => handleAddItemToBill(item)}
              >
                <div 
                  // --- แก้ไขตรงนี้ ---
                  // ลบ next/image ออก และใช้ div แทน
                  className="relative w-full h-32 bg-gray-100 rounded-t-xl overflow-hidden" 
                  style={{ backgroundColor: item.image }} // ใช้ item.image เป็นสีพื้นหลัง
                >
                  {/* ไม่ต้องมี Image component แล้ว */}
                </div>
                <div className="p-3 flex-grow">
                  <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
                <div className="p-3 pt-0 flex items-center justify-between">
                  <p className="text-md font-bold text-amber-700">{item.price} บาท</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddItemToBill(item);
                    }}
                    className="p-2 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition"
                    aria-label={`Add ${item.name} to order`}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== ส่วนขวา: Bill Display ===== */}
      <div className="w-2/5 bg-white shadow-lg overflow-hidden flex flex-col">
        <BillPrint
          billItems={currentBillItems}
          onUpdateItemQuantity={handleUpdateItemQuantity}
          onRemoveItem={handleRemoveItem}
          onClearBill={handleClearBill}
        />
      </div>
    </div>
  );
}