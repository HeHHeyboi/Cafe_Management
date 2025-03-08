'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function EventCard({ giveaway }) {
    if (!giveaway) return null;
    
    // ตรวจสอบว่ามีรูปภาพหรือไม่
    const hasImage = giveaway.img_url && Array.isArray(giveaway.img_url) && giveaway.img_url.length > 0;
    
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mt-5">
            {/* แสดงรูปภาพถ้ามี */}
            {hasImage && (
                <div className="w-full h-48 overflow-hidden">
                    <img 
                        src={`http://localhost:8080/${giveaway.img_url[0]}`}
                        alt={giveaway.name || 'Giveaway image'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Available';
                        }}
                    />
                </div>
            )}
            
            <div className="p-4">
                <h2 className="text-xl font-semibold">{giveaway.name || 'ไม่มีชื่อ'}</h2>
                <p className="text-gray-700 mt-2 line-clamp-2">{giveaway.desc || 'ไม่มีคำอธิบาย'}</p>
                
                <div className="mt-3 flex justify-between">
                    <div>
                        <p className="text-gray-600">จำนวน: <span className="font-medium">{giveaway.amount || 0}</span></p>
                        <p className="text-gray-600">คงเหลือ: <span className="font-medium">{giveaway.remain || 0}</span></p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-500 text-sm">วันที่เพิ่ม:</p>
                        <p className="text-gray-600">{giveaway.date ? new Date(giveaway.date).toLocaleDateString('th-TH') : 'ไม่ระบุ'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EventShow() {
    // เริ่มต้นด้วย array ว่างเพื่อป้องกัน null
    const [giveaways, setGiveaways] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/giveAway', { method: 'GET' });
                
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Data from API:', data);
                
                // ตรวจสอบว่า data เป็น array หรือไม่
                if (Array.isArray(data)) {
                    setGiveaways(data);
                } else {
                    console.error('API did not return an array:', data);
                    setGiveaways([]);
                }
            } catch (error) {
                console.error('Error fetching giveaways:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-pulse text-gray-500">กำลังโหลด...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="text-red-500 mb-2">เกิดข้อผิดพลาด:</div>
                <div>{error.message}</div>
            </div>
        );
    }

    // ตรวจสอบอีกครั้งเพื่อความมั่นใจว่า giveaways เป็น array
    const hasGiveaways = Array.isArray(giveaways) && giveaways.length > 0;

    if (!hasGiveaways) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4">GiveAway Events</h1>
                <div className="text-center py-8 text-gray-600">
                    ยังไม่มีรายการ GiveAway ในขณะนี้
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">GiveAway Events</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(giveaways) && giveaways.map((giveaway) => 
                    giveaway ? (
                        <div
                            key={giveaway.id || Math.random().toString()}
                            className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                            onClick={() => giveaway.id && router.push(`/GiveAwayDetail/${giveaway.id}`)}
                        >
                            <EventCard giveaway={giveaway} />
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
}

export default EventShow;
