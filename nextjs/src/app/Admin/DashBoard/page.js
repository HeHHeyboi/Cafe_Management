'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Adminmain = () => {
    const router = useRouter();
    const [giveaways, setGiveaways] = useState([]);
    const [sales, setSales] = useState({
        today: 2500,
        lastUpdate: new Date().toLocaleString()
    });

    useEffect(() => {
        fetchGiveaways();
    }, []);

    const fetchGiveaways = async () => {
        try {
            const response = await fetch('http://localhost:8080/giveAway');
            const data = await response.json();
            setGiveaways(data);
        } catch (error) {
            console.error('Error fetching giveaways:', error);
        }
    };

    const handleGiveawayClick = () => {
        router.push('/Admin/GiveawayDetails'); // Create this page for showing detailed information
    };

    const totalAmount = giveaways.reduce((sum, item) => sum + item.amount, 0);
    const totalRemaining = giveaways.reduce((sum, item) => sum + item.remain, 0);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            
            {/* Giveaway Section */}
            <div 
                className="bg-white p-4 rounded-lg shadow-md mb-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={handleGiveawayClick}
            >
                <h2 className="text-xl font-semibold mb-3">Giveaway Status</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-600">Remaining</p>
                        <p className="text-2xl font-bold">{totalRemaining}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Total</p>
                        <p className="text-2xl font-bold">{totalAmount}</p>
                    </div>
                </div>
            </div>

            {/* Sales Section remains the same */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-3">Sales Information</h2>
                <div>
                    <p className="text-gray-600">Today's Sales</p>
                    <p className="text-2xl font-bold">฿{sales.today}</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Last updated: {sales.lastUpdate}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Adminmain;
