"use client";

import { useState, useEffect } from 'react';
import { getDashboardStats } from '@/lib/admin/api';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    newOrders: 0,
    todayIncome: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getDashboardStats();
        
        // اطمینان از وجود داده‌ها
        if (response?.data) {
          setStats({
            totalProducts: response.data.totalProducts || 0,
            totalUsers: response.data.totalUsers || 0,
            newOrders: response.data.newOrders || 0,
            todayIncome: response.data.todayIncome || 0
          });
        } else {
          setError('داده‌ای دریافت نشد');
        }
      } catch (err: any) {
        console.error('Error fetching stats:', err);
        setError(err.message || 'خطا در دریافت اطلاعات');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'کل محصولات',
      value: stats.totalProducts.toLocaleString(),
      color: 'bg-blue-50',
    },
    {
      title: 'کل کاربران',
      value: stats.totalUsers.toLocaleString(),
      color: 'bg-green-50',
    },
    {
      title: 'سفارشات جدید',
      value: stats.newOrders.toLocaleString(),
      color: 'bg-orange-50',
    },
    {
      title: 'درآمد امروز',
      value: `${stats.todayIncome.toLocaleString()} تومان`,
      color: 'bg-purple-50',
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 bg-red-50 text-red-500 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        داشبورد
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.title} className="w-full">
            <div className={`p-6 ${card.color} rounded-lg shadow-sm`}>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                {card.title}
              </h2>
              <p className="text-2xl font-bold text-gray-900">
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* اینجا می‌تونیم نمودارها و جداول دیگه رو اضافه کنیم */}
    </div>
  );
} 