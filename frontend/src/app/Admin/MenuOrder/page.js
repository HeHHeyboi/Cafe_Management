'use client';

import React, { useState } from "react";
import { Coffee, Milk, CupSoda, Cake, UtensilsCrossed, Grid } from "lucide-react";

// หมวดหมู่
const menuCategories = [
  { title: "All", icon: Grid },
  { title: "Coffee", icon: Coffee },
  { title: "Juice", icon: CupSoda },
  { title: "Milk", icon: Milk },
  { title: "Snack", icon: UtensilsCrossed },
  { title: "Dessert", icon: Cake },
];

// Mock เมนู
const menuItems = [
  { name: "Latte", category: "Coffee", price: 60, image: "https://via.placeholder.com/150" },
  { name: "Cappuccino", category: "Coffee", price: 65, image: "https://via.placeholder.com/150" },
  { name: "Orange Juice", category: "Juice", price: 45, image: "https://via.placeholder.com/150" },
  { name: "Milk Tea", category: "Milk", price: 50, image: "https://via.placeholder.com/150" },
  { name: "Croissant", category: "Snack", price: 40, image: "https://via.placeholder.com/150" },
  { name: "Cheesecake", category: "Dessert", price: 80, image: "https://via.placeholder.com/150" },
];

export default function MenuOrderPage() {
  const [selected, setSelected] = useState("All");

  // filter เมนูตามหมวดหมู่
  const filteredItems =
    selected === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selected);

  return (
    <div className="p-6">
    <div className="flex items-center justify-between mb-4">
  <h1 className="text-lg font-medium">Menu Order</h1>
  <button className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition">
    Add New Menu
  </button>
</div>
      

      {/* ปุ่มเลือกหมวดหมู่ */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {menuCategories.map((item) => {
          const Icon = item.icon;
          const isActive = selected === item.title;
          return (
            <button
              key={item.title}
              onClick={() => setSelected(item.title)}
              className={`flex flex-col items-center justify-center rounded-xl py-4 px-2 transition-colors
                ${isActive
                  ? "bg-blue-500 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
              `}
            >
              <Icon className="h-6 w-6 mb-2" /> 
              <span className="text-sm">{item.title}</span> 
            </button>
          );
        })}
      </div>

      {/* แสดงหมวดหมู่ที่เลือก */}
      <div className="mt-6 text-sm text-gray-600">
        Selected: <span className="font-medium text-blue-600">{selected}</span>
      </div>

      {/* แสดงเมนู Mock */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div key={item.name} className="border rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition">
            <div className="w-full h-28 bg-gray-100 flex items-center justify-center rounded mb-2 overflow-hidden">
              <img src={item.image} alt={item.name} className="object-cover h-full" />
            </div>
            <h2 className="text-sm font-medium">{item.name}</h2>
            <p className="text-xs text-gray-500">{item.category}</p>
            <p className="text-sm font-semibold text-blue-600">{item.price} บาท</p>
          </div>
        ))}
      </div>
    </div>
  );
}
