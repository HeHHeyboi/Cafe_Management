"use client";

import AdminSidebar from "@/components/ui/AdminSidebar";
import AdminDashboardPage from "@/app/Admin/Dashboard/page";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <main className="flex-1 p-8">
        <AdminDashboardPage />
      </main>
    </div>
  );
}
