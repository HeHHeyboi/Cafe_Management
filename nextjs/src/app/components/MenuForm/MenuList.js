// src/app/components/MenuForm/MenuList.js
"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image"; // Import Image

function MenuList({ menuItems, onEdit, onDelete }) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {menuItems.map((item) => (
        <div
          key={item.menu_id}  // ใช้ item.menu_id
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg font-semibold">{item.name}</h2>

          {/* แสดงรูปภาพ */}
          {item.img_url && ( // ตรวจสอบว่ามี img_url ก่อน
            <Image
                src={"http://localhost:8080"+item.img_url}
                alt={item.name}
                width={500}  // กำหนด width และ height *หรือ* ใช้ layout
                height={300}
                className="w-full h-48 object-cover mb-4 rounded-t-lg" // Style
                // layout="responsive" // หรือ "fill" (ดูคำอธิบายเพิ่มเติมด้านล่าง)
                // priority={item.menu_id < 3} // Optional: เพิ่ม priority ให้รูปแรกๆ
            />
          )}

          <p>
            Type: {item.menu_type}, {item.type}
          </p>
          <p>Price: ฿{item.price ? item.price.toFixed(2) : 'N/A'}</p>

          <div className="mt-2 flex gap-2">
            <Button variant="outline" onClick={() => onEdit(item)}>
              Edit
            </Button>
            <Button variant="destructive" onClick={() => onDelete(item.name)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MenuList;

