"use client";

import { useEffect, useState, useRef } from "react";
import Loading from "./Loading";
import EmptyState from "./EmptyState";
import { Post } from "@/types/post";
import BlogCard from "./BlogCard";
import BlogSkeleton from "./BlogSkeleton";
import BlogCardSkeleton from "./BlogCardSkeleton";

type BlogListProps = {
  type: string;
  initialBlogs?: Post[];
  setCache?: (
    fn: (prev: { [key: string]: Post[] }) => { [key: string]: Post[] }
  ) => void;
};

export default function BlogList({
  type,
  initialBlogs,
  setCache,
}: BlogListProps) {
  const [blogs, setBlogs] = useState<Post[]>(initialBlogs || []);
  const [loading, setLoading] = useState(typeof initialBlogs === "undefined");
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(300);
  const [visibleCount, setVisibleCount] = useState(1);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    if (typeof initialBlogs !== "undefined") {
      setBlogs(initialBlogs || []);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`/api/blogs?type=${type}`)
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          console.error("Response not ok:", text);
          throw new Error("خطا در دریافت اطلاعات: " + text);
        }
        return response.json();
      })
      .then((data) => {
        let result: Post[] = [];
        if (Array.isArray(data)) result = data;
        else if (Array.isArray(data.posts)) result = data.posts;
        setBlogs(result);
        if (setCache) setCache((prev) => ({ ...prev, [type]: result }));
      })
      .catch((error) => {
        setBlogs([]);
        setError(error?.message || "خطا در دریافت اطلاعات");
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, initialBlogs]);

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

  useEffect(() => {
    function checkButtons() {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        setShowPrev(scrollLeft > 10);
        setShowNext(scrollLeft + clientWidth < scrollWidth - 10);
      }
    }
    checkButtons();
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", checkButtons);
    }
    window.addEventListener("resize", checkButtons);
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", checkButtons);
      }
      window.removeEventListener("resize", checkButtons);
    };
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
      <div className="flex flex-nowrap w-full overflow-x-hidden gap-6 slider-scrollbar">
        {Array.from({ length: 3 }).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    );
  if (error) return <EmptyState message={error} />;
  if (!blogs || blogs.length === 0)
    return (
      <div className="text-center text-gray-400 py-8">
        مقاله‌ای برای نمایش وجود ندارد.
      </div>
    );

  return (
    <div className="relative w-full">
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2"
        onClick={() => scrollByCard(1)}
        aria-label="بعدی"
      >
        &lt;
      </button>
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2"
        onClick={() => scrollByCard(-1)}
        aria-label="قبلی"
      >
        &gt;
      </button>
      <div
        ref={containerRef}
        className="flex flex-nowrap overflow-x-auto scrollbar-hide scroll-smooth gap-6 px-10 slider-scrollbar pb-10"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="flex-shrink-0"
            style={{ width: 280, scrollSnapAlign: "start" }}
          >
            <BlogCard blog={blog} />
          </div>
        ))}
        {blogs.length > visibleCount && (
          <div
            className="flex-shrink-0 flex items-center justify-center"
            style={{ width: 280 }}
          >
            <button
              className="w-full h-full px-6 py-4 rounded-xl bg-orange-400 text-white font-bold hover:bg-orange-500 transition"
              onClick={() => (window.location.href = "/blog")}
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
