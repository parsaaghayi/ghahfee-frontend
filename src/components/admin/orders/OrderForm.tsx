"use client";

import { useState, useEffect } from "react";

interface OrderFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  order?: any;
}

export default function OrderForm({
  open,
  onClose,
  onSubmit,
  order
}: OrderFormProps) {
  const [formData, setFormData] = useState({
    status: order?.status || 'pending',
    tracking_number: order?.tracking_number || '',
    notes: order?.notes || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            {order ? 'ویرایش سفارش' : 'سفارش جدید'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  وضعیت
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  <option value="pending">در انتظار پرداخت</option>
                  <option value="processing">در حال پردازش</option>
                  <option value="shipped">ارسال شده</option>
                  <option value="delivered">تحویل داده شده</option>
                  <option value="cancelled">لغو شده</option>
                </select>
              </div>

              <div>
                <label htmlFor="tracking_number" className="block text-sm font-medium text-gray-700">
                  شماره پیگیری
                </label>
                <input
                  type="text"
                  name="tracking_number"
                  id="tracking_number"
                  value={formData.tracking_number}
                  onChange={handleChange}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  یادداشت‌ها
                </label>
                <textarea
                  name="notes"
                  id="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm"
              >
                ذخیره
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:col-start-1 sm:text-sm"
              >
                انصراف
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 