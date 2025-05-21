import { Metadata } from "next";
import UsersList from "@/components/admin/users/UsersList";

export const metadata: Metadata = {
  title: "مدیریت کاربران | پنل مدیریت",
  description: "مدیریت کاربران در پنل مدیریت",
};

export default function UsersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">مدیریت کاربران</h1>
      <UsersList />
    </div>
  );
} 