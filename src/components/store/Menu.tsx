"use client";
import { usePathname } from "next/navigation";
import { Menu } from "@/types/menu";
import Link from "next/link";
import { LAYOUT_CONFIG } from "@/config/layout";

function MenuItem({
  item,
  pathname,
  menus,
  level = 1,
}: {
  item: Menu;
  pathname: string;
  menus: Menu[];
  level?: number;
}) {
  // children واقعی را از data اصلی پیدا کن
  const children =
    (item.children && item.children.length > 0
      ? item.children
      : menus.filter((m) => m.parent_id === item.id)) || [];

  const groupClass = level === 1 ? "group/f1" : level === 2 ? "group/f2" : "group/f3";
  const groupHover = level === 1 ? "group-hover/f1:block" : level === 2 ? "group-hover/f2:block" : "group-hover/f3:block";

  return (
    <li className={`relative ${groupClass}`}>
      <Link
        href={item.url || "#"}
        className={`transition py-1.5 px-2 rounded-lg font-semibold text-sm md:text-base whitespace-nowrap flex items-center justify-between ${
          pathname === (item.url || "#")
            ? "bg-primary text-white shadow"
            : "text-gray-700 hover:bg-primary/10 hover:text-primary"
        }`}
        target={item.type === "external_link" ? "_blank" : undefined}
        rel={item.type === "external_link" ? "noopener noreferrer" : undefined}
      >
        <span>{item.title}</span>
        {children.length > 0 && (
          <span
            className={`ms-2 text-lg transition-transform duration-300
              ${level === 1 ? "rotate-0 group-hover/f1:rotate-270" : ""}
              ${level === 2 ? "rotate-270 group-hover/f2:rotate-360" : ""}
              ${level === 3 ? "rotate-270 group-hover/f3:rotate-360" : ""}
            `}
          >
            ›
          </span>
        )}
      </Link>
      {children.length > 0 && level < 4 && (
        <div
          className={`absolute transition-all duration-300
            ${level === 1 ? "right-0 top-full -mt-2 opacity-0 pointer-events-none translate-y-2 group-hover/f1:opacity-100 group-hover/f1:pointer-events-auto group-hover/f1:translate-y-0" : ""}
            ${level === 2 ? "right-full top-0 -mr-1 opacity-0 pointer-events-none translate-x-2 group-hover/f2:opacity-100 group-hover/f2:pointer-events-auto group-hover/f2:translate-x-0" : ""}
            ${level === 3 ? "right-full top-0 -mr-1 opacity-0 pointer-events-none translate-x-2 group-hover/f3:opacity-100 group-hover/f3:pointer-events-auto group-hover/f3:translate-x-0" : ""}
            min-w-[220px] bg-white border rounded-lg shadow-lg z-50`
          }
        >
          <ul className="flex flex-col p-2">
            {children.map((child) => (
              <MenuItem
                key={child.id}
                item={child}
                pathname={pathname}
                menus={menus}
                level={level + 1}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default function StoreMenu({ menus }: { menus: Menu[] }) {
  const pathname = usePathname();
  // فقط منوهای سطح اول (parent_id == null)
  const topMenus = menus.filter((m) => m.parent_id === null);
  return (
    <nav className="flex gap-[20px] justify-center items-center" style={{ height: LAYOUT_CONFIG.menu.height }}>
      <ul className="flex gap-[20px]">
        {topMenus.map((item) => (
          <MenuItem key={item.id} item={item} pathname={pathname} menus={menus} />
        ))}
      </ul>
    </nav>
  );
} 