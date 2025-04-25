import Pagination from "@/components/Pagination";
import Recommendations from "@/components/Recommandations";
import { ALLArticlesSkeleton } from "@/components/article/ALLArticles";
import ArticleCard, { CustomPost } from "@/components/article/ArticleCard";
import { fetchCategory, getAllArticlesByCategory } from "@/sanity/lib/fetches";
import { Category } from "@/sanity/types";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { ARTICLES_PER_PAGE } from "../../home/page";

const CategoryHeaderSkeleton = () => (
  <div className="w-full dark:bg-secondary-dark rounded-lg p-5 flex animate-pulse">
    <div className="flex-1 flex flex-col items-center">
      <div className="h-4 w-32 bg-gray-200 dark:bg-[#272C29] rounded mb-3"></div>
      <div className="h-6 w-48 bg-gray-300 dark:bg-[#272C29] rounded mb-5"></div>
      <div className="h-16 w-3/4 bg-gray-200 dark:bg-[#272C29] rounded mb-3"></div>
      <div className="h-6 w-24 bg-gray-300 dark:bg-[#272C29] rounded"></div>
    </div>
  </div>
);

const CategoryHeader = async ({ slug }: { slug: string }) => {
  const category: Category = await fetchCategory(slug);
  
  if (!category) {
    return notFound();
  }

  return (
    <div className="w-full dark:bg-secondary-dark rounded-lg p-7  flex">
      <div className="flex-1 flex flex-col items-center">
        <h5 className="capitalize text-xs dark:text-gray-300">Browse Category</h5>
        <h2 className="font-bold text-3xl space-x-1 mt-1">
          <span className="text-2xl text-pink-500">#</span>
          {category.title}
        </h2>

        <p className="text-center text-lg max-w-2xl font-meduim mt-5">
          {category.description ||
            "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot."}
        </p>

        <div className="mt-3 rounded-xl px-3 py-1 bg-secondary-dark/50 text-sm font-thin">
          Loading articles...
        </div>
      </div>
    </div>
  );
};

const CategoryPosts = async ({ 
  slug, 
  start, 
  end 
}: { 
  slug: string; 
  start: number; 
  end: number;
}) => {
  const posts: CustomPost[] = await getAllArticlesByCategory(slug, start, end);
  
  return (
    <>
      <ul className="flex flex-col gap-2 md:gap-5">
        {posts.map((post: CustomPost, i: number) => (
          <ArticleCard key={post._id || i} i={i} post={post} />
        ))}
      </ul>
      {posts.length > 0 && (
        <div className="mt-8">
          <Pagination currentPage={Math.floor(start / ARTICLES_PER_PAGE) + 1} baseUrl={`/category/${slug}`} />
        </div>
      )}
      {posts.length === 0 && (
        <div className="w-full p-8 text-center">
          <p>No articles found in this category.</p>
        </div>
      )}
    </>
  );
};

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page: string }>;
}) => {
  try {
    const slug = (await params)?.slug;
    const { page = 1 } = await searchParams;

    const start = (Number(page) - 1) * ARTICLES_PER_PAGE;
    const end = start + ARTICLES_PER_PAGE;

    if (!slug) {
      return notFound();
    }

    return (
      <div className="w-full min-h-screen pt-20">
        <Suspense fallback={<CategoryHeaderSkeleton />}>
          <CategoryHeader slug={slug} />
        </Suspense>

        <section className="w-full mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5 pb-20">
          <div className="w-full gap-y-5 md:col-span-2 min-h-screen">
            <Suspense fallback={<ALLArticlesSkeleton />}>
              <CategoryPosts slug={slug} start={start} end={end} />
            </Suspense>
          </div>

          <aside className="lg:block relative">
            <div className="lg:sticky lg:top-10">
              <Recommendations />
            </div>
          </aside>
        </section>
      </div>
    );
  } catch (error: any) {
    return (
      <div className="w-full max-w-3xl mx-auto py-8">
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">
            Error loading blogs. Please try again later. -{error?.message}
          </p>
        </div>
      </div>
    );
  }
};

export default Page;