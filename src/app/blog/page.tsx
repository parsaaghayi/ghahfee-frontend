import BlogCard from "@/components/store/BlogCard";
import { Post } from "@/types/post";

async function getPosts(): Promise<Post[]> {
  const res = await fetch(process.env.API_URL + "/posts?is_active=1");
  const data = await res.json();
  return Array.isArray(data.data) ? data.data : [];
}

export default async function BlogHomePage() {
  const posts = await getPosts();
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="font-mikhak text-2xl font-bold mb-6">بلاگ قهفی</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {posts.map((post) => (
          <BlogCard key={post.id} blog={post} />
        ))}
      </div>
    </main>
  );
} 