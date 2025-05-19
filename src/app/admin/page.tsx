"use client";

import DashboardStatCard from "./components/DashboardStatCard";
import { ShoppingCart, Users, CreditCard, Truck } from "lucide-react";

const stats = [
  {
    title: "کل محصولات",
    value: "150",
    icon: <ShoppingCart size={40} />,
    color: "#1976d2",
  },
  {
    title: "کاربران فعال",
    value: "2,450",
    icon: <Users size={40} />,
    color: "#2e7d32",
  },
  {
    title: "سفارشات امروز",
    value: "45",
    icon: <CreditCard size={40} />,
    color: "#ed6c02",
  },
  {
    title: "در انتظار ارسال",
    value: "12",
    icon: <Truck size={40} />,
    color: "#9c27b0",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-right">داشبورد</h1>
      <div className="flex w-full flex-wrap gap-6 mb-8">
        {stats.map((stat) => (
          <DashboardStatCard key={stat.title} {...stat} />
        ))}
      </div>
      <div className="flex flex-wrap gap-6">
        <div className="bg-white rounded-lg shadow p-6 min-w-[250px]">
          <h2 className="font-bold mb-2 text-right">آخرین سفارشات</h2>
          {/* اینجا جدول آخرین سفارشات */}
        </div>
        <div className="bg-white rounded-lg shadow p-6 min-w-[250px]">
          <h2 className="font-bold mb-2 text-right">محصولات پرفروش</h2>
          {/* اینجا لیست محصولات پرفروش */}
        </div>
      </div>
    </div>
  );
} 