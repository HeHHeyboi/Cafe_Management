// src/app/components/MenuForm/MenuList.js
"use client"

import { Button } from "@/components/ui/button";


function MenuList({ menuItems, onEdit, onDelete }) { // Receive props

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {menuItems.map((item) => (
        <div
          key={`${item.id}-${item.name}`}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p>
            Type: {item.menu_type}, {item.type}
          </p>
          <p>Price: ฿{item.price.toFixed(2)}</p>

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