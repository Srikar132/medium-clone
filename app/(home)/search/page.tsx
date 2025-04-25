import ArticleCard, { CustomPost } from "@/components/article/ArticleCard";
import { client } from "@/sanity/lib/client";
import { ALL_ARTICLES } from "@/sanity/lib/queries";
import SearchForm from "@/components/SearchForm";
import { ARTICLES_PER_PAGE } from "../home/page";
import { Suspense } from "react";
import { ALLArticlesSkeleton } from "@/components/article/ALLArticles";
import Pagination from "@/components/Pagination";
import Recommendations from "@/components/Recommandations";

const SearchedPosts = async ({
  params,
  start,
  end,
}: {
  params: { search: string | null };
  start: number;
  end ?: number;
}) => {
  const posts: CustomPost[] = await client.fetch(ALL_ARTICLES, params);

  return (
    <>
      <ul className="flex flex-col gap-2 md:gap-5">
        {posts.map((post: CustomPost, i: number) => (
          <ArticleCard key={post._id || i} post={post} i={i} />
        ))}
      </ul>
      {posts.length > 0 && (
        <div className="mt-8">
          <Pagination
            currentPage={Math.floor(start / ARTICLES_PER_PAGE) + 1}
            baseUrl={`/search`}
          />
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

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string; page: string }>;
}) => {
  try {
    const { query, page = 1 } = await searchParams;
    
    const start = (Number(page) - 1) * ARTICLES_PER_PAGE;
    const end = start + ARTICLES_PER_PAGE;
    const params = {
      search: query || null,
      start,
      end
    };

    return (
      <div className="w-full min-h-screen pt-20">
        <div className="w-full dark:bg-secondary-dark rounded-lg p-5 flex">
          <div className="flex-1 flex flex-col items-center">
            <h5 className="capitalize text-xs dark:text-gray-300">
              Search here
            </h5>
            <h2 className="font-bold text-lg space-x-1 mt-1">
              <span className="text-xl text-pink-500">#</span>
              {query}
            </h2>

            <div className="w-full max-w-3xl mt-10">
              <SearchForm query={query} />
            </div>

            <div className="mt-3 rounded-xl px-3 py-1 bg-gray-50 dark:bg-secondary-dark/50 text-sm font-thin">
              Loading articles...
            </div>
          </div>
        </div>

        <section className="w-full mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5 pb-20">
          <div className="w-full gap-y-5 md:col-span-2 min-h-screen">
            <Suspense fallback={<ALLArticlesSkeleton />}>
              <SearchedPosts params={params} start={start} />
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

export default page;
