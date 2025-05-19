"use client";

import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Add as AddIcon } from '@mui/icons-material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'شناسه', width: 90 },
  { field: 'name', headerName: 'نام محصول', width: 200 },
  { field: 'category', headerName: 'دسته‌بندی', width: 150 },
  { field: 'price', headerName: 'قیمت', width: 130, type: 'number' },
  { field: 'stock', headerName: 'موجودی', width: 130, type: 'number' },
  { field: 'status', headerName: 'وضعیت', width: 130 },
  {
    field: 'actions',
    headerName: 'عملیات',
    width: 200,
    renderCell: (params) => (
      <Box>
        <Button size="small" color="primary" sx={{ ml: 1 }}>
          ویرایش
        </Button>
        <Button size="small" color="error">
          حذف
        </Button>
      </Box>
    ),
  },
];

// داده‌های نمونه
const rows = [
  { id: 1, name: 'قهوه ترک', category: 'قهوه', price: 150000, stock: 50, status: 'فعال' },
  { id: 2, name: 'قهوه فرانسه', category: 'قهوه', price: 180000, stock: 30, status: 'فعال' },
  { id: 3, name: 'قهوه اسپرسو', category: 'قهوه', price: 200000, stock: 25, status: 'فعال' },
  { id: 4, name: 'چای سبز', category: 'چای', price: 120000, stock: 100, status: 'فعال' },
  { id: 5, name: 'چای سیاه', category: 'چای', price: 100000, stock: 80, status: 'فعال' },
];

export default function ProductsPage() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          مدیریت محصولات
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
        >
          افزودن محصول جدید
        </Button>
      </Box>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
} 