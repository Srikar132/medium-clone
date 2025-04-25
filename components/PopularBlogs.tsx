import NavLink, { ColorVariant, colors } from "./ui/nav-link"
import React from "react";
import Ping from "./Ping";
import Image from "next/image"
import Link from "next/link";
import { ALL_FEATURED_ARTICLES } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { CustomPost } from "./article/ArticleCard";
import { urlFor } from "@/sanity/lib/image";
import { Skeleton } from "./ui/skeleton";
import { Category } from "@/sanity/types";
import { format } from "date-fns";


const PopularBlogs = async  () => {
  try {
    
    const posts = await client.fetch(ALL_FEATURED_ARTICLES);
  
    return (
      <section className="w-full my-10 space-y-5">
        <h3 className="flex items-center gap-x-3 tracking-wider justify-center font-medium relative">
          <Ping className="animate-pulse" />
          <span className="relative">
            Discover Popular Blogs
            <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gray-800/80 dark:bg-gray-200/80"></span>
          </span>
        </h3>
        <ul className="w-full flex items-center flex-wrap gap-3">
          {posts.map((post : CustomPost , i : number) => (
            <PopularBlogCard
              key={i}
              index={i}
              post={post}
            />
          ) )}
        </ul>
      </section>
    );
  } catch (error : any) {
    return (
      <div className="w-full max-w-3xl mx-auto py-8">
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">Error popular bogs. Please try again later. -{error?.message}</p>
        </div>
      </div>
    );
  }
};

export default PopularBlogs;


const PopularBlogCard = ({
  index ,
  post ,
} : {
  index : number;
  post : CustomPost;
}) => {
  return (
    <li  className={`rounded-lg overflow-hidden transition-all duration-300  md:h-96 h-80 border ${index == 1 ? "flex-2/3 basis-[500px]" : "flex-1/3 basis-[300px]"} `}>
      <div className="w-full h-full">
        <div className="w-full h-full border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 relative group rounded-lg  transition-all duration-300 flex">

          <DateCard date={post.publishedAt!}/>

          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"/>
            <Image
              src={urlFor(post.mainImage).url()}
              alt={`${post.title}`}
              height={500}
              width={500}
              className="w-full h-full object-cover object-center transition-transform duration-1000"
            />
          </div>



          <div className="justify-end flex flex-col  py-1.5 px-3 rounded-t-md z-10 space-y-3 translate-y-10 group-hover:-translate-y-10 transition-all duration-300 ease-linear">

            {post.categories?.slice(0,1).map((category : Category, i : number) => (
                <NavLink key={i} className="w-fit text-white/70!" variant={colors[index] as ColorVariant} title={category.title!} showUnderline={false}/>
            ))}
            
            <Link href={`/article/${post?.slug?.current}`} className="relative  text-white font-bold  ">
              <span className="line-clamp-2">
                {post?.title}
              </span>
            </Link>

            <Link
              href={`/profile/${post?.author?._id}`}
              className="flex items-center gap-3 group hover:opacity-90 transition-opacity mt-5"
            >
              <div className="relative h-5 w-5 rounded-full overflow-hidden  ">
                <Image
                  className="object-cover"
                  fill
                  src={post?.author?.image || "/default-avatar.jpg"}
                  alt={post?.author?.name || "Author"}
                />
              </div>
              <span className="text-sm text-white/50 font-medium">
                {post?.author?.name}
              </span>
            </Link>

          </div>
        </div>
      </div>
    </li>
  );
};

export const PopularCardSkeleton = () => {
  return Array(3).map((i) => (
    <div className={`rounded-lg overflow-hidden transition-all duration-300  md:h-96 h-80 border ${i == 1 ? "flex-2/3 basis-[500px]" : "flex-1/3 basis-[300px]"} `}>
      <Skeleton className="w-full h-full"/>
    </div>
  ))
}

export const DateCard = ({date} : {date : string}) => {
  const d = new Date(date);
  const day = format( d, "dd");
  const month = format(d , "MMM");
  return (
    <div className="absolute left-2 top-2 bg-white rounded-lg p-2 flex flex-col px-4 z-10 items-center justify-center">
    <span className="text-lg sm:text-4xl font-bold  text-black">{day}</span>
    <span className="text-sm sm:text-xl font-meduim text-black">{month}</span>
  </div>
  )
}