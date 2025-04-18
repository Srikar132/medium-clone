"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { FaHeart } from "react-icons/fa6";
import Balls from "@/components/design/Balls";
import { ArrowRight } from "lucide-react";


export default function LikedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".animate-header", {
        y: -30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".content-area", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.5,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="w-full min-h-screen"
    >
      <Balls/>

      <div className="w-full mx-auto max-w-7xl pt-2 px-4 animate-header relative">
        <div className="relative overflow-hidden dark:bg-gray-800/30 shadow-sm p-5">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-30"></div>
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-40"></div>

          <div className="md:grid md:grid-cols-2 md:gap-8 items-center relative z-10">
            <div className="md:mb-0">
              <div className="inline-block px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-sm font-medium mb-6">
                Your Collection
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-3 text-gray-800 dark:text-white">
                Your <span className="">BookMarked</span> Articles
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Stories and articles you've shown appreciation for over time.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/liked"
                  className="px-5 py-2.5 border border-pink-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800 transition-all flex items-center gap-2 group"
                >
                  <FaHeart className="text-lg text-pink-500 group-hover:scale-110 transition-transform" />
                  <span>View Liked</span>
                </Link>
                <Link
                  href="/home"
                  className="px-5 py-2.5 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <span>Explore more</span>
                  <ArrowRight/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto max-w-7xl px-4 py-4 content-area">
        <div className="p-4 mb-2">{children}</div>
      </div>


    </div>
  );
}