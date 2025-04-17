"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const HorizontalScrollSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLeftDisabled, setIsLeftDisabled] = useState<boolean>(true);
  const [isRightDisabled, setIsRightDisabled] = useState<boolean>(false);
  const activeButtonRef = useRef<HTMLButtonElement>(null);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const feed = searchParams.get('feed') || '';
  const category = searchParams.get('category') || '';

  const navigationItems = [
    { url: "/home", title: "for you", param: "" },
    { url: "/home?feed=following", title: "following", param: "following" },
    { url: "/home?feed=featured", title: "featured", param: "featured" },
    { url: "/home?category=machine-learning", title: "machine learning", param: "machine-learning" },
    { url: "/home?category=data-science", title: "Data science", param: "data-science" },
    { url: "/home?category=programming", title: "Programming", param: "programming" },
  ];

  const getActiveIndex = () => {
    if (category) {
      return navigationItems.findIndex(item => item.title.toLowerCase() === category.toLowerCase()) || 0;
    }
    if (feed) {
      return navigationItems.findIndex(item => item.param === feed) || 0;
    }
    return 0; 
  };
  
  const activeIndex = getActiveIndex();

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const { scrollWidth, scrollLeft, clientWidth } = container;
    setIsLeftDisabled(scrollLeft <= 5);
    setIsRightDisabled(scrollLeft + clientWidth >= scrollWidth - 5);
  };

  const handleClick = (url: string) => {
    router.push(url);
  };

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  useEffect(() => {
    if (activeButtonRef.current) {
      const button = activeButtonRef.current;
      const container = scrollContainerRef.current;
      
      if (!container) return;
      
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      const containerWidth = container.clientWidth;
      const scrollLeft = container.scrollLeft;
      
      if (buttonLeft < scrollLeft || buttonLeft + buttonWidth > scrollLeft + containerWidth) {
        container.scrollTo({
          left: buttonLeft - (containerWidth / 2) + (buttonWidth / 2),
          behavior: 'smooth'
        });
      }
    }
    
    checkScroll();
  }, [activeIndex, pathname, searchParams]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    
    checkScroll();
    
    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <div className="w-full sticky top-0 flex items-center gap-3 py-1 relative bg-white dark:bg-[#121212] z-10">
      {isLeftDisabled ? (
        <Link href="/write" className="flex items-center p-2">
          <BiPlus className="text-xl" />
        </Link>
      ) : (
        <button
          disabled={isLeftDisabled}
          className={`p-2 rounded-full transition ${isLeftDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          <BsArrowLeft />
        </button>
      )}
      
      <div
        ref={scrollContainerRef}
        className="flex items-center flex-grow overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {navigationItems.map((item, i) => (
          <button
            key={i}
            ref={i === activeIndex ? activeButtonRef : null}
            onClick={() => handleClick(item.url)}
            className={`py-2 px-4 whitespace-nowrap capitalize text-md transition duration-150 ${
              i === activeIndex 
                ? "border-b-2 border-black dark:border-white font-medium dark:text-zinc-100 text-black" 
                : "dark:text-zinc-500 text-black/70 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
      
      {!isRightDisabled && (
        <button
          disabled={isRightDisabled}
          className={`p-2 rounded-full transition ${isRightDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          <BsArrowRight />
        </button>
      )}

      {/* Gradient fade effect at the edges */}
      <div className="absolute pointer-events-none h-full w-[95%] left-1/2 top-0 -translate-x-1/2 bg-gradient-to-r from-white dark:from-[#121212] via-transparent via-5% to-transparent to-95% z-0" />
      <div className="absolute pointer-events-none h-full w-[95%] left-1/2 top-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-transparent via-95% to-white dark:to-[#121212] z-0" />
    </div>
  );
};



export default HorizontalScrollSection;