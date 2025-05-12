type ProductCardProps = {
  title: string;
  price: number;
  image?: string;
};

export default function ProductCard({ title, price, image }: ProductCardProps) {
  return (
    <div className="group border border-gray-100 rounded-2xl shadow-lg p-5 flex flex-col items-center bg-white hover:shadow-2xl transition-all duration-200 relative overflow-hidden">
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-36 h-36 object-cover mb-4 rounded-xl border group-hover:scale-110 transition-transform duration-200"
        />
      ) : (
        <div className="w-36 h-36 mb-4 rounded-xl bg-gray-100 flex items-center justify-center text-gray-300 text-4xl">
          <span>?</span>
        </div>
      )}
      <div className="font-mikhak font-bold mb-2 text-center text-lg line-clamp-2">{title}</div>
      <div className="text-primary font-mikhak text-xl mb-3">{price.toLocaleString()} <span className="text-sm">تومان</span></div>
      <button className="mt-auto px-6 py-2 rounded-xl bg-primary text-white font-bold hover:bg-emerald-600 transition w-full shadow-sm">
        افزودن به سبد خرید
      </button>
      <span className="absolute top-3 left-3 bg-emerald-100 text-emerald-600 text-xs px-2 py-1 rounded font-bold shadow-sm">جدید</span>
    </div>
  );
} 