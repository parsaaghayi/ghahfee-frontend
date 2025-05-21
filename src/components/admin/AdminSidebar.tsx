"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const menuItems = [
  {
    title: 'داشبورد',
    href: '/admin',
  },
  {
    title: 'محصولات',
    href: '/admin/products',
  },
  {
    title: 'سفارشات',
    href: '/admin/orders',
  },
  {
    title: 'کاربران',
    href: '/admin/users',
  },
  {
    title: 'نظرات',
    href: '/admin/reviews',
  },
  {
    title: 'تنظیمات',
    href: '/admin/settings',
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-sm h-screen">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  isActive
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
} 