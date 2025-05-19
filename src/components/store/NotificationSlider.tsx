"use client";
import Link from "next/link";
import React from "react";
import { LAYOUT_CONFIG } from "@/config/layout";

interface Notification {
  id: number;
  title: string;
  message: string;
  images?: { desktop?: string };
  link?: string;
}

export default function NotificationSlider({ notifications }: { notifications: Notification[] }) {
  if (!notifications.length) return null;

  // برای بی‌وقفه بودن، notificationها را دو بار نمایش بده
  const displayNotifications = [...notifications, ...notifications];

  // مدت زمان انیمیشن بر اساس تعداد notification و طول کل متن‌ها
  const duration = Math.max(8, notifications.length * 15);

  return (
    <div className="relative w-full overflow-hidden bg-primary/10 flex items-center" style={{ height: LAYOUT_CONFIG.notification.height }}>
      <div
        className="flex items-center h-full animate-marquee"
        style={{
          width: "max-content",
          animationDuration: `${duration}s`,
        }}
      >
        {displayNotifications.map((n, idx) => (
          <div
            key={n.id + '-' + idx}
            className="flex items-center h-[50px] text-white font-bold text-base group"
            style={{
              paddingLeft: 100,
              paddingRight: 100,
              background: n.images?.desktop
                ? `url('${n.images.desktop}') center center/cover no-repeat`
                : undefined,
              whiteSpace: "nowrap",
            }}
          >
            <span className="bg-black/50 rounded-full px-20 py-2 whitespace-nowrap">
              <Link
                href={n.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-white text-[18px]"
                style={{ color: "inherit" }}
              >
                {n.title}
                {n.title && n.message ? ": " : ""}
                {n.message}
              </Link>
            </span>
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
        .animate-marquee {
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          direction: rtl;
          animation-duration: ${Math.max(16, notifications.length * 14)}s;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
} 