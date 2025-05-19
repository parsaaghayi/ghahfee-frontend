"use client";
import { useState, useEffect } from "react";
import ProductList from "@/components/store/ProductList";
import { Product } from "@/types/product";

const TABS = [
  { label: "محصولات ویژه", type: "featured" },
  { label: "جدیدترین‌ها", type: "latest" },
  { label: "پرفروش‌ترین‌ها", type: "bestsellers" },
];

export default function ProductTabs({ initialProducts = [] }: { initialProducts?: Product[] }) {
  const [active, setActive] = useState(0);
  const [cache, setCache] = useState<{ [key: string]: Product[] }>({ [TABS[0].type]: initialProducts });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const type = TABS[active].type;
    if (cache[type]) return;
    setLoading(true);
    fetch(`/api/products?type=${type}`)
      .then((res) => res.json())
      .then((data) => setCache((prev) => ({ ...prev, [type]: data.products || [] })))
      .finally(() => setLoading(false));
  }, [active]);

  const products = cache[TABS[active].type] || [];

  return (
    <section className="w-full flex my-10 flex-wrap justify-center gap-5">
      <div className="flex flex-row justify-center gap-4 mb-6">
        {TABS.map((tab, idx) => (
          <button
            key={tab.type}
            className={`px-6 py-2 rounded-lg font-semibold transition cursor-pointer ${
              active === idx
                ? "bg-orange-400 text-white"
                : "bg-white/10 text-white/80 hover:bg-white/20"
            }`}
            onClick={() => setActive(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {loading && !products.length ? (
        <ProductList products={[]} loading={true} />
      ) : (
        <ProductList products={products} loading={loading} />
      )}
    </section>
  );
} 