export default function StoreFooter() {
  return (
    <footer className="w-full bg-gradient-to-l from-primary/80 to-emerald-400/80 text-white text-center py-6 mt-8 text-sm shadow-inner rounded-t-2xl">
      تمامی حقوق برای قهفی محفوظ است © {new Date().getFullYear()}
    </footer>
  );
} 