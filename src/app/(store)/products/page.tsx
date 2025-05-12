import { Metadata } from "next";
import ProductList from "@/components/store/ProductList";
import Pagination from "@/components/store/Pagination";

export const metadata: Metadata = {
  title: "محصولات | فروشگاه قهفی",
};

const PAGE_SIZE = 12;

async function getProducts(page: number) {
  // فرض بر این است که یک API route در Next.js داری که به بک‌اند وصل می‌شود
  const res = await fetch(`${process.env.API_URL}/products?page=${page}&per_page=${PAGE_SIZE}`, {
    cache: "no-store",
  });
  if (!res.ok) return { products: [], total: 0 };
  const data = await res.json();
  return {
    products: data.data || [],
    total: data.meta?.total || 0,
  };
}

export default async function ProductsPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Number(searchParams.page) || 1;
  const { products, total } = await getProducts(page);
  const pageCount = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-mikhak text-2xl font-bold mb-6">لیست محصولات</h1>
      <ProductList products={products} />
      <Pagination page={page} pageCount={pageCount} onPageChange={() => {}} />
    </div>
  );
} 