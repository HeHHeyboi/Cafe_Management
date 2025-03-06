// app/MenuOrder/page.js
'use client'

import { Button } from "@/components/ui/button";

export default function MenuOrder() {
  // สร้างข้อมูลจำลอง (dummy data)
  const sampleOrderItems = [
    { menu_id: 1, name: 'กาแฟ', menu_type: 'เครื่องดื่ม', type: 'ร้อน', price: 85.00, quantity: 2 },
    { menu_id: 2, name: 'ข้าวผัด', menu_type: 'อาหาร', type: '', price: 60, quantity: 1 },
    { menu_id: 3, name: 'ส้มตำ', menu_type: 'อาหาร', type: '', price: 40, quantity: 3 },
    { menu_id: 4, name: 'ชาเขียวเย็น', menu_type: 'เครื่องดื่ม', type: 'เย็น', price: 70, quantity: 1 }, // เพิ่มรายการ
  ];

    // คำนวณราคารวม
    const totalPrice = sampleOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);


  return (
    <div className="bg-gray-100 min-h-screen p-4 flex">
      {/* Left Column: Order Details */}
      <div className="w-2/3 bg-white rounded-lg shadow-md p-6 mr-4">
        <h1 className="text-2xl font-bold mb-4">รายการสั่งซื้อ</h1>
        <div className="overflow-y-auto max-h-[60vh]"> {/* Added scroll for overflow */}
        {sampleOrderItems.length > 0 ? (
          <>
            {sampleOrderItems.map((item) => (
              <div key={item.menu_id} className="flex justify-between items-center border-b py-2">
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.menu_type} {item.type && `(${item.type})`}</p>
                </div>
                <p className="text-gray-600 mx-4">x{item.quantity}</p>
                <p className="font-bold">{item.price.toFixed(2)}</p>
              </div>
            ))}

          </>
        ) : (
          <p>ไม่มีรายการสินค้า</p>
        )}
        </div>
         <div className="mt-4 pt-4 border-t">
            <p className="text-lg font-bold">ราคารวม: {totalPrice.toFixed(2)} บาท</p>
          </div>
      </div>

      {/* Right Column: Action Buttons */}
      <div className="w-1/3">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <Button variant="default" className="w-full py-4 text-lg">ชำระเงิน</Button>
            <Button variant="outline" className="w-full py-4 text-lg">ยกเลิกรายการ</Button>
             {/* เพิ่มปุ่มอื่นๆ ตามต้องการ, เช่น ปุ่ม "พิมพ์ใบเสร็จ" */}
        </div>
      </div>
    </div>
  );
}