'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';  // Import useSearchParams

export default function GalleryShowPage() {
    const [galleries, setGalleries] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();
    const searchParams = useSearchParams(); // Get access to URL parameters

    // Function to get the current month in YYYY-MM format
    const getCurrentMonth = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    };

    useEffect(() => {
        // Extract month from URL parameters, default to current month if not present
        const month = searchParams.get('month') || getCurrentMonth();

        const fetchGalleries = async () => {
            try {
                const response = await fetch(`http://localhost:8080/gallery?month=${month}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setGalleries(data);
            } catch (e) {
                setError(e.message);
                console.error("Could not fetch galleries:", e);
            }
        };

        fetchGalleries();
    }, [searchParams]);  // Re-fetch when the month parameter changes


    const handleGoBack = () => {
        router.push('/Gallery'); // Navigate back to the Gallery page
    };


    return (
        <div>
            <h1>Gallery List</h1>
            <button onClick={handleGoBack}>Back to Gallery Booking</button>
            {error && <p>Error: {error}</p>}
            {galleries.length > 0 ? (
                <ul>
                    {galleries.map((gallery) => (
                        <li key={gallery.name}> {/* Assuming 'name' is unique and suitable as a key */}
                            <strong>Name:</strong> {gallery.name}<br />
                            <strong>Start Date:</strong> {gallery.start_date}<br />
                            <strong>End Date:</strong> {gallery.end_date}<br />
                            <strong>Description:</strong> {gallery.description}<br />
                            <strong>User ID:</strong> {gallery.user_id}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No galleries found for this month.</p>
            )}
        </div>
    );
}