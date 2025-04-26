import ALLArticles, { ALLArticlesSkeleton } from "@/components/article/ALLArticles";
import Categories from "@/components/Categories";
import ParticlesBackground from "@/components/design/Particles";
import Pagination from "@/components/Pagination";
import PopularBlogs from "@/components/PopularBlogs";
import Recommendations from "@/components/Recommandations";
import SearchForm from "@/components/SearchForm";
import NavLink from "@/components/ui/nav-link";
import {
  ALL_ARTICLES,
} from "@/sanity/lib/queries";
import { SanityError } from "@/types/sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const ARTICLES_PER_PAGE = 5;
export const experimental_ppr = true;
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ feed?: string; category?: string; page?: string }>;
}) {
  try {

    const { page = 1 } = await searchParams;

    const start = (Number(page) - 1) * ARTICLES_PER_PAGE;
    const end = start + ARTICLES_PER_PAGE;

    const query: any = ALL_ARTICLES;
    const params: any = {
      search: null,
      start,
      end,
    };

    return (
      <>
        <section className="relative py-10 ">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <ParticlesBackground />
          </div>

          <div className="relative z-10 w-full py-20 h-full mx-auto flex-center flex-col">
            <h1 className="text-2xl text-center  sm:text-4xl md:text-5xl max-w-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
              Discover, Write & Inspire the World
            </h1>
            <p className="mt-4 text-gray-600 text-2xl sm:text-5xl dark:text-white font-bold text-center max-w-xl mx-auto">
              Speak for themselves
            </p>

            <div className="mt-10 w-full mx-auto max-w-2xl">
              <SearchForm />
            </div>

            <div className="mx-auto flex-center gap-x-5 flex-wrap mt-10">
              <span className="text-sm capitalized text-secondary-dark dark:text-gray-100/50  tracking-wider ">
                Popular Searches
              </span>
              <NavLink variant="green" title="Life Style" />
              <NavLink variant="pink" title="Robotics" />
              <NavLink variant="blue" title="Deep Learning" />
            </div>
          </div>
        </section>

        <Categories />

        <hr className="w-full h-px  dark:text-gray-100/30 text-secondary-dark/10" />

        <PopularBlogs />

        <hr className="w-full h-px  dark:text-gray-100/30 text-secondary-dark/10" />

        <section className="w-full mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5 pb-20">
          <div className="w-full gap-y-5 md:col-span-2 min-h-screen ">
            <Suspense fallback={<ALLArticlesSkeleton/>}>
              <ALLArticles query={query} params={params}/>
              <Pagination baseUrl="/home" currentPage={Number(page)} />
            </Suspense>
          </div>

          <aside className="lg:block relative">
            <div className="lg:sticky lg:top-10">
              <Recommendations />
            </div>
          </aside>
        </section>
      </>
    );
  } catch (error) {
    if (error instanceof SanityError && error.status === 404) {
      notFound();
    }

    throw error;
  }
}
