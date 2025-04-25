"use client";

import { category } from '@/sanity/schemaTypes/category';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import slugify from "slugify"
export type ColorVariant = 'green' | 'blue' | 'pink' | 'violet' | 'orange' | 'red' | 'yellow' | 'teal';

export const colors = ["green" , "blue" , "pink" , "violet" , "orange" , "red" , "yellow" , "teal"]

export const variantColors: Record<ColorVariant, {
  hashtag: string;
  text: string;
  hover: string;
  active: string;
  underline: string;
}> = {
  green: {
    hashtag: "text-green-500",
    text: "dark:text-gray-300 text-black/50",
    hover: "hover:text-green-500",
    active: "text-green-600",
    underline: "bg-green-500"
  },
  blue: {
    hashtag: "text-blue-500",
    text: "dark:text-gray-300 text-black/50",
    hover: "hover:text-blue-500",
    active: "text-blue-600",
    underline: "bg-blue-500"
  },
  pink: {
    hashtag: "text-pink-500",
    text: "dark:text-gray-300 text-black/50",
    hover: "hover:text-pink-500",
    active: "text-pink-600",
    underline: "bg-pink-500"
  },
  violet: {
    hashtag: "text-violet-500",
    text: "dark:text-gray-300 text-black/50",
    hover: "hover:text-violet-500",
    active: "text-violet-600",
    underline: "bg-violet-500"
  },
  orange: {
    hashtag: "text-orange-500",
    text: "dark:text-gray-300 text-black/50",
    hover: "hover:text-orange-500",
    active: "text-orange-600",
    underline: "bg-orange-500"
  },
  red: {
    hashtag: "text-red-500",
    text: "dark:text-gray-300 text-black/50",
    hover: "hover:text-red-500",
    active: "text-red-600",
    underline: "bg-red-500"
  },
  yellow: {
    hashtag: "text-yellow-500",
    text: "dark:text-gray-300 text-black/50",
    hover: "hover:text-yellow-500",
    active: "text-yellow-600",
    underline: "bg-yellow-500"
  },
  teal: {
    hashtag: "text-teal-500",
    text: "dark:text-gray-300 text-black/50",
    hover: "hover:text-teal-500",
    active: "text-teal-600",
    underline: "bg-teal-500"
  }
};

interface NavLinkProps {
  title : string;
  variant?: ColorVariant;
  className?: string;
  showHashtag?: boolean;
  hashtagSize?: string;
  showUnderline? : boolean;
}

const NavLink = ({
  title,
  variant = 'green',
  className = "",
  showHashtag = true,
  hashtagSize = "text-base",
  showUnderline = true
}: NavLinkProps) => {
  const pathname = usePathname();
  
  
  const colors = variantColors[variant];
  const href : string = `/category/${slugify(title.toLowerCase())}`
  const isActive = pathname === href;
  const currentTextColor = isActive ? colors.active : colors.text;
  
  return (
    <Link 
        href={href}
        className={`
        group
        ${currentTextColor}
        ${colors.hover}
        transition-all 
        duration-300 
        flex 
        items-center 
        flex-col
        gap-1 
        leading-relaxed 
        py-1.5 
        tracking-wide
        ${className}
      `}
    >
      <div className="flex items-center gap-1">
        {showHashtag && (
          <span className={`${colors.hashtag} ${hashtagSize} group-hover:scale-110 transition-transform duration-300`}>
            #
          </span>
        )}
        <span className="transition-all duration-300">
          {title}
        </span>
      </div>
      
      {showUnderline && (<div 
        className={`w-0 h-0.5 ${colors.underline} group-hover:w-full transition-all duration-300 origin-left`}
      />)}
    </Link>
  );
};

export default NavLink;