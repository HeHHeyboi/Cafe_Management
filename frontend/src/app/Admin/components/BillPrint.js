// app/admin/components/BillPrint.js
'use client';

import React, { useState } from 'react';
import { Bell, Trash2, MinusCircle, PlusCircle, Landmark, Wallet } from 'lucide-react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from "next/image";
// Sub-component for the user profile header
const UserProfileHeader = ({ userName }) => ( 
  <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
    <div className="flex items-center space-x-3">
      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
        <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold text-lg">
            {userName ? userName.charAt(0) : 'JG'}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 flex items-center">
  {"I'm a Cashier"} <span role="img" aria-label="money bag" className="ml-1 text-base">💰</span>
</p>

        <h2 className="font-semibold text-lg text-gray-800">{userName}</h2>
      </div>
    </div>
    <Bell className="w-6 h-6 text-gray-400" />
  </div>
);

// Sub-component for a single bill item
const BillItem = ({ item, onUpdateQuantity, onRemoveItem }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
    <div className="flex items-center space-x-3 w-3/5">
      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
          <Image
    src={item.image}
    alt={item.name || 'Image'}
    fill
    className="object-cover"
  />
      </div>
      <div className="flex-grow">
        <h3 className="font-medium text-gray-800 truncate">{item.name}</h3>
        <p className="text-sm text-gray-500">
          {item.drinkType ? `${item.drinkType} / ${item.cupSize}` : null} <br />
         {typeof item.price === "number" 
  ? item.price.toFixed(2) + " บาท" 
  : parseFloat(item.price)?.toFixed(2) ?? "N/A"}
        </p>
      </div>
    </div>

    <div className="flex items-center space-x-2">
      <button
        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        disabled={item.quantity <= 1}
        className="text-gray-400 hover:text-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <MinusCircle className="w-5 h-5" />
      </button>
      <span className="font-semibold text-gray-800 w-6 text-center">{item.quantity}</span>
      <button
        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        className="text-gray-400 hover:text-amber-700 transition"
      >
        <PlusCircle className="w-5 h-5" />
      </button>
    </div>

    <div className="text-right w-1/5">
      <p className="font-semibold text-gray-800">{(item.price * item.quantity).toFixed(2)} บาท</p>
    </div>

    <button
        onClick={() => onRemoveItem(item.id)}
        className="ml-2 text-gray-400 hover:text-red-600 transition"
      >
        <Trash2 className="w-5 h-5" />
      </button>
  </div>
);

// Sub-component for payment method selection
const PaymentMethodOption = ({ icon: Icon, label, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={clsx(
      "flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all duration-200",
      isSelected ? 'border-amber-700 bg-amber-50 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'
    )}
  >
    <Icon className={clsx("w-5 h-5", isSelected ? 'text-amber-700' : 'text-gray-500')} />
    <span className={clsx("mt-1 text-xs font-medium", isSelected ? 'text-amber-800' : 'text-gray-600')}>
      {label}
    </span>
  </button>
);

// Main BillPrint Component
export default function BillPrint({
  billItems,
  onUpdateItemQuantity,
  onRemoveItem,
  onClearBill,
}) {
  const [payment, setPayment] = useState('Cash');
  const router = useRouter();

  const subtotal = billItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  const handlePrint = async () => {
    console.table(billItems);
    console.table(payment, subtotal, tax, total);
    try {
      const billRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/bill/new`, { payment_method: payment, total: subtotal }, {
        headers: {
    "Content-Type": "application/json"
  }
      });

      const bill_id = billRes.data.id;

      console.log('Bill_id: ', bill_id);
      // console.table(billItems);
      // console.log("original", billItems[0]['originalId'])
      for (const item in billItems) {
        const data = {
          menu_id: Number(billItems[item]['originalId']) == null ? Number(billItems[item]['id']) : Number(billItems[item]['originalId']),
          amount: Number(billItems[item]['quantity']),
          total_price: Number(billItems[item]['price']) * Number(billItems[item]['quantity']),
          type:  String(billItems[item]['drinkType']).trim(),
          size: String(billItems[item]['cupSize']).trim().toLowerCase(),
        }
        const json = JSON.stringify(data);
        console.log("Json: ", json);
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order/${bill_id}`, json, {
          headers: {
    "Content-Type": "application/json"
  }
        });
      }

      const data = { billItems, payment, subtotal, tax, total, bill_id }
      sessionStorage.setItem("recieptData", JSON.stringify(data));
      router.push("/Receipt");
    } catch (e) {
      console.error("Failed to create bill: ", e);
      alert("ไม่สามารถสร้างบิลได้ กรุณาลองใหม่อีกครั้ง")
    }
  };

  return (
    <div className="flex flex-col h-full bg-white text-gray-900 font-sans text-sm">
      <div className="flex-1 overflow-y-auto px-4 pt-2">
        <UserProfileHeader userName="Simon Lee" />

        <div className="flex items-center justify-between pb-2 pt-3 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-base font-bold">Order</h2>
          <button
            onClick={onClearBill}
            disabled={!billItems.length}
            className="flex items-center text-red-500 hover:text-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-xs"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>

        {billItems.length === 0 ? (
          <div className="text-center text-gray-500 py-6 text-xs">
            <p>No items yet.</p>
            <p>Select from menu!</p>
          </div>
        ) : (
          <div className="space-y-1 mt-2">
            {billItems.map(item => (
              <BillItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateItemQuantity}
                onRemoveItem={onRemoveItem}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 px-4 py-3 flex-shrink-0 bg-white">
        <div className="flex justify-between mb-1">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">{subtotal.toFixed(2)} บาท</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="text-gray-600">Tax (7%)</span>
          <span className="font-semibold">{tax.toFixed(2)} บาท</span>
        </div>
        <div className="my-2 border-b border-gray-200"></div>
        <div className="flex justify-between mb-2">
          <span className="text-base font-bold">Total</span>
          <span className="text-xl font-bold text-amber-800">{total.toFixed(2)} บาท</span>
        </div>

        <h2 className="text-base font-bold mb-2">Payment</h2>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <PaymentMethodOption
            icon={Landmark}
            label="Cash"
            isSelected={payment === 'Cash'}
            onClick={() => setPayment('Cash')}
          />
          <PaymentMethodOption
            icon={Wallet}
            label="PromptPay"
            isSelected={payment === 'PromptPay'}
            onClick={() => setPayment('PromptPay')}
          />
        </div>

        <button
          onClick={handlePrint}
          className="w-full bg-amber-700 text-white py-3 rounded-xl text-base font-semibold hover:bg-amber-800 transition"
        >
          Print Bill
        </button>
      </div>
    </div>
  );
}
