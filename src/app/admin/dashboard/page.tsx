import { Metadata } from "next";
import DashboardContent from "@/components/admin/dashboard/DashboardContent";

export const metadata: Metadata = {
  title: "داشبورد | پنل مدیریت",
  description: "داشبورد مدیریت فروشگاه",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">داشبورد</h1>
      </div>
      <DashboardContent />
    </div>
  );
} 