import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/post";

export default function BlogCard({ blog }: { blog: Post }) {
  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex flex-col items-center border border-gray-100 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all duration-200 relative overflow-hidden w-64 min-h-[340px] h-full">
        <Link href={`/blog/${blog.slug}`} className="w-full h-full flex flex-col">
          <div className="relative w-full h-48">
            {blog.image && (
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover rounded-xl"
              />
            )}
          </div>
          <div className="p-4 w-full flex flex-col flex-grow">
            <h3 className="font-mikhak font-bold mb-2 text-start text-lg line-clamp-2">{blog.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.summary || blog.body?.slice(0, 100) + "..."}</p>
          </div>
        </Link>
      </div>
      <button className="mt-4 px-6 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 cursor-pointer transition w-64 shadow-sm">
        مطالعه مقاله
      </button>
    </div>
  );
} 