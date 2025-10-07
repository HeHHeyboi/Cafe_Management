"use client"
import Link from "next/link";
import { CircleUserRound, Home, BarChart2, LogOut } from "lucide-react";
import { Clock } from "lucide-react"; 
import { Coffee } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loadingLogout, setLoadingLogout] = useState(false);

  const menuItems = [
    // { title: "Dashboard", href: "/Admin/Dashboard", icon: Home },
    { title: "MenuOrder", href: "/Admin/MenuOrder", icon: Coffee },
    { title: "History", href: "/Admin/History", icon: Clock },
    { title: "Member", href: "/Admin/Member", icon: CircleUserRound },
  ];

  const handleLogout = async () => {
    setLoadingLogout(true);
    try {
      localStorage.removeItem("isLoggined")
      if (localStorage.getItem("isLoggined")) {
        alert("Logout failed");
      } else {
        router.push('/Login');
      }
    } catch (error) {
      alert('Logout error');
    } finally {
      setLoadingLogout(false);
    }
  };

  return (
    <nav className="p-6 pt-12 bg-gray-50 min-h-screen w-64 shadow-md">
      <ul className="space-y-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <li key={item.title}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition 
                  ${isActive ? "bg-amber-50 text-amber-600" : "text-gray-700 hover:bg-gray-100 hover:text-amber-600"}`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}

        <li>
          <button
            onClick={handleLogout}
            disabled={loadingLogout}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-amber-600 w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            <span>{loadingLogout ? 'Logging out...' : 'Log Out'}</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
