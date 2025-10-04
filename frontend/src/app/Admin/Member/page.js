'use client';

import React, { useState } from "react";
import Link from "next/link";
// UI Components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// Icons
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid"; // สำหรับไอคอนขึ้น/ลง

export default function MembersPage() {

  // --------------------------
  // State ของสมาชิกและการจัดการหน้า
  // --------------------------
  const [members, setMembers] = useState([
    // ตัวอย่างข้อมูลสมาชิก
    { id: "E001", name: "John Doe", role: "Employee", status: "Active" },
    { id: "E002", name: "Jane Smith", role: "Owner", status: "Active" },
    { id: "E003", name: "Alice Wong", role: "Employee", status: "Inactive" },
    { id: "E004", name: "John Doe", role: "Employee", status: "Active" },
    { id: "E005", name: "Jane Smith", role: "Owner", status: "Active" },
    { id: "E006", name: "Alice Wong", role: "Employee", status: "Inactive" },
    { id: "E007", name: "John Doe", role: "Employee", status: "Active" },
    { id: "E008", name: "Jane Smith", role: "Owner", status: "Active" },
    { id: "E009", name: "Alice Wong", role: "Employee", status: "Inactive" },
    { id: "E010", name: "John Doe", role: "Employee", status: "Active" },
    { id: "E011", name: "Jane Smith", role: "Owner", status: "Active" },
    { id: "E012", name: "Alice Wong", role: "Employee", status: "Inactive" },
    { id: "E013", name: "John Doe", role: "Employee", status: "Active" },
    { id: "E014", name: "Jane Smith", role: "Owner", status: "Active" },
    { id: "E015", name: "Alice Wong", role: "Employee", status: "Inactive" },
    
  ]);

  const [currentPage, setCurrentPage] = useState(1); // หน้าปัจจุบัน
  const rowsPerPage = 10; // จำนวนแถวต่อหน้า

  // --------------------------
  // State สำหรับ filter, search, sort
  // --------------------------
  const [roleFilter, setRoleFilter] = useState("All"); // กรองตาม role
  const [statusFilter, setStatusFilter] = useState("All"); // กรองตาม status
  const [searchName, setSearchName] = useState(""); // ค้นหาตามชื่อ
  const [sortAsc, setSortAsc] = useState(true); // การจัดเรียง ID (asc/desc)

  // --------------------------
  // Filter + Search + Sort
  // --------------------------
  const filteredMembers = members
    .filter(member => 
      (roleFilter === "All" || member.role === roleFilter) && // กรอง role
      (statusFilter === "All" || member.status === statusFilter) && // กรอง status
      member.name.toLowerCase().includes(searchName.toLowerCase()) // ค้นหาชื่อ
    )
    .sort((a,b) => sortAsc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)); // จัดเรียง ID

  // --------------------------
  // Pagination
  // --------------------------
  const indexOfLast = currentPage * rowsPerPage; // index แถวสุดท้ายของหน้าปัจจุบัน
  const indexOfFirst = indexOfLast - rowsPerPage; // index แถวแรกของหน้าปัจจุบัน
  const currentMembers = filteredMembers.slice(indexOfFirst, indexOfLast); // ข้อมูลแค่หน้าปัจจุบัน
  const totalPages = Math.ceil(filteredMembers.length / rowsPerPage); // จำนวนหน้าทั้งหมด

  // --------------------------
  // Summary
  // --------------------------
  const totalMembers = members.length;
  const totalOwners = members.filter(m => m.role === "Owner").length;
  const totalEmployeesRole = members.filter(m => m.role === "Employee").length;
  const totalActive = members.filter(m => m.status === "Active").length;
  const totalInactive = members.filter(m => m.status === "Inactive").length;

  // --------------------------
  // ฟังก์ชันเปลี่ยนหน้า
  // --------------------------
  const handleNextPage = () => { if(currentPage < totalPages) setCurrentPage(currentPage + 1); }
  const handlePrevPage = () => { if(currentPage > 1) setCurrentPage(currentPage - 1); }

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-6">

      {/* --------------------------
          Header + ปุ่ม Add
      -------------------------- */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Member List</h1>
        <Link href="/Admin/AddNewMember" passHref>
          <button className="px-4 py-2 bg-amber-700 text-white rounded-xl hover:bg-amber-800 transition shadow">
            Add New Member
          </button>
        </Link>
      </div>

      {/* --------------------------
          Summary Cards
      -------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {[{title:"Total Members", value:totalMembers,color:"text-gray-900"},
          {title:"Owners", value:totalOwners,color:"text-purple-700"},
          {title:"Employees", value:totalEmployeesRole,color:"text-blue-700"},
          {title:"Active", value:totalActive,color:"text-green-600"},
          {title:"Inactive", value:totalInactive,color:"text-red-600"}].map((card,i)=>(
          <Card key={i} className="bg-white rounded-2xl shadow p-4 text-center hover:shadow-md transition-shadow">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --------------------------
          Member Table
      -------------------------- */}
      <Card className="bg-white rounded-2xl shadow p-6">
        <CardHeader className="p-0 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
          <CardTitle className="text-gray-700 font-medium">All Members</CardTitle>

          {/* Filter + Search */}
          <div className="flex flex-wrap gap-2 items-center">
            {/* Search by name */}
            <input
              type="text"
              placeholder="Search by name..."
              value={searchName}
              onChange={e => { setSearchName(e.target.value); setCurrentPage(1); }}
              className="w-52 px-3 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />

            {/* Dropdown Role */}
            <Select value={roleFilter} onValueChange={val => { setRoleFilter(val); setCurrentPage(1); }}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Roles</SelectItem>
                <SelectItem value="Owner">Owner</SelectItem>
                <SelectItem value="Employee">Employee</SelectItem>
              </SelectContent>
            </Select>

            {/* Dropdown Status */}
            <Select value={statusFilter} onValueChange={val => { setStatusFilter(val); setCurrentPage(1); }}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table className="text-sm text-gray-700">
            <TableHeader>
              <TableRow className="bg-gray-100">
                {/* ID sortable */}
                <TableHead className="text-center cursor-pointer" onClick={()=>setSortAsc(!sortAsc)}>
                  <div className="flex items-center justify-center gap-1">
                    ID {sortAsc ? <ChevronUpIcon className="w-4 h-4"/> : <ChevronDownIcon className="w-4 h-4"/>}
                  </div>
                </TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Role</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentMembers.map(member=>(
                <TableRow key={member.id} className="hover:bg-gray-50">
                  <TableCell className="text-center">{member.id}</TableCell>
                  <TableCell className="text-center">{member.name}</TableCell>
                  {/* Badge Role */}
                  <TableCell className="text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${member.role==="Owner"?"bg-purple-200 text-purple-800":"bg-blue-200 text-blue-800"}`}>{member.role}</span>
                  </TableCell>
                  {/* Badge Status */}
                  <TableCell className="text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${member.status==="Active"?"bg-green-200 text-green-800":"bg-red-200 text-red-800"}`}>{member.status}</span>
                  </TableCell>
                  {/* Action buttons */}
                  <TableCell className="text-center space-x-2 flex justify-center items-center">
                    <Link href={`/Admin/Member/EditMember/${member.id}`} passHref>
                      <button className="px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-sm shadow text-sm transition flex items-center justify-center">
                        Edit
                      </button>
                    </Link>
                    <Link href={`/Admin/Member/DeleteMember/${member.id}`} passHref>
                      <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-sm shadow text-sm transition flex items-center justify-center">
                        Delete
                      </button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* --------------------------
              Pagination Controls
          -------------------------- */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-gray-600">
              Page {currentPage} of { totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
