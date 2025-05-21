import { Metadata } from "next";
import OrdersList from "@/components/admin/orders/OrdersList";

export const metadata: Metadata = {
  title: "مدیریت سفارشات | پنل مدیریت",
  description: "مدیریت سفارشات فروشگاه",
};

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">مدیریت سفارشات</h1>
      </div>
      <OrdersList />
    </div>
  );
} 