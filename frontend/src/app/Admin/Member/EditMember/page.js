'use client';

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ตัวอย่าง mock data สำหรับ demo
const mockEmployees = [
  { id: "E001", name: "John Doe", role: "Employee", status: "Active" },
  { id: "E002", name: "Jane Smith", role: "Owner", status: "Active" },
  { id: "E003", name: "Alice Wong", role: "Employee", status: "Inactive" },
];

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams(); // ดึงค่า id จาก URL
  const employeeId = params.id;

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    role: "Employee",
    status: "Active",
  });

  // ดึงข้อมูลพนักงานจาก mock data
  useEffect(() => {
    const emp = mockEmployees.find(e => e.id === employeeId);
    if (emp) setFormData(emp);
  }, [employeeId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Member:", formData);
    alert(`✅ Member ${formData.name} updated successfully!`);
    router.push("/Admin/Member"); // กลับไปหน้า Member List
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center">
      <Card className="w-full max-w-lg bg-white rounded-2xl shadow p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-gray-700 font-medium text-xl">
            Edit Member
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Member ID */}
            <div>
              <label className="block text-sm font-medium mb-1">Member ID</label>
              <input
                type="text"
                required
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full p-2 border rounded-lg"
              >
                <option value="Employee">Employee</option>
                <option value="Owner">Owner</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full p-2 border rounded-lg"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Submit */}
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800"
                onClick={() => router.push("/Admin/Member")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white"
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
