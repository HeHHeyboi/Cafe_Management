"use client"
import Link from "next/link";
import { CircleUserRound, Home, BarChart2 } from "lucide-react";
import { Clock } from "lucide-react"; 
import { Coffee } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
  { title: "Dashboard", href: "/Admin/Dashboard", icon: Home },
  { title: "MenuOrder", href: "/Admin/MenuOrder", icon: Coffee },
  { title: "History", href: "/Admin/History", icon: Clock },
  
];


  return (
    <nav className="p-6 bg-gray-50 min-h-screen w-64 shadow-md">
      <ul className="space-y-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <li key={item.title}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition 
                  ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"}`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
