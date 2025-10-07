'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminLoginPage() {
  const router = useRouter(); // ใช้สำหรับเปลี่ยนหน้าเมื่อ login สำเร็จ
  const [username, setUsername] = useState(""); // เก็บค่าชื่อผู้ใช้งานที่กรอก
  const [password, setPassword] = useState(""); // เก็บค่ารหัสผ่านที่กรอก
  const [error, setError] = useState(""); // เก็บข้อความ error ถ้า login ผิด

  // 📝 ข้อมูล admin ตัวอย่าง (mock)
  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123",
  };


  useEffect(() => {
    const isLoggined = localStorage.getItem('isLoggined');
    console.log("isLoggined: ", isLoggined);
    if (isLoggined) {
      router.push("/Admin/MenuOrder");
    }
  }, []);
  // ฟังก์ชันตรวจสอบ login
  const handleLogin = (e) => {
    e.preventDefault(); // ป้องกันการ reload หน้าเมื่อ submit
    
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
      "email": username,
      "password": password,
    }, {
      withCredentials: true,
    }).then((response) => {
      console.log(response);
      if (response.status == 201 || response.status == 200) {
        localStorage.setItem("isLoggined", true);
        router.push('/Admin/MenuOrder');
      } else {
        setError(response.data.msg);
      }      
    }).catch((error) => {
      console.log(error);
      const msg = error.response?.data?.['Bad Requst'] ?? error.response.data?.['error'];
      alert(msg);
    })
    // router.push("/Admin/MenuOrder")
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* กล่องใหญ่ของ Login */}
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden min-h-[600px]">

        {/* Left side - ข้อความต้อนรับ */}
        <div className="md:w-2/5 bg-amber-600/90 flex items-center justify-center p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
            Cafe Management System
          </h1>
        </div>

        {/* Right side - Form Login */}
        <div className="md:w-3/5 bg-white p-10 flex flex-col justify-center">
          <h2 className="font-bold text-3xl text-gray-900 mb-6 text-center md:text-left">
            Admin Login
          </h2>

          {/* แสดงข้อความ error ถ้ามี */}
          {error && (
            <div className="mb-4 text-red-500 text-sm text-center md:text-left">{error}</div>
          )}

          {/* ฟอร์ม login */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username input */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">Username</label>
              <input
                type="text"
                value={username} // value จาก state
                onChange={(e) => setUsername(e.target.value)} // update state เมื่อกรอก
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
                placeholder="Enter username"
                required
              />
            </div>

            {/* Password input */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">Password</label>
              <input
                type="password"
                value={password} // value จาก state
                onChange={(e) => setPassword(e.target.value)} // update state เมื่อกรอก
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
                placeholder="Enter password"
                required
              />
            </div>

            {/* ปุ่ม Login */}
            <button
              type="submit" // trigger handleLogin
              className="w-full bg-amber-600 text-white py-3 rounded-xl hover:bg-amber-700 transition duration-200 shadow-md font-medium"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
