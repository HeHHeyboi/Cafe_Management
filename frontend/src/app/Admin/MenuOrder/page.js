// app/admin/order/page.js
'use client';

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { Coffee, Milk, CupSoda, Cake, UtensilsCrossed, Grid, Plus, Edit2, Trash2 } from "lucide-react";
import clsx from 'clsx';

import BillPrint from '../components/BillPrint';
import axios from 'axios';
import Image from 'next/image';

const menuCategories = [
	{ title: "All", icon: Grid },
	{ title: "Coffee", icon: Coffee },
	{ title: "Juice", icon: CupSoda },
	{ title: "Milk", icon: Milk },
	{ title: "Snack", icon: UtensilsCrossed },
	{ title: "Dessert", icon: Cake },
];

const sizes = ["S", "M", "L", "XL"];
const types = ["ร้อน", "เย็น", "ปั่น"];

export default function AdminOrderPage() {
	const [menu, setMenu] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [currentBillItems, setCurrentBillItems] = useState([]);

	// Modal สำหรับเลือก option
	const [showOptionModal, setShowOptionModal] = useState(false);
	const [menuItemPending, setMenuItemPending] = useState(null);
	const [drinkType, setDrinkType] = useState(""); // ร้อน/เย็น/ปั่น
	const [cupSize, setCupSize] = useState(""); // S/M/L/XL

	useEffect(() => {
		const fetchMenu = async () => {
			try {
				const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu`);
				const apiData = response.data;
				// แปลงข้อมูลให้อยู่ในรูปแบบที่ component ใช้ได้
				const formattedMenu = apiData.map((item) => {
					const pricesBySize = {};
					const pricesByType = {};

					item.category?.forEach(c => {
						pricesBySize[c.size.toUpperCase()] = Number(c.price);
					});

					item.types?.forEach(t => {
						const typeKey = t.type === "ร้อน" ? "ร้อน" : t.type === "เย็น" ? "เย็น" : "ปั่น";
						pricesByType[typeKey] = Number(t.addition_price);
					});

					// หา basePrice จากราคาขนาดที่ต่ำที่สุด (แปลงเป็น number ด้วย)
					const basePrice = Object.values(pricesBySize).length > 0 ? Math.min(...Object.values(pricesBySize)) : 0;
					const price = item.price ? Number(item.price) : basePrice;

					return {
						id: item.menu_id,
						name: item.name,
						category: convertMenuTypeToCategory(item.menu_type),
						image: item.img_url ? `${process.env.NEXT_PUBLIC_API_URL}/${item.img_url}` : "#f0f0f0",
						pricesBySize: Object.keys(pricesBySize).length > 0 ? pricesBySize : undefined,
						pricesByType: Object.keys(pricesByType).length > 0 ? pricesByType : undefined,
						basePrice,
						price,
					};
				});

				setMenu(formattedMenu);
				localStorage.setItem("menu", JSON.stringify(formattedMenu));
			} catch (error) {
				console.error("Error fetching menu:", error);
			}
		};


		fetchMenu();
	}, []);

	const convertMenuTypeToCategory = (type) => {
		if (!type) {
			return "Other";
		}
		switch (type.toLowerCase()) {
			case "coffee":
				return "Coffee";
			case "juice":
				return "Juice";
			case "milk":
				return "Milk";
			case "dessert":
				return "Dessert";
			case "snack":
				return "Snack";
			case "drink":
				return "Coffee"; // หรือให้เป็น “Drink” แล้วเพิ่ม category ใหม่ก็ได้
			default:
				return "Other";
		}
	};

	const filteredMenuItems =
		selectedCategory === "All"
			? (menu ?? [])
			: (menu ?? []).filter((item) => item.category === selectedCategory);

	// ฟังก์ชันคลิกเมนู
	const handleMenuClick = (item) => {
		if (item.category === "Snack" || item.category === "Dessert") {
			const snackPriceRaw = item.pricesBySize?.["Normal"] || item.price || 0;
			const snackPrice = Number(snackPriceRaw) || 0;
			// สร้าง option สำหรับ Snack/Dessert

			// const optionId = `${menuItemPending.id}|${drinkType}|${cupSize}`;
			// console.log(optionId);
			const originalId = item.id;
			const option = {
				id: originalId,
				originalId: originalId,
				name: item.name,
				category: item.category,
				price: snackPrice,
				image: item.image,
				quantity: 1,
				drinkType: "",
				cupSize: "",
			};


			console.log("Option: ", option);
			setCurrentBillItems(prevItems => {
				const exist = prevItems.find(i => i.id === option.id);
				if (exist) {
					return prevItems.map(i =>
						i.id === option.id ? { ...i, quantity: i.quantity + 1 } : i
					);
				} else {
					return [...prevItems, option];
				}
			});

			return; // ป้องกันการเปิด modal
		}

		// สำหรับเมนูอื่นๆ ที่ต้องเลือก size/type
		setMenuItemPending(item);
		setDrinkType("");
		setCupSize("");
		setShowOptionModal(true);
	};

	// ฟังก์ชันลบเมนู
	const handleDeleteMenu = async (id) => {
		if (!confirm("คุณแน่ใจจะลบเมนูนี้ใช่ไหม?")) return;
		try {
			const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/menu/${id}`);

			if (response.status === 200) {
				alert(response.data.msg || "ลบเมนูสำเร็จ");

				setMenu((prevMenu) => prevMenu.filter(item => item.id !== id));
				const updatedMenu = (menu ?? []).filter(item => item.id !== id);
				localStorage.setItem("menu", JSON.stringify(updatedMenu));
			}
		} catch (error) {
			if (error.response?.status === 404) {
				alert("ไม่พบเมนูที่ต้องการลบ");
			} else {
				alert("เกิดข้อผิดพลาดในการลบเมนู");
			}
			console.error("Delete menu error:", error);
		}
	};

	const handleConfirmAdd = () => {
		if (!menuItemPending) return;
		if (!cupSize || !drinkType) return;

		// คำนวณราคาโดยแปลง string เป็น number ก่อนทุกครั้ง
		const sizePrice = Number(menuItemPending.pricesBySize?.[cupSize] ?? menuItemPending.basePrice ?? 0);
		const typePrice = Number(menuItemPending.pricesByType?.[drinkType] ?? 0);

		const totalPrice = sizePrice + typePrice;

		const optionId = `${menuItemPending.id}|${drinkType}|${cupSize}`;

		const option = {
			id: optionId,
			originalId: menuItemPending.id,
			name: menuItemPending.name,
			category: menuItemPending.category,
			price: totalPrice,
			image: menuItemPending.image,
			quantity: 1,
			drinkType,
			cupSize,
		};


		console.log("Options: ", option);
		setCurrentBillItems(prevItems => {

			const exist = prevItems.find(i => i.id === option.id);
			if (exist) {
				return prevItems.map(i =>
					i.id === option.id ? { ...i, quantity: i.quantity + 1 } : i
				);
			} else {
				return [...prevItems, option];
			}
		});

		setShowOptionModal(false);
		setMenuItemPending(null);
	};

	const handleUpdateItemQuantity = (id, newQuantity) => {
		if (newQuantity < 1) {
			handleRemoveItem(id);
			return;
		}
		setCurrentBillItems(prevItems =>
			prevItems.map(item =>
				item.id === id ? { ...item, quantity: newQuantity } : item
			)
		);
	};

	const handleRemoveItem = (id) => {
		setCurrentBillItems(prevItems => prevItems.filter(item => item.id !== id));
	};

	const handleClearBill = () => {
		setCurrentBillItems([]);
	};

	return (
		<div className="flex h-[calc(100vh-64px)] bg-gray-100 font-sans">
			{/* ===== ส่วนซ้าย: Menu Order ===== */}
			<div className="w-[65%] bg-white shadow-lg overflow-hidden border-r border-gray-200 flex flex-col">
				<div className="flex-shrink-0 p-6 pb-2 border-b border-gray-200 bg-white z-10">
					<div className="flex items-center justify-between mb-4">
						<h1 className="text-2xl font-bold">Menu Order</h1>
						<Link href="/Admin/AddNewMenu" passHref>
							<button className="px-4 py-2 bg-amber-700 text-white rounded-xl hover:bg-amber-800 transition shadow">
								Add New Menu
							</button>
						</Link>
					</div>

					{/* ปุ่มเลือกหมวดหมู่ */}
					<div className="grid grid-cols-3 md:grid-cols-6 gap-3">
						{menuCategories.map((item) => {
							const Icon = item.icon;
							const isActive = selectedCategory === item.title;
							return (
								<button
									key={item.title}
									onClick={() => setSelectedCategory(item.title)}
									className={clsx(
										"flex flex-col items-center justify-center rounded-xl py-3 px-2 shadow-sm transition-colors",
										isActive
											? "bg-amber-700 text-white"
											: "bg-gray-50 text-gray-700 hover:bg-amber-100 hover:text-amber-800"
									)}
								>
									<Icon className="h-6 w-6 mb-1" />
									<span className="text-sm font-medium">{item.title}</span>
								</button>
							);
						})}
					</div>
				</div>

				{/* เมนู */}
				<div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{filteredMenuItems.map((item) => (
							<div
								key={item.id}
								className="relative border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all duration-200 cursor-pointer"
							>
								<div
									className="relative w-full h-32 bg-gray-100 rounded-t-xl overflow-hidden"
									onClick={() => handleMenuClick(item)}
								>
									<Image src={item.image}
										alt={item.name}
										fill
										unoptimized
										className="object-cover w-full h-full"
										onClick={() => handleMenuClick(item)} />
								</div>
								<div className="p-3 flex-grow">
									<h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
									<p className="text-sm text-gray-500">{item.category}</p>
								</div>
								<div className="p-3 pt-0 flex items-center justify-between">
									<p className="text-md font-bold text-amber-700">{item.price ?? item.basePrice} บาท</p>
									<div className="flex gap-2">
										<button
											onClick={(e) => { e.stopPropagation(); handleMenuClick(item); }}
											className="p-2 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition"
											aria-label={`Add ${item.name} to order`}
										>
											<Plus className="w-5 h-5" />
										</button>
										<Link href={`/Admin/EditMenu/${item.id}`} passHref>
											<button
												onClick={(e) => e.stopPropagation()}
												className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition"
												aria-label={`Edit ${item.name}`}
											>
												<Edit2 className="w-5 h-5" />
											</button>
										</Link>
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleDeleteMenu(item.id);
											}}
											className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition"
											aria-label={`Delete ${item.name}`}
										>
											<Trash2 className="w-5 h-5" />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* ===== ฝั่งขวา: Bill Display ===== */}
			<div className="w-[35%] bg-white shadow-lg overflow-hidden flex flex-col">
				<BillPrint
					billItems={currentBillItems}
					onUpdateItemQuantity={handleUpdateItemQuantity}
					onRemoveItem={handleRemoveItem}
					onClearBill={handleClearBill}
					showTypeAndSize={true}
					paymentMethods={["Cash", "PromptPay"]}
				/>
			</div>

			{/* ===== Modal เลือกตัวเลือก ===== */}
			{showOptionModal && menuItemPending && (
				<div className="flex fixed z-50 inset-0 items-center justify-center bg-black/30 px-4">
					<div className="bg-white rounded-xl p-6 w-full max-w-lg md:max-w-2xl shadow-xl">
						<h2 className="font-bold text-xl mb-4 text-center">{menuItemPending.name}</h2>

						{/* เลือก Size */}
						<div className="mb-3">
							<label className="block mb-2 font-medium">ขนาดแก้ว</label>
							<div className="flex gap-3 justify-center flex-wrap">
								{sizes.map((size) => {
									const priceRaw = menuItemPending.pricesBySize?.[size];
									const price = Number(priceRaw);
									const isDisabled = !price || isNaN(price) || price <= 0;

									return (
										<button
											key={size}
											onClick={() => !isDisabled && setCupSize(size)}
											className={`px-4 py-2 rounded-full border 
                        ${cupSize === size ? "bg-amber-700 text-white" : "bg-gray-100"}
                        ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-amber-200"}
                      `}
											disabled={isDisabled}
										>
											{size} ({!isDisabled ? price + " บาท" : "ไม่พร้อมใช้งาน"})
										</button>
									);
								})}
							</div>
						</div>

						{/* เลือก Type */}
						<div className="mb-3">
							<label className="block mb-2 font-medium">ประเภทเครื่องดื่ม</label>
							<div className="flex gap-3 justify-center flex-wrap">
								{types.map((type) => {
									const additional = Number(menuItemPending.pricesByType?.[type] ?? 0);

									return (
										<button
											key={type}
											onClick={() => setDrinkType(type)}
											className={`px-4 py-2 rounded-full border ${drinkType === type ? "bg-amber-700 text-white" : "bg-gray-100"}`}
										>
											{type} (+{additional} บาท)
										</button>
									);
								})}
							</div>
						</div>

						{/* แสดงราคาจริง */}
						{cupSize && drinkType && (
							<div className="mt-4 text-center text-lg font-bold text-amber-800">
								ราคาจริง: {
									(
										Number(menuItemPending.pricesBySize?.[cupSize] ?? menuItemPending.price ?? 0) +
										Number(menuItemPending.pricesByType?.[drinkType] ?? 0)
									).toFixed(2)
								} บาท
							</div>
						)}

						<div className="flex gap-3 justify-center mt-6">
							<button
								onClick={() => setShowOptionModal(false)}
								className="px-4 py-2 bg-gray-200 rounded-lg"
							>
								ยกเลิก
							</button>
							<button
								onClick={handleConfirmAdd}
								disabled={!cupSize || !drinkType}
								className="px-4 py-2 bg-amber-700 text-white rounded-lg disabled:bg-gray-400"
							>
								AddMenu
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
