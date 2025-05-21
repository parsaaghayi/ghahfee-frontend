import { Metadata } from "next";
import PostsList from "@/components/admin/posts/PostsList";

export const metadata: Metadata = {
  title: "مدیریت پست‌ها | پنل مدیریت",
  description: "مدیریت پست‌های وبلاگ",
};

export default function PostsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">مدیریت پست‌ها</h1>
      </div>
      <PostsList />
    </div>
  );
} 