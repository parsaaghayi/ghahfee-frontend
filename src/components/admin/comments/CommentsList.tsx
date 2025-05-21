"use client";

import { useState } from "react";
import DataTable from "../DataTable";
import CommentForm from "./CommentForm";
import { useRouter } from "next/navigation";

const columns = [
  { id: "id", label: "شناسه", minWidth: 50 },
  { id: "user", label: "کاربر", minWidth: 170 },
  { id: "content", label: "محتوا", minWidth: 170 },
  { id: "post", label: "پست", minWidth: 170 },
  { id: "status", label: "وضعیت", minWidth: 100 },
  { id: "created_at", label: "تاریخ ایجاد", minWidth: 100 },
];

// این داده‌ها باید از API دریافت شوند
const initialData = [
  {
    id: 1,
    user: "علی محمدی",
    content: "مطلب بسیار مفیدی بود",
    post: "قهوه ترک",
    status: "تایید شده",
    created_at: "1402/01/01",
  },
  {
    id: 2,
    user: "رضا احمدی",
    content: "عالی بود",
    post: "قهوه فرانسه",
    status: "در انتظار تایید",
    created_at: "1402/01/01",
  },
  // ... سایر داده‌ها
];

export default function CommentsList() {
  const [open, setOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const router = useRouter();

  const handleOpen = () => {
    setSelectedComment(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedComment(null);
  };

  const handleEdit = (id: number) => {
    // در اینجا باید اطلاعات نظر را از API دریافت کرد
    setSelectedComment({ id });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("آیا از حذف این نظر اطمینان دارید؟")) {
      try {
        // در اینجا باید درخواست حذف به API ارسال شود
        console.log("حذف نظر:", id);
      } catch (error) {
        console.error("خطا در حذف نظر:", error);
      }
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (selectedComment) {
        // در اینجا باید درخواست ویرایش به API ارسال شود
        console.log("ویرایش نظر:", formData);
      } else {
        // در اینجا باید درخواست ایجاد به API ارسال شود
        console.log("ایجاد نظر:", formData);
      }
      handleClose();
    } catch (error) {
      console.error("خطا در ذخیره نظر:", error);
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
          افزودن نظر
        </button>
      </div>

      <DataTable
        columns={columns}
        data={initialData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CommentForm
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        comment={selectedComment}
      />
    </>
  );
} 