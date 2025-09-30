// app/admin/order/page.js
'use client';

import React, { useState } from 'react';

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
  { id: 'm1', name: "Latte", category: "Coffee", price: 60, image: "#f0f0f0" },
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

  // ---------- เพิ่ม state สำหรับ Modal ----------
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [menuItemPending, setMenuItemPending] = useState(null);
  const [drinkType, setDrinkType] = useState(""); // "ร้อน", "เย็น", "ปั่น"
  const [cupSize, setCupSize] = useState(""); // "S", "M", "L"

  const filteredMenuItems =
    selectedCategory === "All"
      ? allMenuItems
      : allMenuItems.filter((item) => item.category === selectedCategory);

  // ---------- ปรับจากเดิม: คลิกใช้ modal ----------
  const handleMenuClick = (item) => {
    setMenuItemPending(item);
    setDrinkType("");
    setCupSize("");
    setShowOptionModal(true);
  };

  // ---------- เพิ่ม: ยืนยันการเลือก option ----------
  const handleConfirmAdd = () => {
    if (!menuItemPending) return;

    // สร้าง id ใหม่เพื่อระบุตัวเลือกที่ต่างกัน (กันชนกัน)
    const optionId = menuItemPending.id + "|" + drinkType + "|" + cupSize;

    const option = {
      id: optionId,
      name: menuItemPending.name,
      category: menuItemPending.category,
      price: menuItemPending.price,
      image: menuItemPending.image,
      quantity: 1,
      drinkType,
      cupSize,
    };

    setCurrentBillItems(prevItems => {
      const exist = prevItems.find(i => i.id === option.id);
      if (exist) {
        return prevItems.map(i =>
          i.id === option.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, option];
      }
    });

    setShowOptionModal(false);
    setMenuItemPending(null);
  };

  // ---------- ส่วนลดจำนวน/ลบ ----------
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

        {/* เมนู */}
        <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMenuItems.map((item) => (
              <div
                key={item.id}
                className="relative border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => handleMenuClick(item)} aria-label={`Select ${item.name}`}
              >
                <div
                  className="relative w-full h-32 bg-gray-100 rounded-t-xl overflow-hidden"
                  style={{ backgroundColor: item.image }}
                ></div>
                <div className="p-3 flex-grow">
                  <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
                <div className="p-3 pt-0 flex items-center justify-between">
                  <p className="text-md font-bold text-amber-700">{item.price} บาท</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuClick(item);
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

      {/* ===== ฝั่งขวา: Bill Display ===== */}
      <div className="w-2/5 bg-white shadow-lg overflow-hidden flex flex-col">
        <BillPrint
          billItems={currentBillItems}
          onUpdateItemQuantity={handleUpdateItemQuantity}
          onRemoveItem={handleRemoveItem}
          onClearBill={handleClearBill}
        />
      </div>

      {/* ===== Modal เลือกตัวเลือก ===== */}
      {showOptionModal && (
        <div className=" flex fixed z-50 inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl p-6 w-[320px] shadow-xl">
            <h2 className="font-bold text-xl mb-4 text-center">{menuItemPending?.name}</h2>
            <div className="mb-5">
              <label className="block mb-3 ">ประเภท</label>
              <div className=" flex gap-3 justify-center">
                {["Hot", "Ice", "Frappe"].map(type => (
                  <button key={type}
                    onClick={() => setDrinkType(type)}
                    className={`px-4 py-2 rounded-full border ${drinkType === type ? "bg-amber-700 text-white" : "bg-gray-100"}`}>
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-7">
              <label className="block mb-1">ขนาดแก้ว</label>
              <div className="flex gap-3 justify-center">
                {["S", "M", "L","XL"].map(size => (
                  <button key={size}
                    onClick={() => setCupSize(size)}
                    className={`px-4 py-2 rounded-full border ${cupSize === size ? "bg-amber-700 text-white" : "bg-gray-100"}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setShowOptionModal(false)}
                      className="px-4 py-2 bg-gray-200 rounded-lg">ยกเลิก</button>
              <button 
                onClick={handleConfirmAdd}
                className="px-4 py-2 bg-amber-700 text-white rounded-lg disabled:bg-gray-400"
                disabled={!drinkType || !cupSize}
              >AddMenu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}