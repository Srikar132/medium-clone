import {highlightFirstmv,highlightFourthmv,highlightSectmv,highlightThirdmv} from "@/utils";



import { FaBook, FaUser } from 'react-icons/fa';
import { FaBookmark, FaUserPlus } from 'react-icons/fa6';
import { BiLogOut } from 'react-icons/bi';
import { GrLike } from 'react-icons/gr';

export const navigation  = [
    { name: "Hero", href: "#hero"  , onlyMobile : false},
    { name: "How It Works", href: "#how-it-works" , onlyMobile : false },
    { name: "Top Writers", href: "#top-writers" , onlyMobile : false },
    { name: "Trending Topics", href: "#trending-topics"  , onlyMobile : false},
    { name: "Testimonials", href: "#testimonials" , onlyMobile : false },
    { name: "Login", href: "/login" , onlyMobile : true },
  ];


export const PinkFlower = ({ className = "", width = 200, height = 200 })  => {
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

export const GreenHalfCircle= ({ className = "", width = 300, height = 150 }) => {
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

export const PurpleHourglass= ({ className = "", width = 60, height = 80 }) => {
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
  {title : "for you" , url : "/for-you"},
  {title : "following" , url : "/following"},
  {title : "trending" , url : "/trending"},
  {title : "bookmarks" , url : "/bookmarks"},
  {title : "b" , url : "/bookmarks"},
]

export const menuItems = [
  { title: 'My Articles', url: '/my-articles', Icon: FaBook },
  { title: 'Following', url: '/following', Icon: FaUserPlus },
  { title: 'Liked', url: '/liked', Icon: GrLike },
  { title: 'Bookmarks', url: '/bookmarks', Icon: FaBookmark },
  { title: 'Logout', url: '/logout', Icon: BiLogOut },
];

export const blogCategories = [
  "Web Development",
  "Mobile App Development",
  "AI & Machine Learning",
  "Programming Tutorials",
  "Cybersecurity",
  "Dev Tools & Productivity",
  "Health & Wellness",
  "Personal Growth",
  "Productivity Hacks",
  "Mindfulness & Meditation",
  "Minimalism",
  "Work-Life Balance",
  "UI/UX Design",
  "Graphic Design",
  "Typography",
  "Inspiration & Moodboards",
  "Creative Process",
];
