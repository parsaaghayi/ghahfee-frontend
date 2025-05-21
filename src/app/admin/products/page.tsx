import { Metadata } from "next";
import ProductsList from "@/components/admin/products/ProductsList";

export const metadata: Metadata = {
  title: "مدیریت محصولات | پنل مدیریت",
  description: "مدیریت محصولات فروشگاه",
};

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">مدیریت محصولات</h1>
      </div>
      <ProductsList />
    </div>
  );
} 