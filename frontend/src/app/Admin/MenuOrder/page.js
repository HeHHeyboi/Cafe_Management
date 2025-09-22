'use client';

import React, { useState } from "react";
import { Coffee, Milk, CupSoda, Cake, UtensilsCrossed, Grid } from "lucide-react";

const menuCategories = [
  { title: "All", icon: Grid },
  { title: "Coffee", icon: Coffee },
  { title: "Juice", icon: CupSoda },
  { title: "Milk", icon: Milk },
  { title: "Snack", icon: UtensilsCrossed },
  { title: "Dessert", icon: Cake },
];

export default function MenuOrderPage() {
  const [selected, setSelected] = useState("All");

  return (
    <div className="p-6">
      <h1 className="text-lg font-medium mb-4">Menu Order</h1>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {menuCategories.map((item) => {
          const Icon = item.icon;
          const isActive = selected === item.title;
          return (
            <button
              key={item.title}
              onClick={() => setSelected(item.title)}
              className={`flex flex-col items-center justify-center rounded-xl shadow border-gray-1000 py-4 px-2 transition-colors
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

      <div className="mt-6 text-sm text-gray-600">
        Selected: <span className="font-medium text-blue-600">{selected}</span>
      </div>
    </div>
  );
}
