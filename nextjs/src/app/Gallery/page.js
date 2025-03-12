'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function GalleryPage() {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [galleryId, setGalleryId] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // เพิ่ม state สำหรับการโหลด
  const router = useRouter();
  const fileInputRef = useRef(null);

  // ดึงข้อมูลจากเซิร์ฟเวอร์เมื่อโหลดหน้าแก้ไข
  useEffect(() => {
    const fetchGalleryData = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const id = queryParams.get('id');

      if (id) {
        try {
          const response = await fetch(`http://localhost:8080/gallery/${id}`, {
            method: 'GET',
            credentials: 'include',
          });

          if (!response.ok) {
            throw new Error('ไม่สามารถดึงข้อมูลแกลลอรี่ได้');
          }

          const data = await response.json();
          setName(data.name);
          setStartDate(data.start_date);
          setEndDate(data.end_date);
          setDescription(data.description);
          setPreviews(data.images || []);
          setGalleryId(id);
        } catch (error) {
          console.error('Error:', error);
          setMessage(error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล');
        }
      }
    };

    fetchGalleryData();
  }, []);

  // จัดการการเพิ่มรูปภาพ
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);

    // สร้าง preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  // Cleanup previews
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  // ตรวจสอบวันที่
  const validateDates = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      setMessage('วันที่สิ้นสุดต้องมาหลังวันที่เริ่มต้น');
      return false;
    }
    return true;
  };

  // จัดการการส่งฟอร์ม
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // เริ่มโหลด

    // ตรวจสอบวันที่
    if (!validateDates()) {
      setIsLoading(false);
      return;
    }

    // สร้าง FormData สำหรับส่งข้อมูลทั้งหมด
    const formData = new FormData();
    formData.append('name', name.trim());
    formData.append('start_date', startDate);
    formData.append('end_date', endDate);
    formData.append('description', description.trim());

    // เพิ่มรูปภาพทั้งหมดเข้าไปใน FormData
    selectedFiles.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const url = galleryId ? `http://localhost:8080/gallery/${galleryId}` : 'http://localhost:8080/gallery';
      const method = galleryId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'ไม่สามารถบันทึกแกลลอรี่ได้');
        } else {
          const errorText = await response.text();
          throw new Error(errorText || 'ไม่สามารถบันทึกแกลลอรี่ได้');
        }
      }

      const data = await response.json();
      console.log('Success:', data);

      setMessage(galleryId ? 'แก้ไขแกลลอรี่สำเร็จ!' : 'จองแกลลอรี่สำเร็จ!');
      // เคลียร์ฟอร์ม
      setName('');
      setStartDate('');
      setEndDate('');
      setDescription('');
      setSelectedFiles([]);
      setPreviews([]);

      // Redirect หลังจากบันทึกสำเร็จ
      router.push('/GalleryShow?month=' + new Date(startDate).toISOString().slice(0, 7));
    } catch (error) {
      console.error('Error:', error);
      setMessage(error.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
    } finally {
      setIsLoading(false); // หยุดโหลด
    }
  };

  // ตรวจสอบวันที่เมื่อมีการเปลี่ยนแปลง
  const handleDateChange = (setter) => (e) => {
    const value = e.target.value;
    setter(value);
    validateDates();
  };

  // ลบรูปภาพ
  const removeImage = (indexToRemove) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
    setPreviews((prevPreviews) => prevPreviews.filter((_, index) => index !== indexToRemove));
  };

  // เปิด file input เมื่อคลิกปุ่ม
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {galleryId ? 'แก้ไขแกลลอรี่' : 'จองแกลลอรี่'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ชื่อแกลลอรี่ */}
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

        {/* วันที่เริ่ม */}
        <div className="space-y-2">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            วันที่เริ่ม:
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleDateChange(setStartDate)}
            min={new Date().toISOString().split('T')[0]}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* วันที่สิ้นสุด */}
        <div className="space-y-2">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            วันที่สิ้นสุด:
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleDateChange(setEndDate)}
            min={startDate || new Date().toISOString().split('T')[0]}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* คำอธิบาย */}
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

        {/* ส่วนปุ่มอัพโหลดรูปภาพ */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleButtonClick}
            className="py-2 px-4 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            +เพิ่มรูปภาพ
          </button>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {/* แสดง preview รูปที่เลือก */}
          {previews.length > 0 && (
            <div className="mt-2 grid grid-cols-2 gap-2">
              {previews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* แสดงข้อความข้อผิดพลาด */}
        {message && (
          <div className="text-sm text-red-500">{message}</div>
        )}

        {/* ปุ่มส่งฟอร์ม */}
        <div className="mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-green-500 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 disabled:bg-gray-400"
          >
            {isLoading ? 'กำลังประมวลผล...' : galleryId ? 'บันทึกการแก้ไข' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
