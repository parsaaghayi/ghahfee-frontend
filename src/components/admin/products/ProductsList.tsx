"use client";

import { useState, useEffect } from "react";
import DataTable from "../DataTable";
import { getProducts, deleteProduct } from "@/lib/admin/api";
import ProductForm from "./ProductForm";

interface Product {
  id: number;
  title: string;
  slug: string;
  short_description: string | null;
  long_description: string | null;
  price: number;
  discount_price: number | null;
  stock: number;
  sku: string | null;
  is_active: boolean;
  is_featured: boolean;
  sales_count: number;
  wishlist_count: number;
  cart_count: number;
  created_at: string | null;
  updated_at: string | null;
  images: Array<{
    id: number;
    url: string;
    alt: string;
    is_primary: boolean;
  }>;
}

export default function ProductsList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProducts();
      const productsData = Array.isArray(response.data) ? response.data : 
                          Array.isArray(response.data.data) ? response.data.data : [];
      setProducts(productsData);
    } catch (err: any) {
      setError(err.message || "خطا در دریافت لیست محصولات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpen = () => {
    setSelectedProduct(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("آیا از حذف این محصول اطمینان دارید؟")) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (err: any) {
        setError(err.message || "خطا در حذف محصول");
      }
    }
  };

  const handleSubmit = (data: Product) => {
    setSelectedProduct(data);
    handleClose();
    fetchProducts();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const columns = [
    { id: "id", label: "شناسه", minWidth: 50 },
    { 
      id: "image", 
      label: "تصویر", 
      minWidth: 100,
      format: (value: any, row: Product) => {
        const primaryImage = row.images?.find(img => img.is_primary) || row.images?.[0];
        return (
          <img
            src={primaryImage?.url || '/images/placeholder.png'}
            alt={row.title || 'بدون نام'}
            className="w-12 h-12 rounded object-cover"
          />
        );
      }
    },
    { 
      id: "title", 
      label: "نام محصول", 
      minWidth: 200,
      format: (value: any, row: Product) => row.title || 'بدون نام'
    },
    { 
      id: "price", 
      label: "قیمت", 
      minWidth: 100,
      format: (value: any, row: Product) => {
        if (row.discount_price) {
          return (
            <div>
              <span className="text-red-500 line-through">
                {formatPrice(row.price)}
              </span>
              <span className="block text-green-600">
                {formatPrice(row.discount_price)}
              </span>
            </div>
          );
        }
        return formatPrice(row.price);
      }
    },
    { 
      id: "stock", 
      label: "موجودی", 
      minWidth: 100,
      format: (value: any, row: Product) => row.stock
    },
    { 
      id: "status", 
      label: "وضعیت", 
      minWidth: 100,
      format: (value: any, row: Product) => (
        <span className={`font-bold ${row.is_active ? 'text-green-600' : 'text-red-600'}`}>
          {row.is_active ? 'فعال' : 'غیرفعال'}
        </span>
      )
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">محصولات</h1>
        <button
          onClick={handleOpen}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <svg
            className="-ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          افزودن محصول
        </button>
      </div>

      <DataTable
        columns={columns}
        data={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductForm
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        product={selectedProduct}
      />
    </div>
  );
} 