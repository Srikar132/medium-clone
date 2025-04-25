"use client";

import Sidebar, { useSidebar } from "./ui/sidebar";
import MenuButton from "./MenuButton";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  categoriesWithIcons,
  trendingArticles,
  webDevArticles,
} from "@/constants";
import {
  FaFacebook,
  FaInstagram,
  FaThreads,
  FaTwitter,
  FaUser,
} from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import {
  AccordionSection,
  CategoryItem,
  ArticleRecommendation,
} from "./SidebarComponents";
import NavLink from "./ui/nav-link";
import { disablePageScroll, enablePageScroll } from "@fluejs/noscroll";
import { useEffect } from "react";
import Image from "next/image";
import JoinUsbtn from "./JoinUsbtn";

const AppSidebar = () => {
  const { isOpen, toggle } = useSidebar();
  const { data: session } = useSession();

  useEffect(() => {
    if (isOpen) {
      disablePageScroll();
    } else {
      enablePageScroll();
    }
  }, [isOpen]);

  return (
    <Sidebar>
      <div className="w-full pt-10 pb-30 h-full flex   flex-col relative">
        <div className="absolute top-0 right-0">
          <MenuButton isOpen={isOpen} toggle={toggle} />
        </div>
        <div className="p-2 lg:p-4  flex items-center justify-between w-full max-w-lg">
          <div className="flex flex-col space-y-2">
            <div className="flex-center gap-2">
              <Image
                src="/logo.png"
                height={50}
                width={50}
                alt="LOGO"
                className="w-10 h-10"
              />
              <span className="dark:text-white sm:text-3xl poppins-extrabold-italic text-black ">
                Syron
              </span>
            </div>
            <span className="text-xs ml-5 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
              Show your intrest to write
            </span>
          </div>
        </div>

        <div className="flex gap-5 flex-wrap max-lg:flex-col max-lg:flex-col-reverse">
          <div className="flex flex-col space-y-3 min-w-40 p-3">
            <div className=" text-sm p-4 capitalize font-medium">Social</div>
            <div className="flex space-y-5 p-4 flex-col">
              <a
                href="https://twitter.com/medium"
                aria-label="Twitter"
                className="flex gap-x-2 items-center hover:text-blue-500"
              >
                <FaTwitter className="text-blue-500" size={20} />
                <div className=" text-xs  capitalize font-medium">Twitter</div>
              </a>
              <a
                href="https://facebook.com/medium"
                aria-label="Facebook"
                className="flex gap-x-2 items-center hover:text-blue-900"
              >
                <FaFacebook className="text-blue-900" size={20} />
                <div className=" text-xs capitalize font-medium">Facebook</div>
              </a>
              <a
                href="https://instagram.com/medium"
                aria-label="Instagram"
                className="flex gap-x-2 items-center hover:text-pink-500"
              >
                <FaInstagram className="text-pink-500" size={20} />
                <div className=" text-xs  capitalize font-medium">
                  Instagram
                </div>
              </a>
              <a
                href="https://instagram.com/medium"
                aria-label="Instagram"
                className="flex gap-x-2 items-center"
              >
                <FaThreads className="text-white" size={20} />
                <div className=" text-xs capitalize font-medium">Threads</div>
              </a>
            </div>
          </div>

          <div className="overflow-y-auto border-l border-accent pl-3 lg:pl-5 flex-1 max-w-md scrollbar">
            <div className="mb-5 text-sm p-4 capitalize font-medium">Menu</div>
            {!!session ? (
              <AccordionSection title="You">
                <div id="dialog" className="mt-2">
                  <ul className="flex flex-col gap-2">
                    <Link
                      href={`/article/write`}
                      key={"Write Article"}
                      className="flex items-center gap-3 px-3 py-2 rounded-md transition lg:hidden mb-1"
                    >
                      <FaPencilAlt className="text-sm" />
                      <span className="text-sm font-medium  capitalize">
                        {"Write"}
                      </span>
                    </Link>

                    <hr className="bg-black/50 dark:bg-accent" />
                    <Link
                      href={`/profile/${session?.id}`}
                      key={"My Profile"}
                      className="flex items-center gap-3 px-3 py-2 rounded-md  transition"
                    >
                      <FaUser className=" text-sm" />
                      <span className="text-sm font-medium  capitalize">
                        {"My Profile"}
                      </span>
                    </Link>
                  </ul>
                </div>
              </AccordionSection>
            ) : (
              <JoinUsbtn/>
            )}
            <AccordionSection title="Trending Articles">
              <div className="space-y-2">
                {trendingArticles.map((article, i) => (
                  <ArticleRecommendation
                    key={i}
                    title={article.title}
                    date={article.publishedDate}
                    iconSrc={article.mainImage}
                    href={article.href}
                    showImage={false}
                  />
                ))}
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Recently Viewed Topics
                </p>
                <div className="flex flex-wrap gap-2">
                  <NavLink variant="orange" title="Web Development" />
                  <NavLink variant="violet" title="Machine Learning" />
                  <NavLink variant="red" title="Operating System" />
                </div>
              </div>
            </AccordionSection>

            <AccordionSection title="Categories">
              <div className="space-y-2 mt-10">
                {categoriesWithIcons.map((category, i) => (
                  <CategoryItem
                    key={i}
                    title={category.title}
                    href={category.href}
                    icon={category.icon}
                    description={`Browse ${category.title.toLowerCase()} content`}
                  />
                ))}
              </div>
            </AccordionSection>

            <AccordionSection title="Web Development">
              <div className="space-y-2">
                {webDevArticles.map((article, i) => (
                  <ArticleRecommendation
                    key={i}
                    title={article.title}
                    date={article.publishedDate}
                    iconSrc={article.mainImage}
                    href={article.href}
                    showImage={false}
                  />
                ))}
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  <NavLink variant="green" title="Life Style" />
                  <NavLink variant="pink" title="Robotics" />
                  <NavLink variant="blue" title="Deep Learning" />
                </div>
              </div>
            </AccordionSection>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
