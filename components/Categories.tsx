"use client";

import { popularCategories } from "@/constants";
import Image from "next/image";
import Ping from "./Ping";
import Link from "next/link";

const Categories = () => {
  return (
    <section className="w-full my-10 space-y-5 ">
      <h3 className="flex items-center gap-x-3 tracking-wider font-medium relative">
        <Ping className="animate-pulse" />
        <span className="relative">
          Categories
        </span>
      </h3>
      <ul className="w-full flex items-center flex-wrap gap-3">
        {popularCategories.map((item, i) => (
          <CategoryCard
            key={i}
            name={item.name}
            image={item.image}
            numOfPost={item.numOfPosts}
          />
        ))}
      </ul>
    </section>
  );
};

export default Categories;

const CategoryCard = ({
  image,
  numOfPost,
  name,
}: {
  image: string;
  numOfPost: number;
  name: string;
}) => {
  return (
    <li className="flex-1 rounded-lg overflow-hidden transition-all duration-300 basis-[300px] sm:basis-[200px] md:h-80 h-64 sm:hover:basis-[250px]">
      <Link href={`/category/${name.toLowerCase()}`}>
        <div className="w-full h-full border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 relative group rounded-lg  transition-all duration-300">

          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"/>
            <Image
              src={image}
              alt={`${name} category`}
              height={500}
              width={500}
              className="w-full h-full object-cover object-center transition-transform duration-1000"
            />
          </div>

          <div className="absolute -rotate-90 flex flex-col right-0 bottom-10 group-hover:translate-x-full translate-x-0 transition-all duration-300 ease-out  py-1.5 px-3 rounded-l-md">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-100">{numOfPost} Posts</span>
            <span className="capitalize tracking-wider font-bold text-gray-900 dark:text-white">{name}</span>
          </div>

          <div className="absolute flex flex-col left-5 bottom-0 translate-y-full group-hover:-translate-y-5 transition-all duration-300 ease-out py-1.5 px-3 rounded-t-md z-30">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-100">{numOfPost} Posts</span>
            <span className="capitalize tracking-wider font-bold text-gray-900 dark:text-white">{name}</span>
          </div>
        </div>
      </Link>
    </li>
  );
};