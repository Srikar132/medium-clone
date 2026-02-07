"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { client } from "@/sanity/lib/client";

// Real categories interface
interface RealCategory {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  postCount?: number;
}

export default function NavigationMenu_() {
  const [categories, setCategories] = useState<RealCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = `*[_type == "category"] | order(_createdAt desc) [0...8] {
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

  return (
    <NavigationMenu className="max-lg:hidden h-14 ">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='font-semibold'>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-5xl p-5">
              <h2 className="text-2xl font-bold mb-6 px-4 text-center md:text-left">
                Browse Categories
                <div className="mt-2 h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
              </h2>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-16"></div>
                  ))}
                </div>
              ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {categories.map((category) => (
                    <ListItem
                      key={category._id}
                      title={category.title}
                      href={`/category/${category.slug.current}`}
                      className="h-full"
                      postCount={category.postCount}
                    >
                      {category.description || `Discover articles about ${category.title.toLowerCase()}`}
                    </ListItem>
                  ))}
                </ul>
              )}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
            <a href="/home" className='font-semibold'>All Posts</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    icon?: React.ReactNode;
    postCount?: number;
  }
>(({ className, title, children, icon, postCount, ...props }, ref) => {
  return (
    <li className="w-full">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-lg p-4 leading-none no-underline outline-none transition-all duration-300 border-l-4 border-transparent",
            "hover:border-l-4 hover:border-pink-500 hover:bg-gray-50 hover:shadow-md dark:hover:bg-gray-800/70",
            "focus:ring-2 focus:ring-indigo-500/20 focus:outline-none",
            "dark:text-gray-100 relative overflow-hidden group",
            className
          )}
          {...props}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 to-pink-500/0 group-hover:from-pink-500/5 group-hover:to-purple-500/10 transition-all duration-300"></div>

          <div className="flex items-center gap-3 relative z-10">
            {icon && <div className="text-pink-500 text-lg">{icon}</div>}
            <div className="flex-1">
              <div className="text-base font-semibold mb-1 flex items-center gap-2">
                <div className="group-hover:underline">{title}</div>
                <span className="transform translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all underline-offset-0 duration-300 text-pink-500">
                  →
                </span>
              </div>
              <p className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                {children}
              </p>
              {postCount !== undefined && (
                <p className="text-xs text-pink-500 mt-1 font-medium">
                  {postCount} posts
                </p>
              )}
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";


