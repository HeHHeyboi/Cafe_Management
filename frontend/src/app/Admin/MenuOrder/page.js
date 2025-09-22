'use client';

import React from 'react';
import { useState } from "react";
import {Coffee ,Milk ,CupSoda,Cake, UtensilsCrossed, Grid} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MenuOrderPage() {
  const [selected, setSelected] = useState("all");

  const menuCategories = [
    { title: "All", icon: Grid },
    { title: "Coffee", icon: Coffee },
    { title: "Juice", icon: CupSoda },
    { title: "Milk", icon: Milk },
    { title: "Snack", icon: UtensilsCrossed },
    { title: "Dessert", icon: Cake },
  ];



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Menu Order</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {menuCategories.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              onClick={() => setSelected(item.title)}
              className={`cursor-pointer transition border-2 ${
                selected === item.title
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <CardContent className="flex flex-col items-center justify-center p-4">
                <Icon className="h-8 w-8 mb-2" />
                <p className="text-sm font-medium">{item.title}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6">
        <p className="font-semibold">
          คุณเลือกหมวดหมู่: <span className="text-blue-600">{selected}</span>
        </p>
      </div>
    </div>
  );
}