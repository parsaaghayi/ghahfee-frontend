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

  function formatPrice(price: number | string) {
    return Number(price).toLocaleString('fa-IR', { maximumFractionDigits: 0 });
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تصویر</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نام محصول</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">قیمت</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">موجودی</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">دسته‌بندی‌ها</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تگ‌ها</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وضعیت</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاریخ ایجاد</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عملیات</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => {
              const primaryImage = product.images?.find(img => img.is_primary) || product.images?.[0];
              return (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {primaryImage && primaryImage.image_url ? (
                      <Image
                        src={primaryImage.image_url || '/placeholder.png'}
                        alt={product.title}
                        width={50}
                        height={50}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">-</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      {product.discount_price ? (
                        <>
                          <span className="line-through text-gray-500">{formatPrice(product.price)} تومان</span>
                          <span className="text-red-500 font-bold">{formatPrice(product.discount_price)} تومان</span>
                        </>
                      ) : (
                        <span>{formatPrice(product.price)} تومان</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {product.categories?.map((category) => (
                        <span key={category.id} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">{category.name}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {product.tags?.map((tag) => (
                        <span key={tag.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{tag.name}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.is_active ? 'فعال' : 'غیرفعال'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(product.created_at).toLocaleDateString('fa-IR')}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <button onClick={() => onView(product)} className="text-blue-600 hover:text-blue-900">مشاهده</button>
                    <button onClick={() => onEdit(product)} className="text-green-600 hover:text-green-900">ویرایش</button>
                    <button onClick={() => { if(window.confirm('آیا از حذف این محصول اطمینان دارید؟')) onDelete(product); }} className="text-red-600 hover:text-red-900">حذف</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
} 