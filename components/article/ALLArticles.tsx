import { client } from "@/sanity/lib/client";
import React from "react";;
import { Skeleton } from "../WritePageSkeleton";
import ArticleCard, { CustomPost } from "./ArticleCard";

const ALLArticles = async ({
  query,
  params,
}: {
  query?: any;
  params?: any;
}) => {

  try {
    const posts = await client.fetch(query, params);
  
    return (
      <ul className="flex flex-col gap-2 md:gap-5">
        {posts.map((post: CustomPost, i: number) => (
          <ArticleCard key={post._id || i} post={post} i={i} />
        ))}
      </ul>
    );
    
  }  catch (error : any) {
    return (
      <div className="w-full max-w-3xl mx-auto py-8">
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">Error loading blogs. Please try again later. -{error?.message}</p>
        </div>
      </div>
    );
  }
};

export default ALLArticles;

export const ALLArticlesSkeleton = () => {
  return (
    <ul className="flex flex-col gap-2 md:gap-5">
      {Array(6).map((_, i) => (
        <Skeleton key={i} className="w-full h-64" />
      ))}
    </ul>
  );
};
