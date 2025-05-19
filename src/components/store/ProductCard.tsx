import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/utils";

export default function ProductCard(product: Product) {
  // استخراج تصویر اصلی
  const mainImage =
    Array.isArray(product.images) && product.images.length > 0
      ? (product.images.find((img) => img.is_primary) || product.images[0])?.image_url
      : null;

  const imageSrc = mainImage || "https://parsaaghayi.ir/og-image?text=ghahfee";

  return (
    <div className="flex flex-col items-center">
      <div className="w-64 min-h-[340px] flex flex-col h-full border border-gray-100 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all duration-200 relative overflow-hidden">
        <Link href={`/products/${product.slug}`} className="w-full h-full flex flex-col">
          <img
            src={imageSrc}
            alt={product.title}
            className="w-full object-cover mb-4 rounded-xl flex-shrink-0"
            style={{ height: 180 }}
          />
          <div className="px-4 flex flex-col flex-grow">
            <div className="w-full font-mikhak font-bold mb-2 text-start text-lg line-clamp-2">
              {product.title}
            </div>
            <div
              className="text-primary w-full font-bold font-mikhak text-xl"
              dangerouslySetInnerHTML={{ __html: formatPrice(Number(product.price)) + "<span class='font-bold text-sm ms-1'>تومان</span>" }}
            />
            
            <div className="flex items-center justify-between w-full my-2 text-gray-500 text-sm">
              <div className="flex items-center gap-1">
                <span>فروش: {product.sales_count || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>علاقه‌مندی: {product.wishlist_count || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>سبد: {product.cart_count || 0}</span>
              </div>
            </div>
          </div>
        </Link>
        {product.is_featured && (
          <span className="absolute top-3 left-3 bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded font-bold shadow-sm">
            ویژه
          </span>
        )}
        {product.is_bestseller && (
          <span className="absolute top-3 right-3 bg-emerald-100 text-emerald-600 text-xs px-2 py-1 rounded font-bold shadow-sm">
            پرفروش
          </span>
        )}
      </div>
      <button className="mt-4 px-6 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 cursor-pointer transition w-64 shadow-sm">
        افزودن به سبد خرید
      </button>
    </div>
  );
}
