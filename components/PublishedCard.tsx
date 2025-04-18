"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { HiOutlineEye, HiStar, HiBookmark, HiHeart } from "react-icons/hi";
import gsap from "gsap";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";
import BookmarkButton from "./BookmarkButton";
import LikeButton from "./LikeButton";

type Author = {
  name: string;
  image?: string;
};

type Category = {
  title: string;
};

export type Post = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  author: Author;
  mainImage?: {
    asset: {
      url: string;
    };
  };
  categories?: Category[];
  excerpt: string;
  publishedAt?: string;
  updatedAt?: string;
  featured: boolean;
  views: number;
  status: "draft" | "published" | "archived";
  likeCount: number;
};

type PublishedCardProps = {
  post: Post;
  variant?: "default" | "liked" | "bookmarked";
};

export default function PublishedCard({
  post,
  variant = "default",
}: PublishedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const formattedDate = post.publishedAt
    ? formatDistance(new Date(post.publishedAt), new Date(), {
        addSuffix: true,
      })
    : "Recently";

  useEffect(() => {
    const card = cardRef.current;
    const options = optionsRef.current;

    if (card && options) {
      // Initial setup
      gsap.set(options, { y: 50, opacity: 0 });

      const enterAnim = gsap.timeline({ paused: true }).to(options, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      const onEnter = () => enterAnim.play();
      const onLeave = () => enterAnim.reverse();

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);

      // Cleanup
      return () => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      };
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative aspect-square bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-800 flex flex-col"
    >
      {/* Image Section */}
      <div className="relative h-1/2 overflow-hidden">
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
            <span className="text-white text-lg font-medium">No Image</span>
          </div>
        )}

        {post.featured && (
          <div className="absolute top-3 right-3">
            <div className="bg-pink-500 p-1 rounded-full text-white">
              <HiStar className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-1 mb-2">
          {post.categories?.slice(0, 2).map((category, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 rounded-full"
            >
              {category.title}
            </span>
          ))}
          {(post.categories?.length || 0) > 2 && (
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-full">
              +{(post.categories?.length || 0) - 2}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">
          <Link
            href={`/article/${post._id}`}
            className="hover:text-pink-500 transition-colors"
          >
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 mb-2">
          {post.excerpt}
        </p>

        {/* Author & Stats */}
        <div className="mt-auto flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            {post.author.image ? (
              <Image
                src={post.author.image}
                alt={post.author.name}
                width={20}
                height={20}
                className="rounded-full"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-pink-200 flex items-center justify-center">
                <span className="text-pink-800 text-xs font-medium">
                  {post.author.name.charAt(0)}
                </span>
              </div>
            )}
            <span>{post.author.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <HiOutlineEye className="w-3 h-3" />
              {post.views}
            </span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      <div
        ref={optionsRef}
        className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4"
      >
        <Link
          href={`/post/${post.slug.current}`}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-colors"
        >
          <HiOutlineEye className="w-5 h-5" />
        </Link>

        {variant === "liked" && (
          <LikeButton
            initialIsLiked={true}
            postId={post._id}
            initialLikeCount={0}
          />
        )}

        {variant === "bookmarked" && (
          <BookmarkButton initialBookmarked={true} postId={post._id} />
        )}
      </div>
    </div>
  );
}
