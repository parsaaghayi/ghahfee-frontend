import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Post } from "@/types/post";

async function getPostBySlug(slug: string): Promise<Post | null> {
  const res = await fetch(`${process.env.API_URL}/posts?slug=${slug}`);
  const data = await res.json();
  if (!data.data || !data.data.length) return null;
  return data.data[0];
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "پست یافت نشد | بلاگ قهفی" };
  return {
    title: `${post.title} | بلاگ قهفی`,
    description: post.summary || post.body?.slice(0, 150) || post.title,
    openGraph: {
      title: post.title,
      description: post.summary || post.body?.slice(0, 150) || post.title,
      images: post.image ? [{ url: post.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary || post.body?.slice(0, 150) || post.title,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogSinglePage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        {post.image && (
          <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-6" />
        )}
        <h1 className="font-mikhak text-3xl font-bold mb-4">{post.title}</h1>
        {post.summary && <p className="text-lg text-gray-700 mb-4">{post.summary}</p>}
        <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: post.body }} />
      </div>
    </main>
  );
} 