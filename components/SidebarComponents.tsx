"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

export const AccordionSection = ({
    title,
    children,
    icon,
  }: {
    title: string;
    children: React.ReactNode;
    icon?: any;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number>(0);
  
    const toggleAccordion = () => {
      if (isOpen) {
        setHeight(0);
        setTimeout(() => setIsOpen(false), 300);
      } else {
        setIsOpen(true);
        setHeight(contentRef?.current?.scrollHeight!);
      }
    };
  
    React.useEffect(() => {
      if (isOpen) {
        setHeight(contentRef?.current?.scrollHeight!);
      }
    }, [children, isOpen]);
  
    return (
      <div>
        <button
          onClick={toggleAccordion}
          className="flex items-center justify-between w-full p-4 text-left font-medium transition-all cursor-pointer hover:text-pink-500"
        >
          <div className="flex items-center gap-2">
            {icon && <span>{icon}</span>}
            <span>{title}</span>
          </div>
          <span
            className="transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <ChevronDown size={16} />
          </span>
        </button>
  
        <div
          ref={contentRef}
          className="overflow-hidden border-l shadow-inner transition-all duration-300 ease-in-out"
          style={{ maxHeight: isOpen ? `${height}px` : "0px" }}
        >
          <div className="px-4 pb-4">{children}</div>
        </div>
      </div>
    );
  };
  

export const CategoryItem = ({
    title,
    href,
    icon,
    description,
  }: {
    title: string;
    href: string;
    icon: any;
    description: string;
  }) => {
    return (
      <Link
        href={href}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-primary transition-colors group"
      >
        {icon && <span className="text-pink-500">{icon}</span>}
        <div>
          <p className="text-sm font-medium flex items-center gap-1">
            {title}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              →
            </span>
          </p>
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      </Link>
    );
  };


export const ArticleRecommendation = ({
    title,
    date,
    iconSrc,
    href,
    showImage = true
  }: {
    title: string;
    date: string;
    iconSrc: string;
    href: string;
    showImage ?: boolean
  }) => {
    const formattedDate = "March 13 , 2006"
  
    return (
      <div className="flex items-center gap-4  dark:text-white p-4 rounded-lg">
        {showImage && (<div className="relative w-8 h-8 flex-shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
            <Image
              src={iconSrc || "/default-avater.jpg"}
              alt="Book icon"
              width={24}
              height={24}
              className="text-cyan-300 object-cover w-full h-full"
            />
          </div>
        </div>)}
        <div className="flex flex-col ml-2">
          <Link href={href} className="font-bold text-sm hover:underline">
            <div className="line-clamp-1">{title}</div>
          </Link>
          <p className="text-gray-400 text-xs">{formattedDate}</p>
        </div>
      </div>
    );
  };