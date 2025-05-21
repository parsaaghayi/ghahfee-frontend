'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: number;
  name?: string;
  title?: string;
  image: string;
  price: number;
  sales_count: number;
}

export default function TopProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/admin/products/top?limit=5');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-gray-200 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">محصولات پرفروش</h2>
      </div>
      <div className="divide-y">
        {products.length === 0 ? (
          <div className="p-6 text-center text-gray-500">محصول پرفروشی وجود ندارد.</div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 relative">
                  <Image
                    src={product.image && product.image.trim() !== '' ? product.image : 'https://parsaaghayi.ir/og-image?text=no-image.png'}
                    alt={product.name && product.name.trim() !== '' ? product.name : 'بدون عنوان'}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="ms-4 flex-1">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="text-sm font-medium text-gray-900 hover:text-blue-600"
                  >
                    {product.title || product.name || 'بدون عنوان'}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {(product.sales_count ?? 0).toLocaleString()} فروش
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {(product.price ?? 0).toLocaleString()} تومان
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-6 border-t">
        <Link
          href="/admin/products"
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          مشاهده همه محصولات
        </Link>
      </div>
    </div>
  );
}