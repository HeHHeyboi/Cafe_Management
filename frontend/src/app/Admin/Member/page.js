'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

// UI Components
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from"../../../components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../components/ui/select";

// Icons
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Filters & Sorting
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchName, setSearchName] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  // Fetch members from API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/member`);
        const apiData = response.data;

        const formatted = apiData.map((member) => ({
          id: `E${String(member.member_id).padStart(3, '0')}`,
          name: member.name,
          role: member.role,
          status: member.status.charAt(0).toUpperCase() + member.status.slice(1), // active → Active
        }));

        setMembers(formatted);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleDelete = async (encodedId) => {
  const memberId = encodedId.replace("E", "").replace(/^0+/, "");

  const confirmDelete = confirm("Are you sure you want to delete this member?");
  if (!confirmDelete) return;

  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/member/${memberId}`);

    if (res.status === 200) {
      alert("Member deleted successfully");
      
      // รีโหลดสมาชิกใหม่หลังจากลบ
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/member`);
      const apiData = response.data;
      const formatted = apiData.map((member) => ({
        id: `E${String(member.member_id).padStart(3, '0')}`,
        name: member.name,
        role: member.role,
        status: member.status.charAt(0).toUpperCase() + member.status.slice(1),
      }));
      setMembers(formatted);
    }
  } catch (error) {
    console.error("Error deleting member:", error);
    alert(`Failed to delete member. ${error.response.data.error}`);
  }
};


  // Filter, search, sort
  const filteredMembers = members
    .filter(member =>
      (roleFilter === "All" || member.role === roleFilter) &&
      (statusFilter === "All" || member.status === statusFilter) &&
      member.name.toLowerCase().includes(searchName.toLowerCase())
    )
    .sort((a, b) =>
      sortAsc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
    );

  // Pagination
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredMembers.length / rowsPerPage);

  // Summary
  const totalMembers = members.length;
  const totalOwners = members.filter(m => m.role === "Owner").length;
  const totalEmployees = members.filter(m => m.role === "Employee").length;
  const totalActive = members.filter(m => m.status === "Active").length;
  const totalInactive = members.filter(m => m.status === "Inactive").length;

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Member List</h1>
        <Link href="/Admin/Member/AddNewMember" passHref>
          <button className="px-4 py-2 bg-amber-700 text-white rounded-xl hover:bg-amber-800 transition shadow">
            Add New Member
          </button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {[
          { title: "Total Members", value: totalMembers, color: "text-gray-900" },
          { title: "Owners", value: totalOwners, color: "text-purple-700" },
          { title: "Employees", value: totalEmployees, color: "text-blue-700" },
          { title: "Active", value: totalActive, color: "text-green-600" },
          { title: "Inactive", value: totalInactive, color: "text-red-600" },
        ].map((card, i) => (
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

      {/* Member Table */}
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

            {/* Role Filter */}
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

            {/* Status Filter */}
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

        {/* Table */}
        <CardContent className="p-0">
          <Table className="text-sm text-gray-700">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-center cursor-pointer" onClick={() => setSortAsc(!sortAsc)}>
                  <div className="flex items-center justify-center gap-1">
                    ID {sortAsc ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
                  </div>
                </TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Role</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentMembers.map(member => (
                <TableRow key={member.id} className="hover:bg-gray-50">
                  <TableCell className="text-center">{member.id}</TableCell>
                  <TableCell className="text-center">{member.name}</TableCell>
                  <TableCell className="text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${member.role === "Owner" ? "bg-purple-200 text-purple-800" : "bg-blue-200 text-blue-800"}`}>
                      {member.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${member.status === "Active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                      {member.status}
                    </span>
                  </TableCell>
                 <TableCell className="text-center space-x-2 flex justify-center items-center">
  <Link href={`/Admin/Member/EditMember/${member.id}`}>
    <button className="px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-sm shadow text-sm">
      Edit
    </button>
  </Link>
  <button
    onClick={() => handleDelete(member.id)}
    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-sm shadow text-sm"
  >
    Delete
  </button>
</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
