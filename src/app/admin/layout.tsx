"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import {
  Home,
  ShoppingCart,
  Folder,
  Users,
  CreditCard,
  Truck,
  FileText,
  Tag,
  Settings
} from "lucide-react";

const menuItems = [
  { text: "داشبورد", icon: <Home size={20} />, path: "/admin" },
  { text: "محصولات", icon: <ShoppingCart size={20} />, path: "/admin/products" },
  { text: "دسته‌بندی‌ها", icon: <Folder size={20} />, path: "/admin/categories" },
  { text: "کاربران", icon: <Users size={20} />, path: "/admin/users" },
  { text: "سفارشات", icon: <CreditCard size={20} />, path: "/admin/orders" },
  { text: "حمل و نقل", icon: <Truck size={20} />, path: "/admin/shipping" },
  { text: "وبلاگ", icon: <FileText size={20} />, path: "/admin/blog" },
  { text: "کوپن‌ها", icon: <Tag size={20} />, path: "/admin/coupons" },
  { text: "تنظیمات", icon: <Settings size={20} />, path: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed z-30 inset-y-0 right-0 w-56 bg-white border-l border-gray-200 flex flex-col transition-transform duration-200 md:static md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
          <span className="font-bold text-lg">پنل مدیریت</span>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            ✖️
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link href={item.path} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-base">{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 sticky top-0 z-20">
          <button className="md:hidden text-2xl" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <span className="font-bold text-lg">قهوه - پنل مدیریت</span>
          <div></div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
} 