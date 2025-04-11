import { auth } from "@/auth";
import ArticleCard from "@/components/ArticleCard";
import Categories from "@/components/Categories";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import SearchForm from "@/components/SearchForm";
import { client } from "@/sanity/lib/client";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { ALL_ARTICLES } from "@/sanity/lib/queries";
import React from "react";
import { BsSearch } from "react-icons/bs";

const page = async ({
  SearchParams,
}: {
  SearchParams: Promise<{ query: string }>;
}) => {
  const query = (await SearchParams)?.query;

  const session = await auth();

  const {data : posts}  = await sanityFetch({query : ALL_ARTICLES , params : {userId : session?.id} });
  
  return (
    <div className="w-full  h-full">
      <div className="flex-1 container mx-auto p-5 flex flex-col items-center justify-center gap-3">
        <h1 className="text-2xl sm:text-3xl md:text-5xl  w-full lg:max-w-xl text-center text-black dark:text-white dark:font-thin font-semibold leading-relaxed ">
          Discover the world’s top Writters.
        </h1>
        <span className="text-center lowercase tracking capitalize text-black dark:text-white/50 lg:max-w-xl">
          Explore work from the most talented and accomplished designers ready
          to take on your next project
        </span>

        <div className="w-full max-w-2xl">
          <SearchForm query={query} />
        </div>

        <div className="w-full mt-3 max-w-xl">
          <h5 className="text-center w-fit mx-auto text-xs text-black dark:text-gray-200/50 tracking-wider items-center flex gap-1 font-cursive">
            <BsSearch/> Trending Searches
          </h5>
          <Categories/>
        </div>
      </div>


      <div className="w-full flex justify-center p-3 overflow-hidden">

        <div className="w-full  min-h-screen flex flex-col  container mx-auto">
          <HorizontalScrollSection/>

          <ul className="mt-5 max-lg:divide-y-[1px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post : any , i : number) => (
              <ArticleCard key={i} post={post} />
            ))}
          </ul>
        </div>

        
      </div>


      <SanityLive/>
    </div>
  );
};

export default page;
