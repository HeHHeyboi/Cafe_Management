// app/admin/components/BillPrint.js
'use client';

import React, { useState } from 'react';
// import Image from 'next/image'; 
import { Bell, Pen, CreditCard, Wallet, Landmark, MinusCircle, PlusCircle, Trash2, XCircle } from 'lucide-react';
import clsx from 'clsx';

// Sub-component for the user profile header
const UserProfileHeader = ({ userName, avatarSrc }) => ( 
  <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
    <div className="flex items-center space-x-3">
      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
        {/* <Image src={avatarSrc} alt={userName} layout="fill" objectFit="cover" /> */}
        {/* --- แก้ไขตรงนี้: แทนที่ด้วย div หรือถ้าอยากให้มีตัวอักษรก็ใส่ลงไป --- */}
        <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold text-lg">
            {userName ? userName.charAt(0) : 'JG'} {/* แสดงตัวอักษรแรกของชื่อ หรือ JG */}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 flex items-center">
          I&apos;m a Cashier <span role="img" aria-label="money bag" className="ml-1 text-base">💰</span>
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
      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
        {/* <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" /> */}
        <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
            IMG {/* หรือจะให้ว่างเปล่าก็ได้ */}
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="font-medium text-gray-800 truncate">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.price.toFixed(2)} บาท / item</p>
      </div>
    </div>

    <div className="flex items-center space-x-2">
      <button
        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        disabled={item.quantity <= 1}
        className="text-gray-400 hover:text-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={`Decrease quantity of ${item.name}`}
      >
        <MinusCircle className="w-5 h-5" />
      </button>
      <span className="font-semibold text-gray-800 w-6 text-center">{item.quantity}</span>
      <button
        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        className="text-gray-400 hover:text-amber-700 transition"
        aria-label={`Increase quantity of ${item.name}`}
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
        aria-label={`Remove ${item.name}`}
      >
        <XCircle className="w-5 h-5" />
      </button>

  </div>
);

// Sub-component for payment method selection
const PaymentMethodOption = ({ icon: Icon, label, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={clsx(
      "flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border-2 transition-all duration-200",
      isSelected ? 'border-amber-700 bg-amber-50 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'
    )}
  >
    <Icon className={clsx("w-7 h-7 sm:w-8 sm:h-8", isSelected ? 'text-amber-700' : 'text-gray-500')} />
    <span className={clsx("mt-2 text-xs sm:text-sm font-medium", isSelected ? 'text-amber-800' : 'text-gray-600')}>{label}</span>
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
  const subtotal = billItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  return (
    <div className="flex flex-col h-full bg-white text-gray-900 font-sans overflow-hidden text-sm">
      <UserProfileHeader userName="Simon Lee" avatarSrc="" />

      <div className="flex items-center justify-between pb-2 pt-3 px-4 border-b border-gray-200 sticky top-0 bg-white z-10">
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

      <section className="flex-grow overflow-y-auto px-4 pr-2 py-2">
        {!billItems.length ? (
          <div className="text-center text-gray-500 py-6 text-xs">
            <p>No items yet.</p>
            <p>Select from menu!</p>
          </div>
        ) : (
          <div className="space-y-1">
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
      </section>

      <section className="pt-2 border-t border-dashed border-gray-200 mt-auto px-4">
        <div className="flex justify-between mb-1">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">{subtotal.toFixed(2)} บาท</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="text-gray-600">Tax (7%)</span>
          <span className="font-semibold">{tax.toFixed(2)} บาท</span>
        </div>
        <div className="my-2 border-b border-gray-200"></div>
        <div className="flex justify-between mb-4">
          <span className="text-base font-bold">Total</span>
          <span className="text-xl font-bold text-amber-800">{total.toFixed(2)} บาท</span>
        </div>
      </section>

      <section className="mb-4 px-6">
        <h2 className="text-base font-bold mb-2">Payment</h2>
        <div className="grid grid-cols-3 gap-2">
          <PaymentMethodOption
            icon={Landmark}
            label="Cash"
            isSelected={payment === 'Cash'}
            onClick={() => setPayment('Cash')}
          />
          <PaymentMethodOption
            icon={CreditCard}
            label="Debit Card"
            isSelected={payment === 'Debit Card'}
            onClick={() => setPayment('Debit Card')}
          />
          <PaymentMethodOption
            icon={Wallet}
            label="E-Wallet"
            isSelected={payment === 'E-Wallet'}
            onClick={() => setPayment('E-Wallet')}
          />
        </div>
      </section>

      <div className="px-6 mb-4">
        <button className="w-full bg-amber-700 text-white py-3 rounded-xl text-base font-semibold hover:bg-amber-800 transition">
          Print Bills
        </button>
      </div>
    </div>
  );
}
