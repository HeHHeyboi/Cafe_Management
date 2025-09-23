"use client";

import React, { useState } from "react";

export default function MenuItemCard({ name, image, sizes, price }) {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition">
      {/* รูปภาพเมนู */}
      <div className="w-full h-32 bg-gray-100 flex items-center justify-center rounded-lg mb-3 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}
      </div>

      {/* ชื่อเมนู */}
      <h2 className="text-base font-medium mb-2">{name}</h2>

      {/* เลือกขนาด */}
      <div className="flex gap-2 mb-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`px-3 py-1 rounded-lg text-sm border transition
              ${selectedSize === size
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}
            `}
          >
            {size}
          </button>
        ))}
      </div>

      {/* ราคา */}
      <p className="text-sm text-gray-600">
        ราคา: <span className="font-semibold text-gray-800">{price} บาท</span>
      </p>
    </div>
  );
}
