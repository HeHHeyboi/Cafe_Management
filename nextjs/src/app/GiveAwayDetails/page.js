'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function GiveAwayDetail() {
    const searchParams = useSearchParams();
    const ids = searchParams.get('ids')?.split(',') || [];
    const [giveaways, setGiveaways] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (ids.length === 0) return;

        fetch(`http://localhost:8080/giveAwayShow?ids=${ids.join(',')}`)
            .then(response => response.json())
            .then(data => {
                setGiveaways(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [ids]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">GiveAway Details</h1>
            {giveaways.map(giveaway => (
                <div key={giveaway.id} className="border p-4 mb-4 rounded shadow">
                    <h2 className="text-xl font-semibold">{giveaway.name}</h2>
                    <p className="mt-2">{giveaway.desc}</p>
                    <div className="mt-2">
                        <p>Start Date: {new Date(giveaway.startDate).toLocaleDateString()}</p>
                        <p>End Date: {new Date(giveaway.endDate).toLocaleDateString()}</p>
                        <p>Status: {giveaway.status}</p>
                        {giveaway.winnerName && <p>Winner: {giveaway.winnerName}</p>}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default GiveAwayDetail;
