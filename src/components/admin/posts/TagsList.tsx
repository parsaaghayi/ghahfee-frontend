"use client";

import { useState } from "react";
import DataTable from "../DataTable";
import TagForm from "./TagForm";

const columns = [
  { id: "id", label: "شناسه", minWidth: 50 },
  { id: "name", label: "نام برچسب", minWidth: 170 },
  { id: "slug", label: "نامک", minWidth: 170 },
  { id: "posts_count", label: "تعداد پست‌ها", minWidth: 100 },
  { id: "status", label: "وضعیت", minWidth: 100 },
  { id: "created_at", label: "تاریخ ایجاد", minWidth: 100 },
];

// این داده‌ها باید از API دریافت شوند
const initialData = [
  {
    id: 1,
    name: "قهوه ترک",
    slug: "turkish-coffee",
    posts_count: 5,
    status: "فعال",
    created_at: "1402/01/01",
  },
  {
    id: 2,
    name: "قهوه فرانسه",
    slug: "french-coffee",
    posts_count: 3,
    status: "فعال",
    created_at: "1402/01/01",
  },
  {
    id: 3,
    name: "قهوه اسپرسو",
    slug: "espresso",
    posts_count: 4,
    status: "فعال",
    created_at: "1402/01/01",
  },
  // ... سایر داده‌ها
];

export default function TagsList() {
  const [open, setOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<any>(null);

  const handleOpen = () => {
    setSelectedTag(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTag(null);
  };

  const handleEdit = (id: number) => {
    // در اینجا باید اطلاعات برچسب را از API دریافت کرد
    setSelectedTag({ id });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("آیا از حذف این برچسب اطمینان دارید؟")) {
      try {
        // در اینجا باید درخواست حذف به API ارسال شود
        console.log("حذف برچسب:", id);
      } catch (error) {
        console.error("خطا در حذف برچسب:", error);
      }
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (selectedTag) {
        // در اینجا باید درخواست ویرایش به API ارسال شود
        console.log("ویرایش برچسب:", formData);
      } else {
        // در اینجا باید درخواست ایجاد به API ارسال شود
        console.log("ایجاد برچسب:", formData);
      }
      handleClose();
    } catch (error) {
      console.error("خطا در ذخیره برچسب:", error);
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
          افزودن برچسب
        </button>
      </div>

      <DataTable
        columns={columns}
        data={initialData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TagForm
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        tag={selectedTag}
      />
    </>
  );
} 