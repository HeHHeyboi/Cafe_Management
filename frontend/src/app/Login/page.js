'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      router.push("/Admin/Dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden min-h-[600px]">
        {/* Left side */}
        <div className="md:w-2/5 bg-amber-600/90 flex items-center justify-center p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
            Cafe Management System
          </h1>
        </div>

        {/* Right side (Login form) */}
        <div className="md:w-3/5 bg-white p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center md:text-left">
            Admin Login
          </h2>

          {error && (
            <div className="mb-4 text-red-500 text-sm text-center md:text-left">{error}</div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
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
