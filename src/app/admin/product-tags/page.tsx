import { Metadata } from "next";
import TagsList from "@/components/admin/products/TagsList";

export const metadata: Metadata = {
  title: "مدیریت برچسب‌ها | پنل مدیریت",
  description: "مدیریت برچسب‌های محصولات",
};

export default function TagsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">مدیریت برچسب‌ها</h1>
      </div>
      <TagsList />
    </div>
  );
} 