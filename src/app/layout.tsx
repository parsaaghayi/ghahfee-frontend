import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-mikhak bg-white text-gray-900">{children}</body>
    </html>
  );
} 