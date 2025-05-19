import StoreHeader from "@/components/store/Header";
import StoreFooter from "@/components/store/Footer";
import type { Metadata } from "next";
import { Menu } from "@/types/menu";
import NotificationSlider from "@/components/store/NotificationSlider";

export const metadata: Metadata = {
  title: {
    default: "فروشگاه قهفی",
    template: "%s | فروشگاه قهفی",
  },
};

async function getMenusSSR(): Promise<Menu[]> {
  const menuRes = await fetch(process.env.API_URL + "/menus?is_active=1&sort_by=order&sort_order=asc&per_page=100", { cache: "no-store" });
  const menuData = await menuRes.json();  
  return Array.isArray(menuData) ? menuData : menuData.data || [];
}

async function getNotificationsSSR() {
  const res = await fetch(process.env.API_URL + "/notifications?is_active=true", { cache: "no-store" });
  const data = await res.json();
  return Array.isArray(data.data) ? data.data : [];
}

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  const menus = await getMenusSSR();
  const notifications = await getNotificationsSSR();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <NotificationSlider notifications={notifications} />
      <StoreHeader menus={menus} />
      <main>{children}</main>
      <StoreFooter />
    </div>
  );
} 