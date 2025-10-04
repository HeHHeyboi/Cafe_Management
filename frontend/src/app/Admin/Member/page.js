'use client';

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function MembersPage() {
  // ข้อมูลสมาชิก
  const [members, setMembers] = useState([
    { id: "E001", name: "John Doe", role: "Employee", status: "Active" },
    { id: "E002", name: "Jane Smith", role: "Owner", status: "Active" },
    { id: "E003", name: "Alice Wong", role: "Employee", status: "Inactive" },
    { id: "E004", name: "Bob Marley", role: "Employee", status: "Active" },
    { id: "E005", name: "Chris Brown", role: "Employee", status: "Active" },
    { id: "E006", name: "Diana Ross", role: "Owner", status: "Inactive" },
    { id: "E007", name: "Eva Green", role: "Employee", status: "Active" },
    { id: "E008", name: "Frank Ocean", role: "Employee", status: "Inactive" },
    { id: "E009", name: "George Smith", role: "Employee", status: "Active" },
    { id: "E010", name: "Hannah Lee", role: "Employee", status: "Active" },
    { id: "E011", name: "Ian Curtis", role: "Employee", status: "Inactive" },
    { id: "E012", name: "Jack White", role: "Owner", status: "Active" },
    { id: "E013", name: "Kelly Clarkson", role: "Employee", status: "Active" },
    { id: "E014", name: "Liam Neeson", role: "Employee", status: "Inactive" },
    { id: "E015", name: "Maria Carey", role: "Employee", status: "Active" },
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Slice ของสมาชิกที่จะแสดง
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentMembers = members.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(members.length / rowsPerPage);

  // สรุปข้อมูลสำหรับ Card
  const totalMembers = members.length;
  const totalOwners = members.filter(m => m.role === "Owner").length;
  const totalEmployeesRole = members.filter(m => m.role === "Employee").length;
  const totalActive = members.filter(m => m.status === "Active").length;
  const totalInactive = members.filter(m => m.status === "Inactive").length;

  // Pagination Handlers
  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-6">

      {/* Header + Add Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Member List</h1>
        <Link href="/Admin/AddNewMember" passHref>
          <button className="px-4 py-2 bg-amber-700 text-white rounded-xl hover:bg-amber-800 transition shadow">
            Add New Member
          </button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6  ">
        {[
          { title: "Total Members", value: totalMembers, color: "text-gray-900" },
          { title: "Owners", value: totalOwners, color: "text-purple-700" },
          { title: "Employees", value: totalEmployeesRole, color: "text-blue-700" },
          { title: "Active", value: totalActive, color: "text-green-600" },
          { title: "Inactive", value: totalInactive, color: "text-red-600" }
        ].map((card, i) => (
          <Card
            key={i}
            className="bg-white rounded-2xl shadow p-4 text-center hover:shadow-md transition-shadow"
          >
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Member Table */}
      <Card className="bg-white rounded-2xl shadow p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-gray-700 font-medium">All Members</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <Table className="text-sm text-gray-700">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-center">ID</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Role</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentMembers.map((member) => (
                <TableRow key={member.id} className="hover:bg-gray-50">
                  <TableCell className="text-center">{member.id}</TableCell>
                  <TableCell className="text-center">{member.name}</TableCell>

                  {/* Role Badge */}
                  <TableCell className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        member.role === "Owner"
                          ? "bg-purple-200 text-purple-800"
                          : "bg-blue-200 text-blue-800"
                      }`}
                    >
                      {member.role}
                    </span>
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        member.status === "Active"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {member.status}
                    </span>
                  </TableCell>

                  {/* Action Buttons */}
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

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
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
