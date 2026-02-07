"use client";

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Ping from "./Ping";

interface RealCategory {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  postCount?: number;
}

// Map category names to images - preserving original category images
const getCategoryImage = (categoryName: string, index: number): string => {
  const imageMap: { [key: string]: string } = {
    'games': '/images/popular-categories/image1.png',
    'robotics': '/images/popular-categories/image5.jpg',
    'ideas': '/images/popular-categories/image3.jpg',
    'music': '/images/popular-categories/image2.jpg',
    'gadgets': '/images/popular-categories/image4.jpg',
    'technology': '/images/popular-categories/image1.png',
    'lifestyle': '/images/popular-categories/image2.jpg',
    'programming': '/images/popular-categories/image3.jpg',
    'design': '/images/popular-categories/image4.jpg',
    'business': '/images/popular-categories/image5.jpg'
  };

  const normalizedName = categoryName.toLowerCase();

  // First try exact match
  if (imageMap[normalizedName]) {
    return imageMap[normalizedName];
  }

  // Then try partial matches
  for (const key in imageMap) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return imageMap[key];
    }
  }

  // Fallback to cycling through images based on index
  const fallbackImages = [
    '/images/popular-categories/image1.png',
    '/images/popular-categories/image2.jpg',
    '/images/popular-categories/image3.jpg',
    '/images/popular-categories/image4.jpg',
    '/images/popular-categories/image5.jpg'
  ];

  return fallbackImages[index % fallbackImages.length];
};

const Categories = () => {
  const [categories, setCategories] = useState<RealCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = `*[_type == "category"] | order(_createdAt desc) [0...5] {
          _id,
          title,
          slug,
          description,
          "postCount": count(*[_type == "post" && references(^._id)])
        }`;

        const data = await client.fetch(query);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="w-full my-10 space-y-5">
        <h3 className="flex items-center gap-x-3 tracking-wider font-medium relative">
          <Ping className="animate-pulse" />
          <span className="relative">Categories</span>
        </h3>
        <ul className="w-full flex items-center flex-wrap gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <li
              key={i}
              className="flex-1 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-64 md:h-80 basis-[300px] sm:basis-[200px]"
            />
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="w-full my-10 space-y-5 ">
      <h3 className="flex items-center gap-x-3 tracking-wider font-medium relative">
        <Ping className="animate-pulse" />
        <span className="relative">
          Categories
        </span>
      </h3>
      <ul className="w-full flex items-center flex-wrap gap-3">
        {categories.map((category, i) => (
          <CategoryCard
            key={category._id}
            name={category.title}
            slug={category.slug.current}
            numOfPost={category.postCount || 0}
            description={category.description}
            image={getCategoryImage(category.title, i)}
            index={i}
          />
        ))}
      </ul>
    </section>
  );
};

export default Categories;

const CategoryCard = ({
  name,
  slug,
  numOfPost,
  description,
  image,
  index,
}: {
  name: string;
  slug: string;
  numOfPost: number;
  description?: string;
  image: string;
  index: number;
}) => {
  return (
    <li className="flex-1 rounded-lg overflow-hidden transition-all duration-300 basis-[300px] sm:basis-[200px] md:h-80 h-64 sm:hover:basis-[250px]">
      <Link href={`/category/${slug}`}>
        <div className="w-full h-full border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 relative group rounded-lg transition-all duration-300">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 300px, (min-width: 640px) 200px, 100vw"
          />

          {/* Content overlay */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300 rounded-lg" />

          {/* Category info - visible by default */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
            <span className="text-xs font-medium opacity-90 block mb-1">{numOfPost} Posts</span>
            <h4 className="font-bold text-lg capitalize tracking-wide">{name}</h4>
          </div>

          {/* Hover effect - show description if available */}
          {description && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-30">
              <div className="text-center">
                <h4 className="text-white font-bold text-lg mb-2 capitalize">{name}</h4>
                <p className="text-white/90 text-sm leading-relaxed">
                  {description.length > 80 ? `${description.substring(0, 80)}...` : description}
                </p>
                <span className="text-white/70 text-xs block mt-2">{numOfPost} Posts</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </li>
  );
};
