import { Metadata } from "next";
import ReportsDashboard from "@/components/admin/reports/ReportsDashboard";

export const metadata: Metadata = {
  title: "گزارش‌ها | پنل مدیریت",
  description: "مدیریت گزارش‌های فروشگاه",
};

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">گزارش‌های فروشگاه</h1>
      </div>
      <ReportsDashboard />
    </div>
  );
} 