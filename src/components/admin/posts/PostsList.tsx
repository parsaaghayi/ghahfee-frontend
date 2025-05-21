"use client";

import { useState } from "react";
import DataTable from "../DataTable";
import PostForm from "./PostForm";

const columns = [
  { id: "id", label: "شناسه", minWidth: 50 },
  { id: "title", label: "عنوان", minWidth: 170 },
  { id: "excerpt", label: "خلاصه", minWidth: 170 },
  { id: "category", label: "دسته‌بندی", minWidth: 100 },
  { id: "status", label: "وضعیت", minWidth: 100 },
  { id: "created_at", label: "تاریخ ایجاد", minWidth: 100 },
];

// این داده‌ها باید از API دریافت شوند
const initialData = [
  {
    id: 1,
    title: "قهوه ترک چیست؟",
    excerpt: "معرفی قهوه ترک و نحوه تهیه آن",
    category: "قهوه ترک",
    status: "منتشر شده",
    created_at: "1402/01/01",
  },
  {
    id: 2,
    title: "قهوه فرانسه چیست؟",
    excerpt: "معرفی قهوه فرانسه و نحوه تهیه آن",
    category: "قهوه فرانسه",
    status: "منتشر شده",
    created_at: "1402/01/01",
  },
  // ... سایر داده‌ها
];

export default function PostsList() {
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const handleOpen = () => {
    setSelectedPost(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPost(null);
  };

  const handleEdit = (id: number) => {
    // در اینجا باید اطلاعات پست را از API دریافت کرد
    setSelectedPost({ id });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("آیا از حذف این پست اطمینان دارید؟")) {
      try {
        // در اینجا باید درخواست حذف به API ارسال شود
        console.log("حذف پست:", id);
      } catch (error) {
        console.error("خطا در حذف پست:", error);
      }
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (selectedPost) {
        // در اینجا باید درخواست ویرایش به API ارسال شود
        console.log("ویرایش پست:", formData);
      } else {
        // در اینجا باید درخواست ایجاد به API ارسال شود
        console.log("ایجاد پست:", formData);
      }
      handleClose();
    } catch (error) {
      console.error("خطا در ذخیره پست:", error);
    }
  };

  return (
    <>
      <div className="mb-4">
        <button
          onClick={handleOpen}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          افزودن پست
        </button>
      </div>

      <DataTable
        columns={columns}
        data={initialData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PostForm
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        post={selectedPost}
      />
    </>
  );
} 