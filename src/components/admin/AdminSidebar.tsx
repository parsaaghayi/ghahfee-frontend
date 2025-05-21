"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FileText,
  Settings,
  Bell,
  Tag,
  CreditCard,
  MapPin,
  Star,
  Menu,
} from 'lucide-react';

const menuItems = [
  {
    title: 'داشبورد',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'محصولات',
    href: '/admin/products',
    icon: Package,
    submenu: [
      { title: 'لیست محصولات', href: '/admin/products' },
      { title: 'دسته‌بندی‌ها', href: '/admin/categories' },
      { title: 'برچسب‌ها', href: '/admin/tags' },
      { title: 'ویژگی‌ها', href: '/admin/attributes' },
    ],
  },
  {
    title: 'سفارشات',
    href: '/admin/orders',
    icon: ShoppingCart,
  },
  {
    title: 'کاربران',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'بلاگ',
    href: '/admin/blog',
    icon: FileText,
    submenu: [
      { title: 'پست‌ها', href: '/admin/blog/posts' },
      { title: 'دسته‌بندی‌ها', href: '/admin/blog/categories' },
      { title: 'برچسب‌ها', href: '/admin/blog/tags' },
    ],
  },
  {
    title: 'تنظیمات',
    href: '/admin/settings',
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <aside
      className={`bg-white shadow-lg transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {!isCollapsed && <h1 className="text-xl font-bold">پنل مدیریت</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.title}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={`flex items-center w-full p-2 rounded-lg hover:bg-gray-100 ${
                      pathname.startsWith(item.href) ? 'bg-gray-100' : ''
                    }`}
                  >
                    <item.icon className="h-5 w-5 ml-3" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </button>
                  {!isCollapsed && openSubmenu === item.title && (
                    <ul className="mt-2 mr-6 space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.title}>
                          <Link
                            href={subItem.href}
                            className={`block p-2 rounded-lg hover:bg-gray-100 ${
                              pathname === subItem.href ? 'bg-gray-100' : ''
                            }`}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${
                    pathname === item.href ? 'bg-gray-100' : ''
                  }`}
                >
                  <item.icon className="h-5 w-5 ml-3" />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 