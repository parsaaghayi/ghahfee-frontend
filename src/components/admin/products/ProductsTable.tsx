'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  price: number;
  discount_price?: number;
  stock: number;
  is_active: boolean;
  created_at: string;
  images?: { id: number; image_url: string; is_primary: boolean }[];
  categories?: { id: number; name: string }[];
  tags?: { id: number; name: string }[];
}

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onView: (product: Product) => void;
}

export default function ProductsTable({
  products,
  onEdit,
  onDelete,
  onView
}: ProductsTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, product: Product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    if (selectedProduct) {
      onDelete(selectedProduct);
    }
    setDeleteDialogOpen(false);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                تصویر
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                نام محصول
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                قیمت
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                موجودی
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                وضعیت
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.images && product.images.length > 0 && (
    <>
      <TableContainer component={Paper}>
        <Box className="p-4 flex justify-between items-center">
          <Typography variant="h6">لیست محصولات</Typography>
          <IconButton className="cursor-pointer">
            <FilterList />
          </IconButton>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>تصویر</TableCell>
              <TableCell>عنوان</TableCell>
              <TableCell>قیمت</TableCell>
              <TableCell>موجودی</TableCell>
              <TableCell>دسته‌بندی‌ها</TableCell>
              <TableCell>تگ‌ها</TableCell>
              <TableCell>وضعیت</TableCell>
              <TableCell>تاریخ ایجاد</TableCell>
              <TableCell>عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => {
                const primaryImage = product.images?.find(img => img.is_primary) || product.images?.[0];
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      {primaryImage ? (
                        <img
                          src={primaryImage.image_url}
                          alt={product.title}
                          width={50}
                          height={50}
                          className="rounded-lg object-cover"
                        />
                      ) : null}
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        {product.discount_price ? (
                          <>
                            <span className="line-through text-gray-500">
                              {product.price.toLocaleString()} تومان
                            </span>
                            <span className="text-red-500 font-bold">
                              {product.discount_price.toLocaleString()} تومان
                            </span>
                          </>
                        ) : (
                          <span>{product.price.toLocaleString()} تومان</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {product.categories?.map((category) => (
                          <Chip
                            key={category.id}
                            label={category.name}
                            size="small"
                            className="cursor-pointer"
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {product.tags?.map((tag) => (
                          <Chip
                            key={tag.id}
                            label={tag.name}
                            size="small"
                            variant="outlined"
                            className="cursor-pointer"
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={product.is_active ? 'فعال' : 'غیرفعال'}
                        color={product.is_active ? 'success' : 'error'}
                        size="small"
                        className="cursor-pointer"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(product.created_at).toLocaleDateString('fa-IR')}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuClick(e, product)}
                        className="cursor-pointer"
                      >
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={products.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="تعداد در هر صفحه:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} از ${count}`
          }
        />
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleView} className="cursor-pointer">
          <Visibility className="ml-2" /> مشاهده
        </MenuItem>
        <MenuItem onClick={handleEdit} className="cursor-pointer">
          <Edit className="ml-2" /> ویرایش
        </MenuItem>
        <MenuItem onClick={handleDelete} className="text-red-500 cursor-pointer">
          <Delete className="ml-2" /> حذف
        </MenuItem>
      </Menu>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        dir="rtl"
      >
        <DialogTitle>حذف محصول</DialogTitle>
        <DialogContent>
          آیا از حذف محصول {selectedProduct?.title} اطمینان دارید؟
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>انصراف</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
} 