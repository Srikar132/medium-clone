"use client";

import {
  categoriesWithIcons,
  trendingArticles,
  webDevArticles,
} from "@/constants";
import { disablePageScroll, enablePageScroll } from "@fluejs/noscroll";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaThreads,
  FaTwitter,
  FaUser,
} from "react-icons/fa6";
import JoinUsbtn from "./JoinUsbtn";
import MenuButton from "./MenuButton";
import {
  AccordionSection,
  ArticleRecommendation,
  CategoryItem,
} from "./SidebarComponents";
import NavLink from "./ui/nav-link";
import Sidebar, { useSidebar } from "./ui/sidebar";

const AppSidebar = () => {
  const { isOpen, toggle } = useSidebar();
  const { data: session } = useSession();

  // Function to close sidebar when navigation occurs
  const handleNavigationClick = () => {
    if (isOpen) {
      toggle();
    }
  };

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
                InfraInk
              </span>
            </div>
            <span className="text-xs ml-5 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
              Share your insights and expertise
            </span>
          </div>
        </div>

        <div className="flex gap-5 flex-wrap max-lg:flex-col max-lg:flex-col-reverse">
          <div className="flex flex-col space-y-3 min-w-40 p-3">
            <div className=" text-sm p-4 capitalize font-medium">Social</div>
            <div className="flex space-y-5 p-4 flex-col">
              <a
                href="https://twitter.com/infraink"
                aria-label="Twitter"
                className="flex gap-x-2 items-center hover:text-blue-500"
              >
                <FaTwitter className="text-blue-500" size={20} />
                <div className=" text-xs  capitalize font-medium">Twitter</div>
              </a>
              <a
                href="https://facebook.com/infraink"
                aria-label="Facebook"
                className="flex gap-x-2 items-center hover:text-blue-900"
              >
                <FaFacebook className="text-blue-900" size={20} />
                <div className=" text-xs capitalize font-medium">Facebook</div>
              </a>
              <a
                href="https://instagram.com/infraink"
                aria-label="Instagram"
                className="flex gap-x-2 items-center hover:text-pink-500"
              >
                <FaInstagram className="text-pink-500" size={20} />
                <div className=" text-xs  capitalize font-medium">
                  Instagram
                </div>
              </a>
              <a
                href="https://instagram.com/infraink"
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
            {session ? (
              <div id="dialog" className="mt-2">
                <ul className="flex flex-col gap-2">
                  <Link
                    href={`/article/write`}
                    key={"Write Article"}
                    className="flex items-center gap-3 px-3 py-2 rounded-md transition lg:hidden mb-1"
                    onClick={handleNavigationClick}
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
                    onClick={handleNavigationClick}
                  >
                    <FaUser className=" text-sm" />
                    <span className="text-sm font-medium  capitalize">
                      {"My Profile"}
                    </span>
                  </Link>
                </ul>
              </div>
            ) : (
              <JoinUsbtn />
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
                    onClick={handleNavigationClick}
                  />
                ))}
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Recently Viewed Topics
                </p>
                <div className="flex flex-wrap gap-2">
                  <div onClick={handleNavigationClick}>
                    <NavLink variant="orange" title="Web Development" />
                  </div>
                  <div onClick={handleNavigationClick}>
                    <NavLink variant="violet" title="Machine Learning" />
                  </div>
                  <div onClick={handleNavigationClick}>
                    <NavLink variant="red" title="Operating System" />
                  </div>
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
                    onClick={handleNavigationClick}
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
                    onClick={handleNavigationClick}
                  />
                ))}
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  <div onClick={handleNavigationClick}>
                    <NavLink variant="green" title="Life Style" />
                  </div>
                  <div onClick={handleNavigationClick}>
                    <NavLink variant="pink" title="Robotics" />
                  </div>
                  <div onClick={handleNavigationClick}>
                    <NavLink variant="blue" title="Deep Learning" />
                  </div>
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
