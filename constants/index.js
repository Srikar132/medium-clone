import {
  highlightFirstmv,
  highlightFourthmv,
  highlightSectmv,
  highlightThirdmv,
} from "@/utils";

import { FaBook, FaUser } from "react-icons/fa";
import { FaBookmark, FaUserPlus } from "react-icons/fa6";
import { GrLike } from "react-icons/gr";
import { Code, Layout, Palette, Rocket, Terminal, Type } from "lucide-react";

export const navigation = [
  { name: "Hero", href: "#hero", onlyMobile: false },
  { name: "How It Works", href: "#how-it-works", onlyMobile: false },
  { name: "Top Writers", href: "#top-writers", onlyMobile: false },
  { name: "Trending Topics", href: "#trending-topics", onlyMobile: false },
  { name: "Testimonials", href: "#testimonials", onlyMobile: false },
  { name: "Login", href: "/login", onlyMobile: true },
];

export const PinkFlower = ({ className = "", width = 200, height = 200 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M100 0C78 0 60 18 60 40C40 40 20 58 20 80C20 102 38 120 60 120C60 142 78 160 100 160C122 160 140 142 140 120C162 120 180 102 180 80C180 58 162 40 140 40C140 18 122 0 100 0Z"
        fill="url(#flower-gradient)"
      />

      <defs>
        <linearGradient
          id="flower-gradient"
          x1="20"
          y1="80"
          x2="180"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF85D5" />
          <stop offset="1" stopColor="#Fff" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const GreenHalfCircle = ({
  className = "",
  width = 300,
  height = 150,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M300 150C300 67.1573 232.843 0 150 0C67.1573 0 0 67.1573 0 150H300Z"
        fill="url(#green-gradient)"
      />

      <defs>
        <linearGradient
          id="green-gradient"
          x1="150"
          y1="0"
          x2="150"
          y2="150"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#21F390" />
          <stop offset="1" stopColor="#0BA3" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const PurpleHourglass = ({
  className = "",
  width = 60,
  height = 80,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0 0H60L30 40L60 80H0L30 40L0 0Z"
        fill="url(#hourglass-gradient)"
      />

      <defs>
        <linearGradient
          id="hourglass-gradient"
          x1="0"
          y1="40"
          x2="60"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A37FFF" />
          <stop offset="1" stopColor="#7D34FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const OrangeDiamond = ({ className = "", width = 50, height = 50 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="25"
        y="0"
        width="35"
        height="35"
        transform="rotate(45 25 25)"
        fill="url(#diamond-gradient)"
      />

      <defs>
        <linearGradient
          id="diamond-gradient"
          x1="25"
          y1="0"
          x2="60"
          y2="35"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFC371" />
          <stop offset="1" stopColor="#FF5F6D" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const hightlightsSlides = [
  {
    id: "1",
    textLists: [
      "Productivity & Mindfulness",
      "Tips to stay focused in a distracted world.",
      "Build better habits, one day at a time.",
    ],
    video: highlightFirstmv,
    videoDuration: 8,
  },
  {
    id: "2",
    textLists: [
      "Tech & AI Revolution",
      "From GPT to AGI—what's next?",
      "Perspectives shaping the future.",
    ],
    video: highlightThirdmv,
    videoDuration: 8,
  },
  {
    id: "3",
    textLists: [
      "Startups & Entrepreneurship",
      "Lessons from founders who failed—and those who didn’t.",
      "Turn ideas into impact.",
    ],
    video: highlightSectmv,
    videoDuration: 5,
  },
  {
    id: "4",
    textLists: [
      "Self-Discovery & Growth",
      "Deep reflections from real people.",
      "Writing that makes you feel seen.",
    ],
    video: highlightFourthmv,
    videoDuration: 9,
  },
];

export const navItems = [
  { title: "for you", url: "/for-you" },
  { title: "following", url: "/following" },
  { title: "trending", url: "/trending" },
  { title: "bookmarks", url: "/bookmarks" },
];




export const popularCategories = [
  {name : "Games" , numOfPosts : 10 , image: "/images/popular-categories/image1.png"},
  {name : "Robotics" , numOfPosts : 10 , image: "/images/popular-categories/image5.jpg"},
  {name : "Ideas" , numOfPosts : 10 , image: "/images/popular-categories/image3.jpg"},
  {name : "Music" , numOfPosts : 50 , image: "/images/popular-categories/image2.jpg"},
  {name : "Gadjets" , numOfPosts : 23 , image: "/images/popular-categories/image4.jpg"},
];


export const dummyPosts = [
  {
    _id: "post-002",
    _type: "post",
    _createdAt: "2025-03-10T14:20:00.000Z",
    _updatedAt: "2025-03-11T08:45:00.000Z",
    _rev: "ghi789jkl012",
    title: "Sustainable Living: Small Changes, Big Impact",
    slug: {
      _type: "slug",
      current: "sustainable-living-small-changes-big-impact"
    },
    author: {
      _ref: "author-002",
      _type: "reference",
      _weak: false,
      name: "Maya Rivera",
      image: "/images/discover-popular-blogs/image2.jpg"
    },
    mainImage: "/images/discover-popular-blogs/image2.jpg",
    categories: [
      {
        _ref: "category-003",
        _type: "reference",
        _key: "cat3",
        name: "Lifestyle"
      },
      {
        _ref: "category-004",
        _type: "reference",
        _key: "cat4",
        name: "Environment"
      }
    ],
    excerpt: "Learn how small daily habits can contribute to a more sustainable lifestyle and help protect our planet.",
    publishedAt: "2025-03-10T15:00:00.000Z",
    updatedAt: "2025-03-11T08:45:00.000Z",
    featured: false,
    views: 1879,
    status: "published"
  },
  {
    _id: "post-001",
    _type: "post",
    _createdAt: "2025-02-15T08:30:00.000Z",
    _updatedAt: "2025-02-16T10:15:00.000Z",
    _rev: "abc123def456",
    title: "The Ultimate Guide to Modern Web Development",
    slug: {
      _type: "slug",
      current: "ultimate-guide-modern-web-development"
    },
    author: {
      _ref: "author-001",
      _type: "reference",
      _weak: false,
      name: "Alex Johnson",
      image: "/images/discover-popular-blogs/image1.jpg"
    },
    mainImage: "/images/discover-popular-blogs/image1.jpg",
    categories: [
      {
        _ref: "category-001",
        _type: "reference",
        _key: "cat1",
        name: "Web Development"
      },
      {
        _ref: "category-002",
        _type: "reference",
        _key: "cat2",
        name: "Programming"
      }
    ],
    excerpt: "Discover the latest techniques and best practices for modern web development in 2025.",
    publishedAt: "2025-02-15T09:00:00.000Z",
    updatedAt: "2025-02-16T10:15:00.000Z",
    featured: true,
    views: 2456,
    status: "published"
  },

  {
    _id: "post-003",
    _type: "post",
    _createdAt: "2025-04-05T11:40:00.000Z",
    _updatedAt: "2025-04-05T11:40:00.000Z",
    _rev: "mno345pqr678",
    title: "The Rise of AI in Healthcare: Benefits and Challenges",
    slug: {
      _type: "slug",
      current: "rise-of-ai-in-healthcare-benefits-challenges"
    },
    author: {
      _ref: "author-003",
      _type: "reference",
      _weak: false,
      name: "Dr. James Wilson",
      image: "/images/discover-popular-blogs/image3.jpg",
    },
    mainImage: "/images/discover-popular-blogs/image3.jpg",
    categories: [
      {
        _ref: "category-005",
        _type: "reference",
        _key: "cat5",
        name: "Healthcare"
      },
      {
        _ref: "category-006",
        _type: "reference",
        _key: "cat6",
        name: "Technology"
      },
      {
        _ref: "category-007",
        _type: "reference",
        _key: "cat7",
        name: "AI"
      }
    ],
    excerpt: "Explore how artificial intelligence is transforming healthcare delivery, diagnosis, and treatment in 2025.",
    publishedAt: "2025-04-05T12:00:00.000Z",
    updatedAt: "2025-04-05T12:00:00.000Z",
    featured: true,
    views: 3421,
    status: "published"
  }
];

export const categoriesWithIcons = [
  {
    title: "Web Development",
    href: "/category/web-development",
    icon: <Code size={18} />,
  },
  { title: "UI/UX Design", href: "/category/design", icon: <Palette size={18} /> },
  { title: "Frontend", href: "category/frontend", icon: <Layout size={18} /> },
  { title: "Backend", href: "category/backend", icon: <Terminal size={18} /> },
  { title: "Typography", href: "category/typography", icon: <Type size={18} /> },
  { title: "Performance", href: "category/performance", icon: <Rocket size={18} /> },
];

export const webDevArticles = [
  {
    title: "Building a Headless CMS Blog with Next.js 14 and Sanity",
    mainImage: "/images/popular-categories/image1.png",
    publishedDate: "2025-03-12",
    href: "/article/building-a-headless-cms-blog-with-nextjs-14-and-sanity",
  },
  {
    title: "Server Components in Next.js: Integration with Sanity Studio",
    mainImage: "/images/popular-categories/image2.jpg",
    publishedDate: "2025-02-28",
    href: "/article/server-components-in-nextjs-integration-with-sanity-studio",
  },
  {
    title: "Real-time Previews with Next.js App Router and Sanity",
    mainImage: "/images/popular-categories/image3.jpg",
    publishedDate: "2025-01-15",
    href: "/article/real-time-previews-with-nextjs-app-router-and-sanity",
  },
  {
    title: "Optimizing Images in Next.js with Sanity's Asset Pipeline",
    mainImage: "/images/popular-categories/image4.jpg",
    publishedDate: "2024-12-07",
    href: "/article/optimizing-images-in-nextjs-with-sanitys-asset-pipeline",
  },
  {
    title: "Building E-commerce Sites with Next.js, Sanity, and Stripe",
    mainImage: "/images/popular-categories/image5.jpg",
    publishedDate: "2024-11-22",
    href: "/article/building-e-commerce-sites-with-nextjs-sanity-and-stripe",
  },
  {
    title: "Internationalization in Next.js Applications with Sanity",
    mainImage: "/images/popular-categories/image1.png",
    publishedDate: "2024-10-30",
    href: "/article/internationalization-in-nextjs-applications-with-sanity",
  },
];

export const categories = [
  { title: "For You", href: "/categories/for-you" },
  { title: "Following", href: "/categories/following" },
  { title: "Recommended", href: "/categories/recommended" },
  { title: "Latest", href: "/categories/latest" },
];

export const trendingArticles = [
  {
    title: "Mastering Next.js 14 Server Components with TypeScript",
    mainImage: "/images/discover-popular-blogs/image1.jpg",
    publishedDate: "2025-03-12",
    href: "/article/mastering-nextjs-14-server-components-with-typescript",
  },
  {
    title: "Building a Portfolio Site with Tailwind CSS and Next.js",
    mainImage: "/images/popular-categories/image2.jpg",
    publishedDate: "2025-02-28",
    href: "/article/building-a-portfolio-site-with-tailwind-css-and-nextjs",
  },
  {
    title: "Modern Authentication Strategies in Next.js Applications",
    mainImage: "/images/discover-popular-blogs/image3.jpg",
    publishedDate: "2025-01-15",
    href: "/article/modern-authentication-strategies-in-nextjs-applications",
  },
  {
    title: "Creating Custom Hooks for React and Next.js Projects",
    mainImage: "/images/popular-categories/image4.jpg",
    publishedDate: "2024-12-07",
    href: "/article/creating-custom-hooks-for-react-and-nextjs-projects",
  },
  {
    title: "Advanced Animation Techniques with Framer Motion and Next.js",
    mainImage: "/images/discover-popular-blogs/image3.jpg",
    publishedDate: "2024-11-22",
    href: "/article/advanced-animation-techniques-with-framer-motion-and-nextjs",
  },
  {
    title: "Implementing Dark Mode in Next.js with Tailwind CSS",
    mainImage: "/images/popular-categories/image1.png",
    publishedDate: "2024-10-30",
    href: "/article/implementing-dark-mode-in-nextjs-with-tailwind-css",
  },
];