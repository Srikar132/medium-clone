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
    <div className="w-full rounded-lg p-4 transition-all duration-300 hover:shadow-md dark:hover:shadow-gray-800">
      
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
            {post?.author?.name}
          </span>
        </Link>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formatDate(new Date(post?.publishedAt))}
        </span>
      </div>

      
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 flex flex-col gap-3">
          <Link
            href={`/article/${post?._id}`}
            className="font-bold text-xl leading-tight line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            {post?.title}
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {post?.excerpt}
          </p>
          
          
          <div className="flex items-center gap-4 mt-3">
            <Link
              href={`/article/${post?._id}`}
              className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FcLike className="text-lg" />
              <span className="text-xs font-medium">{post?.likeCount}</span>
            </Link>
            <Link
              href={`/article/${post?._id}`}
              className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FaCommentAlt className="text-sm" />
              <span className="text-xs font-medium">{post?.commentCount}</span>
            </Link>
            <button className="ml-auto text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {post?.isBookmarked ? <BsBookmarkPlusFill /> : <BsBookmarkPlus />}
            </button>
          </div>
        </div>

        {/* Image section */}
        <div className="overflow-hidden rounded-lg">
          <Link href={`/article/${post?._id}`} className="block h-full">
            {post?.mainImage && (
              <div className="relative h-full w-full min-h-[120px]">
                <Image
                  src={urlFor(post?.mainImage).url() as string}
                  fill
                  alt={post?.title || "Article cover"}
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;