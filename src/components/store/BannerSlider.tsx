"use client";
import { useEffect, useState, useRef } from "react";
import { LAYOUT_CONFIG } from "@/config/layout";

type Banner = {
  id: number;
  title: string;
  background_image?: string;
  background_color?: string;
  background_style?: string;
  image?: string;
  alt?: string;
  texts?: string[];
};

export default function BannerSlider({ banners }: { banners: Banner[] }) {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, banners.length]);

  if (!banners.length) return null;

  const banner = banners[current];
  const parsedStyle = banner.background_style
    ? Object.fromEntries(
        banner.background_style
          .split(";")
          .filter(Boolean)
          .map((s) => {
            const [k, v] = s.split(":");
            return [k.trim().replace(/-([a-z])/g, g => g[1].toUpperCase()), v.trim()];
          })
      )
    : {};

  const hasBackgroundShorthand = "background" in parsedStyle;

  const style: any = {
    width: "100%",
    height: LAYOUT_CONFIG.slider.getHeight(),
    ...(hasBackgroundShorthand
      ? parsedStyle
      : {
          backgroundImage: banner.background_image
            ? `url(${banner.background_image})`
            : undefined,
          backgroundColor: banner.background_color || undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          ...parsedStyle,
        }),
    transition: "background 0.5s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  };

  return (
    <div style={style}>
      {/* متن و عنوان */}
      <div className="z-10 text-center text-white max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">{banner.title}</h2>
        {banner.texts && banner.texts.length > 0 && (
          <p className="text-lg md:text-2xl font-semibold drop-shadow-lg">{banner.texts[0]}</p>
        )}
      </div>
      {/* تصویر اصلی (در صورت وجود) */}
      {banner.image && (
        <img
          src={banner.image}
          alt={banner.alt || banner.title}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          style={{ zIndex: 1 }}
        />
      )}
      {/* دکمه‌های کنترل */}
      <button
        className="absolute font-bold text-4xl cursor-pointer right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-15 h-15 flex items-center justify-center z-20"
        onClick={() => setCurrent((current - 1 + banners.length) % banners.length)}
        aria-label="قبلی"
      >
        ‹
      </button>
      <button
        className="absolute font-bold text-4xl cursor-pointer left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-15 h-15 flex items-center justify-center z-20"
        onClick={() => setCurrent((current + 1) % banners.length)}
        aria-label="بعدی"
      >
        ›
      </button>
      {/* نقاط پایین */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full cursor-pointer ${idx === current ? "bg-white" : "bg-white/40"} border border-white`}
            style={{ display: "inline-block" }}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
      {/* لایه تیره برای خوانایی متن */}
      <div className="absolute inset-0 bg-black/30 z-0" />
    </div>
  );
}