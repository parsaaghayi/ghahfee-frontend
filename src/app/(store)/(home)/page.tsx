import EmptyState from "@/components/store/EmptyState";

export const metadata = {
  title: "خانه",
};

export default function StoreHomePage() {
  return (
    <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center">
      {/* بنر خوش‌آمدگویی */}
      <div className="w-full rounded-xl bg-gradient-to-l from-primary/80 to-emerald-400/80 shadow mb-8 flex flex-col items-center py-10">
        <h1 className="text-3xl md:text-4xl font-mikhak font-bold text-white mb-2">به فروشگاه قهفی خوش آمدید</h1>
        <p className="text-white/90 text-lg">تجربه خرید قهوه و تجهیزات با بهترین قیمت و کیفیت</p>
      </div>
      {/* وضعیت خالی بودن محصولات */}
      <div className="w-full max-w-2xl">
        <EmptyState message="در حال حاضر محصولی برای نمایش وجود ندارد." />
      </div>
    </div>
  );
}
