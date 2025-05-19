import { Metadata } from "next";
import { notFound } from "next/navigation";

// گرفتن اطلاعات محصول با slug
async function getProductBySlug(slug: string) {
  const res = await fetch(`${process.env.API_URL}/products?slug=${slug}`);
  const data = await res.json();
  if (!data.data || !data.data.length) return null;
  return data.data[0];
}

type Props = { params: { productSlug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.productSlug);
  if (!product) return { title: "محصول یافت نشد | فروشگاه قهفی" };
  const seo = product.seo || {};
  return {
    title: seo.meta_title || product.title,
    description: seo.meta_description || product.short_description || product.long_description || product.title,
    keywords: seo.meta_keywords,
    openGraph: {
      title: seo.og_title || product.title,
      description: seo.og_description || product.short_description || product.long_description || product.title,
      images: seo.og_image ? [{ url: seo.og_image }] : (product.images && product.images.length > 0 ? [{ url: product.images[0].image_url }] : []),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.og_title || product.title,
      description: seo.og_description || product.short_description || product.long_description || product.title,
      images: seo.og_image ? [seo.og_image] : (product.images && product.images.length > 0 ? [product.images[0].image_url] : []),
    },
    robots: `${seo.is_index ? "index" : "noindex"},${seo.is_follow ? "follow" : "nofollow"}`,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(params.productSlug);
  if (!product) return notFound();
  const images = product.images || [];
  const mainImage = images.length > 0 ? (images.find((img: any) => img.is_primary) || images[0]).image_url : "https://parsaaghayi.ir/og-image?text=ghahfee";
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* گالری تصاویر */}
        <div className="flex-shrink-0 w-full md:w-80">
          <img src={mainImage} alt={product.title} className="w-full h-80 object-cover rounded-xl border mb-4" />
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-2">
              {images.filter((img: any) => img.image_url !== mainImage).map((img: any) => (
                <img key={img.id} src={img.image_url} alt={product.title} className="w-full h-16 object-cover rounded border" />
              ))}
            </div>
          )}
        </div>
        {/* اطلاعات محصول */}
        <div className="flex-1">
          <h1 className="font-mikhak text-3xl font-bold mb-4">{product.title}</h1>
          {product.short_description && <p className="text-lg text-gray-700 mb-2">{product.short_description}</p>}
          {product.long_description && <div className="prose prose-lg mb-4" dangerouslySetInnerHTML={{ __html: product.long_description }} />}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl text-primary font-bold">{Number(product.price).toLocaleString()} تومان</span>
            {product.discount_price && (
              <span className="text-xl text-red-500 font-bold line-through">{Number(product.discount_price).toLocaleString()} تومان</span>
            )}
          </div>
          <div className="mb-4">
            <span className={product.stock > 0 ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
              {product.stock > 0 ? `موجود در انبار (${product.stock})` : "ناموجود"}
            </span>
            <span className="ml-4">کد کالا: {product.sku}</span>
          </div>
          {/* ویژگی‌ها */}
          {product.attributes && product.attributes.length > 0 && (
            <div className="mb-4">
              <h3 className="font-bold mb-2">ویژگی‌ها:</h3>
              <ul className="list-disc pr-5">
                {product.attributes.map((attr: any) => (
                  <li key={attr.id}>{attr.key}: {attr.value}</li>
                ))}
              </ul>
            </div>
          )}
          {/* دسته‌بندی‌ها */}
          {product.categories && product.categories.length > 0 && (
            <div className="mb-4">
              <h3 className="font-bold mb-2">دسته‌بندی‌ها:</h3>
              <ul className="list-disc pr-5">
                {product.categories.map((cat: any) => (
                  <li key={cat.id}>{cat.name}</li>
                ))}
              </ul>
            </div>
          )}
          {/* تگ‌ها */}
          {product.tags && product.tags.length > 0 && (
            <div className="mb-4">
              <h3 className="font-bold mb-2">تگ‌ها:</h3>
              <ul className="list-disc pr-5">
                {product.tags.map((tag: any) => (
                  <li key={tag.id}>{tag.name}</li>
                ))}
              </ul>
            </div>
          )}
          {/* واریانت‌ها */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-4">
              <h3 className="font-bold mb-2">واریانت‌ها:</h3>
              <ul className="list-disc pr-5">
                {product.variants.map((variant: any) => (
                  <li key={variant.id}>
                    {variant.sku} | قیمت: {Number(variant.price).toLocaleString()} تومان | وزن: {variant.weight} | نوع آسیاب: {variant.grind_type}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* آمار */}
          <div className="mb-4 text-sm text-gray-500">
            <span>تعداد فروش: {product.sales_count}</span>
            <span className="mx-2">|</span>
            <span>علاقه‌مندی: {product.wishlist_count}</span>
            <span className="mx-2">|</span>
            <span>در سبد خرید: {product.cart_count}</span>
          </div>
        </div>
      </div>
      {/* محصولات مرتبط */}
      {product.related_products && product.related_products.length > 0 && (
        <div className="mt-12">
          <h2 className="font-mikhak text-2xl font-bold mb-6">محصولات مرتبط</h2>
          <div className="flex flex-wrap gap-6">
            {product.related_products.map((rel: any) => (
              <div key={rel.id} className="w-64 bg-white rounded-xl shadow p-4">
                <h3 className="font-bold mb-2">{rel.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{rel.short_description}</p>
                <a href={`/products/${rel.slug}`} className="text-primary hover:underline">مشاهده محصول</a>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* نظرات */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-12">
          <h2 className="font-mikhak text-2xl font-bold mb-6">نظرات کاربران</h2>
          <div className="space-y-6">
            {product.reviews.filter((r: any) => !r.parent_id && !r.reply_to).map((review: any) => (
              <div key={review.id} className="bg-gray-50 rounded-xl p-4 shadow">
                <div className="flex items-center gap-3 mb-2">
                  {review.user?.avatar ? (
                    <img src={review.user.avatar} alt={review.user.name} className="w-[50px] h-[50px] rounded-full border object-cover" />
                  ) : (
                    <div className="w-[50px] h-[50px] rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                      {review.user?.name?.[0] || "؟"}
                    </div>
                  )}
                  <span className="font-bold">{review.user?.name || "کاربر"}</span>
                  <span className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString("fa-IR")}</span>
                  <span className="font-bold ml-2">امتیاز:</span>
                  <span className="text-yellow-500 font-bold">{review.rating !== null ? review.rating : "—"}</span>
                </div>
                <div className="mb-2">{review.comment}</div>
                {/* پاسخ‌ها */}
                {product.reviews.filter((r: any) => r.parent_id === review.id || r.reply_to === review.id).length > 0 && (
                  <div className="mt-2 space-y-2 mr-6 border-r-4 border-primary/50 pr-4">
                    {product.reviews.filter((r: any) => r.parent_id === review.id || r.reply_to === review.id).map((reply: any) => (
                      <div key={reply.id} className="bg-primary/10 rounded p-3 text-sm ml-4 flex items-center gap-2">
                        {reply.user?.avatar ? (
                          <img src={reply.user.avatar} alt={reply.user.name} className="w-[38px] h-[38px] rounded-full border object-cover" />
                        ) : (
                          <div className="w-[38px] h-[38px] rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            {reply.user?.name?.[0] || "؟"}
                          </div>
                        )}
                        <span className="font-bold text-primary">{reply.user?.name || "کاربر"}:</span>
                        <span>{reply.comment}</span>
                        <span className="text-xs text-gray-400 ml-2">{new Date(reply.created_at).toLocaleDateString("fa-IR")}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
} 