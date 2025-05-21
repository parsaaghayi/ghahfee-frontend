'use client';

import { useEffect, useState } from 'react';
import { Package, Users, ShoppingCart, DollarSign } from 'lucide-react';

interface Stats {
  totalProducts: number;
  totalUsers: number;
  newOrders: number;
  todayIncome: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalUsers: 0,
    newOrders: 0,
    todayIncome: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'کل محصولات',
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'کل کاربران',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'سفارشات جدید',
      value: stats.newOrders.toLocaleString(),
      icon: ShoppingCart,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      title: 'درآمد امروز',
      value: `${stats.todayIncome.toLocaleString()} تومان`,
      icon: DollarSign,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-lg shadow-sm p-6 flex items-center"
        >
          <div className={`p-3 rounded-lg ${card.color}`}>
            <card.icon className="h-6 w-6" />
          </div>
          <div className="ms-4">
            <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
            <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 