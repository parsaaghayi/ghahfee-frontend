"use client";

import { useState } from "react";
import BlogList from "./BlogList";
import { Post } from "@/types/post";

const tabs = [
  { id: "latest", label: "جدیدترین مقالات" },
  { id: "most-commented", label: "پرنظرترین مقالات" },
  { id: "most-viewed", label: "پربازدیدترین مقالات" },
];

export default function BlogTabs({ initialBlogs = [] }: { initialBlogs?: Post[] }) {
  const [activeTab, setActiveTab] = useState("latest");
  const [cache, setCache] = useState<{ [key: string]: Post[] }>({ latest: initialBlogs });

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // اگر کش وجود ندارد مقدار undefined بده، وگرنه مقدار کش را بده
  const blogsForTab = Object.prototype.hasOwnProperty.call(cache, activeTab) ? cache[activeTab] : undefined;

  return (
    <section className="w-full flex flex-wrap justify-center gap-5 my-10">
      <h2 className="w-full text-3xl font-mikhak font-bold text-white mb-8 text-center">مقالات قهوه</h2>
      
      {/* تب‌ها */}
      <div className="flex justify-center gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-6 py-2 rounded-lg font-semibold transition cursor-pointer ${
              activeTab === tab.id
                ? "bg-orange-400 text-white"
                : "bg-white/10 text-white/80 hover:bg-white/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* لیست مقالات */}
      <BlogList
        type={activeTab}
        initialBlogs={blogsForTab}
        setCache={(fn) => {
          setCache((prev) => {
            if (Object.prototype.hasOwnProperty.call(prev, activeTab)) return prev;
            return fn(prev);
          });
        }}
      />
    </section>
  );
} 