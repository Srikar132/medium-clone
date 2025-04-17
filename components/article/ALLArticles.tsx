import { client } from '@/sanity/lib/client';
import React from 'react'
import HorizontalScrollSection from '../HorizontalScrollSection';
import { Skeleton } from '../WritePageSkeleton';
import ArticleCard from './ArticleCard';

const ALLArticles = async ({
    query,
    params
} : {
    query : any;
    params : any;
}) => {
    const posts = await client.fetch( 
        query,
        params
      );
  return (
    <section className="w-full flex justify-center p-3 overflow-hidden">
    <div className="w-full min-h-screen flex flex-col container mx-auto">
      <HorizontalScrollSection />

      <ul className="mt-5 max-lg:divide-y-[1px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post : any, i : number) => (
          <ArticleCard key={post.id || i} post={post} />
        ))}
      </ul>
    </div>
  </section>
  )
}

export default ALLArticles

export const ALLArticlesSkeleton = () => {
    return (
     <ul className="mt-5 max-lg:divide-y-[1px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array(6).map((_ , i) => (
          <Skeleton key={i} className='w-full h-full'/>
        ))}
      </ul>
    )
}