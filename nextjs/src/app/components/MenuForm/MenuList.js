// src/app/components/MenuForm/MenuList.js
"use client";

import { useState } from "react"; // Import useState
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Import Input
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function MenuList({ menuItems, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filterType, setFilterType] = useState("all"); // State for filter type

  // Create a unique list of menu types for the filter dropdown.
  const menuTypes = [
    "all",
    ...new Set(menuItems.map((item) => item.menu_type)),
  ];

  // Filter the menu items based on search term and filter type.
  const filteredMenuItems = menuItems.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    const nameMatch = item.name.toLowerCase().includes(searchLower);
    const typeMatch = item.menu_type.toLowerCase().includes(searchLower);
    const filterMatch =
      filterType === "all" || item.menu_type === filterType;

    return filterMatch && (nameMatch || typeMatch);
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">รายการเมนู</h2>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <Input
          type="text"
          placeholder="ค้นหาเมนู..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2 md:mb-0 md:mr-2" // Responsive styling
        />

        <div className="flex items-center">
          <span className="mr-2">ประเภท:</span>
          <Select
            onValueChange={(value) => setFilterType(value)}
            value={filterType}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="ทั้งหมด" />
            </SelectTrigger>
            <SelectContent>
              {menuTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type === "all" ? "ทั้งหมด" : type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredMenuItems.length === 0 ? (
        <p>ไม่มีรายการเมนูที่ตรงกับคำค้นหา</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  รูป
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ชื่อเมนู
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ประเภท
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ชนิด
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ราคา
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {filteredMenuItems.map((item) => (
  <tr key={item.menu_id}>
    <td>
      {item.image_url ? (
        <Image src={item.image_url} alt={item.name} width={50} height={50} />
      ) : (
        "No Image"
      )}
    </td>
    <td>{item.name || "Unnamed"}</td>
    <td>{item.menu_type || "Unknown"}</td>
    <td>{item.price ? `${item.price} บาท` : "N/A"}</td>
    <td>
      <Button onClick={() => onEdit(item)}>Edit</Button>
      <Button onClick={() => onDelete(item.name)}>Delete</Button>
    </td>
  </tr>
))}

            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MenuList;