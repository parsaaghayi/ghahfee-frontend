"use client";

import { useState, Dispatch, SetStateAction } from 'react';
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
  ShoppingBag,
  Megaphone,
  Layout,
  Search,
  Link as LinkIcon,
  FileSearch,
  ChevronDown,
  ChevronRight,
  List,
  FolderTree,
  MessageSquare,
  Image,
  Layers,
  Percent,
  Gift,
  UserCog,
  Shield,
  Image as ImageIcon,
  LayoutGrid,
  File,
} from 'lucide-react';

const menuItems = [
  {
    title: 'داشبورد',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'فروشگاه',
    href: '/admin/shop',
    icon: ShoppingBag,
    submenu: [
      {
        title: 'محصولات',
        href: '/admin/shop/products',
        icon: Package,
        submenu: [
          { title: 'لیست محصولات', href: '/admin/shop/products', icon: List },
          { title: 'دسته‌بندی‌ها', href: '/admin/shop/categories', icon: FolderTree },
          { title: 'برچسب‌ها', href: '/admin/shop/tags', icon: Tag },
          { title: 'نظرات', href: '/admin/shop/comments', icon: MessageSquare },
          { title: 'ویژگی‌ها', href: '/admin/shop/attributes', icon: Layers },
          { title: 'تصاویر', href: '/admin/shop/images', icon: Image },
          { title: 'تنوع‌ها', href: '/admin/shop/variants', icon: Package },
        ],
      },
      { title: 'سفارشات', href: '/admin/shop/orders', icon: ShoppingCart },
      {
        title: 'بازاریابی',
        href: '/admin/shop/marketing',
        icon: Megaphone,
        submenu: [
          { title: 'کوپن‌ها', href: '/admin/shop/coupons', icon: Percent },
          { title: 'تخفیف‌ها', href: '/admin/shop/discounts', icon: Gift },
        ],
      },
    ],
  },
  {
    title: 'بلاگ',
    href: '/admin/blog',
    icon: FileText,
    submenu: [
      { title: 'لیست پست‌ها', href: '/admin/blog/posts', icon: List },
      { title: 'دسته‌بندی‌ها', href: '/admin/blog/categories', icon: FolderTree },
      { title: 'برچسب‌ها', href: '/admin/blog/tags', icon: Tag },
      { title: 'نظرات', href: '/admin/blog/comments', icon: MessageSquare },
    ],
  },
  {
    title: 'کاربران',
    href: '/admin/users',
    icon: Users,
    submenu: [
      { title: 'لیست کاربران', href: '/admin/users', icon: Users },
      { title: 'نقش‌ها', href: '/admin/users/roles', icon: UserCog },
      { title: 'دسترسی‌ها', href: '/admin/users/permissions', icon: Shield },
    ],
  },
  {
    title: 'طراحی',
    href: '/admin/design',
    icon: Layout,
    submenu: [
      { title: 'بنرها', href: '/admin/design/banners', icon: ImageIcon },
      { title: 'بخش‌ها', href: '/admin/design/sections', icon: LayoutGrid },
      { title: 'صفحات', href: '/admin/design/pages', icon: File },
    ],
  },
  {
    title: 'سئو',
    href: '/admin/seo',
    icon: FileSearch,
    submenu: [
      { title: 'تنظیمات سئو', href: '/admin/seo/settings', icon: Settings },
      { title: 'ریدایرکت‌ها', href: '/admin/seo/redirects', icon: LinkIcon },
    ],
  },
  {
    title: 'تنظیمات',
    href: '/admin/settings',
    icon: Settings,
  },
];

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

export default function AdminSidebar({ isCollapsed, setIsCollapsed }: AdminSidebarProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openSubSubmenu, setOpenSubSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const toggleSubSubmenu = (title: string) => {
    setOpenSubSubmenu(openSubSubmenu === title ? null : title);
  };

  return (
    <aside
      className={`bg-white shadow-lg transition-all duration-300 fixed top-0 bottom-0 overflow-y-auto scrollbar-gutter-stable ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b sticky top-0 bg-white z-10">
        {!isCollapsed && <h1 className="text-xl font-bold">پنل مدیریت</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
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
                    className={`flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${
                      pathname.startsWith(item.href) ? 'bg-gray-100' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon className="h-5 w-5 ml-3" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </div>
                    {!isCollapsed && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openSubmenu === item.title ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>
                  {!isCollapsed && (
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        openSubmenu === item.title ? 'max-h-[500px]' : 'max-h-0'
                      }`}
                    >
                      <ul className="mt-2 mr-6 space-y-1">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.title}>
                            {subItem.submenu ? (
                              <div>
                                <button
                                  onClick={() => toggleSubSubmenu(subItem.title)}
                                  className={`flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${
                                    pathname.startsWith(subItem.href) ? 'bg-gray-100' : ''
                                  }`}
                                >
                                  <div className="flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center ml-2">
                                      <subItem.icon className="h-4 w-4" />
                                    </div>
                                    <span>{subItem.title}</span>
                                  </div>
                                  <ChevronDown
                                    className={`h-4 w-4 transition-transform duration-200 ${
                                      openSubSubmenu === subItem.title ? 'rotate-180' : ''
                                    }`}
                                  />
                                </button>
                                <div
                                  className={`overflow-hidden transition-all duration-200 ${
                                    openSubSubmenu === subItem.title ? 'max-h-[500px]' : 'max-h-0'
                                  }`}
                                >
                                  <ul className="mt-2 mr-6 space-y-1">
                                    {subItem.submenu.map((subSubItem) => (
                                      <li key={subSubItem.title}>
                                        <Link
                                          href={subSubItem.href}
                                          className={`flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${
                                            pathname === subSubItem.href ? 'bg-gray-100' : ''
                                          }`}
                                        >
                                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center ml-2">
                                            <subSubItem.icon className="h-4 w-4" />
                                          </div>
                                          {subSubItem.title}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ) : (
                              <Link
                                href={subItem.href}
                                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${
                                  pathname === subItem.href ? 'bg-gray-100' : ''
                                }`}
                              >
                                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center ml-2">
                                  <subItem.icon className="h-4 w-4" />
                                </div>
                                {subItem.title}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${
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