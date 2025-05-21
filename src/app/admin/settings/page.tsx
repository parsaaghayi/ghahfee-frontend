import { Metadata } from "next";
import SettingsForm from "@/components/admin/settings/SettingsForm";

export const metadata: Metadata = {
  title: "تنظیمات | پنل مدیریت",
  description: "مدیریت تنظیمات سایت",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">تنظیمات سایت</h1>
      </div>
      <SettingsForm />
    </div>
  );
} 