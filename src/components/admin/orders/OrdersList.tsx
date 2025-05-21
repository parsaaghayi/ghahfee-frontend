"use client";

import { useState, useEffect } from "react";
import DataTable from "@/components/admin/DataTable";
import { getOrders, updateOrder } from "@/lib/admin/api";

const columns = [
  { id: "id", label: "شناسه", minWidth: 50 },
  { id: "user", label: "کاربر", minWidth: 170 },
  { id: "total", label: "مبلغ کل", minWidth: 100 },
  { id: "status", label: "وضعیت", minWidth: 100 },
  { id: "created_at", label: "تاریخ ایجاد", minWidth: 100 },
];

// این داده‌ها باید از API دریافت شوند
const initialData = [
  {
    id: 1,
    user: "علی محمدی",
    total: "150,000 تومان",
    status: "در انتظار پرداخت",
    created_at: "1402/01/01",
  },
  {
    id: 2,
    user: "رضا احمدی",
    total: "200,000 تومان",
    status: "پرداخت شده",
    created_at: "1402/01/01",
  },
  // ... سایر داده‌ها
];

export default function OrdersList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getOrders({
        page: page + 1,
        per_page: rowsPerPage,
      });
      setOrders(response.data.data);
      setTotalCount(response.data.total);
    } catch (err: any) {
      setError(err.message || "خطا در دریافت لیست سفارشات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, rowsPerPage]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updateOrder(id, { status: newStatus });
      fetchOrders();
    } catch (err: any) {
      alert(err.message || "خطا در به‌روزرسانی وضعیت سفارش");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">لیست سفارشات</h2>
      </div>

      <DataTable
        columns={columns}
        data={initialData}
        onEdit={(id) => handleStatusChange(id, "processing")}
        onDelete={(id) => handleStatusChange(id, "cancelled")}
      />
    </div>
  );
} 