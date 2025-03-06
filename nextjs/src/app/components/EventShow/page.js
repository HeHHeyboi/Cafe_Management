'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const EventShow = () => {
    const [giveaways, setGiveaways] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGiveaways();
    }, []);

    const fetchGiveaways = async () => {
        try {
            const response = await fetch('http://localhost:8080/giveAway');
            const data = await response.json();
            setGiveaways(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching giveaways:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">GiveAway Events</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {giveaways.map((giveaway) => (
                    <div
                        key={giveaway.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        {giveaway.img_url && giveaway.img_url.length > 0 && (
                            <div className="relative h-48">
                                <Image
                                    src={giveaway.img_url[0]}
                                    alt={giveaway.name}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        )}
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{giveaway.name}</h2>
                            <p className="text-gray-600 mb-2">{giveaway.desc}</p>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-green-600">
                                    Available: {giveaway.remain}/{giveaway.amount}
                                </span>
                                <span className="text-gray-500">
                                    {new Date(giveaway.date).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventShow;
