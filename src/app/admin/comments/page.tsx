import { Metadata } from "next";
import CommentsList from "@/components/admin/comments/CommentsList";

export const metadata: Metadata = {
  title: "مدیریت نظرات | پنل مدیریت",
  description: "مدیریت نظرات کاربران",
};

export default function CommentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">مدیریت نظرات</h1>
      </div>
      <CommentsList />
    </div>
  );
} 