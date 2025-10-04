'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";


export default function AddMemberPage() {

  // --------------------------
  // กำหนด state สำหรับข้อมูลสมาชิก
  // --------------------------
  const [nextId, setNextId] = useState(1); // เก็บเลขลำดับสมาชิกคนถัดไป (เริ่มจาก 1)
  const [formData, setFormData] = useState({
    id: "",      // Member ID 
    name: "",    // ชื่อสมาชิก
    role: "",    // ตำแหน่ง (Role)
    status: "",  // สถานะ (Active / Inactive)
  });

  // --------------------------
  // useEffect: ทุกครั้งที่ nextId เปลี่ยน
  // จะ gen Member ID ใหม่ เช่น #E001, #E002, ...
  // --------------------------
  useEffect(() => {
    const idStr = `#E${String(nextId).padStart(3, '0')}`; 
    setFormData(prev => ({ ...prev, id: idStr }));
  }, [nextId]);

  // --------------------------
  // handleSubmit: เมื่อกด Add Member
  // จะ log ข้อมูล, แจ้งเตือน และเพิ่ม nextId +1
  // --------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Member:", formData); 
    alert(`✅ Member ${formData.name} added successfully!`);
    setNextId(prev => prev + 1); // เพิ่มค่า nextId เพื่อเตรียมรหัสสมาชิกถัดไป
  };

  return (
    <div className="p-20 bg-gray-50 flex justify-center">
      {/* Card กล่องฟอร์ม */}
      <Card className="w-full max-w-lg bg-white rounded-2xl shadow p-10 justify-center">
        
        {/* ส่วนหัว Card */}
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-gray-700 font-bold text-3xl">Add New Member</CardTitle>
        </CardHeader>

        {/* ส่วนเนื้อหา (Form) */}
        <CardContent className="p-0">
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* ฟิลด์ Member ID (อ่านอย่างเดียว, gen อัตโนมัติ) */}
            <div>
              <label className="block text-sm font-medium mb-1">Member ID</label>
              <input
                type="text"
                value={formData.id}
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-200"
              />
            </div>

            {/* ฟิลด์ Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                required
                placeholder="Enter Member Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg h-10"
              />
            </div>

            {/* ฟิลด์ Role (เลือกจาก Select) */}
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <Select value={formData.role} onValueChange={(val) => setFormData({ ...formData, role: val })}>
                <SelectTrigger className="w-full h-10 px-3">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Employee">Employee</SelectItem>
                  <SelectItem value="Owner">Owner</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* ฟิลด์ Status (เลือกจาก Select) */}
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <Select value={formData.status} onValueChange={(val) => setFormData({ ...formData, status: val })}>
                <SelectTrigger className="w-full h-10 px-3">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* ปุ่ม Cancel และ Add Member */}
            <div className="flex gap-4 mt-4 pt-4">
              {/* ปุ่ม Cancel กลับไปหน้า Member */}
              <Link href={`/Admin/Member`} passHref className="flex-1">
                <Button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-xl shadow">
                  Cancel
                </Button>
              </Link>

              {/* ปุ่ม Add Member */}
              <Button
                type="submit"
                className="flex-1 w-full bg-amber-700 text-white rounded-xl hover:bg-amber-800 shadow"
              >
                Add Member
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
