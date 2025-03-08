'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function GalleryPage() {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (event) => {
    event.preventDefault();

    const galleryData = {
      name: name,
      start_date: startDate,
      end_date: endDate,
      description: description,
      // user_id: 123, // แทนที่ด้วย user_id จริง
    };

    try {
      const response = await fetch('http://localhost:8080/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(galleryData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('จองแกลลอรี่สำเร็จ!');
        // เคลียร์ฟอร์มหลังส่งสำเร็จ
        setName('');
        setStartDate('');
        setEndDate('');
        setDescription('');

        // Redirect to GalleryShow page after successful booking
        router.push('/GalleryShow?month=' + new Date(startDate).toISOString().slice(0, 7)); // Format to YYYY-MM

      } else {
        setMessage(`เกิดข้อผิดพลาด: ${data.message || 'ไม่สามารถจองแกลลอรี่ได้'}`);
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
      setMessage('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">จองแกลลอรี่</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            ชื่อแกลลอรี่:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            วันที่เริ่ม:
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            วันที่สิ้นสุด:
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            คำอธิบาย:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 h-32"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          จอง
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded-md ${message.includes('สำเร็จ') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}
    </div>
  );
}
