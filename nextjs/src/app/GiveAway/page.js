'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const GiveAwayPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        desc: "",
        amount: "",
        image: null,
    });

    const [error, setError] = useState(null);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({
                ...formData,
                image: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form data:", formData);

        if (!formData.name || !formData.desc || !formData.amount || !formData.image) {
            setError("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("desc", formData.desc);
        formDataToSend.append("amount", parseInt(formData.amount));
        formDataToSend.append("image", formData.image);

        try {
            const response = await fetch("http://localhost:8080/giveAway", {
                method: "POST",
                credentials: "include",
                body: formDataToSend,
            });

            if (response.ok) {
                console.log("Successfully submitted giveaway details");
                router.push("/GiveAwayShow");
            } else {
                const errorData = await response.json();
                console.error("Failed to submit giveaway details", errorData);
                setError("ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
            }
        } catch (error) {
            console.error("An error occurred while submitting giveaway details:", error);
            setError("เกิดข้อผิดพลาดในการส่งข้อมูล");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">เพิ่ม Giveaway</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">ชื่อรายการ:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">รายละเอียด:</label>
                    <textarea
                        name="desc"
                        value={formData.desc}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">จำนวณ:</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">อัพโหลดรูปภาพ:</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {formData.image && (
                        <div className="mt-3 text-sm text-gray-600">
                            <img
                                src={URL.createObjectURL(formData.image)}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded-md shadow-md"
                            />
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default GiveAwayPage;
