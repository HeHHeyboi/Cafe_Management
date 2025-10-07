'use client';

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../../../components/ui/select";

export default function EditMemberPage() {
  const router = useRouter();
  const params = useParams();

  // แปลง E001 → 1
  const memberId = params.id?.replace("E", "").replace(/^0+/, "");

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    status: "",
  });

  // ดึงข้อมูลสมาชิกจาก API
  useEffect(() => {
    if (!memberId) return;

    const fetchMember = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/member/${memberId}`);
        const data = res.data;
        setFormData({
          name: data.name || "",
          role: data.role || "",
          status: data.status || "",
        });
      } catch (error) {
        console.error("Error fetching member:", error);
        alert("❌ Failed to load member data.");
        router.push("/Admin/Member");
      }
    };

    fetchMember();
  }, [memberId, router]);

  // ฟังก์ชันสำหรับบันทึกข้อมูล
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/member/${memberId}`,
        {
          name: formData.name,
          role: formData.role,
          status: formData.status,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("✅ Member updated successfully!");
      router.push("/Admin/Member");
    } catch (error) {
      console.error("Error updating member:", error);
      alert("❌ Failed to update member.");
    }
  };

  return (
    <div className="p-20 bg-gray-50 flex justify-center">
      <Card className="w-full max-w-lg bg-white rounded-2xl shadow p-10">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-gray-700 font-bold text-3xl">Edit Member</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter Member Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3 py-2 border rounded-lg h-10"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <Select
                value={formData.role}
                onValueChange={(val) => setFormData({ ...formData, role: val })}
              >
                <SelectTrigger className="w-full h-10 px-3">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Employee">Employee</SelectItem>
                  <SelectItem value="Owner">Owner</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <Select
                value={formData.status}
                onValueChange={(val) => setFormData({ ...formData, status: val })}
              >
                <SelectTrigger className="w-full h-10 px-3">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4 pt-4">
              <Button
                type="button"
                className="flex-1 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-xl shadow"
                onClick={() => router.push("/Admin/Member")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 w-full bg-amber-700 text-white rounded-xl hover:bg-amber-800 shadow"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
