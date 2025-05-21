"use client";

import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ReportsDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [salesData, setSalesData] = useState<any>(null);
  const [ordersData, setOrdersData] = useState<any>(null);
  const [productsData, setProductsData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // اینجا باید داده‌ها را از API دریافت کرد
        // فعلاً از داده‌های نمونه استفاده می‌کنیم
        setSalesData({
          labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"],
          datasets: [
            {
              label: "فروش",
              data: [12, 19, 3, 5, 2, 3],
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        });

        setOrdersData({
          labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"],
          datasets: [
            {
              label: "سفارشات",
              data: [65, 59, 80, 81, 56, 55],
              backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
          ],
        });

        setProductsData({
          labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"],
          datasets: [
            {
              label: "محصولات",
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: "rgba(153, 102, 255, 0.5)",
            },
          ],
        });
      } catch (err: any) {
        setError(err.message || "خطا در دریافت اطلاعات");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">خطا!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">داشبورد گزارشات</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">نمودار فروش</h2>
          {salesData && <Line data={salesData} />}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">نمودار سفارشات</h2>
          {ordersData && <Bar data={ordersData} />}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">نمودار محصولات</h2>
          {productsData && <Bar data={productsData} />}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">مجموع فروش</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">۱۲,۵۰۰,۰۰۰ تومان</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">تعداد سفارشات</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">۱۵۰</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">تعداد محصولات</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">۵۰</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">تعداد کاربران</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">۱,۲۰۰</p>
        </div>
      </div>
    </div>
  );
}