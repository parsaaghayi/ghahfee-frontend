"use client";

import React from "react";

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

export default function DashboardStatCard({ title, value, icon, color }: DashboardStatCardProps) {
  return (
    <div
      className="flex flex-col justify-between rounded-lg shadow-md p-6 flex-1 min-w-[220px] min-h-[140px]"
      style={{ background: color, color: "#fff" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-3xl">{icon}</span>
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <div className="mt-4 text-right text-lg">{title}</div>
    </div>
  );
} 