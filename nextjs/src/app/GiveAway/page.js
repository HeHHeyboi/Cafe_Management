'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const GiveAwayPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        desc: "",
        amount: "",
        // Remove date since it's not required in the API spec
    });

    const [error, setError] = useState(null);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form data:", formData);

        // ตรวจสอบค่าที่กรอกในฟอร์ม
        if (!formData.name || !formData.desc || !formData.amount) {
            setError("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/giveAway", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name: formData.name,
                    desc: formData.desc,
                    amount: parseInt(formData.amount) // Ensure amount is sent as number
                }),
            });

            if (response.ok) {
                console.log("Successfully submitted giveaway details");
                // Redirect to show page after successful submission
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
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Add Giveaway</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea
                        name="desc"
                        value={formData.desc}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default GiveAwayPage;
