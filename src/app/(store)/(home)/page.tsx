import StoreHeader from "@/components/store/Header";
import StoreFooter from "@/components/store/Footer";
import ProductTabs from "@/components/store/ProductTabs";
import BlogTabs from "@/components/store/BlogTabs";
import { Product } from "@/types/product";
import { Post } from "@/types/post";
import BannerSlider from "@/components/store/BannerSlider";
import Newsletter from "@/components/store/Newsletter";

export const metadata = {
  title: "خانه",
};

async function getInitialData() {
  // گرفتن محصولات ویژه (مستقیم از API اصلی و استفاده از data)
  const featuredRes = await fetch(
    process.env.API_URL + "/products?per_page=7&is_active=1&is_featured=1",
    { cache: "no-store" }
  );
  const featuredData = await featuredRes.json();
  const featuredProducts: Product[] = featuredData.data || [];

  // گرفتن جدیدترین مقالات
  const blogRes = await fetch(
    process.env.API_URL + "/posts?per_page=6&is_active=1&sort=-created_at",
    { cache: "no-store" }
  );
  const blogData = await blogRes.json();
  const latestBlogs: Post[] = (blogData.data || []).map((post: any) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    summary:
      post.summary || (post.body ? post.body.substring(0, 100) + "..." : ""),
    image: post.image || "/images/blog-placeholder.jpg",
    body: post.body,
    user_id: post.user_id,
    post_category_id: post.post_category_id,
    is_active: post.is_active,
    created_at: post.created_at,
    updated_at: post.updated_at,
  }));

  // گرفتن بنرها
  const bannerRes = await fetch(
    process.env.API_URL + "/banners?is_active=true&type=slider",
    { cache: "no-store" }
  );
  const bannerData = await bannerRes.json();
  const banners = bannerData.data || [];

  return { featuredProducts, latestBlogs, banners };
}

export default async function StoreHomePage() {
  const { featuredProducts, latestBlogs, banners } = await getInitialData();
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d3b2e] to-[#1e5d4e] flex flex-col">
      <BannerSlider banners={banners} />
      <ProductTabs initialProducts={featuredProducts} />
      <BlogTabs initialBlogs={latestBlogs} />
      <Newsletter />
    </div>
  );
}
