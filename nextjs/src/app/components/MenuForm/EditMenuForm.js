"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image"; // Import Image
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function EditMenuForm({ item, onMenuUpdated, onCancel }) {
  const [name, setName] = useState(item.name);
  const [menuType, setMenuType] = useState(item.menu_type);
  const [type, setType] = useState(item.type);
  const [price, setPrice] = useState(item.price); // ไม่ต้อง .toFixed(2) ที่นี่
  const [image, setImage] = useState(null); // State for new image file
  const [imagePreview, setImagePreview] = useState(item.img_url); // State for preview URL
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

    // Reset form fields when the 'item' prop changes
    useEffect(() => {
        setName(item.name);
        setMenuType(item.menu_type);
        setType(item.type);
        setPrice(item.price);
        setImage(null); // Reset image file
        setImagePreview(item.img_url); // Reset image preview
        setSuccess(false); // Clear success message
        setError(null); // Clear any previous errors

    }, [item]);



  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    // Use FormData for multipart/form-data (for image upload)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("menu_type", menuType);
    formData.append("type", type);
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

      //  Optionally reset image states after successful update
        setImage(null);
        setImagePreview(responseData.img_url); // Update preview with new URL

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
      // Generate preview URL for the *newly selected* image
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);        // Clear the file input
    setImagePreview(null); // Clear the preview
  };

  return (
    <div className="p-4 border rounded-lg bg-white">
      <h2 className="text-lg font-semibold mb-4">Edit Menu Item</h2>
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
        {/* Name, Menu Type, Type, Price (same as before, but no toFixed) */}
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
            value={menuType} // ใช้ value
            disabled={isSubmitting}
          >
            <SelectTrigger id="menuType">
              <SelectValue  />
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
            value={type} // ใช้ value
            disabled={isSubmitting}
          >
            <SelectTrigger id="type">
              <SelectValue />
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

        {/* *** Image Upload *** */}
        <div>
          <Label htmlFor="image">Image:</Label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isSubmitting}
          />

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-2 relative">
                <Image
                    src={"http://localhost:8080"+imagePreview}
                    alt="Preview"
                    width={200}  // Or use layout="fill" and a parent with position: relative
                    height={150}
                    className="object-cover rounded-lg" // Style
                    // layout="fill"
                />
                <Button //ปุ่มลบรูป
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