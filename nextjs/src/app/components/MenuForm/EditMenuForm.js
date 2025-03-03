// src/app/components/MenuForm/EditMenuForm.js
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"; // ไม่จำเป็นต้องใช้ในกรณีนี้ แต่เผื่อไว้

function EditMenuForm({ item, onMenuUpdated, onCancel }) {
  const [name, setName] = useState(item.name);
  const [menuType, setMenuType] = useState(item.menu_type);
  const [type, setType] = useState(item.type);
  const [price, setPrice] = useState(item.price.toFixed(2)); // Format price
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // ใช้ useEffect เพื่อ update form fields เมื่อ `item` prop เปลี่ยนแปลง
  useEffect(() => {
    setName(item.name);
    setMenuType(item.menu_type);
    setType(item.type);
    setPrice(item.price.toFixed(2));
    setSuccess(false); // Reset success state เมื่อ item เปลี่ยน
    setError(null); // Clear error เมื่อ item เปลี่ยน
  }, [item]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const updatedMenuItem = {
      name,
      menu_type: menuType,
      type,
      price: parseFloat(price),
    };

    try {
      const response = await fetch(
        `http://localhost:8080/menu/name/${item.name}`, // ใช้ item.id จาก prop
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMenuItem),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      setSuccess(true);
      onMenuUpdated(); // แจ้ง MenuList ว่ามีการ update ข้อมูล
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white">
      <h2 className="text-lg font-semibold mb-4">Edit Menu Item</h2>
       {/* Success Message */}
      {success && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Menu item updated.</span>
        </div>
      )}
      {/* Error Message */}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter menu item name"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Label htmlFor="menuType">Menu Type:</Label>
          <Select
            onValueChange={setMenuType}
            value={menuType} // ใช้ value แทน defaultValue
            disabled={isSubmitting}
          >
            <SelectTrigger id="menuType">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="อาหาร">อาหาร</SelectItem>
              <SelectItem value="เครือ่งดื่ม">เครือ่งดื่ม</SelectItem>
              <SelectItem value="ของหวาน">ของหวาน</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="type">Type:</Label>
          <Select
            onValueChange={setType}
            value={type} // ใช้ value
            disabled={isSubmitting}
          >
            <SelectTrigger id="type">
              <SelectValue  />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ร้อน">ร้อน</SelectItem>
              <SelectItem value="เย็น">เย็น</SelectItem>
              <SelectItem value="ปั่น">ปั่น</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="price">Price:</Label>
          <Input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Enter price"
            disabled={isSubmitting}
            step="0.01"
          />
        </div>
        <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Menu Item"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
            </Button>
        </div>

      </form>
    </div>
  );
}

export default EditMenuForm;