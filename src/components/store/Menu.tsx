"use client";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/products", label: "محصولات" },
  { href: "/categories", label: "دسته‌بندی‌ها" },
  { href: "/tags", label: "تگ‌ها" },
  { href: "/cart", label: "سبد خرید" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

export default function StoreMenu() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap gap-2 md:gap-4 justify-center bg-white/80 rounded-lg shadow px-4 py-2 md:px-6 md:py-3 border border-gray-100">
      {menuItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`transition px-3 py-1 rounded-lg font-semibold text-sm md:text-base
            ${pathname === item.href ? "bg-primary text-white shadow" : "text-gray-700 hover:bg-primary/10 hover:text-primary"}
          `}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
} 