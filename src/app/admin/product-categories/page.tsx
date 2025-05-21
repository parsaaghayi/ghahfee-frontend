import { Metadata } from "next";
import CategoriesList from "@/components/admin/products/CategoriesList";

export const metadata: Metadata = {
  title: "مدیریت دسته‌بندی‌ها | پنل مدیریت",
  description: "مدیریت دسته‌بندی‌های محصولات",
};

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">مدیریت دسته‌بندی‌ها</h1>
      </div>
      <CategoriesList />
    </div>
  );
} 