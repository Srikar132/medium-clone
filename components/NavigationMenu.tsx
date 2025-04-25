"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Ping from "./Ping";
import NavLink from "./ui/nav-link";

import { categoriesWithIcons, trendingArticles, webDevArticles } from "@/constants";
import { ArticleRecommendation } from "./SidebarComponents";


export default function NavigationMenu_() {
  return (
    <NavigationMenu className="max-lg:hidden">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-accent shadow-lg">Trending Articles</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-5xl p-5 min-h-64">
              <div className="w-full h-auto flex flex-col space-y-5">
                <h1 className="font-meduim text-sm flex items-center gap-2">
                  {" "}
                  <Ping /> Trending{" "}
                </h1>
                <ul className="grid w-full gap-3 md:grid-cols-1 lg:grid-cols-3 p-4 ">
                  {trendingArticles.map((post, i) => (
                    <ArticleRecommendation
                      key={i}
                      title={post.title}
                      date={post.publishedDate}
                      iconSrc={post.mainImage}
                      href={post.href}
                    />
                  ))}
                </ul>

                <div className=" flex items-center gap-x-5 flex-wrap mt-10">
                  <span className="text-sm capitalized text-secondary-dark dark:text-gray-100/50  tracking-wider ">
                    Recently Viewed Topics
                  </span>
                  <NavLink variant="orange" title="Web Development" />
                  <NavLink variant="violet" title="Machine Learning" />
                  <NavLink variant="red" title="Operating System" />
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-5xl p-5">
              <h2 className="text-2xl font-bold mb-6 px-4 text-center md:text-left">
                Popular Categories
                <div className="mt-2 h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
              </h2>

              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {categoriesWithIcons.map((category) => (
                  <ListItem
                    key={category.title}
                    title={category.title}
                    href={category.href}
                    icon={category.icon}
                    className="h-full"
                  >
                    Browse {category.title.toLowerCase()} content
                  </ListItem>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Web Development</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-5xl p-5 min-h-64">
              <div className="w-full h-auto flex flex-col space-y-5">
                <h1 className="font-meduim text-sm flex items-center gap-2">
                  {" "}
                  <Ping /> Web Development{" "}
                </h1>
                <ul className="grid w-full gap-3 md:grid-cols-1 lg:grid-cols-3 p-4 ">
                  {webDevArticles.map((post, i) => (
                    <ArticleRecommendation
                      key={i}
                      title={post.title}
                      date={post.publishedDate}
                      iconSrc={post.mainImage}
                      href={post.href}
                    />
                  ))}
                </ul>

                <div className=" flex items-center gap-x-5 flex-wrap mt-10">
                  <span className="text-sm capitalized text-secondary-dark dark:text-gray-100/50 tracking-wider ">
                    Popular Searches
                  </span>
                  <NavLink variant="green" title="Life Style" />
                  <NavLink variant="pink" title="Robotics" />
                  <NavLink variant="blue" title="Deep Learning" />
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
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
              <div className="text-base  font-semibold mb-1 flex items-center gap-2">
                <div className="group-hover:underline">{title}</div>
                <span className="transform translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all underline-offset-0 duration-300 text-pink-500">
                  →
                </span>
              </div>
              <p className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                {children}
              </p>
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";


