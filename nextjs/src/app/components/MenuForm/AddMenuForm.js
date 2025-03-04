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
// import { Textarea } from "@/components/ui/textarea"; // Remove Textarea

function AddMenuForm({ onMenuAdded }) {
  const [name, setName] = useState("");
  const [menuType, setMenuType] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); // State for the image file
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    // Use FormData for multipart/form-data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("menu_type", menuType);
    formData.append("type", type);
    formData.append("price", price); // No need to parseFloat here
    if (image) {
      formData.append("image", image); // Append the image file
    }

    try {
      const response = await fetch("http://localhost:8080/menu", {
        method: "POST",
        // No Content-Type header!  Let the browser set it automatically with FormData
        body: formData, // Send FormData, not JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
        const responseData = await response.json() //get response
      setSuccess(true);
      setName("");
      setMenuType("");
      setType("");
      setPrice("");
      setImage(null); // Reset image after successful upload
      onMenuAdded(responseData); // Pass new data
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

    const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Optional:  Preview image (see below)
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Add New Menu Item</h2>

      {/* Success and Error Messages (same as before) */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Success!</strong>
          <span>Menu item added.</span>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error!</strong>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name, Menu Type, Type, Price (same as before) */}
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
          <Select onValueChange={setMenuType} value={menuType} disabled={isSubmitting}>
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
          <Select onValueChange={setType} value={type} disabled={isSubmitting}>
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


        {/* *** Image Upload Input *** */}
        <div>
          <Label htmlFor="image">Image:</Label>
          <input
            type="file"
            id="image"
            accept="image/*" // Important:  Accept only image files
            onChange={handleFileChange}
            disabled={isSubmitting}
          />

            {/* Image Preview (Optional) */}
            {image && (
                <img src={URL.createObjectURL(image)} alt="Preview" className="mt-2 h-20 w-20 object-cover" />
            )}
        </div>


        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Menu Item"}
        </Button>
      </form>
    </div>
  );
}

export default AddMenuForm;