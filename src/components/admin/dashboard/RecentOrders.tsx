'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns-jalali';

interface Order {
  id: number;
  order_number: string;
  total_amount: number;
  status: string;
  created_at: string;
  user: {
    name: string;
    phone?: string;
    addresses?: { city?: string }[];
  };
}

export default function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/admin/orders?limit=5');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(Array.isArray(data) ? data : data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'در انتظار پرداخت';
      case 'processing':
        return 'در حال پردازش';
      case 'completed':
        return 'تکمیل شده';
      case 'cancelled':
        return 'لغو شده';
      case 'delivered':
        return 'تحویل شده';
      case 'paid':
        return 'پرداخت شده';
      case 'shipped':
        return 'ارسال شده';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">سفارشات اخیر</h2>
      </div>
      <div className="divide-y">
        {orders.length === 0 ? (
          <div className="p-6 text-center text-gray-500">سفارشی وجود ندارد.</div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="p-6">
              <div className="grid grid-cols-3 items-center gap-4">
                <div className="truncate">
                  <p className="text-sm font-medium text-gray-900">
                    سفارش #{order.order_number} <span className="text-xs text-gray-400">(شناسه: {order.id})</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1 flex flex-wrap items-center gap-1">
                    {order.user?.name || '-'}
                    {order.user?.phone && <span className="mx-1"> - </span>}
                    {order.user?.phone && `${order.user.phone}`}
                    {order.user?.addresses && order.user.addresses[0]?.city && <span className="mx-1"> - </span>}
                    {order.user?.addresses && order.user.addresses[0]?.city}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">
                    {(order.total_amount ?? 0).toLocaleString()} تومان
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.created_at ? format(new Date(order.created_at), 'yyyy/MM/dd') : '-'}
                  </p>
                </div>
                <div className="flex justify-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-6 border-t">
        <Link
          href="/admin/orders"
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          مشاهده همه سفارشات
        </Link>
      </div>
    </div>
  );
} 