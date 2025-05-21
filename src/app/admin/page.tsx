"use client";

import { useState, useEffect } from 'react';
import { getDashboardStats } from '@/lib/admin/api';
import { Suspense } from 'react';
import DashboardStats from '@/components/admin/dashboard/DashboardStats';
import RecentOrders from '@/components/admin/dashboard/RecentOrders';
import TopProducts from '@/components/admin/dashboard/TopProducts';
import SalesChart from '@/components/admin/dashboard/SalesChart';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">داشبورد</h1>
      
      <Suspense fallback={<div>در حال بارگذاری آمار...</div>}>
        <DashboardStats />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<div>در حال بارگذاری نمودار فروش...</div>}>
          <SalesChart />
        </Suspense>

        <Suspense fallback={<div>در حال بارگذاری محصولات پرفروش...</div>}>
          <TopProducts />
        </Suspense>
      </div>

      <Suspense fallback={<div>در حال بارگذاری سفارشات اخیر...</div>}>
        <RecentOrders />
      </Suspense>
    </div>
  );
} 