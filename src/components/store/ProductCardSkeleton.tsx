import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-64 min-h-[340px] flex flex-col h-full border border-gray-100 rounded-2xl shadow-lg bg-white animate-pulse overflow-hidden">
        <div className="w-full h-[180px] bg-gray-300/40 mb-4 rounded-xl flex-shrink-0" />
        <div className="px-4 flex flex-col flex-grow w-full">
          <div className="h-6 bg-gray-300/40 rounded mb-2 w-3/4" />
          <div className="h-5 bg-gray-300/30 rounded mb-2 w-1/2" />
          <div className="flex items-center justify-between w-full my-2">
            <div className="h-4 bg-gray-200/50 rounded w-10" />
            <div className="h-4 bg-gray-200/50 rounded w-10" />
            <div className="h-4 bg-gray-200/50 rounded w-10" />
          </div>
        </div>
      </div>
      <div className="mt-4 px-6 py-2 rounded-xl bg-gray-300/40 w-64 h-10" />
    </div>
  );
} 