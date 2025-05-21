"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Search, User } from 'lucide-react';

export default function AdminHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو..."
              className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <User className="h-6 w-6" />
              <span>مدیر</span>
            </button>

            {isProfileOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                <Link
                  href="/admin/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  پروفایل
                </Link>
                <Link
                  href="/admin/settings"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  تنظیمات
                </Link>
                <button className="block w-full text-right px-4 py-2 text-red-600 hover:bg-gray-100">
                  خروج
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 