import { auth } from "@/auth";
import ALLArticles, { ALLArticlesSkeleton } from "@/components/article/ALLArticles";
import Categories from "@/components/Categories";
import SearchForm from "@/components/SearchForm";
import { ALL_ARTICLES, ALL_ARTICLES_BY_CATEGORY, ALL_FEATURED_ARTICLES, ALL_FOLLOWING_ARTICLES } from "@/sanity/lib/queries";
import { SanityError } from "@/types/sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BsSearch } from "react-icons/bs";

export const experimental_ppr = true;

export default async function HomePage({
  searchParams,
}: {
  searchParams:  Promise<{ feed: string , category : string }>;
}) {
  try {

    const {feed = "" , category = "" } = (await searchParams);

    let query : any = ALL_ARTICLES
    let params : any = {search : null};

    if(category) {
      query = ALL_ARTICLES_BY_CATEGORY;
      params = {category , search : null}
    }else if (feed === "following") {
      const session = await auth();
      const userId = session?.id;
      
      if (!userId) {
        query = ALL_ARTICLES;
      } else {
        query = ALL_FOLLOWING_ARTICLES
        params = { userId , search : null};
      }
    } else if (feed === "featured") {
      query = ALL_FEATURED_ARTICLES;
    }
    


    return (
      <div className="w-full h-full pt-10">
        <section className="flex-1 container mx-auto p-8 flex flex-col items-center justify-center gap-3">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl w-full  text-center text-black dark:text-white dark:font-thin leading-normal tracking-wider lg:max-w-2xl font-bold font-merri_weather">
            Discover the World's top Writers.
          </h1>
          <p className="text-center tracking capitalize text-black dark:text-white/50 text-lg lg:max-w-xl">
            Explore work from the most talented and accomplished designers ready
            to take on your next project
          </p>

          <div className="w-full max-w-2xl mt-8">
            <SearchForm  />
          </div>

          <div className="w-full mt-3 max-w-xl">
            <h5 className="text-center w-fit mx-auto text-xs text-black dark:text-gray-200/50 tracking-wider items-center flex gap-1 font-cursive">
              <BsSearch /> Trending Categores
            </h5>
            <Categories />
          </div>
        </section>

        <Suspense fallback={<ALLArticlesSkeleton/>}>
          <ALLArticles
            query={query}
            params={params}
          />
        </Suspense>

      </div>
    );
  } catch (error) {
    if (error instanceof SanityError && error.status === 404) {
      notFound();
    }
    throw error;
  }
}