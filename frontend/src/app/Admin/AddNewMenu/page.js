'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Coffee,
  Milk,
  CupSoda,
  Cake,
  UtensilsCrossed,
  Upload,
} from "lucide-react";
import axios from "axios";
import Image from "next/image";

// --- Config ---
const menuCategories = [
  { title: "Coffee", icon: Coffee },
  { title: "Juice", icon: CupSoda },
  { title: "Milk", icon: Milk },
  { title: "Snack", icon: UtensilsCrossed },
  { title: "Dessert", icon: Cake },
];

const sizes = ["S", "M", "L", "XL", "normal"];
const types = ["ร้อน", "เย็น", "ปั่น"];

// --- Reusable Components ---
function ImageUpload({ image, onChange }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2">Upload Image</label>
      <div className="relative w-full border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center hover:border-blue-400 transition cursor-pointer bg-gray-50 overflow-hidden">
        <input
          type="file"
          accept="image/*"
          onChange={onChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="w-full h-auto max-h-[600px] object-contain"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 py-20">
            <Upload className="h-10 w-10 mb-2" />
            <span className="text-sm">Click to upload</span>
          </div>
        )}
      </div>
    </div>
  );
}

function TextInput({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-lg"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

function CategorySelector({ selected, onSelect }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Category</label>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {menuCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selected === cat.title;
          return (
            <button
              type="button"
              key={cat.title}
              onClick={() => onSelect(cat.title)}
              className={`flex flex-col items-center justify-center rounded-xl py-3 px-2 shadow-sm border transition
                ${isActive
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
            >
              <Icon className="h-6 w-6 mb-1" />
              <span className="text-xs">{cat.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PriceInputs({ prices, onChange, label, showSizes = [] }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.keys(prices)
          .filter((key) => showSizes.includes(key))
          .map((key) => (
            <div key={key}>
              <label className="block text-xs font-medium mb-1">{key}</label>
              <input
                type="number"
                value={prices[key]}
                onChange={(e) => onChange(key, e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Price"
              />
            </div>
          ))}
      </div>
    </div>
  );
}

function DescriptionInput({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Description</label>
      <textarea
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-lg"
        rows="3"
        placeholder="Enter menu description"
      ></textarea>
    </div>
  );
}

// --- Main Page ---
export default function AddNewMenuPage() {
  const router = useRouter();

  const initialFormData = {
    name: "",
    category: "",
    description: "",
    image: null,
    pricesBySize: { S: "", M: "", L: "", XL: "", normal: "" },
    pricesByType: { ร้อน: "", เย็น: "", ปั่น: "" },
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleImageChange = (e) =>
    setFormData({ ...formData, image: e.target.files[0] });

  const handlePriceChangeBySize = (size, value) =>
    setFormData({
      ...formData,
      pricesBySize: { ...formData.pricesBySize, [size]: value },
    });

  const handlePriceChangeByType = (type, value) =>
    setFormData({
      ...formData,
      pricesByType: { ...formData.pricesByType, [type]: value },
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      menu_type: formData.category.toLowerCase(),
      category: [],
      types: [],
    };

    if (formData.category === "Snack" || formData.category === "Dessert") {
      if (formData.pricesBySize.normal) {
        payload.category.push({
          size: "normal",
          price: parseFloat(formData.pricesBySize.normal),
        });
      }
    } else {
      for (const size of ["S", "M", "L", "XL"]) {
        const price = formData.pricesBySize[size];
        if (price) {
          payload.category.push({
            size: size.toLowerCase(),
            price: parseFloat(price),
          });
        }
      }
    }

    for (const type of ["ร้อน", "เย็น", "ปั่น"]) {
      const price = formData.pricesByType[type];
      if (price) {
        payload.types.push({
          type,
          addition_price: parseFloat(price),
        });
      }
    }

    const form = new FormData();
    form.append("data", JSON.stringify(payload));
    if (formData.image) {
      form.append("img", formData.image);
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/menu`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ API Response:", response.data);
      alert(`✅ Menu Added: ${formData.name}`);
      setFormData(initialFormData); // 🔄 Reset form
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("❌ Upload failed: " + error.message);
    }
  };

  const isSnackOrDessert =
    formData.category === "Snack" || formData.category === "Dessert";

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6">Add New Menu</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <ImageUpload image={formData.image} onChange={handleImageChange} />

        <TextInput
          label="Menu Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          placeholder="Enter menu name"
        />

        <CategorySelector
          selected={formData.category}
          onSelect={(cat) =>
            setFormData({ ...formData, category: cat })
          }
        />

        {isSnackOrDessert ? (
          <PriceInputs
            label="Price (Normal)"
            prices={formData.pricesBySize}
            onChange={handlePriceChangeBySize}
            showSizes={["normal"]}
          />
        ) : (
          <>
            <PriceInputs
              label="Prices by Size"
              prices={formData.pricesBySize}
              onChange={handlePriceChangeBySize}
              showSizes={["S", "M", "L", "XL"]}
            />
            <PriceInputs
              label="Prices by Type (ร้อน / เย็น / ปั่น)"
              prices={formData.pricesByType}
              onChange={handlePriceChangeByType}
              showSizes={["ร้อน", "เย็น", "ปั่น"]}
            />
          </>
        )}

        <DescriptionInput
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <button
          type="submit"
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Add Menu
        </button>
      </form>
    </div>
  );
}
