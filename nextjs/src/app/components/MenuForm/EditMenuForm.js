// src/app/components/MenuForm/EditMenuForm.js
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function EditMenuForm({ item, onMenuUpdated, onCancel }) {
  const [name, setName] = useState("");
  const [menuType, setMenuType] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(""); // ไม่ต้อง .toFixed(2) ที่นี่
  const [image, setImage] = useState(null); // State for new image file
  const [imageUrl, setImageUrl] = useState(""); // State for existing image URL
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const menuTypeOptions = ["อาหาร", "เครือ่งดื่ม", "ของหวาน"]; // Options for select
  const typeOptions = ["ร้อน", "เย็น", "ปั่น"];

    // Initialize form fields when 'item' changes
    useEffect(() => {
        if (item) {
            setName(item.name || ""); // Use empty string as default if null/undefined
            setMenuType(item.menu_type || "");
            setType(item.type || "");
            setPrice(item.price ? item.price.toString() : ""); // Convert to string, handle null
            setImageUrl(item.img_url || ""); // Set initial image URL
            setImage(null);  // Always reset the *file* input
            setError(null); // Clear errors
            setSuccess(false); // Clear success
        }
    }, [item]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    // --- Validation ---
    if (!name.trim()) {
        setError("กรุณากรอกชื่อเมนู");
        setIsSubmitting(false);
        return;
    }
    if (!menuType) {
        setError("กรุณาเลือกประเภทเมนู");
        setIsSubmitting(false);
        return;
    }
    if (!price) {
        setError("กรุณากรอกราคา");
        setIsSubmitting(false);
        return;
    }
    const priceNum = parseFloat(price);
    if (isNaN(priceNum)) {
        setError("ราคาต้องเป็นตัวเลข");
        setIsSubmitting(false);
        return;
    }

    // Use FormData for multipart/form-data (for image upload)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("menu_type", menuType);
    if (type) {
        formData.append("type", type);
    }
    formData.append("price", price); // ไม่ต้อง parseFloat()
    if (image) {
      formData.append("image", image); // Append the *new* image file
    }

    try {
      const response = await fetch(
        `http://localhost:8080/menu/id/${item.menu_id}`, // ใช้ item.menu_id
        {
          method: "PUT",
          // No Content-Type header! Let the browser set it
          body: formData, // Send FormData
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
      const responseData = await response.json(); // Get response
      setSuccess(true);
      onMenuUpdated(responseData); // Pass updated data
        setImageUrl(responseData.img_url) // Update Image url

    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
        const file = e.target.files[0];
        // Basic file type validation
        if (file && !file.type.startsWith("image/")) {
            setError("กรุณาเลือกไฟล์รูปภาพเท่านั้น");
            return;
        }
        setError(null); // Clear error
        setImage(file);  // Set the new image *file*
        if(file){
            setImageUrl(URL.createObjectURL(file)); // *Preview* the new file
        }

    };

  const handleRemoveImage = () => {
    setImage(null); // Clear the selected file
    setImageUrl("");   // Clear the image URL (remove the current image)
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">แก้ไขเมนู</h2>
        {/* Success Message */}
        {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> Menu item updated.</span>
            </div>
        )}
        {/* Error Message */}
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <Label htmlFor="edit-name">ชื่อเมนู:</Label>
          <Input
            type="text"
            id="edit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="กรอกชื่อเมนู"
            className="mt-1"
            disabled={isSubmitting}
          />
        </div>

        {/* Menu Type Select */}
        <div>
          <Label htmlFor="edit-menuType">ประเภทเมนู:</Label>
          <Select
            onValueChange={setMenuType}
            value={menuType}
            disabled={isSubmitting}
          >
            <SelectTrigger id="edit-menuType" className="w-full">
              <SelectValue  />
            </SelectTrigger>
            <SelectContent>
              {menuTypeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type Select */}
        <div>
          <Label htmlFor="edit-type">ชนิด (ร้อน/เย็น/ปั่น):</Label>
          <Select onValueChange={setType} value={type} disabled={isSubmitting}>
            <SelectTrigger id="edit-type" className="w-full">
              <SelectValue  />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Input */}
        <div>
          <Label htmlFor="edit-price">ราคา:</Label>
          <Input
            type="text"
            id="edit-price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="กรอกราคา"
            className="mt-1"
            disabled={isSubmitting}
          />
        </div>

        {/* Image Upload and Preview */}
        <div>
          <Label htmlFor="image">รูปภาพ:</Label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isSubmitting}
            className="mt-1"
          />

           {/* Conditional Image Display */}
            {imageUrl && (
                <div className="mt-2 relative w-32 h-32">
                    <Image
                        src={imageUrl.startsWith("http") ? imageUrl : `http://localhost:8080${imageUrl}`} // Check for absolute/relative URL
                        alt="Menu Item"
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                    />
                    <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1"
                        onClick={handleRemoveImage}
                        disabled={isSubmitting}
                    >
                        X
                    </Button>
                </div>
            )}
        </div>


        {/* Submit and Cancel Buttons */}
        <div className="flex gap-2">
          <Button type="submit" variant="default" disabled={isSubmitting}>
            {isSubmitting ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            ยกเลิก
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditMenuForm;