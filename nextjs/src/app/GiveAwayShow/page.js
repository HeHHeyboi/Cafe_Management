'use client';

import React, { useEffect, useState } from 'react';

function GiveAwayShow() {
    const [giveaways, setGiveaways] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/giveAway', { method: 'GET' }) // ใช้ API ตรงนี้
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data from API:', data); // ตรวจสอบข้อมูล
                setGiveaways(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching giveaways:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>; // สามารถแทนที่ด้วยสปินเนอร์หรือลูกเล่นการโหลด
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (giveaways.length === 0) {
        return <div>ไม่มีรายการแจกของในขณะนี้</div>; // แสดงข้อความหากไม่มีข้อมูล
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">รายการแจกของ</h1>
            <div className="space-y-4">
                {giveaways.map(giveaway => (
                    <div key={giveaway.id} className="border p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold">{giveaway.name}</h2>
                        <p className="text-gray-700">{giveaway.desc}</p>
                        <p className="text-gray-600">จำนวนทั้งหมด: {giveaway.amount}</p>
                        <p className="text-gray-600">คงเหลือ: {giveaway.remain}</p>
                        <p className="text-gray-500">วันที่เพิ่ม: {new Date(giveaway.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GiveAwayShow;
