'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function GalleryPage() {
    const [galleries, setGalleries] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        start_date: '',
        end_date: '',
        description: ''
    });

    // Fetch galleries for current month
    useEffect(() => {
        const currentMonth = new Date().getMonth() + 1;
        fetchGalleries(currentMonth);
    }, []);

    const fetchGalleries = async (month) => {
        try {
            const response = await axios.get(`http://localhost:8080/gallery?month=${month}`);
            setGalleries(response.data);
        } catch (error) {
            console.error('Error fetching galleries:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/gallery', formData);
            // Refresh galleries list after submission
            const currentMonth = new Date().getMonth() + 1;
            fetchGalleries(currentMonth);
            // Clear form
            setFormData({
                name: '',
                start_date: '',
                end_date: '',
                description: ''
            });
        } catch (error) {
            console.error('Error submitting gallery:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Gallery Booking</h1>
            
            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="mb-8 space-y-4">
                <div>
                    <label className="block mb-2">Gallery Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Start Date:</label>
                    <input
                        type="date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">End Date:</label>
                    <input
                        type="date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Book Gallery
                </button>
            </form>

            {/* Galleries List */}
        
        </div>
    );
}