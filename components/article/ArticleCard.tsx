import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsBookmarkPlus, BsBookmarkPlusFill } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

const ArticleCard = ({ post }: { post: any }) => {
  return (
    <div className="w-full rounded-xl p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md dark:hover:shadow-gray-800 bg-white dark:bg-zinc-900">

      <div className="flex items-center gap-3 mb-4">
        <Link href={`/profile/${post?.author?._id}`} className="flex items-center gap-2 group">
          <div className="relative overflow-hidden rounded-full h-8 w-8 ring-2 ring-gray-100 dark:ring-gray-800">
            <Image
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              height={32}
              width={32}
              src={post?.author?.image || "/default-avatar.jpg"}
              alt={post?.author?.name || "Author"}
            />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {post?.author?.name || "Unknown Author"}
          </span>
        </Link>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formatDate(new Date(post?.publishedAt))}
        </span>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col justify-between flex-grow gap-2">
          <div>
            <Link
              href={`/article/${post?._id}`}
              className="font-bold text-xl leading-tight line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              {post?.title || "Untitled"}
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3 min-h-[60px]">
              {post?.excerpt || "No excerpt available..."}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-3">
            <Link
              href={`/article/${post?._id}`}
              className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FcLike className="text-lg" />
              <span className="text-xs font-medium">{post?.likeCount ?? 0}</span>
            </Link>
            <Link
              href={`/article/${post?._id}`}
              className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FaCommentAlt className="text-sm" />
              <span className="text-xs font-medium">{post?.commentCount ?? 0}</span>
            </Link>
            <button className="ml-auto text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {post?.isBookmarked ? <BsBookmarkPlusFill /> : <BsBookmarkPlus />}
            </button>
          </div>
        </div>

        <Link href={`/article/${post?._id}`} className="min-w-[120px] max-w-[120px] aspect-[4/3] relative rounded-md overflow-hidden">
          {post?.mainImage ? (
            <Image
              src={urlFor(post?.mainImage).url()}
              alt={post?.title || "Article cover"}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 text-xs flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};
  

export default ArticleCard;