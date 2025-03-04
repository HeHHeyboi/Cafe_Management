"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button" // Import Shadcn Button


export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({}); // { "กาแฟ": 2, "ชาไทย": 1 }

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("http://localhost:8080/menu");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMenuItems(data);
        // Initialize quantities to 0 for all items.  Important!
        const initialQuantities = {};
        data.forEach(item => {
            initialQuantities[item.name] = 0;
        });
        setQuantities(initialQuantities);

      } catch (error) {
        console.error("Error fetching menu items:", error);
        // Handle error (e.g., display an error message to the user)
        setMenuItems([]); // Set to empty array on error, or show error message
      }
    };

    fetchMenuItems();
  }, []);

  const handleSelect = (item) => {
    if (quantities[item.name] === 0) { // Use the quantities state
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [item.name]: 1
        }))
    }
  };

  const handleIncrement = (item) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item.name]: prevQuantities[item.name] + 1,
    }));
  };

  const handleDecrement = (item) => {
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max(0, prevQuantities[item.name] - 1); // Prevent negative quantities
      return {
        ...prevQuantities,
        [item.name]: newQuantity,
      };
    });
  };

  const handleConfirm = () => {
    // Create a new array containing only selected items with quantities > 0
    const confirmedItems = menuItems.filter(item => quantities[item.name] > 0).map(item => ({
        ...item,
        quantity: quantities[item.name]
    }));
    // Do something with the confirmedItems (e.g., send to server, display confirmation)
    console.log("Confirmed Items:", confirmedItems);
    alert(JSON.stringify(confirmedItems, null, 2)); // Display as JSON string

    //Optionally reset quantities after confirmation
     const resetQuantities = {};
        menuItems.forEach(item => {
            resetQuantities[item.name] = 0;
        });
        setQuantities(resetQuantities);
  };

  // Filter menuItems to show only selected items in the "รายการที่เลือก" section
  const selectedMenuItems = menuItems.filter(item => quantities[item.name] > 0);


  return (
    <div className="flex gap-8 p-8">
      {/* รายการที่เลือก */}
      <div className="w-1/2 border p-4">
        <h2 className="text-xl font-bold mb-4">รายการที่เลือก</h2>
        <div className="grid grid-cols-1 gap-2">
          {selectedMenuItems.map((item) => (
             <div key={item.name} className="p-2 bg-red-100 rounded-lg">
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
                 <span>{quantities[item.name]}</span>
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
         {/* ปุ่มยืนยัน */}
         {selectedMenuItems.length > 0 && (
          <div className="mt-4">
            <Button onClick={handleConfirm} variant="default">ยืนยันรายการที่เลือก</Button>
          </div>
        )}
      </div>
     

      {/* เมนูอาหาร */}
      <div className="w-1/2 border p-4">
        <h2 className="text-xl font-bold mb-4">เมนูอาหาร</h2>
        <div className="grid grid-cols-2 gap-2">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`cursor-pointer p-4 text-center rounded-lg ${
                quantities[item.id] > 0 ? "bg-green-200" : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => handleSelect(item)}
            >
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