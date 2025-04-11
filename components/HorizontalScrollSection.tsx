"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const HorizontalScrollSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLeftDisabled, setIsLeftDisabled] = useState<boolean>(true);
  const [isRightDisabled, setIsRightDisabled] = useState<boolean>(true);

  const [active, setActive] = useState<number>(0);
  const router = useRouter();

  const checkScroll = () => {
    const container = scrollContainerRef.current;

    if (container) {
      const { scrollWidth, scrollLeft, offsetWidth } = container;

      setIsLeftDisabled(scrollLeft === 0);
      setIsRightDisabled(scrollLeft + offsetWidth >= scrollWidth - 1);
    }
  };

  const handleClick = (i: number, url: string) => {
    setActive(i);
    router.push(url);
  };

  const scrollLeft = (): void => {
    scrollContainerRef.current?.scrollBy({ left: -100, behavior: "smooth" });
  };

  const scrollRight = (): void => {
    scrollContainerRef.current?.scrollBy({ left: 100, behavior: "smooth" });
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      container.addEventListener("resize", checkScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
        container.removeEventListener("resize", checkScroll);
      }
    };
  }, []);

  return (
    <div className="w-full sticky top-0 flex items-center  gap-3 py-1 relative">
      {isLeftDisabled ? (
        <Link href={"/write"}>
          <BiPlus className="text-xl" />
        </Link>
      ) : (
        <button
          disabled={isLeftDisabled}
          className="cursor-pointer"
          onClick={scrollLeft}
        >
          <BsArrowLeft />
        </button>
      )}
      <div
        ref={scrollContainerRef}
        className="flex relative items-center gap-1 overflow-x-scroll px-2 "
      >
        {[
          { url: "/home", title: "for you" },
          { url: "/home?feed=following", title: "following" },
          { url: "/home?feed=featured", title: "featured" },
          { url: "/home?feed=featured", title: "machine learning" },
          { url: "/home?feed=featured", title: "Data science" },
          { url: "/home?feed=featured", title: "Programming" },
        ].map((item, i) => (
          <button
            key={i}
            onClick={() => handleClick(i, item.url)}
            className={`py-2 px-3 whitespace-nowrap capitalize text-md cursor-pointer  ${active === i ? " border-b dark:text-zinc-100 text-black" : "dark:text-zinc-500 text-black/70"}`}
          >
            {item.title}
          </button>
        ))}
      </div>
      <button
        disabled={isLeftDisabled}
        className="cursor-pointer ml-auto md:hidden"
        onClick={scrollRight}
      >
        <BsArrowRight />
      </button>

      <div className="absolute pointer-events-none h-full w-[94%] left-1/2 top-0 -translate-x-1/2 bg-gradient-to-r from-transparent  via-transparent via-90% to-white dark:to-[#121212]" />
    </div>
  );
};

export default HorizontalScrollSection;
