"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Chip,
} from "@mui/material";
import DataTable from "@/components/admin/DataTable";
import { getReviews, updateReview, deleteReview } from "@/lib/admin/api";

export default function ReviewsList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getReviews({
        page: page + 1,
        per_page: rowsPerPage,
      });
      setReviews(response.data.data);
      setTotalCount(response.data.total);
    } catch (err: any) {
      setError(err.message || "خطا در دریافت لیست نظرات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [page, rowsPerPage]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updateReview(id, { status: newStatus });
      fetchReviews();
    } catch (err: any) {
      alert(err.message || "خطا در به‌روزرسانی وضعیت نظر");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("آیا از حذف این نظر اطمینان دارید؟")) {
      try {
        await deleteReview(id);
        fetchReviews();
      } catch (err: any) {
        alert(err.message || "خطا در حذف نظر");
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "approved":
        return "success";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "در انتظار تایید";
      case "approved":
        return "تایید شده";
      case "rejected":
        return "رد شده";
      default:
        return status;
    }
  };

  const columns = [
    { id: "id", label: "شناسه", minWidth: 50 },
    { id: "user_name", label: "نام کاربر", minWidth: 150 },
    { id: "product_name", label: "محصول", minWidth: 150 },
    { id: "rating", label: "امتیاز", minWidth: 100 },
    { id: "comment", label: "نظر", minWidth: 200 },
    { id: "status", label: "وضعیت", minWidth: 100 },
    { id: "created_at", label: "تاریخ ثبت", minWidth: 120 },
  ];

  const formatData = (reviews: any[]) => {
    return reviews.map((review) => ({
      ...review,
      user_name: review.user?.name || "نامشخص",
      product_name: review.product?.name || "نامشخص",
      status: (
        <Chip
          label={getStatusLabel(review.status)}
          color={getStatusColor(review.status)}
          size="small"
        />
      ),
      created_at: new Date(review.created_at).toLocaleDateString("fa-IR"),
    }));
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-64">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex justify-center items-center h-64">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Typography variant="h6">لیست نظرات</Typography>
      </div>

      <DataTable
        columns={columns}
        rows={formatData(reviews)}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
} 