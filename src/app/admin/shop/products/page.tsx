import ProductsList from '@/components/admin/shop/products/ProductsList';
import ProductForm from '@/components/admin/shop/products/ProductForm';
import Modal from '@/components/ui/Modal';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import ProductSkeleton from '@/components/store/ProductSkeleton';

async function fetchFromApi(url: string) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('خطا در دریافت اطلاعات');
  return res.json();
}

function TableSkeleton({ rows = 5 }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max divide-y divide-gray-200 table-fixed" style={{ minWidth: 900 }}>
        <thead>
          <tr>
            <th className="px-2 py-3" style={{ width: 70 }}></th>
            <th className="px-2 py-3" style={{ width: 120 }}></th>
            <th className="px-2 py-3" style={{ width: 200 }}></th>
            <th className="px-2 py-3" style={{ width: 120 }}></th>
            <th className="px-2 py-3" style={{ width: 90 }}></th>
            <th className="px-2 py-3" style={{ width: 180 }}></th>
            <th className="px-2 py-3" style={{ width: 180 }}></th>
            <th className="px-2 py-3" style={{ width: 90 }}></th>
            <th className="px-2 py-3" style={{ width: 120 }}></th>
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, i) => (
            <tr key={i} className="animate-pulse">
              {[...Array(9)].map((_, j) => (
                <td key={j} className="px-2 py-4 text-xs">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function ProductsPage({ searchParams }: { searchParams: any }) {
  // خواندن فیلترها از query string
  const filters: any = {};
  if (searchParams.search) filters.search = searchParams.search;
  if (searchParams.minPrice) filters.minPrice = searchParams.minPrice;
  if (searchParams.maxPrice) filters.maxPrice = searchParams.maxPrice;
  if (searchParams.minStock) filters.minStock = searchParams.minStock;
  if (searchParams.maxStock) filters.maxStock = searchParams.maxStock;
  if (searchParams.status) filters.status = searchParams.status;
  if (searchParams.tags) filters.tag = searchParams.tags.split(',');
  if (searchParams.categories) filters.category = searchParams.categories.split(',');

  // گرفتن داده‌ها از API
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const params = new URLSearchParams();
  if (searchParams.search) params.set('search', searchParams.search);
  if (searchParams.minPrice) params.set('minPrice', searchParams.minPrice);
  if (searchParams.maxPrice) params.set('maxPrice', searchParams.maxPrice);
  if (searchParams.minStock) params.set('minStock', searchParams.minStock);
  if (searchParams.maxStock) params.set('maxStock', searchParams.maxStock);
  if (searchParams.status) params.set('status', searchParams.status);
  if (searchParams.tags) params.set('tags', searchParams.tags);
  if (searchParams.categories) params.set('categories', searchParams.categories);
  const perPage = Number(searchParams.per_page) || 10;
  if (searchParams.per_page) params.set('per_page', searchParams.per_page);
  const [productsRes, categoriesRes, tagsRes] = await Promise.all([
    fetchFromApi(`${apiUrl}/products?${params.toString()}`),
    fetchFromApi(`${apiUrl}/categories`),
    fetchFromApi(`${apiUrl}/tags`),
  ]);
  const products = productsRes.data || [];
  const totalPages = productsRes.last_page || 1;
  const total = productsRes.total || 0;
  const per_page = productsRes.per_page || perPage;
  const categories = Array.isArray(categoriesRes) ? categoriesRes : categoriesRes.data;
  const tags = Array.isArray(tagsRes) ? tagsRes : tagsRes.data;

  // مقداردهی اولیه selectedCategories و selectedTags
  const selectedCategories = filters.category ? categories.filter((c: any) => filters.category.includes(String(c.id))) : [];
  const selectedTags = filters.tag ? tags.filter((t: any) => filters.tag.includes(String(t.id))) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">مدیریت محصولات</h1>
        {/* دکمه افزودن محصول (در صورت نیاز بعداً modal را csr می‌کنیم) */}
      </div>
      <Suspense fallback={<TableSkeleton rows={10} />}>
        <ProductsList
          filters={filters}
          products={products}
          categories={categories}
          tags={tags}
          totalPages={totalPages}
          total={total}
          perPage={per_page}
        />
      </Suspense>
    </div>
  );
} 