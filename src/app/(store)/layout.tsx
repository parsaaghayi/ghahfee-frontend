import StoreHeader from "@/components/store/Header";
import StoreFooter from "@/components/store/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "فروشگاه قهفی",
    template: "%s | قهفی",
  },
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <StoreHeader />
      <main className="flex-1">{children}</main>
      <StoreFooter />
    </div>
  );
} 