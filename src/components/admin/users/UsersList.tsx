"use client";

import { useState } from "react";
import DataTable from "../DataTable";
import UserForm from "./UserForm";

const columns = [
  { id: "id", label: "شناسه", minWidth: 50 },
  { id: "name", label: "نام", minWidth: 170 },
  { id: "email", label: "ایمیل", minWidth: 170 },
  { id: "phone", label: "تلفن", minWidth: 170 },
  { id: "role", label: "نقش", minWidth: 100 },
  { id: "status", label: "وضعیت", minWidth: 100 },
  { id: "created_at", label: "تاریخ ایجاد", minWidth: 100 },
];

// این داده‌ها باید از API دریافت شوند
const initialData = [
  {
    id: 1,
    name: "علی محمدی",
    email: "ali@example.com",
    phone: "09123456789",
    role: "مدیر",
    status: "فعال",
    created_at: "1402/01/01",
  },
  {
    id: 2,
    name: "رضا احمدی",
    email: "reza@example.com",
    phone: "09123456790",
    role: "کاربر",
    status: "فعال",
    created_at: "1402/01/01",
  },
  // ... سایر داده‌ها
];

export default function UsersList() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleOpen = () => {
    setSelectedUser(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleEdit = (id: number) => {
    // در اینجا باید اطلاعات کاربر را از API دریافت کرد
    setSelectedUser({ id });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("آیا از حذف این کاربر اطمینان دارید؟")) {
      try {
        // در اینجا باید درخواست حذف به API ارسال شود
        console.log("حذف کاربر:", id);
      } catch (error) {
        console.error("خطا در حذف کاربر:", error);
      }
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (selectedUser) {
        // در اینجا باید درخواست ویرایش به API ارسال شود
        console.log("ویرایش کاربر:", formData);
      } else {
        // در اینجا باید درخواست ایجاد به API ارسال شود
        console.log("ایجاد کاربر:", formData);
      }
      handleClose();
    } catch (error) {
      console.error("خطا در ذخیره کاربر:", error);
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
          افزودن کاربر
        </button>
      </div>

      <DataTable
        columns={columns}
        data={initialData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <UserForm
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        user={selectedUser}
      />
    </>
  );
} 