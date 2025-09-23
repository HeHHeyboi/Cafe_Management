"use client";
import React, { useState } from "react";
import { Coffee, Milk, CupSoda, Cake, UtensilsCrossed } from "lucide-react";

// --- Config ---
const menuCategories = [
  { title: "Coffee", icon: Coffee },
  { title: "Juice", icon: CupSoda },
  { title: "Milk", icon: Milk },
  { title: "Snack", icon: UtensilsCrossed },
  { title: "Dessert", icon: Cake },
];
const sizes = ["S", "M", "L", "XL"];

// --- Reusable Components ---
function ImageUpload({ image, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Upload Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="block w-full text-sm border rounded-lg cursor-pointer"
      />
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="preview"
          className="w-32 h-32 object-cover mt-3 border rounded-lg"
        />
      )}
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
                ${
                  isActive
                    ? "bg-blue-500 text-white"
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

function PriceInputs({ prices, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Prices by Size</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sizes.map((size) => (
          <div key={size}>
            <label className="block text-xs font-medium mb-1">{size}</label>
            <input
              type="number"
              value={prices[size]}
              onChange={(e) => onChange(size, e.target.value)}
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
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    image: null,
    prices: { S: "", M: "", L: "", XL: "" },
  });

  const handleImageChange = (e) =>
    setFormData({ ...formData, image: e.target.files[0] });

  const handlePriceChange = (size, value) =>
    setFormData({
      ...formData,
      prices: { ...formData.prices, [size]: value },
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("✅ Menu Added Successfully");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Menu</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <ImageUpload image={formData.image} onChange={handleImageChange} />

        <TextInput
          label="Menu Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter menu name"
        />

        <CategorySelector
          selected={formData.category}
          onSelect={(cat) => setFormData({ ...formData, category: cat })}
        />

        <PriceInputs prices={formData.prices} onChange={handlePriceChange} />

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
          Save Menu
        </button>
      </form>
    </div>
  );
}
