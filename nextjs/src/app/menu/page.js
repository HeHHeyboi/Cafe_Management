"use client";

import { useState } from "react";

export default function MenuPage() {
  const menuItems = ["สตรอว์เบอร์รี่มิลค์เชค", "ชาไทย", "ชาเขียว", "โกโก้", "นมสด"];
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (item) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleRemove = (item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
  };

  return (
    <div className="flex gap-8 p-8">
      {/* รายการที่เลือก */}
      <div className="w-1/2 border p-4">
        <h2 className="text-xl font-bold mb-4">รายการที่เลือก</h2>
        <div className="grid grid-cols-2 gap-2">
          {selectedItems.map((item) => (
            <div
              key={item}
              className="cursor-pointer p-4 bg-red-100 hover:bg-red-200 text-center rounded-lg"
              onClick={() => handleRemove(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      
      {/* เมนูอาหาร */}
      <div className="w-1/2 border p-4">
        <h2 className="text-xl font-bold mb-4">เมนูอาหาร</h2>
        <div className="grid grid-cols-2 gap-2">
          {menuItems.map((item) => (
            <div
              key={item}
              className="cursor-pointer p-4 bg-gray-100 hover:bg-gray-200 text-center rounded-lg"
              onClick={() => handleSelect(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
