"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image"; // Import Image component

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]); // ยังคงมี state เดิมไว้
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true); // เพิ่ม loading state
  const [error, setError] = useState(null); // เพิ่ม error state

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true); // Set loading to true
      setError(null); // Clear any previous errors

      try {
        const response = await fetch("http://localhost:8080/menu");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMenuItems(data);

        // Initialize quantities to 0 for all items.
        const initialQuantities = {};
        data.forEach((item) => {
          initialQuantities[item.menu_id] = 0; // ใช้ menu_id เป็น key
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setError(error.message); // Set the error state
        setMenuItems([]); // Set menuItems to an empty array on error
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchMenuItems();
  }, []);

  const handleSelect = (item) => {
    if (quantities[item.menu_id] === 0) { // ใช้ menu_id
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [item.menu_id]: 1, // ใช้ menu_id
      }));
    }
  };

  const handleIncrement = (item) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item.menu_id]: prevQuantities[item.menu_id] + 1, // ใช้ menu_id
    }));
  };

  const handleDecrement = (item) => {
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max(0, prevQuantities[item.menu_id] - 1); // ใช้ menu_id
      return {
        ...prevQuantities,
        [item.menu_id]: newQuantity, // ใช้ menu_id
      };
    });
  };

  const handleConfirm = () => {
    // Create a new array containing only selected items with quantities > 0
    const confirmedItems = menuItems
      .filter((item) => quantities[item.menu_id] > 0) // ใช้ menu_id
      .map((item) => ({
        ...item,
        quantity: quantities[item.menu_id], // ใช้ menu_id
      }));
    // Do something with the confirmedItems (e.g., send to server, display confirmation)
    console.log("Confirmed Items:", confirmedItems);
    alert(JSON.stringify(confirmedItems, null, 2)); // Display as JSON string

    //Optionally reset quantities after confirmation
    const resetQuantities = {};
    menuItems.forEach((item) => {
      resetQuantities[item.menu_id] = 0; // ใช้ menu_id
    });
    setQuantities(resetQuantities);
  };

   // Filter menuItems to show only selected items in the "รายการที่เลือก" section
  const selectedMenuItems = menuItems.filter((item) => quantities[item.menu_id] > 0); //ใช้ menu_id

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  return (
    <div className="flex gap-8 p-8">
      {/* รายการที่เลือก */}
      <div className="w-1/2 border p-4">
        <h2 className="text-xl font-bold mb-4">รายการที่เลือก</h2>
        <div className="grid grid-cols-1 gap-2">
          {selectedMenuItems.map((item) => (
            <div key={item.menu_id} className="p-2 bg-red-100 rounded-lg"> {/* ใช้ menu_id เป็น key */}
              <div className="flex items-center justify-between">
                <span>{item.name}</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </Button>
                  <span>{quantities[item.menu_id]}</span> {/* ใช้ menu_id */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedMenuItems.length > 0 && (
          <div className="mt-4">
            <Button onClick={handleConfirm} variant="default">
              ยืนยันรายการที่เลือก
            </Button>
          </div>
        )}
      </div>

      {/* เมนูอาหาร */}
      <div className="w-1/2 border p-4">
        <h2 className="text-xl font-bold mb-4">เมนูอาหาร</h2>
        <div className="grid grid-cols-2 gap-2">
          {menuItems.map((item) => (
            <div
              key={item.menu_id} // ใช้ menu_id เป็น key
              className={`cursor-pointer p-4 text-center rounded-lg ${
                quantities[item.menu_id] > 0 ? "bg-green-200" : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => handleSelect(item)}
            >

              {/* แสดงรูปภาพ */}
              {item.img_url && (
                <Image
                  src={"http://localhost:8080"+item.img_url}
                  alt={item.name}
                  width={200}  // ปรับขนาดตามต้องการ
                  height={150} // ปรับขนาดตามต้องการ
                  className="mb-2 rounded-lg object-cover w-full h-40" // ปรับ style
                  layout="responsive" // หรือ "fill" ถ้าต้องการ
                />
              )}

              <div>{item.name}</div>
              <div>{item.menu_type}</div>
              <div>{item.type}</div>
              <div>{item.price} ฿</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}