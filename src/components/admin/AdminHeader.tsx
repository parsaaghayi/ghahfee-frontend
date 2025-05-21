"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiBell, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

export default function AdminHeader() {
  const router = useRouter();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    // TODO: Implement logout logic
    router.push('/admin/auth/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">پنل مدیریت قهوه</h1>
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <span className="sr-only">باز کردن منوی کاربر</span>
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">ا</span>
                  </div>
                </button>
              </div>

              {isProfileMenuOpen && (
                <div className="origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    خروج
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 