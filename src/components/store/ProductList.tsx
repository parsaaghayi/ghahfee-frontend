"use client";

import { useEffect, useState, useRef } from "react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Product } from "@/types/product";

type ProductListProps = {
  products: Product[];
  loading?: boolean;
};

export default function ProductList({ products, loading }: ProductListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(300);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setCardWidth(300); // اگر عرض کارت تغییر کرد اینجا را اصلاح کن
        setVisibleCount(containerWidth / 300);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollByCard = (dir: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: dir * cardWidth,
        behavior: "smooth",
      });
    }
  };

  if (loading)
    return (
      <div className="flex flex-nowrap w-full overflow-x-hidden gap-8 slider-scrollbar">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  if (!products || products.length === 0)
    return <div className="text-center text-gray-400 py-8">محصولی برای نمایش وجود ندارد.</div>;

  return (
    <div className="relative w-full">
      <button
        className="absolute right-0 top-0 z-10 bg-white/70 cursor-pointer shadow-2xl rounded-s-lg ms-1 p-2 h-[300px] w-[50px] flex items-center justify-center"
        onClick={() => scrollByCard(1)}
        aria-label="قبلی"
      >
        &lt;
      </button>
      <button
        className="absolute left-0 top-0 z-10 bg-white/70 cursor-pointer shadow-2xl rounded-e-lg me-1 p-2 h-[300px] w-[50px] flex items-center justify-center"
        onClick={() => scrollByCard(-1)}
        aria-label="بعدی"
      >
        &gt;
      </button>
      <div
        ref={containerRef}
        className="flex flex-nowrap overflow-x-auto scrollbar-hide scroll-smooth gap-8 px-10 slider-scrollbar pb-10"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 ps-25"
            style={{ width: 280, scrollSnapAlign: "start" }}
          >
            <ProductCard {...product} />
          </div>
        ))}
        {products.length > visibleCount && (
          <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 280 }}>
            <button
              className="w-full h-full px-6 py-4 rounded-xl bg-orange-400 text-white font-bold hover:bg-orange-500 transition"
              onClick={() => (window.location.href = "/products")}
            >
              مشاهده بیشتر
            </button>
          </div>
        )}
      </div>
      <div style={{ height: 10 }} />
    </div>
  );
}
