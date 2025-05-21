"use client";

import React from "react";

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  color?: 'blue' | 'green' | 'orange' | 'purple';
}

export default function DashboardStatCard({
  title,
  value,
  color = 'blue'
}: DashboardStatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    orange: 'bg-orange-50',
    purple: 'bg-purple-50'
  };

  return (
    <div className="w-full">
      <div className={`p-6 ${colorClasses[color]} rounded-lg shadow-sm`}>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          {title}
        </h2>
        <p className="text-2xl font-bold text-gray-900">
          {value}
        </p>
      </div>
    </div>
  );
} 