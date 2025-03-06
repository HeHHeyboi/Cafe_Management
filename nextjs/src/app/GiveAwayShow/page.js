'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function GiveawayCard({ giveaway }) {
    return (
        <div className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{giveaway.name}</h2>
            <p className="text-gray-700">{giveaway.desc}</p>
            <p className="text-gray-600">จำนวนทั้งหมด: {giveaway.amount}</p>
            <p className="text-gray-600">คงเหลือ: {giveaway.remain}</p>
            <p className="text-gray-500">วันที่เพิ่ม: {new Date(giveaway.date).toLocaleDateString()}</p>
        </div>
    );
}

function Button({ onClick, children }) {
    return (
        <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

function GiveAwayShow() {
    const [giveaways, setGiveaways] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetch('http://localhost:8080/giveAway', { method: 'GET' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data from API:', data);
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
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
    }

    if (giveaways.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">GiveAwayList</h1>
                    <Button onClick={() => router.push('/GiveAway')}>
                        เพิ่มรายการ GiveAway
                    </Button>
                </div>
                <div className="text-center py-8 text-gray-600">
                    ยังไม่มีรายการ GiveAway ในขณะนี้
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-4xl mx-auto mb-4 flex justify-end">
                <Button onClick={() => router.push('/GiveAway')}>
                    เพิ่มรายการ GiveAway
                </Button>
            </div>
            
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4">GiveAwayList</h1>
                
                <div className="space-y-4">
                    {giveaways.map(giveaway => (
                        <div 
                            key={giveaway.id} 
                            onClick={() => router.push(`/GiveAwayDetail/${giveaway.id}`)}
                            className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                        >
                            <GiveawayCard giveaway={giveaway} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
    
}

export default GiveAwayShow; 