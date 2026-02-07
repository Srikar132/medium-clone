import { urlFor } from "@/sanity/lib/image";
import { Author, Category, Post } from "@/sanity/types";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import Link from "next/link";
import { BsEye } from "react-icons/bs";
import { GrLike } from "react-icons/gr";
import NavLink from "../ui/nav-link";

export type CustomPost = Omit<Post, "author" | "mainImage" | "categories"> & {
  author: Author;
  mainImage: SanityImageSource;
  categories: Category[];
  commentCount?: number;
  likeCount?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  isFollowing?: boolean;
};
export const borderColors = [
  "border-green-500",
  "border-blue-500",
  "border-pink-500",
  "border-violet-500",
  "border-orange-500",
  "border-red-500",
  "border-yellow-500",
  "border-teal-500"
];

export default function ArticleCard({ post , i = 3 }: { post: CustomPost, i ?: number }) {
  // Ensure we have a valid post object and required properties
  if (!post || !post.slug?.current) {
    return null; // or return a skeleton/placeholder
  }

  return (
    <Link
      href={`/article/${post.slug.current}`}
      className={`block flex flex-col rounded-lg overflow-hidden shadow-lg bg-white dark:bg-[#272C31] text-gray-800 dark:text-white border-l-4 ${borderColors[i % borderColors.length]}`}
    >
      <div className="flex flex-col h-full">
        <div className="w-full py-2 px-4 md:px-6 md:py-3 flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-36 lg:h-36 lg:flex-shrink-0">
            <Image
              width={200}
              height={200}
              src={urlFor(post.mainImage).url() || "/default-avatar.jpg"}
              alt={post.title || "Article thumbnail"}
              className="w-full h-32 lg:h-full object-cover rounded-xl"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-xl font-semibold mb-2 hover:underline transition-colors">
              {post?.title || "Untitled Article"}
            </h2>

            <div className="flex items-center mb-3 text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                By {post?.author?.name || "Unknown Author"}
              </span>
              <span className="mx-2 text-gray-500">•</span>
              <span className="text-gray-600 dark:text-gray-400">
                {post?.commentCount ?? 0} Comments
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-400 text-sm mb-4 line-clamp-3">
              {post?.excerpt || "No excerpt available"}
            </p>
          </div>
        </div>

        <div className="mt-auto p-4 border-t border-dotted flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {post.categories?.map((category: Category, index: number) => (
              <NavLink
                key={category._id || index}
                variant={"yellow"}
                title={category.title || "Category"}
                showUnderline={false}
              />
            ))}
          </div>

          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 gap-4">
            <span className="flex items-center gap-2">
              <BsEye className="text-lg" />
              <span>{post?.views ?? 0} Views</span>
            </span>
            <span className="flex items-center gap-2">
              <GrLike className="text-lg" />
              <span>{post?.likeCount ?? 0} Likes</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
