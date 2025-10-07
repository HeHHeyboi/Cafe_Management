'use client';

import React, { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-oklch";
import { Button } from "../../components/ui/button";

export default function ReceiptPage() {
  const receiptRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [billData, setBillData] = useState({
    billItems: [],
    payment: '',
    subtotal: 0,
    tax: 0,
    total: 0,
    bill_id: null,
  });

  // อ่านข้อมูลจาก sessionStorage (แก้ไข key ให้ตรงกับที่ส่งมา)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("recieptData"); // แก้จาก receiptData เป็น recieptData
      if (storedData) {
        setBillData(JSON.parse(storedData));
      }
    }
  }, []);

  const handleExport = async (type = "pdf") => {
    if (!receiptRef.current) return;
    setLoading(true);

    try {
      const options = {
        scale: 3,
        windowWidth: 2560,
        useCORS: true,
        logging: false,
      };

      const canvas = await html2canvas(receiptRef.current, options);
      const imgData = canvas.toDataURL("image/png");

      if (type === "pdf") {
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`receipt_${Date.now()}.pdf`);
      } else if (type === "image") {
        const link = document.createElement("a");
        link.href = imgData;
        link.download = `receipt_${Date.now()}.png`;
        link.click();
      }
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const { billItems, payment, subtotal, tax, total, bill_id } = billData;

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div ref={receiptRef} className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl space-y-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Cafe Management System</h1>
          {bill_id && <p className="text-sm text-gray-500">Bill ID: #{bill_id}</p>}
        </div>

        {/* Payment Method */}
        <div className="text-gray-700 text-sm mb-2">
          <div><span className="font-semibold">Payment Method:</span> {payment || '-'}</div>
        </div>

        {/* Order Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead style={{ backgroundColor: "#F9FAFB", color: "#374151" }}>
              <tr style={{ borderBottom: "1px solid #D1D5DB" }}>
                <th className="py-2 px-2 text-left">Item</th>
                <th className="py-2 px-2 text-center">Qty</th>
                <th className="py-2 px-2 text-right">Price (บาท)</th>
                <th className="py-2 px-2 text-right">Total (บาท)</th>
              </tr>
            </thead>
            <tbody>
              {billItems.length > 0 ? billItems.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="py-2 px-2">{item.name || item.menu_name}</td>
                  <td className="py-2 px-2 text-center">{item.quantity || item.amount}</td>
                  <td className="py-2 px-2 text-right">{(item.price).toFixed(2)}</td>
                  <td className="py-2 px-2 text-right">{((item.price) * (item.quantity || item.amount)).toFixed(2)}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-400">No items</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="text-right space-y-1 text-gray-700 text-sm">
          <div>Subtotal: {subtotal.toFixed(2)} บาท</div>
          <div>VAT 7%: {tax.toFixed(2)} บาท</div>
          <div className="text-gray-800 font-bold text-lg">Total: {total.toFixed(2)} บาท</div>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="mt-4 flex gap-2">
        <Button onClick={() => handleExport("pdf")} disabled={loading}>
          {loading ? "Generating PDF..." : "Export PDF"}
        </Button>
        <Button onClick={() => handleExport("image")} disabled={loading}>
          {loading ? "Generating Image..." : "Export Image"}
        </Button>
      </div>
    </div>
  );
}
