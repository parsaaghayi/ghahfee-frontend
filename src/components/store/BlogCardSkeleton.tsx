import React from "react";

export default function BlogCardSkeleton() {
  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex flex-col items-center border border-gray-100 rounded-2xl shadow-lg bg-white animate-pulse overflow-hidden w-64 min-h-[340px] h-full">
        <div className="relative w-full h-48 bg-gray-300/40 rounded-xl" />
        <div className="p-4 w-full flex flex-col flex-grow">
          <div className="h-6 bg-gray-300/40 rounded mb-2 w-3/4" />
          <div className="h-4 bg-gray-300/30 rounded mb-4 w-full" />
          <div className="h-4 bg-gray-300/30 rounded mb-2 w-5/6" />
        </div>
      </div>
      <div className="mt-4 px-6 py-2 rounded-xl bg-gray-300/40 w-64 h-10" />
    </div>
  );
} 