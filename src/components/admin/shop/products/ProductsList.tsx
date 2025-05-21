"use client";

import { useState, useMemo, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import ProductFilters from "./ProductFilters";
import Pagination from "@/components/store/Pagination";
import Image from "next/image";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns-jalali";
import { useTransition } from "react";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";

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

interface ProductsResponse {
  data: Product[];
  total_pages: number;
  has_more: boolean;
}

interface ProductsListProps {
  filters: {
    search?: string;
    category?: string[];
    tag?: string[];
    minPrice?: string;
    maxPrice?: string;
    minStock?: string;
    maxStock?: string;
    status?: string;
    page?: number;
    per_page?: number;
  };
  products: Product[];
  categories: { id: string; name: string }[];
  tags: { id: string; name: string }[];
  totalPages: number;
  total: number;
  perPage: number;
}

type FilterKey =
  | "search"
  | "category"
  | "tag"
  | "minPrice"
  | "maxPrice"
  | "minStock"
  | "maxStock"
  | "status";

interface FilterTag {
  key: FilterKey;
  label: string;
  value?: string;
}

function formatPrice(price: number | string) {
  return Number(price).toLocaleString("fa-IR", { maximumFractionDigits: 0 });
}

function TableSkeleton({ rows = 5 }) {
  return (
    <>
      {[...Array(rows)].map((_, i) => (
        <tr key={i} className="animate-pulse">
          {[...Array(9)].map((_, j) => (
            <td key={j} className="px-2 py-4 text-xs">
              <div className="h-4 bg-gray-200 rounded w-full" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default function ProductsList(props: ProductsListProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  // صفحه و sort را از query string بخوان
  const page = Number(searchParams.get("page") || 1);
  const perPage = Number(searchParams.get("per_page") || props.perPage || 10);
  const sortBy =
    (searchParams.get("sort_by") as
      | "created_at"
      | "price"
      | "title"
      | "stock") || "created_at";
  const sortOrder =
    (searchParams.get("sort_order") as "asc" | "desc") || "desc";
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  // فیلترهای فعال
  const filterLabels = useMemo(() => {
    const labels: string[] = [];
    if (props.filters.search) labels.push(`جستجو: ${props.filters.search}`);
    if (
      Array.isArray(props.filters.category) &&
      props.filters.category.length > 0
    ) {
      labels.push(
        ...props.filters.category.map((cid) => {
          const cat = props.categories.find(
            (c) => String(c.id) === String(cid)
          );
          return cat ? cat.name : cid;
        })
      );
    }
    if (Array.isArray(props.filters.tag) && props.filters.tag.length > 0) {
      labels.push(
        ...props.filters.tag.map((tid) => {
          const tag = props.tags.find((t) => String(t.id) === String(tid));
          return tag ? tag.name : tid;
        })
      );
    }
    if (props.filters.minPrice)
      labels.push(`حداقل قیمت: ${props.filters.minPrice}`);
    if (props.filters.maxPrice)
      labels.push(`حداکثر قیمت: ${props.filters.maxPrice}`);
    if (props.filters.minStock)
      labels.push(`حداقل موجودی: ${props.filters.minStock}`);
    if (props.filters.maxStock)
      labels.push(`حداکثر موجودی: ${props.filters.maxStock}`);
    if (props.filters.status && props.filters.status !== "all")
      labels.push(
        `وضعیت: ${props.filters.status === "active" ? "فعال" : "غیرفعال"}`
      );
    return labels;
  }, [props.filters]);

  // تابع ساخت query string جدید
  const buildQuery = (newFilters: any) => {
    const params = new URLSearchParams();
    if (newFilters.search) params.set("search", newFilters.search);
    if (newFilters.minPrice) params.set("minPrice", newFilters.minPrice);
    if (newFilters.maxPrice) params.set("maxPrice", newFilters.maxPrice);
    if (newFilters.minStock) params.set("minStock", newFilters.minStock);
    if (newFilters.maxStock) params.set("maxStock", newFilters.maxStock);
    if (newFilters.status) params.set("status", newFilters.status);
    if (Array.isArray(newFilters.tag) && newFilters.tag.length)
      params.set("tags", newFilters.tag.join(","));
    if (Array.isArray(newFilters.category) && newFilters.category.length)
      params.set("categories", newFilters.category.join(","));
    if (newFilters.page) params.set("page", String(newFilters.page));
    if (newFilters.per_page)
      params.set("per_page", String(newFilters.per_page));
    params.set("sort_by", sortBy);
    params.set("sort_order", sortOrder);
    return params.toString();
  };

  // حذف هر فیلتر با دکمه ×
  const handleRemoveFilter = (key: FilterKey, value?: string) => {
    const newFilters = { ...props.filters };
    if (key === "category" && Array.isArray(newFilters[key])) {
      const filtered = (newFilters[key] as string[]).filter(
        (v: string) => v && v !== value
      );
      newFilters[key] = filtered;
    } else if (key === "tag" && Array.isArray(newFilters[key])) {
      const filtered = (newFilters[key] as string[]).filter(
        (v: string) => v && v !== value
      );
      newFilters[key] = filtered;
    } else {
      if (key === "category" || key === "tag") {
        newFilters[key] = [];
      } else {
        newFilters[key] = "";
      }
    }
    router.push("?" + buildQuery(newFilters));
    router.refresh && router.refresh();
  };

  // نمایش تگ فیلترهای فعال با دکمه ×
  const filterTags: FilterTag[] = [];
  if (props.filters.search)
    filterTags.push({
      key: "search" as FilterKey,
      label: `جستجو: ${props.filters.search}`,
    });
  if (
    Array.isArray(props.filters.category) &&
    props.filters.category.length > 0
  )
    filterTags.push(
      ...props.filters.category.map((cid) => {
        const cat = props.categories.find((c) => String(c.id) === String(cid));
        return {
          key: "category" as FilterKey,
          value: cid,
          label: cat ? cat.name : cid,
        };
      })
    );
  if (Array.isArray(props.filters.tag) && props.filters.tag.length > 0)
    filterTags.push(
      ...props.filters.tag.map((tid) => {
        const tag = props.tags.find((t) => String(t.id) === String(tid));
        return {
          key: "tag" as FilterKey,
          value: tid,
          label: tag ? tag.name : tid,
        };
      })
    );
  if (props.filters.minPrice)
    filterTags.push({
      key: "minPrice" as FilterKey,
      label: `حداقل قیمت: ${props.filters.minPrice}`,
    });
  if (props.filters.maxPrice)
    filterTags.push({
      key: "maxPrice" as FilterKey,
      label: `حداکثر قیمت: ${props.filters.maxPrice}`,
    });
  if (props.filters.minStock)
    filterTags.push({
      key: "minStock" as FilterKey,
      label: `حداقل موجودی: ${props.filters.minStock}`,
    });
  if (props.filters.maxStock)
    filterTags.push({
      key: "maxStock" as FilterKey,
      label: `حداکثر موجودی: ${props.filters.maxStock}`,
    });
  if (props.filters.status && props.filters.status !== "all")
    filterTags.push({
      key: "status" as FilterKey,
      label: `وضعیت: ${props.filters.status === "active" ? "فعال" : "غیرفعال"}`,
    });

  // مرتب‌سازی
  const handleSort = (column: "created_at" | "price" | "title" | "stock") => {
    let newSortBy = column;
    let newSortOrder = "desc";
    if (sortBy === column) {
      newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    }
    const newFilters = { ...props.filters };
    startTransition(() => {
      router.push(
        "?" +
          buildQuery({
            ...newFilters,
            sort_by: newSortBy,
            sort_order: newSortOrder,
          })
      );
      router.refresh && router.refresh();
    });
  };

  // نمایش خطا و لودینگ ساده (در صورت نیاز)
  if (!props.products || !props.categories || !props.tags) {
    return <div>در حال بارگذاری اطلاعات...</div>;
  }

  return (
    <div className="">
      {/* بالای جدول: تعداد کل و انتخاب تعداد در هر صفحه */}
      <div className="flex justify-between my-2">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            فیلترها
          </button>
        <Link
          href="/admin/shop/products/create"
          className="flex items-center p-2 bg-green-600 !text-white rounded-lg hover:bg-green-700 text-xs font-bold shadow gap-1 ml-2"
        >
          <PlusIcon className="w-4 h-4 !text-white" />
          محصول جدید
        </Link>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 px-2">
        <div className="text-xs text-gray-600 font-bold">
          نمایش {props.products.length} از {props.total.toLocaleString()} محصول
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs">تعداد در هر صفحه:</span>
          <select
            className="border rounded px-2 py-1 text-xs focus:ring-2 focus:ring-green-500"
            value={perPage}
            onChange={(e) => {
              const newPerPage = Number(e.target.value);
              const newFilters = {
                ...props.filters,
                per_page: newPerPage,
                page: 1,
              };
              startTransition(() => {
                router.push("?" + buildQuery(newFilters));
                router.refresh && router.refresh();
              });
            }}
          >
            {[10, 15, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* جدول محصولات */}
      <div className="w-full overflow-x-auto min-w-0">
        <table
          className="w-full min-w-max divide-y divide-gray-200 table-fixed"
          style={{ minWidth: 900 }}
        >
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ width: 70, userSelect: "none" }}
              >
                تصویر
              </th>
              <th
                className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                style={{ width: 120, userSelect: "none" }}
                onClick={() => handleSort("created_at")}
              >
                تاریخ ایجاد
                {sortBy === "created_at" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th
                className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                style={{ width: 200, userSelect: "none" }}
                onClick={() => handleSort("title")}
              >
                نام محصول
                {sortBy === "title" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th
                className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                style={{ width: 120, userSelect: "none" }}
                onClick={() => handleSort("price")}
              >
                قیمت
                {sortBy === "price" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th
                className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                style={{ width: 90, userSelect: "none" }}
                onClick={() => handleSort("stock")}
              >
                موجودی
                {sortBy === "stock" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th
                className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ width: 180, userSelect: "none" }}
              >
                دسته‌بندی‌ها
              </th>
              <th
                className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ width: 180, userSelect: "none" }}
              >
                تگ‌ها
              </th>
              <th
                className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ width: 90, userSelect: "none" }}
              >
                وضعیت
              </th>
              <th
                className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ width: 120, userSelect: "none" }}
              >
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isPending ? (
              <TableSkeleton rows={5} />
            ) : props.products.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-gray-400">
                  محصولی یافت نشد.
                </td>
              </tr>
            ) : (
              props.products.map((product) => {
                const primaryImage =
                  product.images?.find((img) => img.is_primary) ||
                  product.images?.[0];
                const renderCell = (value: string | number | undefined) => {
                  const str = value ? String(value) : "";
                  return str.length > 40 ? (
                    <span
                      title={str}
                      className="cursor-pointer text-xs"
                      style={{ direction: "ltr" }}
                    >
                      {str.slice(0, 40)}...
                    </span>
                  ) : (
                    <span
                      title={str}
                      style={{ direction: "ltr" }}
                      className="text-xs"
                    >
                      {str}
                    </span>
                  );
                };
              return (
                  <tr
                    key={product.id}
                    className="transition-all duration-200 hover:bg-gray-50 hover:scale-[1.01]"
                    style={{ cursor: "pointer" }}
                  >
                    <td className="px-2 py-4 whitespace-nowrap text-xs overflow-hidden relative">
                      {primaryImage && primaryImage.image_url ? (
                      <Image
                          src={primaryImage.image_url}
                        alt={product.title}
                          width={40}
                          height={40}
                          className="rounded-lg object-cover transition-transform duration-200 hover:scale-125 mx-auto origin-right"
                      />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                          -
                    </div>
                      )}
                  </td>
                    <td className="px-2 py-4 whitespace-nowrap text-xs">
                      {product.created_at
                        ? format(new Date(product.created_at), "yyyy/MM/dd")
                        : "-"}
                  </td>
                    <td className="px-2 py-4 whitespace-nowrap text-xs">
                      {renderCell(product.title)}
                  </td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs text-center align-middle">
                      {product.discount_price ? (
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="line-through text-gray-400">
                            {renderCell(formatPrice(product.price))}
                          </span>
                          <span className="text-green-600 font-bold">
                            {renderCell(formatPrice(product.discount_price))}
                          </span>
                        </div>
                      ) : (
                        renderCell(formatPrice(product.price))
                      )}
                  </td>
                    <td className="px-2 py-4 whitespace-nowrap text-xs">
                      {renderCell(product.stock)}
                  </td>
                    <td className="px-4 py-2 whitespace-nowrap text-xs">
                      <div className="flex flex-row gap-1 overflow-x-auto max-w-[180px]">
                        {product.categories?.slice(0, 3).map((c) => (
                          <span
                            key={c.id}
                            className="inline-block bg-blue-100 text-blue-700 rounded px-2 py-0.5"
                          >
                            {c.name}
                          </span>
                        ))}
                        {product.categories &&
                          product.categories.length > 3 && (
                            <span className="inline-block bg-blue-200 text-blue-800 rounded px-2 py-0.5">
                              +{product.categories.length - 3} مورد دیگر
                            </span>
                          )}
                      </div>
                  </td>
                    <td className="px-4 py-2 whitespace-nowrap text-xs">
                      <div className="flex flex-row gap-1 overflow-x-auto max-w-[180px]">
                        {product.tags?.slice(0, 3).map((t) => (
                          <span
                            key={t.id}
                            className="inline-block bg-gray-200 text-gray-700 rounded px-2 py-0.5"
                          >
                            {t.name}
                          </span>
                        ))}
                        {product.tags && product.tags.length > 3 && (
                          <span className="inline-block bg-gray-300 text-gray-800 rounded px-2 py-0.5">
                            +{product.tags.length - 3} مورد دیگر
                    </span>
                        )}
                      </div>
                  </td>
                    <td className="px-2 py-4 whitespace-nowrap text-xs">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.is_active ? "فعال" : "غیرفعال"}
                      </span>
                    </td>
                    <td className="px-2 py-6 whitespace-nowrap flex gap-2 text-xs">
                      <Link
                        href={`/admin/shop/products/${product.id}/edit`}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
                      >
                        ویرایش
                      </Link>
                  </td>
                </tr>
              );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 my-5">
        <Pagination
          page={page}
          pageCount={props.totalPages}
          onPageChange={(newPage) => {
            const newFilters = {
              ...props.filters,
              page: newPage,
              per_page: perPage,
            };
            startTransition(() => {
              router.push("?" + buildQuery(newFilters));
              router.refresh && router.refresh();
            });
          }}
        />
      </div>
      {/* Modal فیلتر */}
      <Modal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title="فیلتر محصولات"
      >
        <div className="mb-4">
          <ProductFilters
            filters={props.filters}
            categories={props.categories}
            tags={props.tags}
            onFilterChange={(f) => {
              setIsFilterOpen(false);
              startTransition(() => {
                router.push("?" + buildQuery(f));
              });
            }}
            showSelectedBadges={isFilterOpen}
            products={props.products.map((p) => ({
              categories: (p.categories || []).map((c) => ({
                id: String(c.id),
                name: c.name,
              })),
              tags: (p.tags || []).map((t) => ({
                id: String(t.id),
                name: t.name,
              })),
            }))}
          />
        </div>
        <button
          onClick={() => setIsFilterOpen(false)}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          بستن
        </button>
      </Modal>
    </div>
  );
} 
