import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "قهوه",
  description: "فروشگاه قهوه",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
