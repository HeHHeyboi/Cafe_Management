'use client';

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../../components/ui/select";

export default function AddMemberPage() {

  // กำหนด state สำหรับข้อมูลสมาชิก
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    status: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/member`,
        {
          name: formData.name,
          role: formData.role,
          status: formData.status.toLowerCase(), // active/inactive เป็นตัวเล็ก
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.msg === "Member created successfully") {
        alert(`✅ Member ${formData.name} added successfully!`);

        // เก็บข้อมูล member ลง localStorage
        const newMember = {
          id: response.data.member_id,
          name: formData.name,
          role: formData.role,
          status: formData.status,
        };

        // อ่านข้อมูลเดิมจาก localStorage
        const existingMembers = JSON.parse(localStorage.getItem("members")) || [];
        // เพิ่มสมาชิกใหม่เข้าไป
        existingMembers.push(newMember);
        // เก็บข้อมูลใหม่ลง localStorage
        localStorage.setItem("members", JSON.stringify(existingMembers));

        // เคลียร์ฟอร์ม
        setFormData({ name: "", role: "", status: "" });
      } else {
        alert("❌ Failed to add member.");
      }
    } catch (error) {
      console.error("Error adding member:", error);
      alert("❌ Something went wrong while adding the member.");
    }
  };

  return (
    <div className="p-20 bg-gray-50 flex justify-center">
      <Card className="w-full max-w-lg bg-white rounded-2xl shadow p-10 justify-center">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-gray-700 font-bold text-3xl">Add New Member</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <form className="space-y-4" onSubmit={handleSubmit}>
            
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

            {/* ฟิลด์ Role */}
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <Select value={formData.role} onValueChange={(val) => setFormData({ ...formData, role: val })}>
                <SelectTrigger className="w-full h-10 px-3">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Owner">Owner</SelectItem>
                  <SelectItem value="Employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* ฟิลด์ Status */}
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
              <Link href={`/Admin/Member`} passHref className="flex-1">
                <Button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-xl shadow">
                  Cancel
                </Button>
              </Link>

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
