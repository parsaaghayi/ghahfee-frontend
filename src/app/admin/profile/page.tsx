import { Metadata } from "next";
import ProfileForm from "@/components/admin/profile/ProfileForm";

export const metadata: Metadata = {
  title: "پروفایل | پنل مدیریت",
  description: "مدیریت پروفایل کاربری",
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">پروفایل کاربری</h1>
      </div>
      <ProfileForm />
    </div>
  );
} 