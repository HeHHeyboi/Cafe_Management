// src/app/components/MenuForm/AddMenuForm.js
"use client";
import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";

function AddMenuForm({ onMenuAdded }) {
  // Add onMenuAdded prop
  const [name, setName] = useState("");
  const [menuType, setMenuType] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const newMenuItem = {
      name,
      menu_type: menuType,
      type,
      price: parseFloat(price),
    };

    try {
      const response = await fetch("http://localhost:8080/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMenuItem),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      setSuccess(true);
      setName("");
      setMenuType("");
      setType("");
      setPrice("");
      onMenuAdded(); // Call the callback function
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Add New Menu Item</h2>
      {success && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Menu item added.</span>
        </div>
      )}
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
            defaultValue={menuType}
            disabled={isSubmitting}
          >
            <SelectTrigger id="menuType">
              <SelectValue placeholder="Select a menu type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="อาหาร">อาหาร</SelectItem>
              <SelectItem value="เครื่องดื่ม">เครื่องดื่ม</SelectItem>
              <SelectItem value="ของหวาน">ของหวาน</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="type">Type:</Label>
          <Select
            onValueChange={setType}
            defaultValue={type}
            disabled={isSubmitting}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
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
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Menu Item"}
        </Button>
      </form>
    </div>
  );
}

export default AddMenuForm;